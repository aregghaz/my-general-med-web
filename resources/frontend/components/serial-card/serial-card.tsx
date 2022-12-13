import React, {useState} from 'react'
import {useNavigate} from '@reach/router'
import {useTranslation} from 'react-i18next'
import Duration from '-!svg-react-loader!../../svgs/duration.svg'
import Year from '-!svg-react-loader!../../svgs/year.svg'
import Genre from '-!svg-react-loader!../../svgs/genre.svg'
import s from './serial-card.module.scss'
import {ISerialCard} from "../../types/serial";
import Button from "../button/button";
import {Visible} from 'react-grid-system'

const SerialCard: React.FC<ISerialCard> = (
    {
        id,
        genre,
        year,
        duration,
        title,
        slug,
        home,
        image,
        crudKey,
        handlerLink,
        setSerialOpen
    }) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const [activeCard, setActiveCard] = useState(() => {
        const initialState: { [key: string]: boolean } = {}
        initialState[title] = false
        return initialState
    })

    const handlerCard = (title: string) => !(window.innerWidth > 1200) && setActiveCard({[title]: true})

    const handlerOpenLink = () => navigate(`/${crudKey}/${slug}`)

    return (
        <div className={s.carItem}>

            <div className={s.swiperCarouselItem}>
                <div className={`${activeCard[title] ? s.backDropActive : s.backdrop}`}
                     onClick={() => handlerCard(title)}
                >
                    <ul className={s.list}>
                        {genre ? <li><Genre className={s.cardIcon}/>{genre.slice(0, 10)}</li> : ''}
                        {duration ? (<li><Duration className={s.cardIcon}/>{duration} {t('hourly')}</li>) : ''}
                        {year ? (<li><Year className={s.cardIcon}/>{year}</li>) : ''}
                    </ul>

                    <div className={s.backdropBtnWrapper}>
                        <Button
                            type={'blank'}
                            className={s.backdropBtn}
                            onClick={() => home ? handlerLink(id, crudKey) : handlerOpenLink()}
                        >
                            {t('seeMore')}
                        </Button>
                    </div>

                </div>
                <div className={s.image}>
                    <img src={image} alt={title}/>
                </div>
                <Visible xl xxl>
                    <div className={s.title}>
                        <p>{title} </p>
                    </div>
                </Visible>
            </div>
        </div>
    )
}


export default SerialCard
