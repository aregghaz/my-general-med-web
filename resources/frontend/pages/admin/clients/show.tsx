import React, { useEffect, useRef, useState } from "react";
import cls from "../../../components/info-block/info-block.module.scss";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { homeAPI } from "../../../api/site-api/home-api";
import { clientAction } from "../../../store/client";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../../../environments";
import { getClientData } from "../../../store/selectors";
import { useTranslation } from "react-i18next";
import Textarea from "../../../components/textarea/textarea";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { toast } from "react-toastify";
import timestampToDate from "../../../utils/timestampToDate";
import getMapResponse from "../../../utils/googleMap";
import ShowMap from "-!svg-react-loader!../../../images/showMap.svg";
import Update from "-!svg-react-loader!../../../images/update.svg";

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
    const blockRef = useRef(null as HTMLDivElement);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [data, setData] = useState<any>({});

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
            setData(homeData.client);
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


    const handlerShowMap = async () => {
        var address = data.address;
        var origin = "";
        var destination = "";
        var waypoint = [];
        for (let i = 0; i < data.stops; i++) {
            console.log(address[i], "address[i]");
            if (i === 0) {
                origin = address[i]["address"];
            } else if (i === data.stops - 1) {
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
        setShowMap(!showMap);
    };
    return clientById && <div className={cls.block} ref={blockRef}>
        <div className={cls.infoLeft}>
            <div className={cls.infoLeftName}>
                <span className={cls.username}>{clientById.fullName}</span>
                |
                <span>{timestampToDate(clientById.date_of_service.toString())}</span>
                |
                <span><span>Height: {clientById.height}</span> <span>Weight: {clientById.weight}</span></span>
                <div className={cls.iconsWrapper}>
                    <button className={cls.updateButton} onClick={handlerShowMap}>
                        <span className={cls.updateButtonLabel}>Show map</span>
                        <ShowMap type={"adminUpdate"} className={cls.mapIcon} />
                    </button>
                    <button className={cls.updateButton} onClick={handlerUpdate}>
                        <span className={`${cls.updateButtonLabel} ${cls.updateLabelTop}`}>Update</span>
                        <Update type={"adminUpdate"} className={cls.updateIcon} />
                    </button>
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
                                {clientById.address.length !== index + 1 && <div className={cls.item}>
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
                    // style={{
                    //     flexDirection: blockRef.current.clientHeight > window.innerHeight ? "column-reverse" : "row"
                    // }}
                >
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
                    <div className={cls.mapDiv}>
                        <GoogleMap
                            ///  center={center}
                            zoom={15}
                            mapContainerStyle={{ width: "100%", height: "100%", minHeight: "500px" }}
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
                </div>}
            </div>
        </div>
    </div>;
};

export default Show;

