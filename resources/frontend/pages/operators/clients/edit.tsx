import React, { useEffect, useState } from "react";
import Edit from "../../layouts/templates/edit/edit";
import { IItem } from "../../layouts/templates/formik-handler/formik-handler";
import { useTranslation } from "react-i18next";
import { AdminApi } from "../../../api/admin-api/admin-api";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../environments";

interface IClientEditItem {
    path: string;
    id?: number;
}

const ClientEdit: React.FC<IClientEditItem> = ({ id }) => {
    const { t } = useTranslation();
    const crudKey = "clients";
    const [data, setData] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [steps, setSteps] = useState<Array<any>>([]);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ["geometry", "drawing", "places"]
    });
    const fields: Array<IItem> = [

        { name: "trip_id", type: "input", label: "trip_id" },
        { name: "name", type: "input", label: "name" },
        { name: "surname", type: "input", label: "surName" },
        { name: "gender", type: "select", label: "gender" },
        { name: "los", type: "input", label: "los" },
        { name: "phone_number", type: "datepicker", label: "phone_number" },
        { name: "date_of_service", type: "datepicker", label: "date_of_service" },
        { name: "appointment_time", type: "datepicker", label: "appointment_time" },
        { name: "pick_up", type: "datepicker", label: "pick_up" },
        { name: "drop_down", type: "datepicker", label: "drop_down" },
        { name: "request_type", type: "select", label: "request_type" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "location", type: "autocomplete", label: "location" },
        { name: "origin_phone", type: "input", label: "origin_phone" },
        { name: "origin_comment", type: "input", label: "origin_comment" },
        { name: "destination_phone", type: "input", label: "destination_phone" },
        { name: "destination_comments", type: "input", label: "destination_comments" },
        { name: "escortType", type: "select", label: "escortType" },
        { name: "type_of_trip", type: "select", label: "type_of_trip" },
        { name: "status", type: "select", label: "status" },
        { name: "member_uniqie_identifer", type: "input", label: "member_uniqie_identifer" },
        { name: "birthday", type: "datepicker", label: "birthday" },
        { name: "miles", type: "input", label: "miles" }


    ];
    async function handleDrawMap(origin: { id:string, address:string }, destination:{ id:string, address:string })  {


        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin.address,
            destination: destination.address,
            travelMode: google.maps.TravelMode.DRIVING,
        })
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
        "name"
        // 'inspection',
        // 'insurance',
        // 'liability',
    ];
    return (
        data &&
            <>
                {isLoaded && directionsResponse && <div >
                    <GoogleMap
                        ///  center={center}
                        zoom={15}
                        mapContainerStyle={{width: "100%", height: "100%"}}
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
                            <DirectionsRenderer directions={directionsResponse}/>
                        )}

                    </GoogleMap>
                    <div style={{border: "1px solid #ddd", padding: "5px", marginTop: "10px"}}>
                        {steps && steps.map((el: any) => {
                            return (
                                <div
                                    // className={s.directions}
                                    dangerouslySetInnerHTML={{__html: el.instructions}}
                                />
                            );
                        })}
                    </div>
                </div>}
                <Edit
                    crudKey={crudKey}
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
