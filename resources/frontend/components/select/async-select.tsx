import React from 'react'
import Select from 'react-select/async'
import {components, OptionProps, OptionTypeBase} from 'react-select'
import {IOption} from './select'
import {OptionsType} from 'react-select/src/types'
import Checkbox from '../checkbox/checkbox'
import useLocalStorage from '../../hooks/use-local-storage'
import {getStyles} from './common'

import s from './select.module.scss'

interface IAsyncSelect {
    isSearchable?: boolean
    placeholder?: string
    options?: Array<IOption>
    onChange: (option: IOption | Array<IOption>) => void
    getOptionLabel: (option: IOption) => string
    getOptionValue: (option: IOption) => string
    defaultValue: Array<IOption> | IOption
    loadOptions: (inputValue: string, callback: ((options: OptionsType<IOption>) => void)) => Promise<any> | void;
    name?: string
    label?: string
    labelStyle?: string
    isCheckbox?: boolean
    isMulti?: boolean
}

const Option = (props: OptionProps<OptionTypeBase>) => (
    <components.Option {...props}>
        <Checkbox
            label={props.label}
            checked={props.isSelected}
            labelStyle={props.selectProps.authCheckboxLabelStyle}
        />
    </components.Option>
)

const AsyncSelect: React.FC<IAsyncSelect> = (
    {
        isCheckbox = false,
        isSearchable = false,
        placeholder = '',
        options,
        onChange,
        getOptionLabel,
        getOptionValue,
        defaultValue,
        loadOptions,
        name,
        label,
        labelStyle,
        isMulti = false
    }) => {
    const [themeType] = useLocalStorage('theme', 'light')
    return (
        <>
            <label className={`${s.label} ${labelStyle} `} htmlFor={name}>{label}</label>
            <Select
                // styles={{
                //     control: (baseStyles: any) => ({
                //         ...baseStyles,
                //         border: "1px solid #727272",
                //         height: 50,
                //         outline: "none",
                //     }),
                // }}
                isMulti={isMulti}
                name={name}
                styles={getStyles(themeType)}
                options={options}
                className={s.select}
                loadOptions={loadOptions}
                placeholder={placeholder}
                components={isCheckbox ? {
                    Option,
                    IndicatorSeparator: () => null
                } : {IndicatorSeparator: () => null}}
                defaultOptions
                cacheOptions
                isSearchable={isSearchable}
                onChange={onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                defaultValue={defaultValue}

            />
        </>
    )
}


export default AsyncSelect
