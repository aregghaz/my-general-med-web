import React from "react";
import Select from "react-select/async";
import { components, OptionProps, OptionTypeBase } from "react-select";
import { IOption } from "./select";
import { OptionsType } from "react-select/src/types";
import Checkbox from "../checkbox/checkbox";
import useLocalStorage from "../../hooks/use-local-storage";
import { getStyles } from "./common";
import {selectStyles} from "../../utils/cssUtils";

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
        getOptionValue,
        error ='',
        defaultValue,
        loadOptions,
        name,
        label,
        labelStyle,
        isMulti = false
    }) => {
    const [themeType] = useLocalStorage("theme", "light");
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
                style={{
                    border: error && !defaultValue ? "1px solid red" : ""
                }}
            >
                <Select
                    isMulti={isMulti}
                    name={name}
                    // styles={{
                    //     control: (baseStyles, state) => ({
                    //         ...baseStyles,
                    //         display: "flex",
                    //         borderButton: "1px solid #D63D3D",
                    //         width: "100%",
                    //         outline: "none",
                    //         border: "none",
                    //         boxShadow: "none !important",
                    //         borderRadius: 0,
                    //         overflowX: "auto",
                    //         "&:hover": {
                    //             boxShadow: "none",
                    //             // borderBottom: "1px solid #194b76",
                    //         }
                    //     }),
                    //     valueContainer: (baseStyles, state) => ({
                    //         ...baseStyles,
                    //         display: "flex",
                    //         flexDirection: "row"
                    //     }),
                    //     // indicatorsContainer: base => ({
                    //     //     ...base,
                    //     //     color: "aqua",
                    //     // }),
                    //     menu: (baseStyles, state) => ({
                    //         ...baseStyles,
                    //         backgroundColor: "white",
                    //         marginTop: "3px",
                    //         zIndex: 9999,
                    //         right: "0",
                    //         outline: "none",
                    //         display: "inline-block",
                    //         width: 'auto',
                    //         boxShadow: "0px 3px 3px gray"
                    //     }),
                    //     option: (baseStyles, state) => ({
                    //         ...baseStyles,
                    //         display: "inline-block",
                    //         width: 'auto',
                    //         padding: "15px",
                    //         fontWeight: 500,
                    //         backgroundColor: state.isSelected ? "#D63D3D" : baseStyles.backgroundColor
                    //     }),
                    //     menuList: base => ({
                    //         ...base,
                    //         // kill the white space on first and last option
                    //         padding: "0px",
                    //         display: "flex",
                    //         flexDirection: "column",
                    //         backgroundColor: "white"
                    //         /// borderRadius: "5px",
                    //     }),
                    //     multiValue: (baseStyles, state) => ({
                    //         ...baseStyles,
                    //         fontSize: 20,
                    //         // borderRadius: "15px",
                    //         // lineHeight: 1.5,
                    //         // color: "black",
                    //         color: "gray",
                    //         fontWeight: "bold",
                    //         borderButton: "1px solid #D63D3D",
                    //         backgroundColor: "white"
                    //     }),
                    //     multiValueLabel: (styles: any, {data}: any) => ({
                    //         ...styles,
                    //         // backgroundColor: '#6D9886',
                    //         backgroundColor: "white",
                    //         color: data.color
                    //     }),
                    //     placeholder: (base) => ({
                    //         ...base,
                    //         color: "#757575",
                    //     }),
                    //     singleValue: (base) => ({
                    //         ...base,
                    //         color: "gray",
                    //     })
                    // }}
                    styles={selectStyles}
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
                    onChange={onChange}
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
