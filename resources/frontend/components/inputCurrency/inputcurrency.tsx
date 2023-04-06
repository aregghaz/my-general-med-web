import React, {ChangeEvent, useState} from "react";
import CurrencyInput from "react-currency-input-field";

import s from "./inputcurrency.module.scss";
import {toLocaleString} from "ts-loader";

interface IInput {
    name: string;
    value?: string;
    placeholder?: string;
    type: string;
    error?: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;

    setFieldValue?: (name: string, value: number) => void;
    autoComplete?: string;
    disable?: boolean;
    label?: string;
    isAsterisk?: boolean;
    className?: string;
    labelStyle?: string;
    ref?: string;
    onValueChange?: Function
}

const InputCurrency: React.FC<IInput> = (
    {
        name,
        value,
        label,
        autoComplete = "off",
        disable,
        error,
        onBlur = () => {},
        onChange= () => {},
        onValueChange = () => {},
        setFieldValue = () => {},
        placeholder,
        type = "text",
        isAsterisk,
        className,
        labelStyle,
        ref
    }) => {
    const [myVal, setMyVal] = useState("")
    return (
        <>
            {error && !myVal && <div className={s.error}>{error}</div>}
            {label &&
                <label
                    className={`${s.label}`}
                    htmlFor={name}
                    style={{
                        color: error && !myVal ? "crimson" : myVal ? "#19347a" :  "#757575"
                    }}
                >
                    {`${label}`} {isAsterisk && <span>*</span>}
                </label>}
            {/*<input*/}
            {/*    style={{}}*/}
            {/*    id={name}*/}
            {/*    name={name}*/}
            {/*    className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className} ${error && s.errorBorder}`}*/}
            {/*    type={type}*/}
            {/*    placeholder={placeholder}*/}
            {/*    ref={ref}*/}
            {/*    onBlur={(e) => {*/}
            {/*        onChange(e)*/}
            {/*    }}*/}
            {/*    value={value}*/}
            {/*    onChange={(e) => {*/}
            {/*        onChange(e)*/}
            {/*    }}*/}
            {/*    // onFocus={(event) => {*/}
            {/*    //     if (!event.target.value) {*/}
            {/*    //         event.target.parentElement.children[0].classList.add("aaa")*/}
            {/*    //     }*/}
            {/*    // }}*/}
            {/*    disabled={type === "disabled"}*/}
            {/*    autoComplete={autoComplete}*/}
            {/*/>*/}

            <CurrencyInput
                style={{
                    border: error && !myVal ? "1px solid red" : ""
                }}
                name={name}
                id={name}
                placeholder={placeholder}
                // defaultValue={value && ""}
                // value={value}
                // type={type}
                // @ts-ignore
                ref={ref}
                decimalsLimit={2}
                decimalSeparator={"."}
                className={`${s.input} ${className}`}
                // fixedDecimalLength={2}
                maxLength={6}
                // value={value}
                prefix={"$"}
                defaultValue={value}
                allowNegativeValue={false}
                disabled={type === "disabled"}
                autoComplete={autoComplete}
                decimalScale={2}
                onChange={(e) => {
                    onChange(e)
                }}
                onValueChange={(value,name,values,) => {
                    setMyVal(values.value)
                    setFieldValue(name, values.float ?? undefined)
                    onValueChange(values)
                }}
                onBlur={onBlur}
            />
        </>
    );
};

export default InputCurrency;

// {!String(value ?? "") ? s.blankInput : ""}  ${className} ${error && s.errorBorder}
