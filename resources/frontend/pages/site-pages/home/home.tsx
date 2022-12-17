import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/home'
import {getHomePageData} from '../../../store/selectors'
import {homeAPI} from "../../../api/site-api/home-api";
import {Link, navigate} from '@reach/router'
import s from './home.module.scss'
import ModalItem from "../../../components/modal-item/modal-item";
import CrudTable from '../../../components/crud-table-user/crud-table'
import { ITitle } from '../../../types/home-types'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

interface IHome {
    path: string
}

const Home: React.FC<IHome> = () => {
    const {t} = useTranslation()
    const [activeItem, setActiveItem] = useState(null)
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const titles: Array<ITitle> = [
        {name :'Id', show : true},
        {name :'FullName', show : true},
        {name :'Pick up addrees', show : true},
        {name :'Drop down addrees', show : true},
        {name :'Apartament number', show : true},
        {name :'State', show : true},
        {name :'CCN', show : true},
        {name :'id number', show : true},
        {name :'Birthday', show : true},
     
      
    ]
    const homeData = useSelector(getHomePageData)

    const dispatch = useDispatch()

    const {serials, moves} = homeData



    useEffect(() => {
        (
            async () => {
               const homeData = await homeAPI.getHomePageData()
               setData(homeData.users)
               setCount(homeData.count)
               /// dispatch(actions.fetching(data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

    const HandlerPagination = (activeItem: number) => {
        const role = localStorage.getItem('role');
        localStorage.setItem('page', activeItem.toString());

    }
    const HandlerGetData= (id: number) => navigate(`/admin/users-products/${id}`)

    return (data && <>

       
            <CrudTable
                titles={titles}
                data={data}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetData}
                activeItem={activeItem}
                
                count={count/20}
                className={'pagination'}
                paginated={true}
            />
       
    </>)
}
export default Home
