import React, { useEffect, useState, useRef } from 'react'
import { Col, Row } from 'react-grid-system'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../store/home'
import { clientAction } from '../../../store/client'
import { getClientData, getHomePageData } from '../../../store/selectors'
import { homeAPI } from "../../../api/site-api/home-api";
import s from './home.module.scss'
import CrudTable from '../../../components/crud-table-user/crud-table'
import Input from '../../../components/input/input'
import Select, { IOption } from '../../../components/select/select'
import { useInView } from 'react-intersection-observer'
import InfoBlock from '../../../components/info-block/info-block'
import Upload from '-!svg-react-loader!../../../images/Upload.svg'
import Import from '-!svg-react-loader!../../../images/Import.svg'
import Search from '-!svg-react-loader!../../../images/Search.svg'
import Close from '-!svg-react-loader!../../../images/Close.svg'
import axios from 'axios'
import BackDropSearch from '../../../components/backdrop-search/backdrop-search'
import Button from "../../../components/button/button";

interface IHome {
    path: string
}

const Home: React.FC<IHome> = () => {
    const [defaultData, setDefaultData] = useState([])
    const [show, setShow] = useState(false)
    const [loadFile, setLoadFile] = useState<any>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [query, setQuery] = useState('')
    const [ids, setIds] = useState([])
    const [open, setOpen] = useState<boolean>(false)
    const [loding, setLoading] = useState<boolean>(false)
    const [typeId, setTypeId] = useState<number>(1)
    const [ref, inView] = useInView({
        threshold: 0,
    });
    const [isBackDropSearch, setBackdropSearch] = useState<boolean>(false)
    const handlerCloseBackDropSearch = () => setBackdropSearch(false)
    const contentRef = useRef();
    const countRef = useRef(2);
    ///const [data, setData] = useState([])
    const homeData = useSelector(getHomePageData)
    const clientData = useSelector(getClientData)
    const dispatch = useDispatch()

    const { selectedTitle, clients, tripCount, availableCount } = homeData
    const { clientById } = clientData

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
        {
            id: 3,
            name: "Download History",
            //count:38
        },
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
    const [titles, setTitles] = useState<Array<string>>(titlesDef)

    const openSearch = () => {
        setOpen(!open)
    }


    useEffect(() => {
        (
            async () => {
                if (titles.length > 0) {
                    const homeData = await homeAPI.getClientData({ titles: titles, showMore: countRef.current, typeId: typeId })
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

    const handlerGetclientData = async (event: any, id: number) => {
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
            dispatch(clientAction.fetching({ clientById: homeData.client }))
            setShow(true)
        }

    }

    useEffect(() => {
        (async () => {
            if (inView && loding) {
                let result = selectedTitle.map(a => a.slug);
                if (result.length > 0) {
                    const homeData = await homeAPI.getClientData({ titles: titles, showMore: countRef.current, typeId: typeId })
                    setDefaultData(homeData.titles)
                    dispatch(actions.setTitles({
                        titles: homeData.titles,
                        selectedTitle: homeData.selectedFields,
                        clients: homeData.clients,
                        tripCount: homeData.tripCount,
                        availableCount: homeData.availableCount
                    }))

                }
                countRef.current++;
                setLoading(false)
            }
        })();
    }, [inView, loding]);
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

    const handlerChangeTabe = async (tabId: number) => {
        setTypeId(tabId)
        setLoading(true)
    }

    const handlerActionClient = async (status: number) => {
        const homeData = await homeAPI.changeClientsTypes({ status, ids})

        setLoading(true)


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
                                style={typeId == tab.id ? { backgroundColor: '#165f8d', color: "white" } : { backgroundColor: 'white' }}
                                onClick={() => handlerChangeTabe(tab.id)}
                            >
                                {tab.name}{tab.count && <span className={s.bage_count}>{tab.count}</span>}
                            </div>
                        ))
                    }
                </div>
                <div className={s.upload_block}>
                    <label htmlFor="uploadFile">
                        <Upload />
                    </label>
                    <input
                        id="uploadFile"
                        type="file"
                        onChange={fileUploader}
                        style={{ display: "none" }}
                        accept=".xls, .xlsx, .csv"
                    />
                </div>
                <div className={s.import_block}>
                    <label>
                        <Import />
                    </label>
                </div>
                <div className={s.import_block} onClick={() => {
                    openSearch()
                }}>
                    {open ? <Close /> : <Search />}
                </div>
                <div
                    className={`${s.header_input_block} ${open ? s.active : s.passive}`}
                >

                    <BackDropSearch handlerCloseBackDropSearch={handlerCloseBackDropSearch}
                        handlerSubmit={onSerachInput} />
                </div>

            </div>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            {
                show && clientById &&
                <div>
                    <InfoBlock clientById={clientById} />

                </div>
            }


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
                    handlerGetclientData={handlerGetclientData}
                    className={'pagination'}
                    paginated={false}
                />
                <div className={s.detector} ref={ref} />
            </div>

        </>
    )
}
export default Home
