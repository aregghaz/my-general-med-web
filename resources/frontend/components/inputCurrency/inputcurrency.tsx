import React, {ChangeEvent, useState} from "react";
import CurrencyInput from "react-currency-input-field";

import s from "./inputcurrency.module.scss";
import {toLocaleString} from "ts-loader";

interface IInput {
    name: string;
    value?: string;
    placeholder?: string;
    type: string;
    error?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    disable?: boolean;
    label?: string;
    isAsterisk?: boolean;
    className?: string;
    labelStyle?: string;
    ref?: string;
}

const InputCurrency: React.FC<IInput> = (
    {
        name,
        value,
        label,
        autoComplete = "off",
        disable,
        error,
        onBlur,
        onChange,
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
            {error && <div className={s.error}>{error}</div>}
            {label &&
                <label
                    className={`${s.label}`}
                    htmlFor={name}
                    style={{
                        color: myVal ? "#19347a" :  "#C4C4C4"
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
            {/*    value={state}*/}
            {/*    ref={ref}*/}
            {/*    onBlur={(e) => {*/}
            {/*        onChange(e)*/}
            {/*        blurHandler(e)*/}
            {/*    }}*/}
            {/*    onChange={(e) => {*/}
            {/*        onChange(e)*/}
            {/*    }}*/}
            {/*    onFocus={focusHandler}*/}
            {/*    // onFocus={(event) => {*/}
            {/*    //     if (!event.target.value) {*/}
            {/*    //         event.target.parentElement.children[0].classList.add("aaa")*/}
            {/*    //     }*/}
            {/*    // }}*/}
            {/*    disabled={type === "disabled"}*/}
            {/*    autoComplete={autoComplete}*/}
            {/*/>*/}

            <CurrencyInput
                name={name}
                id={name}
                placeholder={placeholder}
                defaultValue={value}
                // type={type}
                // @ts-ignore
                ref={ref}
                decimalsLimit={2}
                className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className} ${error && s.errorBorder}`}
                prefix={"$"}
                fixedDecimalLength={2}
                maxLength={6}
                allowNegativeValue={false}
                disabled={type === "disabled"}
                autoComplete={autoComplete}
                decimalScale={2}
                onChange={(e) => {
                    onChange(e)
                    console.log(myVal)
                }}
                onValueChange={(value,name,values,) => {
                    setMyVal(values.value)
                }}
                onBlur={onBlur}
            />
        </>
    );
};

export default InputCurrency;
