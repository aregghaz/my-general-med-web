import React, {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/home'
import {clientAction} from '../../../store/client'
import {getClientData, getHomePageData} from '../../../store/selectors'
import {homeAPI} from "../../../api/site-api/home-api";
import s from './home.module.scss'
import CrudTable from '../../../components/crud-table-user/crud-table'
import {IOption} from '../../../components/select/select'
import {useInView} from 'react-intersection-observer'
import InfoBlock from '../../../components/info-block/info-block'
import Upload from '-!svg-react-loader!../../../images/Upload.svg'
import Import from '-!svg-react-loader!../../../images/Import.svg'
import Search from '-!svg-react-loader!../../../images/Search.svg'
import Close from '-!svg-react-loader!../../../images/Close.svg'
import axios from 'axios'
import BackDropSearch from '../../../components/backdrop-search/backdrop-search'
import {DirectionsRenderer, GoogleMap, useJsApiLoader,} from '@react-google-maps/api'
import Modal from 'react-modal'
import PopupModal from "../../../components/popup-modal/popup-modal";
import MultiSelectSort from "../../../components/select/sort-select";

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
    const {t} = useTranslation()
    const [defaultData, setDefaultData] = useState([])
    const [show, setShow] = useState(false)
    const [loadFile, setLoadFile] = useState<any>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [ids, setIds] = useState([])
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [typeId, setTypeId] = useState<number>(1)
    const [steps, setSteps] = useState<Array<any>>([])
    const [ref, inView] = useInView({
        threshold: 1,
    });
    const [isBackDropSearch, setBackdropSearch] = useState<boolean>(false)
    const handlerCloseBackDropSearch = () => setBackdropSearch(false)
    const contentRef = useRef();
    const countRef = useRef(2);
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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [agreement, setAgreement] = useState<boolean>(false)
    const [status, setStatus] = useState<number | null>(null)
    const [changePosition, setChangePosition] = useState<any[]>(selectedTitle)

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


    ////FIXME FIX DYNAMIC TABLE FIELDS
    const [titles, setTitles] = useState<string[]>([])

    const openSearch = () => {
        setOpen(!open)
    }

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
                const titlesData = localStorage.getItem('titles')
                const homeData = await homeAPI.getClientData({
                    titles: titles ? titles : JSON.parse(titlesData),
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
        })()
        return () => {
            homeAPI.cancelRequest()
        }

    }, [inView, loading, agreement]);
    ///FIXME  MISSING TYPE

    const onSearchInput = async (event: { search: string }) => {
        const titlesData = localStorage.getItem('titles')

        const homeData = await homeAPI.getClientData({
            titles: JSON.parse(titlesData),
            showMore: countRef.current,
            typeId: typeId,
            queryData: event.search,
        })
        setDefaultData(homeData.titles)
        dispatch(actions.setTitles({
            titles: homeData.titles,
            selectedTitle: homeData.selectedFields,
            clients: homeData.clients,
            tripCount: homeData.tripCount,
            availableCount: homeData.availableCount
        }))
        // }
    }

    const changeFields = (options: Array<IOption>) => {
        let result = options.map(a => a.slug);
        localStorage.setItem('titles',JSON.stringify(result))
        if (result.length > 0) {
            setTitles(result)
            setLoading(true)
        }
    }

    const fileUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const validValues = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if (e.target.files) {
            if (validValues?.includes(e.target.files[0].type)) {
                // setLoadFile(e.target.files[0])
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

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    if (agreement) {
        delay(200).then(async () => {
            await homeAPI.changeClientsTypes({status, ids})
            setIds([]);
            setLoading(true)
            setAgreement(false)
        })
    }

    const handleActionMiddleware = (status: number) => {
        if (ids.length > 0) {
            setIsOpen(true)
            setStatus(status)
        }

    }
    const agreeWith = (callOrNot: boolean) => {
        setAgreement(callOrNot)
        setIsOpen(false)
    }
    const notAgreeWith = () => setIsOpen(false)


    const handlerCloseModal = () => {
        setIsModalOpen(false)
    }
    const handlerOpenModal = async (newData: any) => {
        await calculateRoute(newData);
        setIsModalOpen(true)
    }

    const changeSortPosition = (arr: Array<IOption>) => {
        setChangePosition(arr)
        let result = arr.map(a => a.slug);
        localStorage.setItem('titles',JSON.stringify(result))
        setTitles(result)
        setLoading(true)
    }


    return (
        clients && <>
            <div className={s.panel}>
                <div className={s.upload_panel}>
                    <div className={s.table_upper_tab}>
                        {
                            tabs && tabs.length >= 0 && tabs.map(tab => (
                                <div
                                    className={s.table_upper_tab_item}
                                    key={tab.id}
                                    style={typeId == tab.id ? {
                                        backgroundColor: '#4466b0',
                                        color: "#fff"
                                    } : {backgroundColor: '#ffffff', color: "#4466b0"}}
                                    onClick={() => handlerChangeTabs(tab.id)}
                                >
                                    {t(tab.name)}{tab.count && <span className={s.bage_count}>{tab.count}</span>}
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
                                        handlerSubmit={onSearchInput}/>
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
                    {Object.values(selectedTitle).length > 0 && <MultiSelectSort
                        isSearchable={true}
                        placeholder={"title"}
                        options={defaultData}
                        onChange={(options: Array<IOption>) => changeFields(options)}
                        getOptionValue={(option: IOption) => option.value}
                        getOptionLabel={(option: IOption) => t(option.label)}
                        // value={changePosition.length > 0 ? changePosition : selectedTitle}
                        value={selectedTitle}
                        // value={selectedTitle}
                        name={"filtre"}
                        isMulti={true}
                        onChangePosition={changeSortPosition}
                    />}
                </div>
                <div className={s.upload_panel}>
                    <div
                        className={`${s.action_block}  ${typeId === 1 || typeId === 4 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware(1)}
                    >
                        Claim Trip
                    </div>
                    <div
                        className={`${s.action_block} ${typeId === 2 || typeId === 4 ? s.disabled_action : s.enabled_action}`}
                        onClick={() => handleActionMiddleware(4)}
                    >
                        Cancel Trip
                    </div>
                </div>

            </div>
            <PopupModal isOpen={isOpen} agreeWith={agreeWith} notAgreeWith={notAgreeWith}/>
            <div ref={contentRef} className={s.table_wrapper}>
                <CrudTable
                     titles={selectedTitle}
                    //titles={changePosition}
                    data={clients}
                    handlerGetClientData={handlerGetClientData}
                    className={'pagination'}
                    paginated={false}
                    selectedIds={ids}
                    typeId={typeId}
                />
                <div className={s.detector} ref={ref}/>
            </div>

        </>
    )
}
export default Home
