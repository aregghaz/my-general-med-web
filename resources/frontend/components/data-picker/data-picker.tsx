import React, { useState } from "react";
import s from "./data-picker.module.scss";
import Calendar from "react-calendar";
import timestampToDate from "../../utils/timestampToDate";

interface IDataPicker {
    setFieldValue: (name: string, date: string) => void;
    ///value: (name: string, option: IOption) => void
    label: string;
    name: string;
    value: any;
}

const DataPicker: React.FC<IDataPicker> = (
    {
        name,
        setFieldValue,
        label,
        value
    }) => {
    const [show, setShow] = useState<boolean>(false);
    const getDateValue =value ? new Date(value) : new Date().toLocaleDateString();
    return (
        <>
            <label className={s.label}>{label}</label>
            <input type="text" className={s.input} value={timestampToDate(getDateValue)} onClick={() => setShow(!show)}
                   readOnly={true} />
            {show && <div className={s.dataPicker}><Calendar
                formats="MM/dd/yyyy"

                selected={value ? new Date(getDateValue) : new Date().toLocaleDateString()}
                /// className={s.dataPicker}
                aria-label={false}
                onKeyDown={(e: any) => {
                    e.preventDefault();
                }}
                onChange={(date: any) => {
                    setFieldValue(name, date);
                    setShow(!show);
                }}
            /></div>}

        </>
    );
};


export default DataPicker;
