import React from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import Checkbox from "../checkbox/checkbox";
import ReactSelect, { components, MenuProps, OptionProps, OptionTypeBase } from "react-select";
import { useTranslation } from "react-i18next";

import s from "./select.module.scss";
import Button from "../button/button";

export interface IOption {
    id: number;
    value: string;
    label: string;
    slug?: string;
}

export interface IOptionMultiselect {
    id: number;
    value: string;
    label?: string;
    slug?: string;
}

interface IMenu {
    props: MenuProps<OptionTypeBase>;
    handlerAdd: () => void;
}

interface ISelect {
    isCheckbox?: boolean
    isSearchable?: boolean
    placeholder?: string
    options?: Array<IOption>
    onChange: (option: IOption | Array<IOption>) => void
    getOptionLabel: (option: IOption) => string
    getOptionValue: (option: IOption) => string
    value?: Array<IOption> | IOption
    name?: string
    label?: string
    isMulti?: boolean
    authCheckboxLabelStyle?: string
    labelStyle?: string
    handlerMenuOpen?: () => void
    handlerMenuClose?: () => void
    hideSelectedOptions?: boolean
    isMenuAdd?: boolean,
    handlerAdd?: () => void
}


const Option = (props: OptionProps<OptionTypeBase>) => {
    const { t } = useTranslation();
    return (<components.Option {...props}>
        <Checkbox
            label={t(props.label)}
            checked={props.isSelected}
            labelStyle={props.selectProps.authCheckboxLabelStyle}
        />
    </components.Option>);
};

const Menu: React.FC<IMenu> = ({ props, handlerAdd }) => {
    const { t } = useTranslation();
    return (
        <components.Menu {...props} >
            <>
                <ul className={s.customMenuList}>
                    {
                        props.options
                            .map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => props.selectOption(item)}
                                    >
                                        {t(item.label)}
                                    </li>
                                )
                            )
                    }
                </ul>
                <div className={s.addBtn} onClick={handlerAdd}>
                    {t("add_new_type")} +
                </div>
            </>
        </components.Menu>
    );
};

const Select: React.FC<ISelect> = (
    {
        isCheckbox = false,
        isSearchable = false,
        placeholder = "",
        options,
        onChange,
        getOptionLabel,
        getOptionValue,
        value,
        name,
        label,
        isMulti = false,
        authCheckboxLabelStyle,
        labelStyle,
        handlerMenuClose,
        handlerMenuOpen,
        hideSelectedOptions = false,
        isMenuAdd = false,
        handlerAdd
    }
) => {
    const { t } = useTranslation();
    const [themeType] = useLocalStorage("theme", "light");
    const markAll = () => {
        onChange(options);
    };

    const unMarkAll = () => {
        onChange([]);
    };

    return (
        <>
            <label className={`${s.label} ${labelStyle} `} htmlFor={name}>{label}</label>
            <div className={s.buttonsSelect}>
                {isMulti && <><Button
                    type={"green"}
                    onClick={markAll}
                    key={"one"}
                    className={s.selectButton}
                >

                    {t(`admin:mark_all`)}
                </Button>
                    <Button
                        type={"green"}
                        onClick={unMarkAll}
                        key={"two"}
                        className={s.selectButton}
                    >
                        {t(`admin:remove_all`)}
                    </Button></>}
            </div>
            <ReactSelect
                isMulti={isMulti}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: '#D63D3D',
                        /// backgroundColor: '#545cd8',
                        //  borderRadius: "15px"
                        borderButton: "1px solid #D63D3D",
                        height: 50,
                        outline: "none"
                    }),
                    menu: base => ({
                        ...base,
                        // override border radius to match the box
                        ///borderRadius: 0,
                        // backgroundColor: '#6D9886',
                        backgroundColor: "white",
                        // borderRadius: "15px",
                        // kill the gap
                        marginTop: 0
                    }),
                    menuList: base => ({
                        ...base,
                        // kill the white space on first and last option
                        padding: 0,
                        // borderRadius: "15px",
                        backgroundColor: "white"
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
                        color: data.color
                    })
                }}
                className={s.select}
                placeholder={placeholder}
                components={isCheckbox ? {
                        Option,
                        IndicatorSeparator: () => null
                    }
                    :
                    isMenuAdd ?
                        {
                            Menu: (props) => <Menu props={props} handlerAdd={handlerAdd} />,
                            IndicatorSeparator: () => null
                        }
                        :
                        { IndicatorSeparator: () => null }}
                options={options}
                name={name}
                isSearchable={isSearchable}
                onChange={onChange}
                ///FIXME: ADD THIS PART
                /// isOptionDisabled={() => 5 >= 3}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                value={value}
                authCheckboxLabelStyle={authCheckboxLabelStyle}
                onMenuOpen={handlerMenuOpen}
                onMenuClose={handlerMenuClose}
                hideSelectedOptions={hideSelectedOptions}
            />

        </>
    );
};

export default Select;
