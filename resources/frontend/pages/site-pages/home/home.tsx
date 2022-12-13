import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/home'
import {getHomePageData} from '../../../store/selectors'
import {homeAPI} from "../../../api/site-api/home-api";
import SerialCard from "../../../components/serial-card/serial-card";
import {Link} from '@reach/router'
import s from './home.module.scss'
import {ISerialCard} from "../../../types/serial";
import {movesAPI} from "../../../api/site-api/move-api";
import ModalItem from "../../../components/modal-item/modal-item";
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

interface IHome {
    path: string
}

const Home: React.FC<IHome> = () => {
    const {t} = useTranslation()

    const [singleSerialItem, setSingleSerialItem] = useState(null)

    const [singleMovesItem, setSingleMovesItem] = useState(null)

    const [openSerialModal, setSerialOpen] = useState(false)

    const [openMovesModal, setMovesOpen] = useState(false)

    const homeData = useSelector(getHomePageData)

    const dispatch = useDispatch()

    const {serials, moves} = homeData

    useEffect(() => {
        (
            async () => {
                const data = await homeAPI.getHomePageData()
                dispatch(actions.fetching(data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

    const handlerLink = (id: number, crudKey: string) => {
        movesAPI.getSingleDataById(crudKey, id).then(response => {
            if(crudKey == 'serials'){
                setSingleSerialItem(response.data)
                setSerialOpen(true)
                setMovesOpen(false)
                document.getElementById('modalItemSerials').scrollIntoView();
            }else{
                setSingleMovesItem(response.data)
                setMovesOpen(true)
                setSerialOpen(false)
                document.getElementById('modalItemMovies').scrollIntoView();


            ///    window.scrollTo({top: 1000, behavior: 'smooth'})
            }
        })
    }

    return (<>

        <h2 className={s.headerNew}>
            {t('seeSerials')} <Link className={s.seeAll} to={'/all/serials'}>{t('seeAll')}</Link>
        </h2>
        <Row className={s.imageGroup}>
            {
                serials.map((item: ISerialCard, index: number) =>
                    <Col xs={12} sm={4} md={3} lg={3} xl={2} xxl={2} key={`${item.id}_${index}`}>
                        <SerialCard
                            id={item.id}
                            title={item.title}
                            url={item.url}
                            image={item.image}
                            genre={item.genre}
                            year={item.year}
                            slug={item.slug}
                            duration={item.duration}
                            crudKey={'serials'}
                            handlerLink={handlerLink}
                            home={true}
                        />
                    </Col>
                )
            }
        </Row>
        {
            openSerialModal && singleSerialItem &&
           <div id='modalItemSerials'>
               <ModalItem
                   id={singleSerialItem.id}
                   title={singleSerialItem.title}
                   url={singleSerialItem.url}
                   image={singleSerialItem.image}
                   genre={singleSerialItem.genre}
                   year={singleSerialItem.year}
                   duration={singleSerialItem.duration}
                   quality={singleSerialItem.quality}
                   rating={singleSerialItem.rating}
                   translation={singleSerialItem.translation}
                   description={singleSerialItem.description}
                   country={singleSerialItem.country}
                   setSerialOpen={setSerialOpen}
                   serial={true}
               />
           </div>
        }
        <h2 className={s.headerNew}>
            {t('seeMoves')} <Link className={s.seeAll} to={'/all/films'}>{t('seeAll')}</Link>
        </h2>
        <Row className={s.imageGroup}>
            {
                moves.map((item: ISerialCard, index: number) =>
                    <Col xs={12} sm={4} md={3} lg={3} xl={2} xxl={2} key={`${item.id}_${index}`}>
                        <SerialCard
                            id={item.id}
                            title={item.title}
                            url={item.url}
                            image={item.image}
                            genre={item.genre}
                            year={item.year}
                            slug={item.slug}
                            duration={item.duration}
                            crudKey={'films'}
                            home={true}
                            handlerLink={handlerLink}
                        />
                    </Col>
                )
            }
        </Row>
        {
            openMovesModal && singleMovesItem &&
            <div id={'modalItemMovies'}>
                <ModalItem
                    id={singleMovesItem.id}
                    title={singleMovesItem.title}
                    url={singleMovesItem.url}
                    image={singleMovesItem.image}
                    genre={singleMovesItem.genre}
                    year={singleMovesItem.year}
                    duration={singleMovesItem.duration}
                    quality={singleMovesItem.quality}
                    rating={singleMovesItem.rating}
                    translation={singleMovesItem.translation}
                    description={singleMovesItem.description}
                    country={singleMovesItem.country}
                    setMovesOpen={setMovesOpen}
                    serial={false}
                />
            </div>
        }
    </>)
}
export default Home
