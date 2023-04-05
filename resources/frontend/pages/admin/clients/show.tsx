import React, { useEffect, useState, useRef } from "react";
import cls from "../../../components/info-block/info-block.module.scss";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { homeAPI } from "../../../api/site-api/home-api";
import client, { clientAction } from "../../../store/client";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../../../environments";
import { getClientData } from "../../../store/selectors";
import { useTranslation } from "react-i18next";
import Textarea from "../../../components/textarea/textarea";
import Button from "../../../components/button/button";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { toast } from "react-toastify";
import timestampToDate from "../../../utils/timestampToDate";
import getMapResponse from "../../../utils/googleMap";

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
    const dispatch = useDispatch();
    const clientData = useSelector(getClientData);
    const { clientById } = clientData;
    const { t } = useTranslation();
    const blockRef = useRef(null as HTMLDivElement)
    const [showMap, setShowMap] = useState<boolean>(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["geometry", "drawing", "places"]
    });


    const [values, setFieldValue] = useState({
        pick_up: clientById.pick_up,
        drop_down: clientById.drop_down,
        additionalNote: clientById.additionalNote,
        operator_note: clientById.operator_note

    });
    useEffect(() => {
        (async () => {
            const homeData = await homeAPI.getCLientById(id);
            dispatch(clientAction.fetching({ clientById: homeData.client }));
            setFieldValue({
                pick_up: homeData.client.pick_up,
                drop_down: homeData.client.drop_down,
                additionalNote: homeData.client.additionalNote,
                operator_note: homeData.client.operator_note

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
            ///  setDistance(results.routes[0].legs[0].distance.text);
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, []);


    const handlerUpdate = async () => {
        const homeData = await AdminApi.updateClient(values, id).catch((e) => {
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
    };
    console.log(clientById)
    return clientById && <div className={cls.block} ref={blockRef}>
        <div className={cls.infoLeft}>
            <div className={cls.infoLeftName}>
                <span className={cls.username}>{clientById.fullName}</span>
                |
                <span>{timestampToDate(clientById.date_of_service.toString())}</span>
                |
                <span><span>Height: {clientById.height}</span> <span>Weight: {clientById.weight}</span></span>
                <div className={cls.updateButton}>
                    <Button type={"adminUpdate"} onClick={() => {setShowMap(!showMap)}}>
                        {showMap ? "Hide Map" : "Show Map"}
                    </Button>
                </div>
                <div className={cls.updateButton}>
                    <Button type={"adminUpdate"} onClick={handlerUpdate}>
                        Update
                    </Button>
                </div>
            </div>
            <div className={cls.addon}>
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
            {
                clientById.address.map((item, index: number) => {
                    return (<>
                        <div className={cls.class}>
                            <p className={cls.classLabel}>Step: {index + 1}</p>
                            <div className={cls.items}>
                                <div className={cls.item}>
                                    <span className={cls.itemLabel}>Pickup Address:</span>
                                    <span className={cls.itemValue}>{item.address}</span>
                                </div>
                                {index !== 0 && <div className={cls.item}>
                                    <span className={cls.itemLabel}>Appointment time:</span>
                                    <span className={cls.itemValue}>{item.drop_down}</span>
                                </div>}
                                {clientById.address.length !== index+1 && <div className={cls.item}>
                                    <span className={cls.itemLabel}>Pickup time:</span>
                                    <span className={cls.itemValue}>{item.pick_up}</span>
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
                        <div className={cls.seperator}></div>
                    </>);
                })
            }


            {/*<div className={cls.seperator}></div>*/}
            {/*<div className={cls.class}>*/}
            {/*    <p className={cls.classLabel}>Times:</p>*/}
            {/*    <div className={cls.items}>*/}
            {/*        <div className={cls.item} style={{ alignItems: "center" }}>*/}
            {/*            <div className={cls.itemLabelBox}>*/}
            {/*                <span className={cls.itemLabel}>Drop Down:</span>*/}
            {/*            </div>*/}
            {/*            <div className={cls.itemItemBox}>*/}
            {/*                <TimePicker format={"h:m"} className={s.time} clockIcon={null} clearIcon={null}*/}
            {/*                            onChange={(time: string) => setFieldValue((state: any) => {*/}
            {/*                                return {*/}
            {/*                                    ...state,*/}
            {/*                                    "drop_down": time*/}
            {/*                                };*/}
            {/*                            })} name={"drop_down"} value={clientById.drop_down} />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={cls.item} style={{ alignItems: "center" }}>*/}
            {/*            <div className={cls.itemLabelBox}>*/}
            {/*                <span className={cls.itemLabel}>Pick Up:</span>*/}
            {/*            </div>*/}
            {/*            <div className={cls.itemItemBox}>*/}
            {/*                <TimePicker format={"h:m"} className={s.time} clockIcon={null} clearIcon={null}*/}
            {/*                            onChange={(time: string) => setFieldValue((state: any) => {*/}
            {/*                                return {*/}
            {/*                                    ...state,*/}
            {/*                                    "pick_up": time*/}
            {/*                                };*/}
            {/*                            })} name={"pick_up"} value={clientById.pick_up} />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={cls.infoLeftBottom}></div>*/}
        </div>
        <div className={cls.infoRight}>
            <div className={cls.infoRightBottom}>
                <div className={cls.infoRightBottomTextareas}>
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
                            label={t(`Additional note (readonly)`)}
                            readonly={true}
                        />
                    </div>
                    <div className={cls.itemTextarea}>
                        <Textarea
                            name={"operator_note"}
                            value={values.operator_note}
                            placeholder={t("operator_note")}
                            onChange={(event: any) => {
                                event.persist();
                                return setFieldValue((state: any) => {
                                    return {
                                        ...state,
                                        operator_note: event.target.value
                                    };
                                });
                            }}
                            label={t("operator_note")}
                        />
                    </div>
                </div>
            </div>
            <div className={cls.infoRightTop}>
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
                            mapContainerStyle={{ width: "100%", height: "100%", minHeight: "500px"}}
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
                    </div>
                    <div
                        className={cls.directionDiv}
                        style={{
                            width: blockRef.current.clientHeight > window.innerHeight ? "100%" : "50%"
                        }}
                    >
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
    </div>;
};

export default Show;

// <div className={cls.updateButton}>
//     <Button type={"adminUpdate"} onClick={handlerUpdate}>
//         Update
//     </Button>
// </div>


// <div className={cls.item}>
//     <span className={cls.b_text}>{t("fullName")}: </span>
//     {clientById.fullName}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("date_of_service")}: </span>
//     {clientById.date_of_service}
// </div>
// <div className={cls.item}>
//     <TimePicker format={"h:m"} className={s.time} clockIcon={null} clearIcon={null} onChange={(time:string) => setFieldValue((state:any) => {
//         return {
//             ...state,
//             'pick_up':time
//         }
//     }) }  name={'pick_up'} value={clientById.pick_up} />
// </div>
//
// <div className={cls.item}>
//     <TimePicker format={"h:m"} className={s.time} clockIcon={null} clearIcon={null} onChange={(time:string) => setFieldValue((state:any) => {
//         return {
//             ...state,
//             'drop_down':time
//         }
//     }) }  name={'drop_down'} value={clientById.drop_down} />
// </div>
//
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("pick_up_address")}: </span>
//     {clientById.origin ? clientById.origin : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("origin_comment")}: </span>
//     {clientById.origin_comment ? clientById.origin_comment : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("origin_phone")}: </span>
//     {clientById.origin_phone ? clientById.origin_phone : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination")}: </span>
//     {clientById.destination ? clientById.destination : "Unspecified"}
// </div>
//
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination_comments")}: </span>
//     {clientById.destination_comment ? clientById.destination_id : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("destination_phone")}: </span>
//     {clientById.destination_phone ? clientById.destination_phone : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("weight")}: </span>
//     {clientById.weight ? clientById.weight : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <span className={cls.b_text}>{t("height")}: </span>
//     {clientById.height ? clientById.height : "Unspecified"}
// </div>
// <div className={cls.item}>
//     <Textarea
//         name={'additionalNote'}
//         value={values.additionalNote}
//         placeholder={t('additionalNote')}
//         onChange={(event:any) => {
//             event.persist();
//             return setFieldValue((state: any) => {
//                 return {
//                     ...state,
//                     additionalNote: event.target.value
//                 };
//             });
//         } }
//         label={t('additionalNote')}
//     />
// </div>
//
// <div className={cls.item}>
//     <Textarea
//         name={'operator_note'}
//         value={values.operator_note}
//         placeholder={t('operator_note')}
//         onChange={(event:any) => {
//             event.persist();
//             return setFieldValue((state: any) => {
//                 return {
//                     ...state,
//                     operator_note: event.target.value
//                 };
//             });
//         } }
//         label={t('operator_note')}
//     />
// </div>
//
//
// <div>
//     <Button type={'adminUpdate'} onClick={handlerUpdate}>
//         Update
//     </Button>
// </div>
// {isLoaded && <div className={cls.selectDiv}>
//
//     <div className={cls.mapDiv}>
//         <GoogleMap
//             ///  center={center}
//             zoom={15}
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             options={{
//                 zoomControl: true,
//                 streetViewControl: false,
//                 mapTypeControl: false,
//                 fullscreenControl: false
//             }}
//             onLoad={map => setMap(map)}
//         >
//             {/* <Marker position={center} /> */}
//             {directionsResponse && (
//                 <DirectionsRenderer directions={directionsResponse} />
//             )}
//
//         </GoogleMap>
//     </div>
//     <div  className={cls.directionDiv}>
//         {steps && steps.map((el: any) => {
//             return (
//                 <div
//                     className={cls.directions}
//                     dangerouslySetInnerHTML={{ __html: el.instructions }}
//                 />
//             );
//         })}
//     </div>
// </div>}
//


// <div className={cls.itemsMap}>
//     <div className={cls.mapBlock}>
//         {isLoaded && <div className={cls.selectDiv}>
//             <div className={cls.mapDiv}>
//                 <GoogleMap
//                     ///  center={center}
//                     zoom={15}
//                     mapContainerStyle={{ width: "100%", height: "100%" }}
//                     options={{
//                         zoomControl: true,
//                         streetViewControl: false,
//                         mapTypeControl: false,
//                         fullscreenControl: false
//                     }}
//                     onLoad={map => setMap(map)}
//                 >
//                     {/* <Marker position={center} /> */}
//                     {directionsResponse && (
//                         <DirectionsRenderer directions={directionsResponse} />
//                     )}
//
//                 </GoogleMap>
//             </div>
//             <div className={cls.directionDiv}>
//                 {steps && steps.map((el: any) => {
//                     return (
//                         <div
//                             className={cls.directions}
//                             dangerouslySetInnerHTML={{ __html: el.instructions }}
//                         />
//                     );
//                 })}
//             </div>
//         </div>}
//     </div>
// </div>
// <div className={cls.addInfo}>
//     <div className={cls.info}>
//         <div className={cls.item}>
//             <Textarea
//                 name={"additionalNote"}
//                 value={values.additionalNote}
//                 placeholder={t("additionalNote")}
//                 onChange={(event: any) => {
//                     event.persist();
//                     return setFieldValue((state: any) => {
//                         return {
//                             ...state,
//                             additionalNote: event.target.value
//                         };
//                     });
//                 }}
//                 label={t("additionalNote")}
//             />
//         </div>
//         <div className={cls.item}>
//             <Textarea
//                 name={'operator_note'}
//                 value={values.operator_note}
//                 placeholder={t('operator_note')}
//                 onChange={(event:any) => {
//                     event.persist();
//                     return setFieldValue((state: any) => {
//                         return {
//                             ...state,
//                             operator_note: event.target.value
//                         };
//                     });
//                 } }
//                 label={t('operator_note')}
//             />
//         </div>
//     </div>
//     <div className={cls.updateButton}>
//         <Button type={"adminUpdate"} onClick={handlerUpdate}>
//             Update
//         </Button>
//     </div>
// </div>
