import React, {useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Field, Formik, FormikHelpers, FormikValues} from 'formik'
import Radio from '../radio/radio'
import {Col, Hidden, Row, Visible} from 'react-grid-system'
import Input from '../input/input'
import Button from '../button/button'
import {UserType} from '../../constants/helpers'
import Select, {IOption} from '../select/select'
import {authAPI} from '../../api/site-api/auth-api'
import AsyncSelect from '../select/async-select'

import s from './auth.module.scss'

interface IRegister {
    handlerAlreadyRegistered: () => void
    handlerSuccessModal: () => void
}

const Register: React.FC<IRegister> = ({handlerAlreadyRegistered, handlerSuccessModal}) => {
    const {t} = useTranslation()
    const [province, setProvince] = useState<Array<IOption> | null>(null)
    const [typeOfActivity, setTypeOfActivity] = useState<Array<IOption> | null>(null)
    const [isInputOpen, setInputOpen] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement | null>(null)

    const getProvince = async (option: IOption) => {
        // const res = await authAPI.getProvince(option.id)
        // if (Number(res.status) === 200) setProvince(res.data)
    }

    const getTypeOfActivity = async (slug: string) => {
        // const res = await authAPI.typeOfActivity(slug)
        // setTypeOfActivity(res)
    }

    const handlerAdd = () => setInputOpen(true)

    const handlerInputClose = () => setInputOpen(false)

    const submit = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)

        const formData: FormData = new FormData()

        formData.append('name', values.name)
        formData.append('surname', values.surName)
        formData.append('email', values.email)
        formData.append('birthday', values.birthDate)
        formData.append('region', values.district)
        formData.append('business_address', values.businessAddress)
        formData.append('phone_number', values.phone)
        formData.append('residence', JSON.stringify(values.residence))
        formData.append('state', JSON.stringify(values.state))
        formData.append('sphere_of_activity', JSON.stringify([values.typeOfActivity]))
        formData.append('typeOfActivityInput', values.typeOfActivityInput)

        const resultCode = await authAPI.register(formData)
        if (Number(resultCode.success) === 1) handlerSuccessModal()
    }

    const loadOptionsFieldOfActivity = async () => {
        // const data = await authAPI.getFieldOfActivity()
        // return data.slice(0, 2)
    }

    const loadOptionsResidence = async () => {
        // const {regions} = await authAPI.getRegistrationFormData()
        // return regions
    }


    return (
        <>
            <div className={s.registerText}>
                <h5>{t('register')}</h5>
            </div>
            <div className={s.register}>
                <Formik
                    initialValues={{
                        operator: UserType.beneficiary,
                        name: '',
                        surName: '',
                        email: '',
                        birthDate: '',
                        district: '',
                        businessAddress: '',
                        phone: '',
                        fieldOfActivity: [],
                        typeOfActivity: [],
                        typeOfActivityInput: '',
                        companyName: '',
                        taxpayer: '',
                        legalAddress: '',
                        state: [],
                        residence: []
                    } as FormikValues}
                    onSubmit={submit}
                >
                    {
                        ({
                             setFieldValue,
                             handleChange,
                             values,
                             handleSubmit
                         }) => (
                            <form ref={formRef}>
                                <div className={s.radioGroup}>
                                    <Field
                                        component={Radio}
                                        name={'operator'}
                                        label={t('recipient')}
                                        onChange={() => setFieldValue('operator', UserType.beneficiary)}
                                        checked={values.operator === UserType.beneficiary}
                                    />
                                    <Field
                                        component={Radio}
                                        name={'operator'}
                                        label={t('operator')}
                                        onChange={() => setFieldValue('operator', UserType.operator)}
                                        checked={values.operator === UserType.operator}
                                    />

                                    <Field
                                        component={Radio}
                                        name={'operator'}
                                        label={t('tourOperator')}
                                        onChange={() => setFieldValue('operator', UserType.tourOperator)}
                                        checked={values.operator === UserType.tourOperator}

                                    />
                                </div>
                                <Row className={s.formInputs}>
                                    {
                                        values.operator === UserType.beneficiary &&
                                        <>
                                            <Visible xl xxl>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'name'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        label={t('name')}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'surName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.surName}
                                                        label={t('surName')}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'birthDate'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.birthDate}
                                                        label={t('birthDate')}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'phone'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Input
                                                        name={'businessAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.businessAddress}
                                                        label={t('businessAddress')}
                                                    />
                                                </Col>

                                                <Col xl={6} xxl={6}>
                                                    <AsyncSelect
                                                        isCheckbox={false}
                                                        defaultValue={values.state}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getProvince(option).catch(e => e)
                                                            setFieldValue('state', option)
                                                        }}
                                                        label={t('state')}
                                                        isSearchable={false}
                                                        name={'state'}
                                                        loadOptions={loadOptionsResidence}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    <Select
                                                        isCheckbox={false}
                                                        value={values.residence}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        options={province}
                                                        onChange={(option: IOption) =>
                                                            setFieldValue('residence', option)}
                                                        label={t('residence')}
                                                        isSearchable={false}
                                                        name={'residence'}
                                                    />
                                                </Col>

                                                <Col xl={6} xxl={6}>
                                                    <AsyncSelect
                                                        defaultValue={values.fieldOfActivity}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getTypeOfActivity(option.slug).catch(e => e)
                                                            setFieldValue('fieldOfActivity', option)
                                                        }}
                                                        label={t('fieldOfActivity')}
                                                        isSearchable={false}
                                                        name={'fieldOfActivity'}
                                                        loadOptions={loadOptionsFieldOfActivity}
                                                    />
                                                </Col>
                                                <Col xl={6} xxl={6}>
                                                    {
                                                        !isInputOpen ?
                                                            <Select
                                                                value={values.typeOfActivity}
                                                                getOptionValue={(option: IOption) => option.value}
                                                                getOptionLabel={(option: IOption) => t(option.value)}
                                                                options={typeOfActivity}
                                                                onChange={(option: IOption) =>
                                                                    setFieldValue('typeOfActivity', option)
                                                                }
                                                                label={t('typeOfActivity')}
                                                                name={'typeOfActivity'}
                                                                isMenuAdd
                                                                handlerAdd={handlerAdd}
                                                            />
                                                            :
                                                            <div className={s.typeOfActivityInputWrapper}>
                                                                <Input
                                                                    name={'typeOfActivityInput'}
                                                                    type={'text'}
                                                                    onChange={handleChange}
                                                                    value={values.typeOfActivityInput}
                                                                    label={t('typeOfActivity')}
                                                                />
                                                                <i className={`cancelicon- ${s.typeOfActivityCancelIcon}`}
                                                                   onClick={handlerInputClose}
                                                                />
                                                            </div>
                                                    }
                                                </Col>
                                            </Visible>
                                            <Visible xs sm md lg>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'name'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        label={t('name')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'surName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.surName}
                                                        label={t('surName')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'birthDate'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.birthDate}
                                                        label={t('birthDate')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'phone'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Input
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        className={s.inputMobileStyle}
                                                        name={'businessAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.businessAddress}
                                                        label={t('businessAddress')}
                                                    />
                                                </Col>

                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <AsyncSelect
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        isCheckbox={false}
                                                        defaultValue={values.state}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getProvince(option).catch(e => e)
                                                            setFieldValue('state', option)
                                                        }}
                                                        label={t('state')}
                                                        isSearchable={false}
                                                        name={'state'}
                                                        loadOptions={loadOptionsResidence}
                                                    />
                                                </Col>

                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Select
                                                        labelStyle={s.inputLabelMobileStyle}
                                                        isCheckbox={false}
                                                        value={values.residence}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        options={province}
                                                        onChange={(option: IOption) =>
                                                            setFieldValue('residence', option)}
                                                        label={t('residence')}
                                                        isSearchable={false}
                                                        name={'residence'}
                                                    />
                                                </Col>

                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <AsyncSelect
                                                        defaultValue={values.fieldOfActivity}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getTypeOfActivity(option.slug).catch(e => e)
                                                            setFieldValue('fieldOfActivity', option)
                                                        }}
                                                        label={t('fieldOfActivity')}
                                                        isSearchable={false}
                                                        name={'fieldOfActivity'}
                                                        loadOptions={loadOptionsFieldOfActivity}
                                                        labelStyle={s.inputLabelMobileStyle}
                                                    />
                                                </Col>

                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    {
                                                        !isInputOpen ?
                                                            <Select
                                                                labelStyle={s.inputLabelMobileStyle}
                                                                value={values.typeOfActivity}
                                                                getOptionValue={(option: IOption) => option.value}
                                                                getOptionLabel={(option: IOption) => t(option.value)}
                                                                options={typeOfActivity}
                                                                onChange={(option: IOption) =>
                                                                    setFieldValue('typeOfActivity', option)
                                                                }
                                                                label={t('typeOfActivity')}
                                                                name={'typeOfActivity'}
                                                                isMenuAdd
                                                                handlerAdd={handlerAdd}
                                                            />
                                                            :
                                                            <div className={s.typeOfActivityInputWrapper}>
                                                                <Input
                                                                    labelStyle={s.inputLabelMobileStyle}
                                                                    className={s.inputMobileStyle}
                                                                    name={'typeOfActivityInput'}
                                                                    type={'text'}
                                                                    onChange={handleChange}
                                                                    value={values.typeOfActivityInput}
                                                                    label={t('typeOfActivity')}
                                                                />
                                                                <i className={`cancelicon- ${s.typeOfActivityCancelIcon}`}
                                                                   onClick={handlerInputClose}
                                                                />
                                                            </div>
                                                    }
                                                </Col>

                                            </Visible>
                                        </>
                                    }
                                    {
                                        values.operator === UserType.tourOperator &&
                                        <>
                                            <Visible xl xxl>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'companyName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.companyName}
                                                        label={t('companyName')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'taxpayer'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.taxpayer}
                                                        label={t('taxpayer')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'phoneNumber'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'legalAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.legalAddress}
                                                        label={t('legalAddress')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'businessAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.businessAddress}
                                                        label={t('businessAddress')}
                                                    />
                                                </Col>
                                            </Visible>
                                            <Visible xs sm md lg>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'companyName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.companyName}
                                                        label={t('companyName')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'taxpayer'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.taxpayer}
                                                        label={t('taxpayer')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'phoneNumber'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'legalAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.legalAddress}
                                                        label={t('legalAddress')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'businessAddress'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.businessAddress}
                                                        label={t('businessAddress')}
                                                    />
                                                </Col>
                                            </Visible>
                                        </>
                                    }
                                    {
                                        values.operator === UserType.operator &&
                                        <>
                                            <Visible xl xxl>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'name'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        label={t('name')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'surName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.surName}
                                                        label={t('surName')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'birthDate'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.birthDate}
                                                        label={t('birthDate')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <AsyncSelect
                                                        isCheckbox={false}
                                                        defaultValue={values.state}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getProvince(option).catch(e => e)
                                                            setFieldValue('state', option)
                                                        }}
                                                        label={t('state')}
                                                        isSearchable={false}
                                                        name={'state'}
                                                        loadOptions={loadOptionsResidence}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        name={'phoneNumber'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                            </Visible>
                                            <Visible xs sm md lg>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'name'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        label={t('name')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'surName'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.surName}
                                                        label={t('surName')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'email'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        label={t('email')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'birthDate'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.birthDate}
                                                        label={t('birthDate')}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <AsyncSelect
                                                        isCheckbox={false}
                                                        defaultValue={values.state}
                                                        getOptionValue={(option: IOption) => option.value}
                                                        getOptionLabel={(option: IOption) => t(option.value)}
                                                        onChange={(option: IOption) => {
                                                            getProvince(option).catch(e => e)
                                                            setFieldValue('state', option)
                                                        }}
                                                        label={t('state')}
                                                        isSearchable={false}
                                                        name={'state'}
                                                        loadOptions={loadOptionsResidence}
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                                                    <Input
                                                        className={s.inputMobileStyle}
                                                        name={'phoneNumber'}
                                                        type={'text'}
                                                        onChange={handleChange}
                                                        value={values.phone}
                                                        label={t('phoneNumber')}
                                                    />
                                                </Col>
                                            </Visible>
                                        </>
                                    }
                                </Row>
                                <Row className={s.btnGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button
                                            isSubmit
                                            type={'green'}
                                            onClick={handleSubmit}
                                        >
                                            {t('sendRequest')}
                                        </Button>
                                    </Col>
                                    <Hidden xs sm md>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Button type={'transparent'}>{t('cancel')}</Button>
                                        </Col>
                                    </Hidden>
                                    <p className={s.termsText}>
                                        By creating your account, you agree to our
                                        <span> Terms and Conditions</span> and <span>Privacy Policy</span>
                                    </p>
                                    <Button
                                        type={'blank'}
                                        className={s.alreadyRegisteredBtn}
                                        onClick={handlerAlreadyRegistered}
                                    >
                                        {t('alreadyRegistered')}
                                    </Button>
                                </Row>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}


export default Register
