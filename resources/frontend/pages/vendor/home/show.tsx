import React, {useEffect, useRef, useState} from "react";
import cls from "../../../components/info-block/info-block.module.scss";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { homeAPI } from "../../../api/site-api/home-api";
import { clientAction } from "../../../store/client";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../../../environments";
import { getClientData } from "../../../store/selectors";
import { useTranslation } from "react-i18next";
import Select, { IOption } from "../../../components/select/select";
import { toast } from "react-toastify";
import Textarea from "../../../components/textarea/textarea";
import getMapResponse from "../../../utils/googleMap";
import timestampToDate from "../../../utils/timestampToDate";
import CustomTimePicker from "../../../components/custom-time-picker/customTimePicker";
import ShowMap from "-!svg-react-loader!../../../images/showMap.svg"
import Update from "-!svg-react-loader!../../../images/update.svg"

interface IShow {
    path: string;
    id?: number;
}

const Show: React.FC<IShow> = ({ id }) => {
    const [duration, setDuration] = useState("");
    const [steps, setSteps] = useState<Array<any>>([]);
    const [map, setMap] = useState(/** @type google.maps.Map */(null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [statuses, setStatuses] = useState([]);
    const dispatch = useDispatch();
    const clientData = useSelector(getClientData);
    const { clientById } = clientData;
    const { t } = useTranslation();
    const [carData, setCarData] = useState<Array<any>>(null);
    const [disabled, setDisabled] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["geometry", "drawing", "places"]
    });
    const blockRef = useRef(null as HTMLDivElement)
    const [showMap, setShowMap] = useState<boolean>(false)



    const [values, setFieldValue] = useState({
        pick_up: clientById.pick_up,
        drop_down: clientById.drop_down,
        additionalNote: clientById.additionalNote,
        status: clientById.type_id,
        car: clientById.car

    });
    useEffect(() => {
        (async () => {
            const homeData = await homeAPI.getCLientById(id);
            setStatuses(homeData.status);
            if(homeData.client.type_id.id===6){
                setDisabled(true)
            }
            dispatch(clientAction.fetching({ clientById: homeData.client }));
            setCarData(homeData.cars);
            setFieldValue({
                pick_up: homeData.client.pick_up,
                drop_down: homeData.client.drop_down,
                additionalNote: homeData.client.additionalNote,
                status: homeData.client.type_id,
                car: homeData.client.car

            });
            var address = homeData.client.address;
            var origin = "";
            var destination = "";
            var waypoint = [];
            for (let i = 0; i < homeData.client.stops; i++) {
                console.log(address[i], "address[i]");
                if (i === 0) {
                    origin = address[i]["address"];
                } else if (i === homeData.client.stops - 1) {
                    destination = address[i]["address"];
                } else {
                    waypoint.push({
                        location:
                            {
                                placeId: address[i]["address_id"]
                            }
                    });
                }
            }
            const results = await getMapResponse(origin, destination, waypoint);
            setDirectionsResponse(results);
            if (results.routes[0].legs.length > 0) {
                var miles = 0;
                results.routes[0].legs.map((item: any) => {
                    miles += parseFloat(item.distance.text);
                    setSteps((state) => {
                        return [...state,
                            ...item.steps

                        ];
                    });
                });
                setDistance(results.routes[0].legs[0].duration.text);
            }
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, []);

    // const sendNotification = (options: ToastOptions, text: string) => {
    //     toast(t(text), options);
    // };
    const handlerUpdate = async () => {
        ////TODO optimize this part
        if (!values.car.value) {
            const options = {
                type: toast.TYPE.WARNING,
                position: toast.POSITION.TOP_RIGHT
            };
            toast(t("please select car"), options);
        } else {
            const homeData = await homeAPI.updateClient(values, id).catch((e) => {
                const options = {
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.TOP_RIGHT
                };
                toast(t(e), options);
            });
            if (homeData.success) {
                const options = {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.TOP_RIGHT
                };

                toast(t("record_successfully_edited"), options);
            }
        }


    };


    return clientById && <div className={cls.block} ref={blockRef}>
        <div className={cls.infoLeft}>
            <div>
                <div className={cls.infoLeftName}>
                    <span className={cls.username}>{clientById.fullName}</span>
                    |
                    <span>{timestampToDate(clientById.date_of_service.toString())}</span>
                    |
                    <span><span>Height: {clientById.height}</span> <span>Weight: {clientById.weight}</span></span>
                    <div className={cls.iconsWrapper}>
                        <div className={cls.updateButton}>
                            <span className={cls.updateButtonLabel}>Show Map</span>
                            <ShowMap type={"adminUpdate"} onClick={() => {setShowMap(!showMap)}} className={cls.mapIcon}/>
                        </div>
                        <div className={cls.updateButton}>
                            <span className={cls.updateButtonLabel}>Update</span>
                            <Update type={"adminUpdate"} onClick={handlerUpdate} className={cls.updateIcon}/>
                        </div>
                    </div>

                </div>
                {/*<div className={cls.itemsBlock}>*/}
                {/*    <span className={cls.b_text}>{t("pick_up")}: </span>*/}
                {/*        <TimePicker*/}
                {/*            className={s.time}*/}
                {/*            format={"HH:mm"}*/}
                {/*            clockIcon={null}*/}
                {/*            clearIcon={null}*/}
                {/*            amPmAriaLabel={false}*/}
                {/*            onChange={(time: string) => setFieldValue((state: any) => {*/}
                {/*                return {*/}
                {/*                    ...state,*/}
                {/*                    "pick_up": time*/}
                {/*               };*/}
                {/*            })}*/}
                {/*            name={"pick_up"}*/}
                {/*            value={clientById.pick_up}*/}
                {/*        />*/}
                {/*</div>*/}
            </div>
            <div className={cls.item1}>
                <div className={cls.itemsBlock}>
                    <div className={cls.itemsSelects}>
                        <div className={cls.itemsSelect}>
                            <Select
                                getOptionValue={(option: IOption) => option.value}
                                getOptionLabel={(option: IOption) => t(option.label)}
                                onChange={(options: IOption) => setFieldValue((state: any) => {
                                    return {
                                        ...state,
                                        car: options
                                    };
                                })}
                                placeholder={"Select Car"}
                                isDisabled={disabled}
                                options={carData}
                                value={values.car}
                                name={"Cars"}
                                isMulti={false}
                                label={"Cars"}
                            />
                        </div>
                        <div className={cls.itemsSelect}>
                            <Select
                                getOptionValue={(option: IOption) => option.value}
                                getOptionLabel={(option: IOption) => t(option.label)}
                                onChange={(options: IOption) => {
                                    return setFieldValue((state: any) => {
                                        return {
                                            ...state,
                                            status: options
                                        };
                                    });
                                }}
                                isDisabled={disabled}
                                options={statuses}
                                value={values.status}
                                name={"Cars"}
                                isMulti={false}
                                label={"Status"}
                                placeholder={"Select status"}
                            />
                        </div>
                    </div>
                </div>
                {/*<div className={cls.itemsBlock}>*/}
                {/*    <span className={cls.b_text}>{t("height")}: </span>*/}
                {/*    {clientById.height}*/}
                {/*</div>*/}
                <div className={cls.addon} style={{
                    borderTop: "none",
                }}>
                    <div className={cls.addonInfo}>
                        <p>LOS: <span>{clientById.los}</span></p>
                        <p>Member unique identifer: <span>{clientById.member_uniqie_identifer}</span></p>
                        <p>Miles: <span>{clientById.miles}</span></p>
                        <p>Request type: <span>{clientById.request_type}</span></p>
                        <p>Trip ID: <span>{clientById.trip_id}</span></p>
                        <p>Wait duration: <span>{clientById.waitDuration} minutes</span></p>
                        <p>Oxygen: <span>{clientById.oxygen}</span></p>
                    </div>
                </div>
            </div>

            {
                clientById.address.map((item, index: number) => {
                    return (<>
                        <div className={cls.class}>
                            <p className={cls.classLabel}>Step: {index + 1}</p>
                            <div className={cls.classInfo}>
                                <div className={cls.classLeft}>
                                    <div className={cls.items}>
                                        <div className={cls.item}>
                                            <span className={cls.itemLabel}>Pickup Address:</span>
                                            <span className={cls.itemValue}>{item.address}</span>
                                        </div>
                                        {index !== 0 && <div className={cls.item} style={{alignItems: "center"}}>
                                            <span className={cls.itemLabel}>Appointment time:</span>
                                            {/*<span className={cls.itemValue}>{item.drop_down}</span>*/}
                                            <CustomTimePicker className={cls.timepicker} setFieldValue={setFieldValue} value={item.drop_down} name={`appointmentTime ${index + 1}`}/>
                                            <div className={cls.updateButton}>
                                                <span className={cls.updateButtonLabel}>Update</span>
                                                <ShowMap type={"adminUpdate"} onClick={() => {setShowMap(!showMap)}} className={cls.saveIcon}/>
                                            </div>
                                        </div>}
                                        {clientById.address.length !== index+1 && <div className={cls.item} style={{alignItems: "center"}}>
                                            <span className={cls.itemLabel}>Pickup time:</span>
                                            {/*<span className={cls.itemValue}>{item.pick_up}</span>*/}
                                            <CustomTimePicker className={cls.timepicker} setFieldValue={setFieldValue} value={item.pick_up} name={`pickupTime ${index + 1}`}/>
                                            <div className={cls.updateButton}>
                                                <span className={cls.updateButtonLabel}>Update</span>
                                                <ShowMap type={"adminUpdate"} onClick={() => {setShowMap(!showMap)}} className={cls.saveIcon}/>
                                            </div>
                                        </div>}

                                        <div className={cls.item}>
                                            <span className={cls.itemLabel}>Phone:</span>
                                            <span className={cls.itemValue}>{item.address_phone}</span>
                                        </div>
                                        <div className={cls.item}>
                                            <span className={cls.itemLabel}>Comment:</span>
                                            <span className={cls.itemValue}>{item.address_comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cls.seperator}></div>
                    </>);
                })
            }
        </div>
        <div className={cls.infoRight}>
            <div className={cls.info}>
                <div className={cls.itemTextarea}>
                    <Textarea
                        name={"additionalNote"}
                        value={values.additionalNote}
                        placeholder={t("additionalNote")}
                        onChange={(event: any) => {
                            event.persist();
                            return setFieldValue((state: any) => {
                                return {
                                    ...state,
                                    additionalNote: event.target.value
                                };
                            });
                        }}
                        label={t("additionalNote")}
                    />
                </div>
            </div>
            <div className={cls.addInfo}>
                <div className={cls.itemsMap}>
                    <div className={cls.mapBlock}>
                        {isLoaded && showMap && <div
                            className={cls.selectDiv}
                            style={{
                                flexDirection: blockRef.current.clientHeight > window.innerHeight ? "column" : "row"
                            }}
                        >
                            <div className={cls.mapDiv}>
                                <GoogleMap
                                    ///  center={center}
                                    zoom={15}
                                    mapContainerStyle={{ width: "100%", height: "100%", minHeight: "500px", }}
                                    options={{
                                        zoomControl: true,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false
                                    }}
                                    onLoad={map => setMap(map)}
                                >
                                    {/* <Marker position={center} /> */}
                                    {directionsResponse && (
                                        <DirectionsRenderer directions={directionsResponse} />
                                    )}

                                </GoogleMap>
                            </div>
                            <div className={cls.directionDiv}>
                                {steps && steps.map((el: any) => {
                                    return (
                                        <div
                                            className={cls.directions}
                                            dangerouslySetInnerHTML={{ __html: el.instructions }}
                                        />
                                    );
                                })}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

// <div className={cls.item}>
//     <span className={cls.b_text}>{t("fullName")}: </span>
//     {clientById.fullName}
// </div>

// <div className={cls.item}>
//     <span className={cls.b_text}>{t("date_of_service")}: </span>
//     {clientById.date_of_service}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("pick_up")}: </span>
//     <TimePicker
//         className={s.time}
//         format={"HH:mm"}
//         clockIcon={null}
//         clearIcon={null}
//         amPmAriaLabel={false}
//         onChange={(time: string) => setFieldValue((state: any) => {
//             return {
//                 ...state,
//                 "pick_up": time
//             };
//         })}
//         name={"pick_up"}
//         value={clientById.pick_up}
//     />
// </div>
//
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("drop_down")}: </span>
//     <TimePicker
//         className={s.time}
//         format={"HH:mm"}
//         clockIcon={null}
//         clearIcon={null}
//         amPmAriaLabel={false}
//         onChange={(time: string) => setFieldValue((state: any) => {
//             return {
//                 ...state,
//                 "drop_down": time
//             };
//         })}
//         name={"drop_down"}
//         value={clientById.drop_down}
//     />
// </div>
//
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("pick_up_address")}: </span>
//     {clientById.origin}
//
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("origin_comment")}: </span>
//     {clientById.origin_comment}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("origin_phone")}: </span>
//     {clientById.origin_phone}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination")}: </span>
//     {clientById.destination}
// </div>
//
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination_comments")}: </span>
//     {clientById.destination_comment}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination_phone")}: </span>
//     {clientById.destination_phone}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("weight")}: </span>
//     {clientById.weight}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("height")}: </span>
//     {clientById.height}
// </div>
// <div>
//     <Select
//         getOptionValue={(option: IOption) => option.value}
//         getOptionLabel={(option: IOption) => t(option.label)}
//         onChange={(options: IOption) => setFieldValue((state: any) => {
//             return {
//                 ...state,
//                 car: options
//             };
//         })}
//         isDisabled={(values.status.id == 6)}
//         options={carData}
//         value={values.car}
//         name={"Cars"}
//         isMulti={false}
//     />
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("status")}: </span>
//     <Select
//         getOptionValue={(option: IOption) => option.value}
//         getOptionLabel={(option: IOption) => t(option.label)}
//         onChange={(options: IOption) => {
//             return setFieldValue((state: any) => {
//                 return {
//                     ...state,
//                     status: options
//                 };
//             });
//         }}
//         isDisabled={(values.status.id == 6)}
//         options={statuses}
//         value={values.status}
//         name={"Cars"}
//         isMulti={false}
//     />
//     {/*{clientById.status}*/}
// </div>

//
//
// <div>

// </div>


export default Show;
