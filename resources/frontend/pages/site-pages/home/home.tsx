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
import Input from '../../../components/input/input'
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay])

interface IHome {
    path: string
}

const Home: React.FC<IHome> = () => {
    const {t} = useTranslation()
    const [activeItem, setActiveItem] = useState(null)
    const [count, setCount] = useState({
        from : 0,
        to :5
    })
    const [data, setData] = useState([])
    const titles: Array<ITitle> = [
        {name :'Id', show : true},
        {name: "client_id",show:true},
        {name: "driver_id",show:true},
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
               const homeData = await homeAPI.getHomePageData(1)
               setCount({from: homeData.users.current_page, to: homeData.users.current_page+5})
               setData(homeData.users.data)
               /////FIXME pagination functiononality 
             
               /// dispatch(actions.fetching(data))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

    const HandlerPagination = async (activeItem: number) => {
       const query =  localStorage.getItem('query')
        const homeData = await homeAPI.getHomePageData(activeItem+1,query ? query : '')
        setCount({from: homeData.users.current_page, to: homeData.users.current_page+5})
        setData(homeData.users.data)
       
        const role = localStorage.getItem('role');
        localStorage.setItem('page', activeItem.toString());

    }
    const HandlerGetData= (id: number) => navigate(`/admin/users-products/${id}`)


    ///FIXME  MISSING TYPE
    const onSerachInput = async (event:any) => {
        ////FIXME: its should be save in state 
        localStorage.setItem('query', event.target.value);
        const page = localStorage.getItem('page')
        const homeData = await homeAPI.getHomePageData(parseFloat(page)+1,event.target.value)
        setCount({from: homeData.users.current_page, to: homeData.users.current_page+5})
        setData(homeData.users.data)
       
    }
    return (data && <>
<Input name={'search'} type={'text'} onChange={onSerachInput}/>
       
            <CrudTable
                titles={titles} 
                data={data}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetData}
                activeItem={activeItem}
                
                count={count}
                className={'pagination'}
                paginated={true}
            />
       
    </>)
}
export default Home
