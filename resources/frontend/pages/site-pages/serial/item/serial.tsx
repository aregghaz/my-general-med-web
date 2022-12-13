import React, {useEffect, useState} from 'react'
import {Col, Row, Visible} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../../store/item'
import {getItemData, getSerialsData} from '../../../../store/selectors'
import Iframe from 'react-iframe'
import s from './serial.module.scss'
import {movesAPI} from "../../../../api/site-api/move-api";
import Duration from '-!svg-react-loader!../../../../svgs/duration.svg'
import Year from '-!svg-react-loader!../../../../svgs/year.svg'
import Genre from '-!svg-react-loader!../../../../svgs/genre.svg'
import Flag from '-!svg-react-loader!../../../../svgs/flag.svg'

SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

interface IMoves {
    path: string
    slug?: string
}

const SerialItem: React.FC<IMoves> = ({slug}) => {
    const {t} = useTranslation()
    const ItemData = useSelector(getItemData)
    const dispatch = useDispatch()
    const crudKey = 'serials'

    const {
        id,
        genre,
        year,
        duration,
        title,
        url,
        quality,
        director,
        rating,
        description,
        country,
        kinopoisk_id,
        image,
    } = ItemData
    useEffect(() => {
        (
            async () => {
                const data = await movesAPI.getSingleData(crudKey, slug)
                dispatch(actions.fetching(data.data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [slug])

    return image && (<>
        <Row className={s.infoDiv}>
            <Col xs={4} sm={4} md={4} lg={5} xl={3} xxl={3}>
                <div className={s.image}>
                    <img src={image} alt={title}/>
                </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={7} xl={9} xxl={9}>
                <span className={s.quality}>{quality}</span>
                <ul className={s.list}>
                    <li className={s.title}><h1>{title}</h1></li>
                    <li className={s.info}><Genre className={s.cardIcon}/><span>{genre}</span></li>
                    <li className={s.info}><Year className={s.cardIcon}/><span>{year}</span></li>
                    <li className={s.info}><Duration className={s.cardIcon}/><span>{duration} {t('hourly')}</span></li>
                    <li className={s.info}><span><Flag className={s.cardIcon}/>{country}</span></li>
                    <li className={s.info}><span>{director}</span></li>
                    <li className={s.info}>
                        <span>
                                <div className={s.partnerRating}>
                                                {
                                                    new Array(10).fill(0)
                                                        .map((_, i) => (
                                                            i < rating ?
                                                                <i key={i}
                                                                   className={`staricon- ${s.star}`}/>
                                                                :
                                                                <i key={i}
                                                                   className={`star-emptyicon- ${s.star}`}/>
                                                        ))
                                                }
                                    </div>
                        </span>
                    </li>
                    <li className={s.description}><span>{description}</span></li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Iframe url={url}
                        id="myId"
                        className={s.iframe}
                        allow="fullscreen"
                        position="relative"/>
            </Col>
        </Row>
    </>)
}
export default SerialItem
