import React, {useState} from 'react'
import {useNavigate, useLocation} from '@reach/router'
import {useTranslation} from 'react-i18next'
import Duration from '-!svg-react-loader!../../svgs/duration.svg'
import Year from '-!svg-react-loader!../../svgs/year.svg'
import Genre from '-!svg-react-loader!../../svgs/genre.svg'
import s from './serial-card.module.scss'
import {ISerialCard} from "../../types/serial";
import Button from "../button/button";


const SerialCard: React.FC<ISerialCard> = (
    {
        id,
        genre,
        year,
        duration,
        title,
        slug,
        image,
    }) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const [activeCard, setActiveCard] = useState(() => {
        const initialState: { [key: string]: boolean } = {}
        initialState[title] = false
        return initialState
    })
    const handlerCard = (title: string) => !(window.innerWidth > 1200) && setActiveCard({[title]: true})

    const handlerLink = (slug: string) => navigate(`/traditional-handicrafts/${slug}`)

    // const handlerCard = () => navigate(`${location.pathname}`)

    return (
        <div className={s.carItem}>

            <div className={s.swiperCarouselItem}>
                <div className={`${activeCard[title] ? s.backDropActive : s.backdrop}`}
                     onClick={() => handlerCard(title)}
                >
                    <ul className={s.list}>
                        <li><Genre className={s.cardIcon}/>{genre}</li>
                        {duration ? (<li><Duration className={s.cardIcon}/>{duration} {t('minute')}</li>) : ''}
                        {year ? (<li><Year className={s.cardIcon}/>{year}</li>) : ''}
                    </ul>

                    <div className={s.backdropBtnWrapper}>
                        <Button
                            type={'blank'}
                            className={s.backdropBtn}
                            onClick={() => handlerLink(title)}
                        >

                            {t('seeMore')}
                        </Button>
                    </div>

                </div>
                <div className={s.image}>
                    <img src={image} alt={title}/>
                </div>

                <div className={s.title}>
                    <h5>{title} </h5>
                </div>
            </div>
        </div>
    )
}


export default SerialCard
