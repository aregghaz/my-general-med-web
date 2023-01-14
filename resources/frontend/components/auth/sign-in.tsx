import React, {useEffect, useState} from 'react'
import {Formik, FormikHelpers, FormikValues} from 'formik'
import {useTranslation} from 'react-i18next'
import Input from '../input/input'
import Checkbox from '../checkbox/checkbox'
import Button from '../button/button'
import {Visible} from 'react-grid-system'
import {login} from '../../store/auth'
import {useDispatch, useSelector} from 'react-redux'
import {getLoginError, getUserData} from '../../store/selectors'

import s from './auth.module.scss'

interface ISignIn {
    handlerRegister: () => void
    handlerForgetPassword: () => void
    handlerCloseModal: () => void
}

const SignIn: React.FC<ISignIn> = ({handlerRegister, handlerForgetPassword, handlerCloseModal}) => {
    const dispatch = useDispatch()
    const {error} = useSelector(getLoginError)
    const {user} = useSelector(getUserData)
    const {t} = useTranslation()
    const [isShowPassword, setShowPassword] = useState<boolean>(false)

    const handlerShowPassword = () => setShowPassword(!isShowPassword)

    const submit = (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {

        setSubmitting(true)

        const formData: FormData = new FormData()
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('remember', values.remember)

        dispatch(login(formData))
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'unset'
    })

    useEffect(() => {
        if (user) {
            handlerCloseModal()
        }
    })

    return (
        <div className={s.signInWrapper}>
            <div className={s.signInText}>
                <h5>{t('login')}</h5>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the industry.</p>
            </div>
            <div className={s.signIn}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        remember: false
                    } as FormikValues}
                    onSubmit={submit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({
                          handleChange,
                          values,
                          setFieldValue,
                          handleSubmit
                      }) => (
                        <form>
                            <Visible xl xxl>
                                <div>
                                    <Input
                                        name={'email'}
                                        type={'text'}
                                        onChange={handleChange}
                                        value={values.email}
                                        label={t('email')}
                                        isAsterisk
                                        error={error && error.email}
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={'password'}
                                        type={`${isShowPassword ? 'text' : 'password'}`}
                                        onChange={handleChange}
                                        value={values.password}
                                        label={t('password')}
                                        isAsterisk
                                        error={error && error.password}
                                    />
                                    <i className={`showicon- ${s.showIcon}`}
                                       onClick={handlerShowPassword}
                                    />
                                </div>
                                <div className={s.rememberData}>
                                    <Checkbox
                                        name={'remember'}
                                        label={t('remember')}
                                        checked={values.remember}
                                        handlerCheckbox={() => setFieldValue('remember', !values.remember)}
                                    />
                                    <p className={s.rememberDataLink} onClick={handlerForgetPassword}>
                                        {t('forgetPassword')}
                                    </p>
                                </div>
                            </Visible>
                            <Visible xs sm md lg>
                                <div>
                                    <Input
                                        name={'email'}
                                        type={'text'}
                                        onChange={handleChange}
                                        value={values.email}
                                        label={t('email')}
                                        isAsterisk
                                        className={s.inputMobileStyle}
                                        labelStyle={s.labelStyle}
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={'password'}
                                        type={`${isShowPassword ? 'text' : 'password'}`}
                                        onChange={handleChange}
                                        value={values.password}
                                        label={t('password')}
                                        isAsterisk
                                        className={s.inputMobileStyle}
                                        labelStyle={s.labelStyle}
                                    />
                                    <i className={`showicon- ${s.showIcon}`}
                                       onClick={handlerShowPassword}
                                    />
                                </div>
                                <div className={s.rememberData}>
                                    <Checkbox
                                        name={'remember'}
                                        label={t('remember')}
                                        checked={values.remember}
                                        handlerCheckbox={() => setFieldValue('remember', !values.remember)}
                                        className={s.checkboxMobileStyle}
                                        labelStyle={s.labelStyle}
                                    />
                                    <p className={s.rememberDataLink} onClick={handlerForgetPassword}>
                                        {t('forgetPassword')}
                                    </p>
                                </div>
                            </Visible>
                            <div className={s.btnGroup}>
                                <Button isSubmit type={'green'} onClick={handleSubmit}>{t('login')}</Button>
                                <Button onClick={handlerRegister} type={'transparent'}>{t('register')}</Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignIn
