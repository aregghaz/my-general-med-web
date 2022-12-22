import React, {useEffect, useState,useRef} from 'react'
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
import Select, { IOption } from '../../../components/select/select'
import { useInView } from 'react-intersection-observer'

interface IHome {
    path: string
}

const Home: React.FC<IHome> = () => {
    const {t} = useTranslation()
    const [activeItem, setActiveItem] = useState(null)
    const [defaultData, setDefaultData] = useState([])
    const [ref, inView] = useInView({
        threshold: 0,
      });
    const contentRef = useRef();
    const countRef = useRef(1);
    ///const [data, setData] = useState([])
    const titlesDef: Array<string> = [

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
    ]
 
    const homeData = useSelector(getHomePageData)
    const clientDataSelector = useSelector(getClientData);
    const dispatch = useDispatch()

    const {data} = clientDataSelector
    const { titlesData,titles,selectedTitle,clients} = homeData

const pagination= {from:0,to:0};


const defaultFieldAction = () =>{
    titlesDef && titlesDef.forEach((item:string,index:number) => {
        setDefaultData((state)=>{
            return [
                ...state,
                {id: index,
                    value: item,
                    label: item,
                    slug: item
                }
            ];
        })
    })
}
console.log(countRef.current,'22222222');

    const last_page =0;
    useEffect(() => {
        (
            async () => {
                await defaultFieldAction();
                const homeData = await homeAPI.getHomePageData(1)
                await dispatch(actions.setTitles({
                    selectedTitle: homeData.titles,
                    clients: homeData.clients,
                    titles: titles
                }))
                console.log(countRef.current,'11111111111');
                
             ///await  dispatch(clientAction.fetching(homeApi))
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

    useEffect(() => {
        (async () => {
          if (inView) {
            const homeData= await homeAPI.getClientData({titles:titles,showMore:countRef.current})
            dispatch(actions.setTitles({
                selectedTitle: homeData.title,
                clients: homeData.clients,
                titles: titles
            }))
            countRef.current++;
            console.log(countRef.current,'countRef.currentcountRef.currentcountRef.current');
            
          }
        })();
        ///return () => dispatch(actions.resetState())
      }, [inView]);
    ///FIXME  MISSING TYPE
    const onSerachInput = async (event:any) => {
        ////FIXME: its should be save in state
        localStorage.setItem('query', event);
        const page = localStorage.getItem('page')
        const homeData = await homeAPI.getHomePageData(1,event.target.value)
       /////FIXME pagination functiononality
       let homeApi ={
        show:5,
        data: homeData.users.data
       }
       dispatch(clientAction.fetching(homeApi))
    }

    const changeFields = async (options:Array<IOption>) => {
            const homeData= await homeAPI.getClientData({titles:options,showMore:countRef.current})
                dispatch(actions.setTitles({
                    selectedTitle: homeData.title,
                    clients: homeData.clients,
                    titles: options
                }))
        }

    return (clients   && titlesData &&<>
   {/* {show&&
    //  <div >

    //     <InfoBlock  items={clientData}/>
              
    //  </div>
   } */}

    <div>
    <Input name={'search'} type={'text'} onChange={onSerachInput}/>
    </div>
    <div className={s.iconBlock}>
        <Select  
  ///  isSearchable?: boolean
        placeholder={'sssss'}
        options={defaultData}
          onChange={(options:Array<IOption>)=>{
            changeFields(options);
          }}
          //placeholder={'aaaa'}
        getOptionValue={(option: IOption) =>  option.value}
        getOptionLabel={(option: IOption) => option.label}
   ///</IOption> getOptionLabel: (option: IOption) => string
 ///   getOptionValue: (option: IOption) => string
 ///   value?: Array<IOption> | IOption
    name={'filtre'}
   ///</IOption> label?: string
    isMulti={true}
   //</> authCheckboxLabelStyle?: string
    ///labelStyle?: string
    //handlerMenuOpen?: () => void
    ///handlerMenuClose?: () => void
    ///hideSelectedOptions?: boolean
    ///isMenuAdd?: boolean,
    ///handlerAdd?: () => void 
    
    
    />
</div>

            <CrudTable
                titles={titlesData}
                data={clients}
                ref={ref}
                countRef={contentRef}
                HandlerPagination={HandlerPagination}
                // HandlerGetProducts={HandlerGetData}
                handlerGetclientData={handlerGetclientData}
                activeItem={activeItem}
                last_page={5}
                count={pagination}
                className={'pagination'}
                paginated={false}
            />
 <div className={s.detector} ref={ref} />
    </>)
}
export default Home
