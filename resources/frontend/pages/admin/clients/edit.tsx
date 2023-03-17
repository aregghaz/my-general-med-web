import React, { useEffect, useState } from "react";
import Edit from "../../layouts/templates/edit/edit";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import cls from "../../../components/info-block/info-block.module.scss";

interface IClientEditItem {
    path: string;
    id?: number;
}

const ClientEdit: React.FC<IClientEditItem> = ({ id }) => {
    const { t } = useTranslation();
    const crudKey = "clients";
    const [data, setData] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [steps, setSteps] = useState<Array<any>>([]);

    // const {isLoaded} = useJsApiLoader({
    //     googleMapsApiKey: GOOGLE_API_KEY,
    //     libraries: ["geometry", "drawing", "places"]
    // });
    const fields: Array<IItem> = [
        { name: "fullName", type: "input", label: "fullName" },
        { name: "gender", type: "select", label: "gender" },
        { name: "los", type: "select", label: "los" },
        { name: "artificial_id", type: "select", label: "artificial" },
        { name: "duration_id", type: "select", label: "waitDuration" },
        { name: "price", type: "input", label: "price", inputType: "number" },
        { name: "member_uniqie_identifer", type: "input", label: "member_uniqie_identifer" },
        { name: "request_type", type: "select", label: "request_type" },
        /// { name: "status", type: "select", label: "status" },
        { name: "origin_phone", type: "input", label: "origin_phone", inputType: "tel" },
        { name: "destination_phone", type: "input", label: "destination_phone", inputType: "tel" },
        { name: "birthday", type: "datepicker", label: "birthday" },
        { name: "date_of_service", type: "datepicker", label: "date_of_service" },
        { name: "miles", type: "input", label: "miles", inputType: "disabled" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "height", type: "input", label: "height", inputType: "number" },
        { name: "weight", type: "input", label: "weight", inputType: "number" },
        { name: "origin_comment", type: "textarea", label: "origin_comment" },

        { name: "destination_comments", type: "textarea", label: "destination_comments" },
        { name: "location", type: "autocomplete", label: "location" },

        { name: "pick_up", type: "timePicker", label: "pick_up", inputType: "number" },
        { name: "drop_down", type: "timePicker", label: "drop_down", inputType: "number" },
    ];


    async function handleDrawMap(origin: string, destination: string) {
        console.log(origin, "origin");
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        setSteps(results.routes[0].legs[0].steps);

    }

    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getUserData(crudKey, id);
                // console.log(data)

                ///TODO FIX THIS PART FOR ALL PAGESS
                setData(data);

            }
        )();

    }, []);
    const requiredFields = [
        // 'make',
        // 'model',
        // 'year',
        "fullName"
        // 'inspection',
        // 'insurance',
        // 'liability',
    ];
    return (
        data &&
        <>
            {directionsResponse && <div className={cls.selectDiv}>
                <div className={cls.mapDiv}>
                    <GoogleMap
                        ///  center={center}
                        zoom={15}
                        mapContainerStyle={{ minHeight: 500, height: "100%" }}
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
                                // className={s.directions}
                                dangerouslySetInnerHTML={{ __html: el.instructions }}
                            />
                        );
                    })}
                </div>
            </div>
            }
            <Edit
                crudKey={`admin/${crudKey}`}
                data={data}
                fields={fields}
                title={""}
                requiredFields={requiredFields}
                handleDrawMap={handleDrawMap}
                // originRef={originRef}
                // destiantionRef={destiantionRef}
                children={t("update")}

            />
        </>

    );
};

export default ClientEdit;
