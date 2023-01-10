import React, {useEffect, useState, useRef} from 'react'
import {Col, Row} from 'react-grid-system'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/home'
import {clientAction} from '../../../store/client'
import {getClientData, getHomePageData} from '../../../store/selectors'
import {homeAPI} from "../../../api/site-api/home-api";
import s from './home.module.scss'
import CrudTable from '../../../components/crud-table-user/crud-table'
import Input from '../../../components/input/input'
import Select, {IOption} from '../../../components/select/select'
import {useInView} from 'react-intersection-observer'
import InfoBlock from '../../../components/info-block/info-block'
import Upload from '-!svg-react-loader!../../../images/Upload.svg'
import Import from '-!svg-react-loader!../../../images/Import.svg'
import Search from '-!svg-react-loader!../../../images/Search.svg'
import Close from '-!svg-react-loader!../../../images/Close.svg'
import axios from 'axios'
import BackDropSearch from '../../../components/backdrop-search/backdrop-search'
import Button from "../../../components/button/button";
import {DirectionsRenderer, GoogleMap, Marker, useJsApiLoader, Autocomplete,} from '@react-google-maps/api'
import Modal from 'react-modal'

const center = {lat: 48.8584, lng: 2.2945}

interface IHome {
    path: string
}

const customStyles: ReactModal.Styles = {
    content: {
        position: 'fixed',
        border: 'none',
        overflowY: 'unset',
        outline: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',

        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '600px'
    },
    overlay: {
        zIndex: 400,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(5px)'
    }
}

const Home: React.FC<IHome> = () => {
    const [defaultData, setDefaultData] = useState([])
    const [show, setShow] = useState(false)
    const [loadFile, setLoadFile] = useState<any>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [query, setQuery] = useState('')
    const [ids, setIds] = useState([])
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [typeId, setTypeId] = useState<number>(1)
    const [steps, setSteps] = useState<Array<any>>([])
    const [searching, setSearching] = useState(false)
    const [ref, inView] = useInView({
        threshold: 1,
    });
    const [isBackDropSearch, setBackdropSearch] = useState<boolean>(false)
    const handlerCloseBackDropSearch = () => setBackdropSearch(false)
    const contentRef = useRef();
    const countRef = useRef(2);
    ///const [data, setData] = useState([])
    const homeData = useSelector(getHomePageData)
    const clientData = useSelector(getClientData)
    const dispatch = useDispatch()

    const {selectedTitle, titles: allTiles, clients, tripCount, availableCount} = homeData
    const {clientById} = clientData


    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBKkr76ZgeVEhZLj-ZT5u8XQBbT4SUQI5E',
        libraries: ['geometry', 'drawing', 'places'],
    })
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function calculateRoute(newData: any) {
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: newData.origin.city + ' ' + newData.origin.street + ' ' + newData.origin.suite,
            destination: newData.destination.city + ' ' + newData.destination.street + ' ' + newData.destination.suite,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setSteps(results.routes[0].legs[0].steps)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setSteps([])

    }

    const tabs = [
        {
            id: 1,
            name: "Trips",
            count: tripCount
        },
        {
            id: 4,
            name: "Close Outs",
            // count:45
        },
        // {
        //     id: 3,
        //     name: "Download History",
        //     //count:38
        // },
        {
            id: 2,
            name: "Available Trips",
            count: availableCount
        },
    ]
    const titlesDef: Array<string> = [
        'id',
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
        'status', ///seect
        'origin_name',
        'origin_street',
        'origin_suite',
        'origin_city',
        'origin_state',
        'origin_postal',
        'origin_country',
        'origin_phone',
        'origin_comment',
        'destination_name',
        'destination_street',
        'destination_suite',
        'destination_city',
        'destination_state',
        'destination_postal',
        'destination_country',
        'destination_phone',
        'destination_comments',
        'escortType', //select
        'type_of_trip', //select
        'miles',
        'member_uniqie_identifer',
        'birthday'
    ]

    ////FIXME FIX DYNAMIC TABLE FIRELDS
    const [titles, setTitles] = useState<Array<string>>(titlesDef)

    const openSearch = () => {
        setOpen(!open)
    }


    useEffect(() => {
        (
            async () => {
                const titlesData = localStorage.getItem('titles')
                if (titles.length > 0) {
                    const homeData = await homeAPI.getClientData({
                        titles: JSON.parse(titlesData),
                        showMore: countRef.current,
                        typeId: typeId
                    })
                    setDefaultData(homeData.titles)
                    dispatch(actions.setTitles({
                        titles: homeData.titles,
                        selectedTitle: homeData.selectedFields,
                        clients: homeData.clients,
                        tripCount: homeData.tripCount,
                        availableCount: homeData.availableCount
                    }))
                }
            }
        )()
        /*FIXME commented this part avoiding unmount async error*/
        // return async () => await dispatch(actions.resetState())
        return () => {
            dispatch(actions.resetState())
            homeAPI.cancelRequest()
        }
    }, [])

    const handlerGetClientData = async (event: any, id: number) => {
        if (event.ctrlKey || event.shiftKey) {
            setIds((state) => {
                return [
                    ...state,
                    id
                ]
            })
            console.debug("Ctrl+click has just happened!", id);
        } else {
            const homeData = await homeAPI.getCLientById(id)
            dispatch(clientAction.fetching({clientById: homeData.client}))
            setShow(true)
        }

    }


    useEffect(() => {
        (async () => {
            if ((inView || loading) && !open) {
                let result = selectedTitle.map(a => a.slug);
                if (result.length > 0) {
                    ///localStorage.result('titles',JSON.stringify(titles))

                    const homeData = await homeAPI.getClientData({
                        titles: result,
                        showMore: countRef.current,
                        typeId: typeId
                    })
                    setDefaultData(homeData.titles)
                    dispatch(actions.setTitles({
                        titles: homeData.titles,
                        selectedTitle: homeData.selectedFields,
                        clients: homeData.clients,
                        tripCount: homeData.tripCount,
                        availableCount: homeData.availableCount
                    }))
                    countRef.current++;
                    setLoading(false)
                }

            }
        })();
    }, [inView, loading]);
    ///FIXME  MISSING TYPE

    const onSerachInput = async (event: { search: string }) => {
        console.log(event, 'search');

        if (titlesDef.length > 0) {
            const homeData = await homeAPI.getClientData({
                titles: titlesDef,
                showMore: countRef.current,
                queryData: event.search,
                typeId: typeId
            })
            setDefaultData(homeData.titles)
            setSearching(true)
            dispatch(actions.setTitles({
                titles: homeData.titles,
                selectedTitle: homeData.selectedFields,
                clients: homeData.clients,
                tripCount: homeData.tripCount,
                availableCount: homeData.availableCount
            }))
        }
    }

    const changeFields = async (options: Array<IOption>) => {
        let result = options.map(a => a.slug);
        let selectedTitleSlug = selectedTitle.map(a => a.slug);
        if (result.length > 0) {

            setTitles(result)
            setLoading(true)
        }

    }

    const fileUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const validValues = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if (e.target.files) {
            if (validValues.includes(e.target.files[0].type)) {
                setLoadFile(e.target.files[0])
                const data = new FormData()
                data.append('file', e.target.files[0])
                await axios.post("/api/test", data)
                setLoading(true)
            } else {
                setErrorMessage("please upload valid type!")
            }

        }
    }

    const handlerChangeTabs = async (tabId: number) => {
        setTypeId(tabId)
        setLoading(true)
    }


    const handlerActionClient = async (status: number) => {
        const homeData = await homeAPI.changeClientsTypes({status, ids})
        setIds([]);
        setLoading(true)
    }

    const handlerCloseModal = () => {
        setIsModalOpen(false)
    }
    const handlerOpenModal = async (newData: any) => {
        await calculateRoute(newData);
        setIsModalOpen(true)
    }

    return (
        clients && <>
            <div className={s.upload_panel}>
                <div className={s.table_upper_tab}>
                    {
                        tabs && tabs.length > 0 && tabs.map(tab => (
                            <div
                                className={s.table_upper_tab_item}
                                key={tab.id}
                                style={typeId == tab.id ? {
                                    backgroundColor: '#165f8d',
                                    color: "white"
                                } : {backgroundColor: 'white'}}
                                onClick={() => handlerChangeTabs(tab.id)}
                            >
                                {tab.name}{tab.count && <span className={s.bage_count}>{tab.count}</span>}
                            </div>
                        ))
                    }
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className={s.upload_block}>
                        <label htmlFor="uploadFile">
                            <Upload/>
                        </label>
                        <input
                            id="uploadFile"
                            type="file"
                            onChange={fileUploader}
                            style={{display: "none"}}
                            accept=".xls, .xlsx, .csv"
                        />
                    </div>
                    <div className={s.import_block}>
                        <label>
                            <Import/>
                        </label>
                    </div>
                    <div className={s.import_block} onClick={() => {
                        openSearch()
                    }}>
                        {open ? <Close/> : <Search/>}
                    </div>
                </div>
                <div
                    className={`${s.header_input_block} ${open ? s.active : s.passive}`}
                >
                    <BackDropSearch handlerCloseBackDropSearch={handlerCloseBackDropSearch}
                                    handlerSubmit={onSerachInput}/>
                </div>

            </div>
            {errorMessage && <div style={{color: "red"}}>{errorMessage}</div>}
            {
                show && clientById &&
                <div>

                    <InfoBlock clientById={clientById} calculateRoute={handlerOpenModal}/>

                </div>
            }
            <Modal
                isOpen={isModalOpen !== false}
                style={customStyles}
                onRequestClose={handlerCloseModal}
            >
                <div className={s.modalBody}>
                    <div className={s.iconWrapper}>
                        <i className='cancelicon-'
                           onClick={handlerCloseModal}
                        />
                    </div>

                    {isLoaded && <div className={s.googleMap}>
                        <GoogleMap
                            ///  center={center}
                            zoom={15}
                            mapContainerStyle={{width: '100%', height: '100%'}}
                            options={{
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                            onLoad={map => setMap(map)}
                        >
                            {/* <Marker position={center} /> */}
                            {directionsResponse && (
                                <DirectionsRenderer directions={directionsResponse}/>
                            )}

                        </GoogleMap>
                        <div style={{border: "1px solid #ddd", padding: "5px", marginTop: "10px"}}>
                            {steps && steps.map((el: any) => {
                                return (
                                    <div
                                        className={s.directions}
                                        dangerouslySetInnerHTML={{__html: el.instructions}}
                                    />
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </Modal>

            <div className={s.iconBlock}>
                <Select
                    isSearchable={true}
                    placeholder={'title'}
                    options={defaultData}
                    onChange={(options: Array<IOption>) => {
                        changeFields(options);
                    }}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => option.label}
                    value={selectedTitle}
                    name={'filtre'}
                    isMulti={true}
                />
            </div>
            <div className={s.upload_panel}>
                <div className={s.actiona_block} onClick={() => handlerActionClient(1)}>
                    <label>
                        Claim Trip
                    </label>

                </div>
                <div className={s.actiona_block} onClick={() => handlerActionClient(4)}>
                    <label>
                        Cancel Trip
                    </label>

                </div>
            </div>
            <div ref={contentRef} className={s.table_wrapper}>
                <CrudTable
                    titles={selectedTitle}
                    data={clients}
                    handlerGetClientData={handlerGetClientData}
                    className={'pagination'}
                    paginated={false}
                    selectedIds={ids}
                />
                <div className={s.detector} ref={ref}/>
            </div>

        </>
    )
}
export default Home
