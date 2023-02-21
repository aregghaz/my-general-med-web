import React, { useEffect, useState } from "react";
import cls from "../../../components/info-block/info-block.module.scss";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { homeAPI } from "../../../api/site-api/home-api";
import { clientAction } from "../../../store/client";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../../../environments";
import { getClientData } from "../../../store/selectors";
import { useTranslation } from "react-i18next";
import TimePickers from "../../../components/time-picker/timepicker";
import getFieldLabel from "../../../utils/getFieldLabel";
import TimePicker from "react-time-picker";
import s from "../../../components/time-picker/timepicker.module.scss";
import TextField from "../../../components/text-field/text-field";
import Textarea from "../../../components/textarea/textarea";
import Button from "../../../components/button/button";
import Select, { IOption } from "../../../components/select/select";

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

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["geometry", "drawing", "places"]
    });

    async function calculateRoute(clientById: any) {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: clientById.origin,
            destination: clientById.destination,
            travelMode: google.maps.TravelMode.DRIVING
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        setSteps(results.routes[0].legs[0].steps);
    }
    const [values, setFieldValue] = useState({
        pick_up : clientById.pick_up,
        drop_down: clientById.drop_down,
        additionalNote: clientById.additionalNote,
        status: clientById.type_id

    });
    useEffect(() => {
        (async () => {
            const homeData = await homeAPI.getCLientById(id);
            setStatuses(homeData.status)
            dispatch(clientAction.fetching({ clientById: homeData.client }));
            setFieldValue({
                pick_up : homeData.client.pick_up,
                drop_down: homeData.client.drop_down,
                additionalNote: homeData.client.additionalNote,
                status: homeData.client.type_id

            })
            await calculateRoute(homeData.client);
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, []);

    const handlerUpdate = async () => {
        const homeData = await homeAPI.updateClient(values,id);
    }


    return clientById && <div className={cls.block}>
        <div className={cls.items}>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("fullName")}: </span>
                {clientById.fullName}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("date_of_service")}: </span>
                {clientById.date_of_service}
            </div>
            <div className={cls.item}>
                <TimePicker className={s.time} clockIcon={null} clearIcon={null} onChange={(time:string) => setFieldValue((state:any) => {
                  return {
                      ...state,
                    'pick_up':time
                  }
                }) }  name={'pick_up'} value={clientById.pick_up} />
            </div>

            <div className={cls.item}>
                <TimePicker className={s.time} clockIcon={null} clearIcon={null} onChange={(time:string) => setFieldValue((state:any) => {
                    return {
                        ...state,
                        'drop_down':time
                    }
                }) }  name={'drop_down'} value={clientById.drop_down} />
            </div>

            <div className={cls.item}>
                <span className={cls.b_text}>{t("pick_up_address")}: </span>
                {clientById.origin}

            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("origin_comment")}: </span>
                {clientById.origin_comment}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("origin_phone")}: </span>
                {clientById.origin_phone}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("destination")}: </span>
                {clientById.destination}
            </div>

            <div className={cls.item}>
                <span className={cls.b_text}>{t("destination_comments")}: </span>
                {clientById.destination_comment}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("destination_phone")}: </span>
                {clientById.destination_phone}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("weight")}: </span>
                {clientById.weight}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("height")}: </span>
                {clientById.height}
            </div>
            <div className={cls.item}>
                <span className={cls.b_text}>{t("status")}: </span>
                <Select
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    onChange={(options:IOption) => {
                        return setFieldValue((state: any) => {
                            return {
                                ...state,
                                status:options
                            };
                        });
                    } }

                    options={statuses}
                    value={values.status}
                    name={"Cars"}
                    isMulti={false}
                />
                {/*{clientById.status}*/}
            </div>
            <div className={cls.item}>
                <Textarea
                    name={'additionalNote'}
                    value={values.additionalNote}
                    placeholder={t('additionalNote')}
                    onChange={(event:any) => {
                        event.persist();
                        return setFieldValue((state: any) => {
                            return {
                                ...state,
                                additionalNote: event.target.value
                            };
                        });
                    } }
                    label={t('additionalNote')}
                />
            </div>


            <div>
                <Button type={'adminUpdate'} onClick={handlerUpdate}>
                    Update
                </Button>
            </div>
            {isLoaded && <div className={cls.selectDiv}>

              <div className={cls.mapDiv}>
                  <GoogleMap
                      ///  center={center}
                      zoom={15}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
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
                <div  className={cls.directionDiv}>
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
    </div>;
};

export default Show;
