import React from "react";
import TimePicker from "react-time-picker";
import s from "./timepicker.module.scss";

interface ITextarea {
    name: string
    value: string,
    setFieldValue: (name: string, time: string) => void,
    label: string,
    error?: string
    isAsterisk?: boolean,
    className?: string,
    classNameTime?: string,
}

const TimePickers: React.FC<ITextarea> = (
    {
        name,
        label,
        isAsterisk,
        setFieldValue,
        value,
        error,
        classNameTime = "",
        className= ""


    }) => (
    <div className={className}>
        {error && <div className={s.error}>{error}</div>}


        <label
            className={`${s.label}`}
            htmlFor={name}
            style={{
                color: value ? "#194b76" : "#C4C4C4"
            }}
        >
            {`${label}`} {isAsterisk && <span>*</span>}
        </label>

        <TimePicker
            format={"HH:mm"}
            className={`${s.time} ${classNameTime} ${value ? s.timeValid : ""}`}
            clockIcon={null}
            clearIcon={null}
            amPmAriaLabel={false}
            onChange={(time: string) => setFieldValue(name, time)}
            name={name}
            value={value}
            locale={"sv-sv"}
        />
    </div>
);


export default TimePickers;
