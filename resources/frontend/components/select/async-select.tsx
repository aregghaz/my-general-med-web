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
            {label && <label className={`${s.label} ${labelStyle} `} htmlFor={name}>{label}</label>}
            <Select
                isMulti={isMulti}
                name={name}
                styles={{
                    ...(getStyles(themeType)),
                    control: (base, props) => ({
                        ...base,
                        // borderButton: "1px solid #D63D3D",
                        outline: "none",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderRadius: "none",
                        borderBottom: "1px solid black",
                    }),
                    menu: (base, props) => ({
                        ...base,
                        backgroundColor: "white",
                        marginTop: "3px",
                        zIndex: 9999,
                        outline: "none",
                        boxShadow: "none",
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: "15px",
                        backgroundColor: state.isSelected ? "#C54944" : baseStyles.backgroundColor
                    }),
                    menuList: base => ({
                        ...base,
                        // kill the white space on first and last option
                        padding: "0px",
                        // borderRadius: "15px",
                        backgroundColor: "white",
                        borderRadius: "none",
                    }),
                    multiValue: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: 20,
                        // borderRadius: "15px",
                        lineHeight: 1.5,
                        // color: "black",
                        color: "#393E46",
                        fontWeight: "bold",
                        ///borderRadius: 10,
                        //   border: "1px solid #D63D3D",

                        /// backgroundColor: '#545cd8',
                        //  borderRadius: "15px"
                        borderButton: "1px solid #D63D3D",
                        // backgroundColor: '#6D9886',
                        backgroundColor: "white"
                        /// padding: "0 8px"
                    }),
                    multiValueLabel: (styles: any, { data }: any) => ({
                        ...styles,
                        // backgroundColor: '#6D9886',
                        backgroundColor: "white",
                        color: data.color,
                    })
                }}
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
