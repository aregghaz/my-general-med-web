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
    const [values, setFieldValue] = useState(null);
    useEffect(() => {
        (async () => {
            const homeData = await homeAPI.getCLientById(id);
            dispatch(clientAction.fetching({ clientById: homeData.client }));
            await calculateRoute(homeData.client);
        })();
        return () => {
            homeAPI.cancelRequest();
        };

    }, []);
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
                <TimePickers
                    label={t("pick_up")}
                   //// error={errors[item.name]}
                    name={'pick_up'}
                    setFieldValue={setFieldValue}
                    value={clientById.pick_up}
                />
            </div>

            <div className={cls.item}>
                <TimePickers
                    label={t("drop_down")}
                    //// error={errors[item.name]}
                    name={'drop_down'}
                    setFieldValue={setFieldValue}
                    value={clientById.drop_down}
                />
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
