import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Button from "../button/button";
import s from "./autocomplete.module.scss";
import TimePickers from "../time-picker/timepicker";
import Input from "../input/input";
import TextField from "../text-field/text-field";

interface ITextarea {
    values: any,
    name: string,
    setFieldValue: (name: string, date: any) => void;
    /////FIXME ADD TYPES
    handleChange: any,
    handleDrawMap: (origin: string, destination: string) => void;

}

const Autocomplete: React.FC<ITextarea> = (
    {
        ///  name,
        values,
        setFieldValue,
        handleChange,
        handleDrawMap

    }) => {
    const [load, setLoad] = useState(false);
    const [step, setStep] = useState([1, 2]);
    const [count, stepCount] = useState(2);
    const [newStep, setNewStep] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //       ///  console.log(values["origin"]["address"].length, "1111");
    //         if (values["origin"]["address"].length > 0 && values["destination"]["address"].length > 0) {
    //
    //             const results = await getMapResponse(values["origin"]["address"], values["destination"]["address"]);
    //             setFieldValue("miles", parseFloat(results.routes[0].legs[0].distance.text));
    //         ///    console.log(results.routes[0].legs[0].duration.text, "duration");
    //             // setDistance(results.routes[0].legs[0].distance.text);
    //             // setDuration(results.routes[0].legs[0].duration.text);
    //
    //         }
    //     })();
    // }, [load]);
    useEffect(() => {
        (async () => {
            if (!firstLoad) {
                setStep((state) => {
                        return [
                            ...state,
                            step[step.length - 1] + 1
                        ];

                    }
                );
                stepCount(count + 1);
                setFieldValue("count", count + 1);
            }
            setFirstLoad(false);
        })();
    }, [newStep]);


    const addStep = () => {
        return (step.map((item: number) => <div className={s.row}>
            <div className={s.autocompleteWrapper}>
                <GooglePlacesAutocomplete
                    apiKey={GOOGLE_API_KEY}
                    selectProps={{
                        name: `step_${item}`,
                        /// placeholder:'Pick up address',
                        defaultInputValue: values[`step_${item}`],
                        onChange: (async (originValue: any) => {
                            const originData = await geocodeByPlaceId(originValue.value.place_id);
                            setFieldValue(`step_${item}`, {
                                address: originData[0].formatted_address,
                                id: originValue.value.place_id
                            });
                            setLoad(!load);
                        }),
                        className: `${s.input}`,
                        placeholder: `step_${item}`
                    }}
                />
            </div>
            <div className={s.timePickerContainer}>
                <TimePickers
                    label={`pick_${item}`}
                    ////   error={errors[item.name]}
                    name={`time_${item}`}
                    setFieldValue={setFieldValue}
                    value={values[`time_${item}`]}
                    className={s.timePickerWrapper}
                    classNameTime={s.timePicker}
                />

                {item !== 1 && item !== step.length && <TimePickers
                    label={`drop_${item}`}
                    ////   error={errors[item.name]}
                    name={`drop_${item}`}
                    setFieldValue={setFieldValue}
                    value={values[`drop_${item}`]}
                    className={s.timePickerWrapper}
                    classNameTime={s.timePicker}
                />}
            </div>
            <div className={s.timePickerContainer}>
                <Input
                    name={`phone_${item}`}
                    value={values[`phone_${item}`]}
                    type={"number"}
                    className={""}
                    onChange={handleChange}
                    placeholder={`phone_${item}`}
                    label={`phone_${item}`}
                    /// error={errors['`phone_${item}`']}
                />
            </div>
            <div className={s.timePickerContainer}>
                <TextField
                    name={`comment_${item}`}
                    value={values[`comment_${item}`]}
                    type={'text'}
                    placeholder={`comment_${item}`}
                    onChange={handleChange}
                    label={`comment_${item}`}
                />
            </div>
        </div>));
    };

    const addInput = () => {
        setNewStep(!newStep);
    };
    return (<>
        <div className={s.container}>
            <div className={s.inputs}>
                {addStep()}
            </div>
            <Button
                type={"primary"}
                onClick={addInput}
                className={s.button}
            >
                Add step
            </Button>
        </div>
    </>);
};


export default Autocomplete;
