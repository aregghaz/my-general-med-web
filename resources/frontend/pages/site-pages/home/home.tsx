import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import SwiperCore, {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/home'
import {clientAction} from '../../../store/client'
import {getClientData, getHomePageData} from '../../../store/selectors'
import {homeAPI} from "../../../api/site-api/home-api";
import {Link, navigate} from '@reach/router'
import s from './home.module.scss'
import ModalItem from "../../../components/modal-item/modal-item";
import CrudTable from '../../../components/crud-table-user/crud-table'
import { ITitle } from '../../../types/home-types'
import Input from '../../../components/input/input'
import InfoBlock from '../../../components/info-block/info-block'
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

    
    ///const [data, setData] = useState([])
    const titles: Array<ITitle> = [


        // {name :'id', show : true},
        // {name: "car_id",show:true},
        // {name: "vendor_id",show:true},
        {name :'trip_id', show : true},
        {name :'name', show : true},
        {name :'surname', show : true},
        {name :'gender', show : true},
        {name :'los', show : true},
        {name :'phone_number', show : true},
        {name :'date_of_service', show : true},
        {name :'appointment_time', show : true},
        {name :'pick_up', show : true},
        {name :'drop_down', show : true},
        {name :'request_type', show : true},
        {name :'status', show : true},
        {name :'origin_name', show : true},
        {name :'origin_stree', show : true},
        {name :'origin_suite', show : true},
        {name :'origin_city', show : true},
        {name :'origin_state', show : true},
        {name :'origin_postal', show : true},
        {name :'origin_country', show : true},
        {name :'origin_phone', show : true},
        {name :'origin_comment', show : true},
        {name :'destination_name', show : true},
        {name :'destination_stree', show : true},
        {name :'destination_suite', show : true},
        {name :'destination_city', show : true},
        {name :'destination_state', show : true},
        {name :'destination_postal', show : true},
        {name :'destination_country', show : true},
        {name :'destination_phone', show : true},
        {name :'destination_comments', show : true},
        {name :'escortType', show : true},
        {name :'type_of_trip', show : true},
        {name :'miles', show : true},
        {name :'member_uniqie_identifer', show : true},
        {name :'birthday', show : true},
        
        // {name :'State', show : true},
      
    ]
    const homeData = useSelector(getHomePageData)
    const clientDataSelector = useSelector(getClientData);
    const dispatch = useDispatch()

    const {data} = homeData
    const {show, clientData} = clientDataSelector

const pagination= {from:0,to:0};
    const last_page =0;
    useEffect(() => {
        (
            async () => {
               const homeData = await homeAPI.getHomePageData(1)
               let homeApi ={
                // pagination : {from: homeData.users.current_page, to: homeData.users.current_page+5},
                // total: homeData.users.total,
                // last_page:homeData.users.last_page,
                data: homeData.users
               }
               dispatch(actions.fetching(homeApi))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])
    const defaultDat ={
        // client_id:0,
        // car_id:0,
        // vendor_id:0,
        trip_id:0,
        name:"",
        surname:'',
        gender:"",
        pick_up_address:"",
        los:"",
        phone_number:"",
        date_of_service:"",
        appointment_time:"",
        pick_up:"",
        drop_down:"",
        request_type: 0,
        status:0,
    
        origin_name:"",
        origin_street:"",
        origin_suite:"",
        origin_city:"",
        origin_state:"",
        origin_postal:"",
        origin_country:"",
        origin_phone:"",
        origin_comment:'',
        destination_name:'',
        destination_street:'',
        destination_suite:'',
        destination_city:'',
        destination_state:'',
        destination_postal:'',
        destination_country:'',
        destination_phone:'',
        destination_comment:'',
        escortType:0,
        type_of_trip:0,
        miles:0,
        member_uniqie_identifer:0,
        birthday:0
      
        
      
    }
    
    const HandlerPagination = async (activeItem: number) => {
        // let dataClient = {
        //     show:false,
        //     clientData :defaultDat
        // }

        // dispatch(clientAction.fetching(dataClient))
        const query =  localStorage.getItem('query')
        const homeData = await homeAPI.getHomePageData(activeItem+1,query ? query : '')
        /////FIXME pagination functiononality
        let homeApi ={
            pagination : {from: homeData.users.current_page, to: homeData.users.current_page+5},
            total: homeData.users.total,
            last_page:homeData.users.last_page,
            data: homeData.users.data,
           }
           dispatch(actions.fetching(homeApi))
            ////FIXME: its should be save in state
            const role = localStorage.getItem('role');
            localStorage.setItem('page', activeItem.toString());

    }
    const handlerGetclientData= (client: any) => {
        console.log(client,'client');

        let dataClient = {
            show:true,
            clientData :client
        }
        dispatch(clientAction.fetching(dataClient))

    }


    ///FIXME  MISSING TYPE
    const onSerachInput = async (event:any) => {
        ////FIXME: its should be save in state
        localStorage.setItem('query', event.target.value);
        const page = localStorage.getItem('page')
        const homeData = await homeAPI.getHomePageData(1,event.target.value)
       /////FIXME pagination functiononality
       let homeApi ={
        pagination : {from: homeData.users.current_page, to: homeData.users.current_page+5},
        total: homeData.users.total,
        current_page:  homeData.users.current_page,
        last_page:homeData.users.last_page,
        data: homeData.users.data
       }
       dispatch(actions.fetching(homeApi))
    }
    return (data && <>



   {/* {show&&
    //  <div >

    //     <InfoBlock  items={clientData}/>
              
    //  </div>
   } */}

    <div>
    <Input name={'search'} type={'text'} onChange={onSerachInput}/>
    </div>


            <CrudTable
                titles={titles}
                data={data}
                HandlerPagination={HandlerPagination}
                // HandlerGetProducts={HandlerGetData}
                handlerGetclientData={handlerGetclientData}
                activeItem={activeItem}
                last_page={last_page}
                count={pagination}
                className={'pagination'}
                paginated={true}
            />

    </>)
}
export default Home
