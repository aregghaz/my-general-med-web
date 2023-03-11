import React from "react";
import TimePicker from "react-time-picker";
import s from "./timepicker.module.scss";
import Clock from 'react-clock';
import Input from "../input/input";
import getFieldLabel from "../../utils/getFieldLabel";
interface ITextarea {
    name: string
    value: string,
    setFieldValue: (name: string, time: string) => void,
    label: string,
    error?: string
    isAsterisk?: boolean,
}

const TimePickers: React.FC<ITextarea> = (
    {
        name,
        label,
        isAsterisk,
        setFieldValue,
        value,
        error


    }) => (
    <>
        {error && <div className={s.error}>{error}</div>}


        <label
            className={`${s.label}`}
            htmlFor={name}
            style={{
                color: value ? "black" : "gray",
            }}
        >
            {`${label}`} {isAsterisk && <span>*</span>}
        </label>

        <TimePicker
            format={"HH:mm"}
            className={s.time}
            clockIcon={null}
            clearIcon={null}
            amPmAriaLabel={false}
            onChange={(time: string) => setFieldValue(name, time)}
            name={name}
            value={value}
        />
    </>
);


export default TimePickers;
