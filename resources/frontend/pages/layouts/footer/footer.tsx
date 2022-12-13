import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Row, Visible} from 'react-grid-system'

import CustomContainer from '../../../components/custom-container/custom-container'
import {Link} from '@reach/router'
import {Links} from '../../../constants/helpers'

import s from './footer.module.scss'
import {FACEBOOK, INSTAGRAM} from '../../../constants/likelocals-info'

interface IFooterItem {
    name?: string
    link: string
}

export type LinkType = keyof typeof Links

export const menuList: { [key in keyof typeof Links]: Array<IFooterItem> } = {
    traditionalCrafts: [
        {name: 'sculpture', link: '/traditional-handicrafts/qandakagvortsvouthyvoun'},
        {name: 'blackSmiting', link: '/traditional-handicrafts/darbnagvortsvouthyvoun'},
        {name: 'woodworking', link: '/traditional-handicrafts/phaytamshakvoum'},
        {name: 'carpetMaking', link: '/traditional-handicrafts/gvorgagvortsvouthyvoun'},
        {name: 'pottery', link: '/traditional-handicrafts/azgayin-erg-ev-par'},
        {name: 'nationalSongDance', link: '/traditional-handicrafts/azgayin-erg-ev-par'}
    ],
    culturalCustoms: [
        {name: 'distillationOfVodka', link: '/cultural-traditions/oghvou-thvorvoum'},
        {name: 'lambShearing', link: '/cultural-traditions/gar-khvouzel'},
        {name: 'mulberryShake', link: '/cultural-traditions/thvouth-thaph-tal'}
    ],
    services: [
        {name: 'liveLikeHim', link: '/services'},
        {name: 'craftLessons', link: '/services'},
        {name: 'courses', link: '/services'}
    ],
    beneficiary: [{link: '/beneficiaries'}],
    handmadeProducts: [{link: '/handmade-products'}],
    aboutUs: [{link: '/about-us'}]
}

interface IListItem {
    [key: string]: boolean
}

function ColOne(): JSX.Element {
    const {t} = useTranslation()
    const [isOpenList, setOpenList] = useState<IListItem>(() => {
        const initialState: IListItem = {}
        Object.keys(menuList).slice(0, 2)
            .forEach((el) => initialState[el] = false)
        return initialState
    })

    const handlerOpenList = (item: string) => setOpenList(prev => ({
        ...prev,
        [item]: !prev[item]
    }))

    return (
        <div>
            {Object.keys(menuList).slice(0, 2)
                .map((item: LinkType, index) => (
                        <div
                            className={`${s.itemList} ${item === 'culturalCustoms' && s.footerMargin}`}
                            key={index}
                        >
                            <Visible xs sm>
                                <h3 onClick={() => handlerOpenList(item)}>
                                    {t(item)}
                                </h3>
                                {
                                    isOpenList[item] &&
                                    <ul className={s.list}>
                                        {
                                            menuList[item]
                                                .map((el, indexEl) => (
                                                    <li className={s.item} key={indexEl}>
                                                        {t(el.name)}
                                                    </li>
                                                ))
                                        }
                                    </ul>
                                }
                            </Visible>
                            <Visible lg md xl xxl>
                                <h3 onClick={() => handlerOpenList(item)}>
                                    <Link to={`/${Links[item]}`}>
                                        {t(item)}
                                    </Link>
                                </h3>
                                <ul className={s.list}>
                                    {
                                        menuList[item]
                                            .map((el, indexEl) => (
                                                <li className={s.item} key={indexEl}>
                                                    <Link to={el.link}>
                                                        {t(el.name)}
                                                    </Link>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </Visible>
                        </div>
                    )
                )
            }
        </div>
    )
}

function ColTwo(): JSX.Element {
    const {t} = useTranslation()
    const [isOpenList, setOpenList] = useState<IListItem>(() => {
        const initialState: IListItem = {}
        Object.keys(menuList).slice(2, 6)
            .forEach(el => initialState[el] = false)
        return initialState
    })

    const handlerOpenList = (item: string) => setOpenList(prev => ({
        ...prev,
        [item]: !prev[item]
    }))

    return (
        <div>
            {Object.keys(menuList).slice(2, 6)
                .map((item: LinkType, index) => (
                    <div
                        className={`${s.itemList} ${item === 'beneficiary' && s.footerMargin}`}
                        key={index}
                    >
                        <Visible xs sm>
                            <h3 onClick={() => handlerOpenList(item)}>
                                {t(item)}
                            </h3>
                            {
                                isOpenList[item] &&
                                <ul className={s.list}>
                                    {
                                        menuList[item]
                                            .map((el, indexEl) => (
                                                <li className={s.item} key={indexEl}>
                                                    {t(el.name)}
                                                </li>
                                            ))
                                    }
                                </ul>
                            }
                        </Visible>
                        <Visible lg md xl xxl>
                            <h3 onClick={() => handlerOpenList(item)}>
                                <Link to={`/${Links[item]}`}>
                                    {t(item)}
                                </Link>
                            </h3>
                            <ul className={s.list}>
                                {
                                    menuList[item]
                                        .map((el, indexEl) => (
                                            <li className={s.item} key={indexEl}>
                                                <Link to={el.link}>
                                                    {t(el.name)}
                                                </Link>
                                            </li>
                                        ))
                                }
                            </ul>
                        </Visible>
                    </div>)
                )
            }
        </div>
    )
}

function ColThree(): JSX.Element {
    return (
        <div>
            <div className={s.aboutUsImage}>
                {/*<img src={AboutUsPhoto} alt="AboutUsPhoto"/>*/}
            </div>
        </div>
    )
}

const Footer = (): JSX.Element => {

    const {t} = useTranslation()
    const newDate = new Date()
    const year = newDate.getFullYear()

    return (
        <footer className={s.footer}>
            <CustomContainer>
                {/*<Visible xl xxl>*/}
                {/*    <Row className={s.footerList} justify={'between'}>*/}
                {/*        <ColOne/>*/}
                {/*        <ColTwo/>*/}
                {/*        <ColThree/>*/}
                {/*    </Row>*/}
                {/*</Visible>*/}
                {/*<Visible xs sm md lg>*/}
                {/*    <Row className={s.footerList} justify={'between'}>*/}
                {/*        <ColOne/>*/}
                {/*        <div className={s.twoColWrapper}>*/}
                {/*            <ColTwo/>*/}
                {/*            <ColThree/>*/}
                {/*        </div>*/}
                {/*    </Row>*/}
                {/*</Visible>*/}
                <Visible xs>
                    <div className={s.icons}>
                        <a href={FACEBOOK} target="_blank">
                            <i className={`facebookicon- ${s.facebook} `}/>
                        </a>
                        <a href={INSTAGRAM} target="_blank">
                            <i className={`instagramicon- ${s.instagram} `}/>
                        </a>
                    </div>
                </Visible>
            </CustomContainer>
            <hr className={s.border}/>
            <CustomContainer>
                <div className={s.socialMedia}>
                    <p className={s.copyright}>
                        Copyright {year}. <span className={s.logo}>KINOMINO</span> {t('allRightsReserved')}
                    </p>
                    <Visible sm md lg xl xxl>
                        <div className={s.icons}>
                            <a href={'/'
                            //    FACEBOOK
                            } target="_blank">
                                <i className={`facebookicon- ${s.facebook} `}/>
                            </a>
                            {/*<a href={INSTAGRAM} target="_blank">*/}
                            {/*    <i className={`instagramicon- ${s.instagram} `}/>*/}
                            {/*</a>*/}
                        </div>
                    </Visible>
                </div>
            </CustomContainer>
        </footer>
    )
}

export default Footer
