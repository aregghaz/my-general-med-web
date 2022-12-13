import React, {useEffect} from 'react'
import {Formik} from 'formik'
import TextField from '../text-field/text-field'
import {useTranslation} from 'react-i18next'
import {Visible} from 'react-grid-system'

import s from './backdrop-search.module.scss'

interface IBackDropSearch {
    handlerCloseBackDropSearch: () => void
}

const BackDropSearch: React.FC<IBackDropSearch> = ({handlerCloseBackDropSearch}) => {
    const {t} = useTranslation()

    const handlerSubmit = () => console.log('Work')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'unset'
    })

    return (
        <div className={s.backDropSearchWrapper}>
            <Visible xs sm md lg>
                <div className={s.cancelIconWrapper}>
                    <i className={`cancelicon- ${s.icon} `}
                       onClick={handlerCloseBackDropSearch}/>
                </div>
            </Visible>
            <div className={s.backDropSearch}>
                <Formik
                    initialValues={{
                        search: ''
                    }}
                    onSubmit={handlerSubmit}
                >
                    {
                        ({values, handleChange, handleSubmit}) => (
                            <form className={s.form} onSubmit={handleSubmit}>
                                <TextField
                                    name={'search'}
                                    value={values.search}
                                    type={'text'}
                                    placeholder={t('search')}
                                    onChange={handleChange}
                                />
                                <Visible xl xxl>
                                    <i className={`cancelicon- ${s.cancelIcon} `}
                                       onClick={handlerCloseBackDropSearch}/>
                                </Visible>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default BackDropSearch
