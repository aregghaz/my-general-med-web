import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Button from "../button/button";
import s from "./autocomplete.module.scss";
import getMapResponse from "../../utils/googleMap";

interface ITextarea {
    values: any,
    name: string,
    setFieldValue: (name: string, date: any) => void;
    handleDrawMap: (origin: string, destination: string) => void;

}

const Autocomplete: React.FC<ITextarea> = (
    {
        name,
        values,
        setFieldValue,
        handleDrawMap

    }) => {
    const [load, setLoad] = useState(false);
    useEffect(() => {
        (async () => {
            console.log(values["origin"]["address"].length, "1111");
            if (values["origin"]["address"].length > 0 && values["destination"]["address"].length > 0) {

                const results = await getMapResponse(values["origin"]["address"], values["destination"]["address"]);
                setFieldValue("miles", parseFloat(results.routes[0].legs[0].distance.text));
                console.log(results.routes[0].legs[0].duration.text, "duration");
                // setDistance(results.routes[0].legs[0].distance.text);
                // setDuration(results.routes[0].legs[0].duration.text);

            }
        })();
    }, [load]);

    return (<>
        <div>
            <GooglePlacesAutocomplete
                apiKey={GOOGLE_API_KEY}
                selectProps={{
                    name: "origin",
                    /// placeholder:'Pick up address',
                    defaultInputValue: values["origin"],
                    onChange: (async (originValue: any) => {
                        const originData = await geocodeByPlaceId(originValue.value.place_id);
                        setFieldValue("origin", {
                            address: originData[0].formatted_address,
                            id: originValue.value.place_id
                        });
                        setLoad(!load);
                    }),
                    className: `${s.input}`,
                    placeholder: "Pick up address"
                }}
            />
            <GooglePlacesAutocomplete
                apiKey={GOOGLE_API_KEY}
                selectProps={{
                    name: "destination",
                    defaultInputValue: values["destination"],
                    onChange: (async (destination: any) => {
                        const destinationData = await geocodeByPlaceId(destination.value.place_id);
                        setFieldValue("destination", {
                            address: destinationData[0].formatted_address,
                            id: destination.value.place_id
                        });
                        setLoad(!load);
                    }),
                    className: `${s.input}`,
                    placeholder: "Drop down address"
                }}
            />
            <Button
                type={"primary"}
                onClick={() => handleDrawMap(values["origin"], values["destination"])}
            >
                Show on map
            </Button>
        </div>
    </>);
};

export default Autocomplete;
