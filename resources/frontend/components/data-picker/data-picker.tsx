import React, {ChangeEvent} from 'react'
import Select, {IOption} from '../select/select'
import {getDaysInMonth, getMonthDays} from '../../constants/utils'
import {months} from '../../constants/helpers'
import {useTranslation} from 'react-i18next'
import Input from '../input/input'

import s from './data-picker.module.scss'


interface IDataPicker {
    setFieldValue: (name: string, option: IOption) => void
    ///value: (name: string, option: IOption) => void
    day: IOption | null
    currentMonths: IOption | null
    label?: string
    name?: string
    time: string
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  ///  onChange: (event: ChangeEvent<HTMLInputElement>) => void
    doubleTimeInput?: boolean
}

const DataPicker: React.FC<IDataPicker> = (
    {
        name,
        day,
        currentMonths,
        setFieldValue,
        label,
        time,
        handleChange,
        doubleTimeInput = false,
    }) => {
    const {t} = useTranslation()

    return (
        <>
            <label className={s.label}>{label}</label>
            <div className={`${s.dataPicker} ${doubleTimeInput ? s.wrap : ''}`}>
                <div className={s.day}>
                    <Select
                        isCheckbox={false}
                        value={day}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={getMonthDays(getDaysInMonth(new Date()))}
                        placeholder={t(`${getDaysInMonth(new Date())}`)}
                        onChange={(option: IOption) =>
                            setFieldValue('day', option)}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>
                <div className={s.month}>
                    <Select
                        isCheckbox={false}
                        value={currentMonths}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={months}
                        placeholder={t('month')}
                        onChange={(option: IOption) =>
                            setFieldValue('months', option)}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>
                {doubleTimeInput === false ?
                    <div className={s.time}>
                        <Input
                            name={'time'}
                            value={time}
                            type={'time'}
                            onChange={handleChange}
                        />
                    </div>
                    :
                    <div className={s.doubleTime}>
                        <div className={s.from}>
                            <Input
                                name={'from'}
                                value={time}
                                type={'time'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={s.fromTo}>-</div>
                        <div className={s.to}>
                            <Input
                                name={'to'}
                                value={time}
                                type={'time'}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default DataPicker
