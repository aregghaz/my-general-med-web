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
import Button from '../../../components/button/button'
import ColumnsHideShow from '../../../components/columns-hide-show/columns-hide-show'
import ColumnSvg from '-!svg-react-loader!../../../images/column.svg'
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
    const titles: Array<string> = [

        "client_id",
        'car_id',
        'vendor_id',    
        'trip_id',
        'name',
        'surname',
        'gender',
        'los',
        'phone_number',
        'date_of_service',
        'appointment_time',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status',///seect
        // 'origin_id',
        // "destination_id",
        "origin_name",
        "origin_stree",
        "origin_suite",
        "origin_city",
        "origin_state",
        "origin_postal",
        "origin_country",
        "origin_phone",
        "origin_comment",
        "destination_name",
        "destination_stree",
        "destination_suite",
        "destination_city",
        "destination_state",
        "destination_postal",
        "destination_country",
        "destination_phone",
        "destination_comments",
        
        'escortType',//select
        'type_of_trip',//select
        'miles',
        'member_uniqie_identifer',
        'birthday',
        // {name :'id', show : true},
        // {name: "car_id",show:true},
        // {name: "vendor_id",show:true},
        
        // {name :'State', show : true},
      
    ]
    const homeData = useSelector(getHomePageData)
    const clientDataSelector = useSelector(getClientData);
    const dispatch = useDispatch()

    const {data} = clientDataSelector
    const { titlesData} = homeData

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
                show:20,
                data: homeData.users
               }
               dispatch(actions.setTitles({titles:titles}))
               dispatch(clientAction.fetching(homeApi))
            }
        )()
        return () => dispatch(clientAction.resetState())
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
            show:10,
            data: homeData.users.data,
           }
           dispatch(clientAction.fetching(homeApi))
            ////FIXME: its should be save in state
            const role = localStorage.getItem('role');
            localStorage.setItem('page', activeItem.toString());

    }
    const handlerGetclientData= (client: any) => {
        console.log(client,'client');

        let dataClient = {
            show:10,
            data :client
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
        show:5,
        data: homeData.users.data
       }
       dispatch(clientAction.fetching(homeApi))
    }
    const [show, setShow] = useState(false)
    const filterColumns = () => {
        setShow(!show)
        console.log(show)
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
    <div className={s.iconBlock}>
                            <Button type={'blank'}>
                                <span className={s.icon} onClick={filterColumns}>
                                    dddddd
                                   <ColumnSvg/>
                                </span>
                            </Button>
                            <ColumnsHideShow show={show}/>
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
