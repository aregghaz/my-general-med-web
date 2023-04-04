import React, {useEffect, useState, useRef} from "react";
import s from "./data-picker.module.scss";
import Calendar from "react-calendar";
import timestampToDate from "../../utils/timestampToDate";
import "!style-loader!css-loader!react-calendar/dist/Calendar.css";
import useOnClickOutside from "../../hooks/use-on-click-outside";

interface IDataPicker {
    setFieldValue: (name: string, date: string) => void;
    ///value: (name: string, option: IOption) => void
    label?: string;
    selectRange: boolean,
    type?: boolean,
    name: string;
    value: any;
    style?: any;

    error?: string;
}

const DataPicker: React.FC<IDataPicker> = (
    {
        name,
        setFieldValue,
        selectRange = false,
        label,
        type = false,
        value,
        style = {},
        error
    }) => {
    const [show, setShow] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null)
    // const getDateValue = value ? new Date(value) : 'mm/dd/yyyy';
    const outsideClickHandler = (e: any) => {
        setShow(false)
    }
    useOnClickOutside(calendarRef, outsideClickHandler)
    return (
        <>
            {error && !value && <span className={s.error}>{error}</span>}
            {label && <label style={{color: value ? "#194b76" : "#C4C4C4"}} className={s.label}>{label}</label>}
            <input
                style={{
                    ...style,
                    color: value ? "gray" : "C4C4C4",
                    border: error && !value ? "1px solid red" : type ? "none" : "",
                }} type="text" className={s.input}
                value={value ? timestampToDate(new Date(value)) : timestampToDate(new Date().toLocaleDateString())}
                onClick={() => setShow(!show)}
                readOnly={true}/>
            {show && <div className={s.dataPicker} ref={calendarRef}><Calendar

                value={value ? new Date(value) : new Date()}
                // className={s.dataPicker}
                // className={s.dataPickerAlt}
                selectRange={selectRange}
                onKeyDown={(e: any) => {
                    e.preventDefault();
                }}
                onChange={(date: any) => {
                    setFieldValue(name, new Date(date).toLocaleDateString());
                    setShow(!show);
                }}
            /></div>}

        </>
    );
};


export default DataPicker;
