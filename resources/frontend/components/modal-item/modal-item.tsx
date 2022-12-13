import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Row, Col, Visible} from 'react-grid-system'
import Duration from '-!svg-react-loader!../../svgs/duration.svg'
import Year from '-!svg-react-loader!../../svgs/year.svg'
import Genre from '-!svg-react-loader!../../svgs/genre.svg'
import s from './madal-item.module.scss'
import {IModalCard} from "../../types/serial";
import Iframe from 'react-iframe'
import Flag from '-!svg-react-loader!../../svgs/flag.svg'
import Button from "../button/button";

const ModalItem: React.FC<IModalCard> = (
    {
        id,
        genre,
        year,
        duration,
        title,
        slug,
        quality,
        director,
        rating,
        description,
        url,
        country,
        image,
        setSerialOpen,
        setMovesOpen,
        serial,
    }) => {
    const {t} = useTranslation()

    return (
        image && <>
            <Row className={s.infoDiv}>
                <Col xs={4} sm={4} md={3} lg={3} xl={3} xxl={3} className={s.noPadding}>
                    <img className={s.image} src={image} alt={title}/>
                </Col>
                <Col xs={8} sm={8} md={9} lg={9} xl={9} xxl={9}>
                    <div>
                        <Button
                        type={'blank'}
                        className={s.backdropBtn}
                        onClick={() => setSerialOpen(false)}
                    >
                            <i className={`cancelicon- ${s.cancelIcon} `}
                               onClick={() => serial ? setSerialOpen(false): setMovesOpen(false)} />

                    </Button>
                    </div>
                    <ul className={s.list}>
                        <li className={s.title}><h1>{title}</h1></li>
                        <li className={s.info}><Genre className={s.cardIcon}/><span> {genre}</span></li>
                        <li className={s.info}><Year className={s.cardIcon}/><span> {year}</span></li>
                        <li className={s.info}><Duration className={s.cardIcon}/><span> {duration} {t('hourly')}</span></li>
                        <li className={s.info}><span><Flag className={s.cardIcon}/> {country}</span></li>
                        <li className={s.info}><span>{director}</span></li>
                        <li className={s.quality}><span>{quality}</span></li>
                        <Visible xl xxl>
                            <li className={s.info}>
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
                            </li>
                            <br/>
                            <li className={s.description}><span>{description}</span></li>
                        </Visible>
                    </ul>
                </Col>
            </Row>
            <Row className={s.infoDiv}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.noPadding}>
                    <Iframe url={url}
                            className={s.iframe}
                            allow="fullscreen"
                            position="relative"/>

                </Col>
            </Row>
        </>
    )
}


export default ModalItem
