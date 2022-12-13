import React, {useEffect, useRef} from 'react'
import {Col, Row} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/moves'
import {useNavigate} from '@reach/router'
import {getHomePageData, getSerialsData} from '../../../store/selectors'
import SerialCard from "../../../components/serial-card/serial-card";
import {Link} from '@reach/router'

SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])
import s from './moves.module.scss'
import {movesAPI} from "../../../api/site-api/move-api";
import {useInView} from "react-intersection-observer";
import Select from "../../../components/select/select";
import Dropdown from "../../../components/dropdown/dropdown";
import {ISerialCard} from "../../../types/serial";
import Filter from "../../../components/filter/filter";

interface IMoves {
    path: string
}

const Moves: React.FC<IMoves> = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const SerialsData = useSelector(getSerialsData)
    const dispatch = useDispatch()
    const {data,category} = SerialsData
    const contentRef = useRef();
    const countRef = useRef(1);
    const [ref, inView] = useInView({
        threshold: 0
    });

    const  crudKey = 'films'

    useEffect(() => {
        (
            async () => {

                if (inView) {
                    const data = await movesAPI.getMovesData(crudKey, countRef.current)
                    dispatch(actions.fetching(data))
                    countRef.current++;
                }
            }
        )()
        /// return () => dispatch(actions.resetState())
    }, [inView])

    useEffect(() => {
        (
            async () => {
                const data = await movesAPI.getMovesData(crudKey, countRef.current)
                dispatch(actions.fetching(data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

    const handlerOnChange = () => {
    }

    return  (<>
        <Filter
            category={category}
            handlerOnChange={handlerOnChange}
        />
        <Row  ref={contentRef} className={s.contentRef}>
            {data.length !== 0 ?
                (data.map((item:ISerialCard, index:number) =>

                    <Col xs={12} sm={4} md={3} lg={3} xl={2} xxl={2} key={`${item.id}_${index}`}  >
                        <SerialCard
                            id={item.id}
                            title={item.title}
                            url={item.url}
                            image={item.image}
                            genre={item.genre}
                            year={item.year}
                            duration={item.duration}
                            crudKey={crudKey}
                            slug={item.slug}
                            home={false}
                        />
                    </Col>
                )): (
                <p>{t("not_found_moves")}</p>
                )
            }
        </Row>
            <div className={s.detector} ref={ref}/>

    </>)

}


export default Moves
