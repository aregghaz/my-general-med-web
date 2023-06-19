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
import getMapResponse from "../../../utils/googleMap";
import timestampToDate from "../../../utils/timestampToDate";
import CustomTimePicker from "../../../components/custom-time-picker/customTimePicker";
import ShowMap from "-!svg-react-loader!../../../images/showMap.svg";
import Update from "-!svg-react-loader!../../../images/update.svg";
import { Formik, FormikHelpers, FormikValues } from "formik";
import toastNotification from "../../../utils/toast";


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
    const [loading, setLoading] = useState<boolean>(false);
    const [mapData, setMapData] = useState({
        destination: "",
        origin: "",
        waypoint: []
    });
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["geometry", "drawing", "places"]
    });
    const blockRef = useRef(null as HTMLDivElement);
    const [showMap, setShowMap] = useState<boolean>(false);

    const [data, setData] = useState({
        additionalNote: clientById.additionalNote,
        operator_note: clientById.operator_note

    });
    useEffect(() => {
        (async () => {
            const homeData = await homeAPI.getCLientById(id);
            setStatuses(homeData.status);
            if (homeData.client.type_id.id === 6) {
                setDisabled(true);
            }
            dispatch(clientAction.fetching({ clientById: homeData.client }));
            setCarData(homeData.cars);
            setData({
                additionalNote: homeData.client.additionalNote,
                operator_note: homeData.client.operator_note
            });
            var address = homeData.client.address;
            var origin = "";
            var destination = "";
            var waypoint = [];
            for (let i = 0; i < homeData.client.stops; i++) {

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
            setMapData({ origin: origin, destination: destination, waypoint: waypoint });
            setLoading(true);

        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, []);

    const shopMapHandler = async () => {
        if (!showMap) {

            if (steps.length === 0) {
                setSteps([]);
                const results = await getMapResponse(mapData.origin, mapData.destination, mapData.waypoint);
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
                    setDistance(results.routes[0].legs[0].duration.text);
                    setShowMap(true);
                }
            } else {
                setShowMap(true);
            }
        } else {
            setShowMap(false);
        }


    };

    const submit = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        await homeAPI.updateClient(values, id).catch((e) => {
            toastNotification(e, 1);
        }).then((homeData: any) => {
            if (homeData.success) {
                toastNotification(t("record_successfully_edited"), 2);
            } else {
                toastNotification("something wrong", 1);
            }
        });


    };


    return loading && <div className={cls.block} ref={blockRef}>
        <Formik
            initialValues={data}
            onSubmit={submit}
            //  validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  setFieldValue,
                  errors
              }) => {

                return (
                    <>
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
                                            <span
                                                className={`${cls.updateButtonLabel} ${cls.showMapLabel}`}>Show Map</span>
                                            <ShowMap type={"adminUpdate"} onClick={shopMapHandler}
                                                     className={cls.mapIcon} />
                                        </div>
                                        <div className={cls.updateButton}>
                                            <span
                                                className={`${cls.updateButtonLabel} ${cls.updateLabel}`}>Update</span>
                                            <Update type={"adminUpdate"} onClick={handleSubmit}
                                                    className={cls.updateIcon} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={cls.item1}>
                                <div className={cls.addon} style={{
                                    borderTop: "none"
                                }}>
                                    <div className={cls.addonInfo}>
                                        <p>LOS: <span>{clientById.los}</span></p>
                                        <p>Member unique identifer: <span>{clientById.member_uniqie_identifer}</span>
                                        </p>
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
                                                        {index !== 0 &&
                                                            <div className={cls.item} style={{ alignItems: "center" }}>
                                                                <span className={cls.itemLabel}>Appointment time:</span>
                                                                {/*<span className={cls.itemValue}>{item.drop_down}</span>*/}
                                                                <CustomTimePicker
                                                                    className={cls.timepicker}
                                                                    setFieldValue={setFieldValue}
                                                                    value={item.drop_down}
                                                                    name={`drop_down_${index + 1}`}
                                                                />
                                                                {/*<div className={cls.updateButton}>*/}
                                                                {/*    <span className={cls.updateButtonLabel}>Save</span>*/}
                                                                {/*    <button className={cls.adminUpdate}>*/}
                                                                {/*        <Save type={"adminUpdate"}*/}
                                                                {/*              onClick={() => updateTimeHandler(item.step, `drop_down_${index}`)}*/}
                                                                {/*              className={cls.saveIcon} />*/}
                                                                {/*    </button>*/}
                                                                {/*</div>*/}
                                                            </div>}
                                                        {clientById.address.length !== index + 1 &&
                                                            <div className={cls.item} style={{ alignItems: "center" }}>
                                                                <span className={cls.itemLabel}>Pickup time:</span>
                                                                {/*<span className={cls.itemValue}>{item.pick_up}</span>*/}
                                                                <CustomTimePicker className={cls.timepicker}
                                                                                  setFieldValue={setFieldValue}
                                                                                  value={item.pick_up}
                                                                                  name={`pick_up_${index + 1}`} />
                                                            </div>}
                                                        <div className={cls.item}>
                                                            <span className={cls.itemLabel}>Pickup Address:</span>
                                                            <span className={cls.itemValue}>{item.address}</span>
                                                        </div>
                                                        <div className={cls.item}>
                                                            <span className={cls.itemLabel}>Phone:</span>
                                                            <span className={cls.itemValue}>{item.address_phone}</span>
                                                        </div>
                                                        <div className={cls.item}>
                                                            <span className={cls.itemLabel}>Comment:</span>
                                                            <span
                                                                className={cls.itemValue}>{item.address_comments}</span>
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
                            <div className={cls.infoRightBottomTextareas}>
                                <div className={cls.itemTextarea}>
                                    <Textarea
                                        name={"additionalNote"}
                                        value={values["additionalNote"]}
                                        placeholder={t("additionalNote")}
                                        onChange={(event: any) => {
                                            event.persist();
                                            setFieldValue("additionalNote", event.target.value);
                                        }}
                                        label={t("additionalNote")}
                                    />
                                </div>
                                <div className={cls.itemTextarea}>
                                    <Textarea
                                        name={"operator_note"}
                                        value={values.operator_note}
                                        placeholder={t("operator_note")}
                                        onChange={(event: any) => {
                                            event.persist();
                                            setFieldValue("operator_note", event.target.value);
                                        }}
                                        label={t("operator_note")}
                                    />
                                </div>
                            </div>
                            <div className={cls.addInfo}>
                                <div className={cls.itemsMap}>
                                    <div className={cls.mapBlock}>
                                        {isLoaded && showMap && <div
                                            className={cls.selectDiv}
                                            // style={{
                                            //     flexDirection: blockRef.current.clientHeight > window.innerHeight ? "column" : "row"
                                            // }}
                                        >
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

                                            <div className={cls.mapDiv}>
                                                {directionsResponse && <GoogleMap
                                                    ///  center={center}
                                                    zoom={15}
                                                    mapContainerStyle={{
                                                        width: "100%",
                                                        height: "100%",
                                                        minHeight: "500px"
                                                    }}
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

                                                </GoogleMap>}
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>);
            }}
        </Formik>
    </div>;
};

export default Show;
