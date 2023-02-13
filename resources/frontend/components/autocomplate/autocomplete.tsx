import React, { useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Button from "../button/button";
import s from './autocomplete.module.scss'
interface ITextarea {
    values:any,
    name:string,
    setFieldValue: (name: string, date: { address:string, id:string}) => void;
    handleDrawMap: (origin: string, destination: string) => void;

}

const Autocomplete: React.FC<ITextarea> = (
    {
        name,
        values,
        setFieldValue,
        handleDrawMap

    }) => {
    const [value, setValue] = useState(null);

    return ( <>
        <div>
            {values["location"]}
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
                    }),
                    className: `${s.input}`,
                    placeholder: 'Pick up address'
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
                    }),
                    className: `${s.input}`,
                    placeholder: 'Drop down adress'
                }}
            />
            <Button
                type={"primary"}
                onClick={() => handleDrawMap(values["origin"], values["destination"])}
            >
                Show on map
            </Button>
        </div>
    </>)
}

export default Autocomplete
