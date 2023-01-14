import React from 'react'
import {useTranslation} from 'react-i18next'
import {Formik} from 'formik'
import Input from '../input/input'
import Button from '../button/button'
import {Visible} from 'react-grid-system'

import s from './auth.module.scss'

const ForgetPassword = () => {
    const {t} = useTranslation()

    return (
        <div className={s.forgetPassword}>
            <div className={s.signInText}>
                <h5>{t('request')}</h5>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the industry.</p>
            </div>
            <Formik
                initialValues={{email: ''}}
                onSubmit={(values, actions) => {
                    console.log(values)
                    console.log(actions)
                }}
            >
                {
                    ({handleChange, values}) => (
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
                                    />
                                </div>
                            </Visible>
                            <Visible xs sm md lg>
                                <div>
                                    <Input
                                        name={'email'}
                                        type={'text'}
                                        onChange={handleChange}
                                        className={s.inputMobileStyle}
                                        value={values.email}
                                        label={t('email')}
                                        isAsterisk
                                    />
                                </div>
                            </Visible>
                            <Button isSubmit type='green' className={s.forgetBtn}>
                                {t('send')}
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </div>
    )
}


export default ForgetPassword

