import React, {useEffect, useRef, useState} from 'react'
import BackDropWeather from '../backdrop-wheather/backdrop-weather'
import LanguagePicker from '../language-picker/language-picker'
import useOnClickOutside from '../../hooks/use-on-click-outside'
import {useTranslation} from 'react-i18next'
import useLocalStorage from '../../hooks/use-local-storage'
import BackDropSearch from '../backdrop-search/backdrop-search'
import Auth from '../auth/auth'
import {AuthMode} from '../../constants/helpers'
import {useSelector} from 'react-redux'
import {getUserData} from '../../store/selectors'
import {useNavigate} from '@reach/router'

import s from './header-icons.module.scss'

interface IHeaderIcons {
    isLanguagePicker: boolean
    handlerLanguagePicker?: () => void
    handlerCloseLanguagePicker: () => void
    handlerCloseIcon: () => void
    handlerUserIcon: () => void
    isUserTooltip: boolean
}

const HeaderIcons: React.FC<IHeaderIcons> = (
    {
        isLanguagePicker,
        handlerLanguagePicker,
        handlerCloseLanguagePicker,
        handlerCloseIcon,
        handlerUserIcon,
        isUserTooltip
    }) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {user} = useSelector(getUserData)
    const userTooltipRef = useRef<HTMLDivElement | null>(null)
    const [isShowWeather, setShowWeather] = useState<boolean>(false)
    const [isBackDropSearch, setBackdropSearch] = useState<boolean>(false)
    const [activeAuthPage, setActiveAuthPage] = useState<AuthMode>(AuthMode.modalClose)

    const [themeType, setThemeType] = useLocalStorage('theme', 'light')


    useOnClickOutside(userTooltipRef, handlerCloseIcon)

    const handlerBackDropWeather = () => setShowWeather(true)

    const handlerCloseBackDrop = () => setShowWeather(false)

    const handlerBackDropSearch = () => setBackdropSearch(true)

    const handlerCloseBackDropSearch = () => setBackdropSearch(false)

    // const handlerChangeMode = (theme: themesType) => {
    //     if (theme === "light") {
    //         setThemeType('dark')
    //     }
    //     if (theme === "dark") {
    //         setThemeType('light')
    //     }
    // }

    useEffect(() => {
        document.documentElement.className = ''
        document.documentElement.classList.add(`theme-${themeType}`)
    }, [themeType])

    const handlerLogin = () => setActiveAuthPage(AuthMode.login)

    const handlerAlreadyRegistered = () => setActiveAuthPage(AuthMode.login)

    const handlerRegister = () => setActiveAuthPage(AuthMode.register)

    const handlerCloseLoginModal = () => setActiveAuthPage(AuthMode.modalClose)

    const handlerSuccessModal = () => setActiveAuthPage(AuthMode.successMessage)

    const handlerForgetPassword = () => setActiveAuthPage(AuthMode.forgetPassword)

    const handlerLogOut = () => navigate('/my-account')

    return (
        <>
            <Auth
                activeAuthPage={activeAuthPage}
                handlerCloseModal={handlerCloseLoginModal}
                handlerRegister={handlerRegister}
                handlerAlreadyRegistered={handlerAlreadyRegistered}
                handlerSuccessModal={handlerSuccessModal}
                handlerForgetPassword={handlerForgetPassword}
            />
            {
                isShowWeather &&
                <BackDropWeather handlerCloseBackDrop={handlerCloseBackDrop}/>
            }
            {/* {

                isBackDropSearch &&
                <BackDropSearch handlerCloseBackDropSearch={handlerCloseBackDropSearch}/>
            } */}
            <div className={s.icons}>
                <div className={s.user}>
                    {
                        !!user ?
                            <div className={s.userInitials} onClick={handlerLogOut}>
                                <p>  {user.name[0].toLocaleUpperCase()}
                                    {user.surname[0].toLocaleUpperCase()}
                                </p>
                            </div>
                            :
                            <i className={`usericon- ${s.userIcon}
                                 ${isUserTooltip && s.userActive} `}
                               onClick={handlerUserIcon}
                            />
                    }

                    {
                        isUserTooltip &&
                        <div className={s.items} ref={userTooltipRef}>
                            <p onClick={handlerLogin}>{t('login')}</p>
                            <p onClick={handlerRegister}>{t('register')}</p>
                        </div>
                    }

                </div>
                <div>
                    <i className={`searchicon-  ${s.search}`}
                       onClick={handlerBackDropSearch}
                    />

                </div>
                <div>
                    <i className={`weathericon- ${s.weather}`}
                       onClick={handlerBackDropWeather}
                    />
                </div>
                {/* <div className={s.languagePicker}>
                    <i onClick={handlerLanguagePicker}
                       className={`languageicon- ${s.language}
                                        ${isLanguagePicker && s.languagePickerActive}`}
                    />
                    {
                        isLanguagePicker &&
                        <LanguagePicker handlerCloseLanguagePicker={handlerCloseLanguagePicker}/>
                    }
                </div> */}
                {/*<div>*/}
                {/*    {*/}
                {/*        themeType === 'dark' ?*/}
                {/*            <i onClick={() => handlerChangeMode(themeType)}*/}
                {/*               className={`sunicon- ${s.sun}`}/>*/}
                {/*            :*/}
                {/*            <i className={`vector-1icon- ${s.sun} `}*/}
                {/*               onClick={() => handlerChangeMode(themeType)}/>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default HeaderIcons
