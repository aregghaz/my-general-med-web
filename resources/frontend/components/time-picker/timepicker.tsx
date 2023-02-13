import React from 'react'
import TimePicker from 'react-time-picker';
import s from './timepicker.module.scss'
interface ITextarea {
    name: string
    value: string,
    setFieldValue: (name: string, time: string) => void,
    label: string,
    error?:string
    isAsterisk?:boolean,
}

const TimePickers: React.FC<ITextarea> = (
    {
        name,
        label,
        isAsterisk,
        setFieldValue,
        value,
        error,

    }) => (
    <>
        {error && <div className={s.error}>{error}</div>}
        <label
            className={`${s.label}`}
            htmlFor={name}
        >
            {`${label}`} {isAsterisk && <span>*</span>}
        </label>
        <TimePicker className={s.time} clockIcon={null} clearIcon={null} onChange={(time:string) => setFieldValue(name, time) }  name={name} value={value} />

    </>
)

export default TimePickers
