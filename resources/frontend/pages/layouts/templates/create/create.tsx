import React from 'react'
import s from './create.module.scss'
import FormikHandler, {IItem} from "../formik-handler/formik-handler";
import populateEditFormFields from "../../../../constants/populateEditFormFields";
import Button from "../../../../components/button/button";
import {Formik, FormikHelpers, FormikValues} from 'formik'
import {useNavigate} from '@reach/router'
import populateCreateFormFields from "../../../../constants/populateCreateFormFields";
import {AdminApi} from '../../../../api/admin-api/admin-api';
import validationRules from '../../../../utils/validationRule';
import { useTranslation } from 'react-i18next';

interface ICreate {
    data?: { [key: string]: Object }
    fields: Array<IItem>
    crudKey?: string
    isAdmin?:boolean
    title: string,
    requiredFields?:Array<string>
}


const Create: React.FC<ICreate> = (
    {
        fields,
        crudKey,
        data,
        isAdmin = true,
        children,
        requiredFields
    }) => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const validate = (values:FormikValues) => validationRules(values, requiredFields, fields, t)

    const create = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)
        const formData: FormData = new FormData()
        if(crudKey == 'vendorClients'){
            formData.append('sex_offender_check', values['sex_offender_check'])
            formData.append('motor_vehicle_record', values['motor_vehicle_record'])
            formData.append('defensive_driving', values['defensive_driving'])
            formData.append('wheelchair_securement', values['wheelchair_securement'])
            formData.append('pass_bassic', values['pass_bassic'])
            formData.append('emt_1', values['emt_1'])
            formData.append('first_aid', values['first_aid'])
            formData.append('company_training', values['company_training'])
            formData.append('license', values['license'])
            formData.append('picture', values['picture'])

        }

        formData.append('value', JSON.stringify(values))
        const res: any = await AdminApi.store(formData, crudKey,isAdmin)
        if (Number(res.status === 200)) await navigate(`/${isAdmin ? 'admin/' : ''}${crudKey}`)
    }

    return (
        <div>

            <Formik
                selectOptions={data || {}}
                initialValues={populateCreateFormFields(fields, data)}
                onSubmit={create}
                validate={(values:FormikValues) => validate(values)}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      errors,
                  }) => {
                    return (
                        <>
                            <form className={s.form}>
                                {
                                 fields
                                        .map((field, index) => {
                                                if (  data && data[field.name]) {
                                                    return <div key={index} className={s.item}>
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            selectOptions={data}
                                                            requiredFields={requiredFields}
                                                            errors={errors}
                                                        />
                                                    </div>
                                                } else {
                                                    return <div key={index} className={s.item}>
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            requiredFields={requiredFields}
                                                            errors={errors}
                                                        />
                                                    </div>
                                                }

                                            }
                                        )
                                }
                                <div className={s.buttonDiv}>
                                    <Button
                                        type={'adminUpdate'}
                                        onClick={handleSubmit}
                                        className={'admin'}
                                    >
                                        {children}
                                    </Button>
                                </div>

                            </form>

                        </>

                    )
                }
                }

            </Formik>

        </div>
    )
}


export default Create
