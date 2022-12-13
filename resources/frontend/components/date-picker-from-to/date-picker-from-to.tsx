import React from 'react'
import Select, {IOption} from '../select/select'
import {getDaysInMonth, getMonthDays} from '../../constants/utils'
import {months} from '../../constants/helpers'
import {useTranslation} from 'react-i18next'

import s from './date-picker-from-to.module.scss'


interface IDates {
    dayFrom: Array<IOption> | IOption,
    dayTo: Array<IOption> | IOption,
    monthTo: Array<IOption> | IOption,
    monthFrom: Array<IOption> | IOption,
}

interface IDataPicker {
    setFieldValue: (name: string, option: any) => void
    dayFrom: Array<IOption> | IOption
    dayTo: Array<IOption> | IOption
    monthFrom: Array<IOption> | IOption
    monthTo: Array<IOption> | IOption
    label?: string
    dates: IDates[],
    index: number
}

const DataPickerFromTo: React.FC<IDataPicker> = (
    {
        dayFrom,
        dayTo,
        monthFrom,
        monthTo,
        setFieldValue,
        label,
        dates,
        index
    }) => {
    const {t} = useTranslation()
    return (
        <>
            <label className={s.label}>{label}</label>
            <div className={`${s.dataPicker}`}>
                <div className={s.day}>
                    <Select
                        isCheckbox={false}
                        value={dayFrom}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={getMonthDays(getDaysInMonth(new Date()))}
                        placeholder={t(`${getDaysInMonth(new Date())}`)}
                        onChange={(option) => {
                            setFieldValue('dates', [...(dates.slice(0, index)), {
                                ...dates[index],
                                dayFrom: option
                            }, ...dates.slice(index + 1, dates.length)])
                        }}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>
                <div className={s.month}>
                    <Select
                        isCheckbox={false}
                        value={monthFrom}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={months}
                        placeholder={t('month')}
                        onChange={(option) => {
                            setFieldValue('dates', [...(dates.slice(0, index)), {
                                ...dates[index],
                                monthFrom: option
                            }, ...dates.slice(index + 1, dates.length)])
                        }}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>

                <div className={s.fromTo}>-</div>

                <div className={s.day}>
                    <Select
                        isCheckbox={false}
                        value={dayTo}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={getMonthDays(getDaysInMonth(new Date()))}
                        placeholder={t(`${getDaysInMonth(new Date())}`)}
                        onChange={(option) => {
                            setFieldValue('dates', [...(dates.slice(0, index)), {
                                ...dates[index],
                                dayTo: option
                            }, ...dates.slice(index + 1, dates.length)])
                        }}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>
                <div className={s.month}>
                    <Select
                        isCheckbox={false}
                        value={monthTo}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => t(option.value)}
                        options={months}
                        placeholder={t('month')}
                        onChange={(option) => {
                            setFieldValue('dates', [...(dates.slice(0, index)), {
                                ...dates[index],
                                monthTo: option
                            }, ...dates.slice(index + 1, dates.length)])
                        }}
                        isMulti={false}
                        isSearchable={false}
                    />
                </div>
            </div>
        </>
    )
}


export default DataPickerFromTo
