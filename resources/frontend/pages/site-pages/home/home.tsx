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
        {name :'id', show : true},
        {name: "client_id",show:true},
        {name: "driver_id",show:true},
        {name :'name', show : true},
        {name :'surname', show : true},
        {name :'email', show : true},
        {name :'pick_up_address', show : true},
        {name :'drop_down_address', show : true},
        {name :'apartament_number', show : true},
        // {name :'State', show : true},
        {name :'ccn', show : true},
        {name :'drop_down', show : true},
        {name :'pick_up', show : true},
        {name :'id_number', show : true},
        {name :'birthday', show : true},
    ]
    const homeData = useSelector(getHomePageData)
    const clientDataSelector = useSelector(getClientData);
    const dispatch = useDispatch()

    const {data,pagination,last_page} = homeData
    const {show, clientData} = clientDataSelector


    useEffect(() => {
        (
            async () => {
               const homeData = await homeAPI.getHomePageData(1)
               let homeApi ={
                pagination : {from: homeData.users.current_page, to: homeData.users.current_page+5},
                total: homeData.users.total,
                last_page:homeData.users.last_page,
                data: homeData.users.data
               }
               dispatch(actions.fetching(homeApi))
            }
        )()
        return () => dispatch(actions.resetState())
    }, [])

    const HandlerPagination = async (activeItem: number) => {
        let dataClient = {
            show:false,
            clientData :{
                id : 0,
                client_id:0,
                driver_id:0,
                surname:"string",
                name:"",
                drop_down_address:"",
                pick_up_address:"",
                apartament_number:"",
                birthday:"",
                email:"",
                id_number:0,
                phone_number:"",
                status:0,
                ccn: 0,
                pick_up:'',
                drop_down:'',
            }
        }

        dispatch(clientAction.fetching(dataClient))
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
        last_page:homeData.users.last_page,
        data: homeData.users.data
       }
       dispatch(actions.fetching(homeApi))
    }
    return (data && <>



   {show&&
     <div >

        <InfoBlock  items={clientData}/>
              
     </div>
   }

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
