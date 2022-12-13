import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import Button from '../button/button'
import Dropdown from '../dropdown/dropdown'
import Logout from '-!svg-react-loader!../../images/logout.svg'
import {useTranslation} from 'react-i18next'
import {Link, useNavigate} from '@reach/router'
import s from './drawer.module.scss'
import {setLogOut} from "../../store/auth";
import {homeAPI} from "../../api/site-api/home-api";
import {Col, Visible} from 'react-grid-system'
import {ISerialCard} from "../../types/serial";
import {Swiper, SwiperSlide} from 'swiper/react'
import HeaderIcons from "../header-icons/header-icons";

interface IPopularSlider {
    serials: Array<ISerialCard>
    slidesPerView: number
}


function HomeSlider({serials, slidesPerView}: IPopularSlider): JSX.Element {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [activeCard, setActiveCard] = useState(() => {
        const initialState: { [key: string]: boolean } = {}
        serials.forEach(el => initialState[el.title] = false)
        return initialState
    })
    const handlerCard = (title: string) => !(window.innerWidth > 1200) && setActiveCard({[title]: true})

    const handlerLink = (slug: string) => navigate(`/serials/${slug}`)


    return (
        <Swiper
            navigation={{
                nextEl: `.${s.swiperButtonNextTraditionalCrafts}`,
                prevEl: `.${s.swiperButtonPrevTraditionalCrafts}`
            }}
            pagination={{clickable: true, el: `.${s.paginationTraditionalCraftSlider}`}}
            slidesPerView={slidesPerView}
            spaceBetween={5}
            updateOnWindowResize={false}
        >
            {
                serials
                    .map((el, index) => (
                            <SwiperSlide key={index} className={s.swiperCarouselItem}>
                                <div className={`${activeCard[el.title] ? s.backDropActive : s.backdrop}`}
                                     onClick={() => handlerCard(el.title)}
                                >
                                    <h5>{t(el.title)}</h5>
                                    <div className={s.backdropBtnWrapper}>
                                        <Button
                                            type={'blank'}
                                            className={s.backdropBtn}
                                            onClick={() => handlerLink(el.slug)}
                                        >
                                            {t('seeMore')}
                                        </Button>
                                    </div>
                                </div>
                                <img
                                    className={s.swiperCarouselImage}
                                    src={el.image} alt={`${el.title}`}
                                />
                            </SwiperSlide>
                        )
                    )
            }


        </Swiper>
    )
}

interface ICategory {
    slug: string,
    name: string,
}

const Drawer: React.FC = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isUserTooltip, setUserTooltip] = useState<boolean>(false)

    const [isLanguagePicker, setLanguagePicker] = useState<boolean>(false)
    const [homeData, setHomeData] = useState(null)
    const handlerLogOut = () => dispatch(setLogOut());
    const handlerCloseLanguagePicker = () => setLanguagePicker(false)
    const handlerLanguagePicker = () => setLanguagePicker(!isLanguagePicker)
    const handlerUserIcon = () => setUserTooltip(!isUserTooltip)
    const handlerCloseIcon = () => setUserTooltip(false)

    useEffect(() => {
        (
            async () => {
                const data = await homeAPI.getHomeMenuData()
                setHomeData(data)
            }
        )()
    }, [])
    return homeData && (
        <>
            <nav className={s.headerNav}>
                <div className={s.icons}>
                    <div key={'home'} className={s.iconBlock}>

                               <Link
                                   className={`${s.logo} ${s.link}`}
                               to={'/'}>
                                   KINOMINO
                               </Link>

                    </div>
                </div>
                <div className={`${s.icons} ${s.end}`}>
                    <HeaderIcons
                        handlerCloseLanguagePicker={handlerCloseLanguagePicker}
                        handlerLanguagePicker={handlerLanguagePicker}
                        isLanguagePicker={isLanguagePicker}
                        handlerCloseIcon={handlerCloseIcon}
                        handlerUserIcon={handlerUserIcon}
                        isUserTooltip={isUserTooltip}
                    />
                </div>

            </nav>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.sliderDiv}>
                <div className={s.swiperCarousel}>
                    <Visible xl xxl>
                    
                    </Visible>
                    <Visible md lg>
                    
                    </Visible>
                    <Visible xs sm>
                     
                    </Visible>
                </div>
            </Col>

        </>
    )
}

export default Drawer
