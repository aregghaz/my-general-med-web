import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Button from "../button/button";
import s from "./autocomplete.module.scss";
import Input from "../input/input";
import TextField from "../text-field/text-field";
import getMapResponse from "../../utils/googleMap";
import removeIcon from "../../svgs/removeIcon.svg";
import CustomTimePicker from "../custom-time-picker/customTimePicker";
import { useTranslation } from "react-i18next";
import getFieldLabel from "../../utils/getFieldLabel";

interface ITextarea {
    values: any,
    name: string,
    setFieldValue: (name: string, date: any) => void;
    /////FIXME ADD TYPES
    handleChange: any,
    handleDrawMap?: (dataMap: any) => void;
    label?: any;
    error?: any;
    validate?: any,
    requiredFields: Array<string>


}

const Autocomplete: React.FC<ITextarea> = (
    {
        ///  name,
        values,
        setFieldValue,
        handleChange,
        ///   handleDrawMap
        label = "",
        error = "",
        validate,
        requiredFields


    }) => {
    const { t } = useTranslation();
    const [load, setLoad] = useState(false);
    const [step, setStep] = useState(typeof values.stops !== "undefined" ? values.stops : [1, 2]);
    const [count, stepCount] = useState(typeof values.stops !== "undefined" ? values.stops.length : 2);
    const [newStep, setNewStep] = useState(false);
    const [dataMap, setDataMap] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);
    const [allowRemove, setAllowRemove] = useState(false);


    useEffect(() => {
        (async () => {
            await handlerGetMapData()
        })();
    }, [load]);


    const handlerGetMapData = async () => {
        var origin = "";
        var destination = "";
        var waypoint = [];
        for (let i = 1; i <= step.length; i++) {
            console.log(values, "1111111");
            if (i === 1) {
                origin = values[`step_${i}`]["address"] ? values[`step_${i}`]["address"] : values[`step_${i}`];
            } else if (i === step.length) {
                destination = values[`step_${i}`]["address"] ? values[`step_${i}`]["address"] : values[`step_${i}`];
            } else {
                let waypoitnData = values[`step_${i}`]["id"] ? ({ placeId: values[`step_${i}`]["id"] }) : values[`step_${i}`]
                console.log(waypoitnData,'waypoitnDatawaypoitnData');
                waypoint.push({
                    location:
                    waypoitnData
                });
            }
        }
        const results = await getMapResponse(origin, destination, waypoint);
        console.log(results, "milesmiles");
        if (results.routes[0].legs.length > 0) {
            var miles = 0;
            results.routes[0].legs.map((item: any) => {
                miles += parseFloat(item.distance.text);
            });
            console.log(miles, "milesmiles");
            setFieldValue("miles", `${miles} mile`);
            setFieldValue("duration", `${miles} mile`);
        }
    };
    useEffect(() => {
        (async () => {
            console.log(firstLoad);
            if (!firstLoad) {
                // setStep((state: Array<number>) => {
                //         return [
                //             ...state,
                //             step[step.length - 1] + 1
                //         ];
                //
                //     }
                // );
                stepCount(count + 1);
                setFieldValue("count", count);
                setFieldValue("steps", step);
            } else {
                console.log(step,'stepstep');

                setFieldValue("count", count);
            }
            setFirstLoad(false);
        })();
    }, [newStep]);


    const addStep = () => {
        console.log(values,'4444444444');
        return (step.map((item: number) => {
            return (
                <div
                    className={s.row}
                    style={{
                        border: error ? "1px solid crimson" : ""
                    }}
                >
                    <div className={s.autocompleteName}>
                        <span
                            style={{
                                color: error ? "crimson" : ""
                            }}
                        >{`Step ${item}`}</span>
                        { item > 2 && <>
                            <div className={s.deleteIcon}>
                                <button
                                    onClick={() => {
                                        // delete values[item]
                                        //  setFieldValue("steps", values);
                                        step.pop();
                                        setStep(step);
                                        delete values[`step_${item}`];
                                        delete values[`time_${item}`];
                                        delete values[`drop_${item}`];
                                        delete values[`phone_${item}`];
                                        delete values[`comment_${item}`];
                                        setFieldValue("steps", step);
                                        setFieldValue("count", count - 1);
                                        stepCount(count - 1);
                                        setLoad(!load)
                                    }}
                                >
                                    <img src={removeIcon} />
                                </button>
                            </div>
                        </>
                        }
                    </div>
                    <div className={s.autocompleteWrapper}>
                        {error && !values[`step_${item}`] && <div className={s.error}>{error}</div>}
                        <GooglePlacesAutocomplete
                            apiKey={GOOGLE_API_KEY}
                            selectProps={{
                                name: `step_${item}`,
                                defaultInputValue: values[`step_${item}`],
                                onChange: (async (originValue: any) => {
                                    const originData = await geocodeByPlaceId(originValue.value.place_id);
                                    setFieldValue(`step_${item}`, {
                                        address: originData[0].formatted_address,
                                        id: originValue.value.place_id
                                    });
                                    setLoad(!load)
                                }),
                                className: `${s.input}`,
                                placeholder: getFieldLabel(t, `address`, `address`, requiredFields),
                                styles: {
                                    placeholder: (base) => ({
                                        ...base,
                                        color: error && "crimson" || "#757575"
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        zIndex: 9999

                                    }),
                                    control: (base, isActive) => ({
                                        ...base,
                                        border: error && !values[`step_${item}`] ? "1px solid crimson" : !values[`step_${item}`] ? "1px solid #757575" : "1px solid #19347a",
                                        "&:hover": {
                                            border: error && !values[`step_${item}`] ? "1px solid crimson" : !values[`step_${item}`] ? "1px solid #757575" : "1px solid #19347a"
                                        },
                                        boxShadow: isActive ? "none" : "none",
                                        cursor: "pointer"
                                    })

                                }
                            }}
                        />
                    </div>
                    <div className={`${s.timePickerContainer} ${s.timePickerRow}`}>
                        {item !== 1 && <CustomTimePicker
                            label={getFieldLabel(t, "Appointment Time", `drop_${item}`, requiredFields)}
                            //   error={errors[item.name]}
                            name={`drop_${item}`}
                            setFieldValue={setFieldValue}
                            value={values[`drop_${item}`]}
                            className={s.timePickerWrapper}
                            ///   classNameTime={s.timePicker}
                        />}
                        {item !== step.length && <CustomTimePicker
                            label={getFieldLabel(t, "Pickup Time", `time_${item}`, requiredFields)}
                            //   error={errors[item.name]}
                            name={`time_${item}`}
                            setFieldValue={setFieldValue}
                            value={values[`time_${item}`]}
                            className={s.timePickerWrapper}
                            ///   classNameTime={s.timePicker}
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
                            label={`Phone Number`}
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
                            label={`Comment`}
                        />
                    </div>
                </div>
            );
        }));
    };
    const addInput = () => {
        stepCount(count + 1);
        setStep((state: any) => {
            return [
                ...state,
                parseFloat(step[step.length -1]) + 1
            ];
        });
       /// setFieldValue("count", count+1);
        setFieldValue("steps", step);
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
