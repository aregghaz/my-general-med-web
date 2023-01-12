import React from 'react'
import {Formik, FormikHelpers, FormikValues} from 'formik'
import FormikHandler, {IItem} from '../formik-handler/formik-handler'
import populateEditFormFields from '../../../../constants/populateEditFormFields'
import Button from '../../../../components/button/button'
import {useNavigate} from '@reach/router'


import s from './edit.module.scss'
import {AdminApi} from "../../../../api/admin-api/admin-api";
import validationRules from "../../../../utils/validationRule";
import {useTranslation} from "react-i18next";

interface IEdit {
    data: { [key: string]: { [key: string]: Object } }
    fields: Array<IItem>
    crudKey?: string
    title: string,
    requiredFields?: Array<string>
}

const Edit: React.FC<IEdit> = (
    {
        fields,
        crudKey,
        data,
        children,
        requiredFields,
    }) => {
    const {t} = useTranslation()

    const navigate = useNavigate()
    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t)

    const submit = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)
        const formData: FormData = new FormData()
        formData.append('_method', 'put');
        formData.append('value', JSON.stringify(values))
        const res: any = await AdminApi.update(formData, crudKey, values.id)
        if (Number(res.status === 200)) await navigate(`/admin/${crudKey}`)
    }

    return (
        <div>
            <Formik
                initialValues={populateEditFormFields(fields, data)}
                onSubmit={submit}
                validate={validate}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      errors
                  }) => {


                    return (
                        <>
                            <form className={s.form}>
                                {
                                    fields
                                        .map((field, index) =>
                                            <div key={index} className={s.item}
                                                 style={field.type == 'hidden' ? {display: "none"} : {}}>
                                                <FormikHandler
                                                    item={field}
                                                    handleChange={handleChange}
                                                    values={values}
                                                    requiredFields={requiredFields}
                                                    setFieldValue={setFieldValue}
                                                    selectOptions={data}
                                                    errors={errors}
                                                />
                                            </div>
                                        )
                                }

                                <div className={s.buttonDiv}>
                                    <Button
                                        type={'adminUpdate'}
                                        onClick={handleSubmit}
                                        className={'admin'}
                                        isSubmit={true}

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

export default Edit
