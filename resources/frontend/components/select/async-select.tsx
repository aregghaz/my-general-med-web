import React from "react";
import Select from "react-select/async";
import { components, OptionProps, OptionTypeBase } from "react-select";
import { IOption } from "./select";
import { OptionsType } from "react-select/src/types";
import Checkbox from "../checkbox/checkbox";
import useLocalStorage from "../../hooks/use-local-storage";
import { getStyles } from "./common";

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
            {!label && <label style={{
                color: defaultValue ? "#194b76" : "#C4C4C4"
            }} className={`${s.label} ${labelStyle}`} htmlFor={name}>{"label"}</label>}
            <Select
                isMulti={isMulti}
                name={name}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderButton: "1px solid #D63D3D",
                        width: "100%",
                        outline: "none",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: "1px solid #194b76",
                        boxShadow: "none !important",
                        borderRadius: 0,
                        overflowX: "auto",
                        "&:hover": {
                            boxShadow: "none",
                            // borderBottom: "1px solid #194b76",
                        }
                    }),
                    valueContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        display: "flex",
                        flexDirection: "row"
                    }),
                    // indicatorsContainer: base => ({
                    //     ...base,
                    //     color: "aqua",
                    // }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: "white",
                        marginTop: "3px",
                        zIndex: 9999,
                        outline: "none",
                        boxShadow: "0px 3px 3px gray"
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
                        backgroundColor: "white"
                        /// borderRadius: "5px",
                    }),
                    multiValue: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: 20,
                        // borderRadius: "15px",
                        lineHeight: 1.5,
                        // color: "black",
                        color: "gray",
                        fontWeight: "bold",
                        borderButton: "1px solid #D63D3D",
                        backgroundColor: "white"
                    }),
                    multiValueLabel: (styles: any, { data }: any) => ({
                        ...styles,
                        // backgroundColor: '#6D9886',
                        backgroundColor: "white",
                        color: data.color
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#C4C4C4",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "gray",
                    })
                }}
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
        </>
    );
};


export default AsyncSelect;
