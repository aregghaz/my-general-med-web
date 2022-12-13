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
              ///  const data = await homeAPI.getHomePageData()
               /// dispatch(actions.fetching(data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

   

    return (<>

        {/* <h2 className={s.headerNew}>
            {t('seeSerials')} <Link className={s.seeAll} to={'/all/serials'}>{t('seeAll')}</Link>
        </h2> */}
        <Row className={s.imageGroup}>
           
        </Row>
      
        {/* <h2 className={s.headerNew}>
            {t('seeMoves')} <Link className={s.seeAll} to={'/all/films'}>{t('seeAll')}</Link>
        </h2> */}
        <Row className={s.imageGroup}>
         
        </Row>
       
    </>)
}
export default Home
