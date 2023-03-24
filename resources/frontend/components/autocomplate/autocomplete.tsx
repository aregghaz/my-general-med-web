import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Button from "../button/button";
import s from "./autocomplete.module.scss";
import TimePickers from "../time-picker/timepicker";
import Input from "../input/input";
import TextField from "../text-field/text-field";
import getMapResponse from "../../utils/googleMap";

interface ITextarea {
    values: any,
    name: string,
    setFieldValue: (name: string, date: any) => void;
    /////FIXME ADD TYPES
    handleChange: any,
    handleDrawMap?: (dataMap: any) => void;

}

const Autocomplete: React.FC<ITextarea> = (
    {
        ///  name,
        values,
        setFieldValue,
        handleChange
        ///   handleDrawMap

    }) => {
    const [load, setLoad] = useState(false);
    const [step, setStep] = useState(typeof values.stops !== "undefined" ? values.stops : [1, 2]);
    const [count, stepCount] = useState(typeof values.stops !== "undefined" ? values.stops.length : 2);
    const [newStep, setNewStep] = useState(false);
    const [dataMap, setDataMap] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        (async () => {
            var origin = "";
            var destination = "";
            var waypoint = [];
            for (let i = 1; i <= count; i++) {
                if (i === 1) {
                    origin = values[`step_${i}`]["address"];
                } else if (i === count) {
                    destination = values[`step_${i}`]["address"];
                } else {
                    waypoint.push({
                        location:
                            {
                                placeId: values[`step_${i}`]["id"]
                            }
                    });
                }
            }
            const results = await getMapResponse(origin, destination, waypoint);
            if (results.routes[0].legs.length > 0) {
                var miles = 0;
                results.routes[0].legs.map((item: any) => {
                    miles += parseFloat(item.distance.text);
                });
                setFieldValue("miles", `${miles} mile`);
                setFieldValue("duration", `${miles} mile`);
            }
        })();
    }, [load]);

    useEffect(() => {
        (async () => {
            if (!firstLoad) {
                setStep((state: Array<number>) => {
                        return [
                            ...state,
                            step[step.length - 1] + 1
                        ];

                    }
                );
                stepCount(count + 1);
                setFieldValue("count", count + 1);
                setFieldValue("steps", step);
            } else {
                setFieldValue("count", count);
            }
            setFirstLoad(false);
        })();
    }, [newStep]);


    const addStep = () => {
        return (step.map((item: number) => {
            let allowBorder = -1;
            if (count > 2) {
                allowBorder = count % 2 === 0 ? count - 2 : count - 1;
            }
            return (
                <div className={s.row} style={{ borderBottom: allowBorder >= item ? "0.1px solid black" : "" }}>
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
                        {item !== step.length && <TimePickers
                            label={`pick_${item}`}
                            ////   error={errors[item.name]}
                            name={`time_${item}`}
                            setFieldValue={setFieldValue}
                            value={values[`time_${item}`]}
                            className={s.timePickerWrapper}
                            classNameTime={s.timePicker}
                        />}

                        {item !== 1 && <TimePickers
                            label={`drop_${item}`}
                            ////   error={errors[item.name]}
                            name={`drop_${item}`}
                            setFieldValue={setFieldValue}
                            value={values[`drop_${item}`]}
                            className={s.timePickerWrapper}
                            classNameTime={s.timePicker}
                        />}
                        {/*<CustomTimePicker value={"12:34"} name={"asd"} labelText={`drop_${item}`}/>*/}
                        {/*<CustomTimePicker name={"asd"} labelText={`drop_${item}`}/>*/}
                    </div>
                    <div className={`${s.timePickerContainer} ${s.phoneInput}`}>
                        <Input
                            name={`phone_${item}`}
                            value={values[`phone_${item}`]}
                            type={"number"}
                            className={""}
                            onChange={handleChange}
                            // placeholder={`phone_${item}`}
                            label={`phone_${item}`}
                            /// error={errors['`phone_${item}`']}
                        />
                    </div>
                    <div className={s.timePickerContainer}>
                        <TextField
                            name={`comment_${item}`}
                            value={values[`comment_${item}`]}
                            type={"text"}
                            placeholder={`comment_${item}`}
                            onChange={handleChange}
                            label={`comment_${item}`}
                        />
                    </div>
                </div>
            );
        }));
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
