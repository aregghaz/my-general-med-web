import React, {useRef, useState} from "react";
import Select from "react-select/async";
import { components, OptionProps, OptionTypeBase } from "react-select";
import { IOption } from "./select";
import { OptionsType } from "react-select/src/types";
import Checkbox from "../checkbox/checkbox";
import useLocalStorage from "../../hooks/use-local-storage";
import { getStyles } from "./common";
import {selectStyles, selectStylesFunction} from "../../utils/cssUtils";
import RemoveIcon from "-!svg-react-loader!../../svgs/removeIcon.svg"

import s from "./select.module.scss";

interface IAsyncSelect {
    isSearchable?: boolean;
    placeholder?: string;
    options?: Array<IOption>;
    onChange: (option: IOption | Array<IOption>) => void;
    getOptionLabel: (option: IOption) => string;
    getOptionValue: (option: IOption) => string;
    defaultValue: Array<IOption> | IOption;
    loadOptions: (inputValue: string, callback: ((options: OptionsType<IOption>) => void)) => Promise<any> | void;
    name?: string;
    label?: string;
    labelStyle?: string;
    error?: any;
    isCheckbox?: boolean;
    isMulti?: boolean;
    allowValueClear?: boolean
}

const Option = (props: OptionProps<OptionTypeBase>) => (
    <components.Option {...props}>
        <Checkbox
            label={props.label}
            checked={props.isSelected}
            labelStyle={props.selectProps.authCheckboxLabelStyle}
        />
    </components.Option>
);

const AsyncSelect: React.FC<IAsyncSelect> = (
    {
        isCheckbox = false,
        isSearchable = false,
        placeholder = "",
        options,
        onChange = () => {},
        getOptionLabel,
        allowValueClear= true,
        getOptionValue,
        error,
        defaultValue,
        loadOptions,
        name,
        label,
        labelStyle,
        isMulti = false
    }) => {
    const [themeType] = useLocalStorage("theme", "light");
    const selectRef = useRef(null)
    const handleOptionRemove: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
        e.preventDefault()
        console.log(selectRef.current.value)
        selectRef.current.select.clearValue()
    }
    const [value, setValue] = useState(null)
    return (
        <>
            {error && !defaultValue && <span className={s.error}>{error}</span>}
            {label && <label
                style={{
                    color: error && !defaultValue ? "red" : defaultValue ? "#194b76" : "#757575",
                }}
                className={`${s.label} ${labelStyle}`}
                htmlFor={name}
            >{label}</label>}
            <div
                className={s.selectWrapper}
            >
                <Select
                    ref={selectRef}
                    isMulti={isMulti}
                    name={name}
                    styles={selectStylesFunction({},error)}
                    options={options}
                    className={s.select}
                    loadOptions={loadOptions}
                    placeholder={placeholder}
                    components={isCheckbox ? {
                        Option,
                        IndicatorSeparator: () => null
                    } : { IndicatorSeparator: () => null }}
                    defaultOptions
                    cacheOptions
                    isSearchable={isSearchable}
                    onChange={(option: IOption) => {
                        onChange(option)
                        setValue(option)
                    }}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    defaultValue={defaultValue}
                />
            </div>
        </>
    );
};


export default AsyncSelect;

// style={{
//     color: defaultValue ? "#194b76" : "#757575"
// }}
