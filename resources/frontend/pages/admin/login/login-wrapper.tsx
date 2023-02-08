import React, {useEffect, useState} from 'react'
import Button from '../../../components/button/button'
import {useTranslation} from 'react-i18next'
import {Formik, FormikHelpers, FormikValues} from 'formik'
import Input from '../../../components/input/input'
import {login} from '../../../store/auth'
import {useDispatch, useSelector} from 'react-redux'
import { getUserData} from '../../../store/selectors'
import {useNavigate} from '@reach/router'

import s from './login-wrapper.module.scss'


interface ILoginWrapper {
    path: string
}


const LoginWrapper: React.FC<ILoginWrapper> = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(getUserData)
    const [isLoading, setLoading] = useState(false);
    const submit = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)
        const formData: FormData = new FormData()
        formData.append('email', values.email)
        formData.append('password', values.password)
        await dispatch(login(formData))

        setLoading(true)
    }

    useEffect(() => {
        if (user) {
            if (user && user.role == 'vendor') {
                navigate('/')
            }
            if (user && user.role == 'admin') {
                navigate('/admin')
                ///  setLoading(false)
            }
        } else {
            navigate('/login')
        }

    }, [user])
    return (
        <div className={s.login}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                } as FormikValues}
                onSubmit={submit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({values, handleSubmit, handleChange}) => (
                    <form id={'form'} onSubmit={handleSubmit} className={s.form}>
                        <h3> {t('login')} </h3>
                        <Input
                            label={t('email')}
                            name={'email'}
                            type={'text'}
                            onChange={handleChange}
                            value={values.email}
                        />
                        <Input
                            label={t('password')}
                            name={'password'}
                            type={'password'}
                            onChange={handleChange}
                            value={values.password}
                        />
                        <div className={s.actions}>
                            <Button isSubmit type={'green'} onClick={handleSubmit}>{t('login')}</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
export default LoginWrapper
