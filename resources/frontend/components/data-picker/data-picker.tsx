import React, {ChangeEvent, useState} from 'react'
import Select, {IOption} from '../select/select'
import {getDaysInMonth, getMonthDays} from '../../constants/utils'
import {months} from '../../constants/helpers'
import {useTranslation} from 'react-i18next'
import Input from '../input/input'

import styles from './data-picker.module.scss'
import TextField from '../text-field/text-field'
import Calendar from "react-calendar";


interface IDataPicker {
    setFieldValue: (name: string, option: IOption) => void
    ///value: (name: string, option: IOption) => void
    fieldName:string
    label?: string
    name?: string
    type?: string
    error?: string
  
}

const DataPicker: React.FC<IDataPicker> = ({ fieldName, name, type, setFieldValue, error }) => {
    const [dateValue, setDateValue] = useState(new Date());


  return (
    <>
      <span className={styles.label}>{name}*</span>
      <TextField
        hidden
        label={""}
        name={name}
        type={type}
        value={+dateValue / 1000}
        onChange={() => {
        }}
        autoComplete={false}
        error={error}
      />
      <Calendar
        minDate={new Date()}
        onChange={(date) => {
          setFieldValue(fieldName, +date / 1000);
          setDateValue(date);
        }}
        value={dateValue}
      />
    </>
  );
};


export default DataPicker
