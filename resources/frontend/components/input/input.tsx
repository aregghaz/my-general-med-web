import React, { ChangeEvent } from "react";

import s from "./input.module.scss";

interface IInput {
    name: string;
    value?: string;
    placeholder?: string;
    type: string;
    error?: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    autoComplete?: string;
    disable?: boolean;
    label?: string;
    isAsterisk?: boolean;
    className?: string;
    labelStyle?: string;
    ref?: string;
    inLogin?:true;
    readOnly?: boolean;
}

const Input: React.FC<IInput> = (
    {
        name,
        value,
        label,
        autoComplete = "off",
        disable,
        error ='',
        onBlur,
        inLogin = false,
        onChange,
        placeholder,
        type = "text",
        isAsterisk,
        onClick,
        className,
        labelStyle,
        readOnly = false,
        ref
    }) => {
    // console.log(value)

    return (
        <>
            {error && !value && !inLogin && <div className={s.error}>{error}</div>}
            {label &&
                <label
                    className={`${s.label}`}
                    htmlFor={name}
                    style={{
                        color: error && !value ? "crimson" : value ? "#19347a" :  ""
                    }}
                >
                    {`${label}`} {isAsterisk && <span>*</span>}
                </label>}
            <input
                id={name}
                name={name}
                className={`${s.input} ${className} ${error && !value ? s.errorInput : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                ref={ref}
                onBlur={onChange}
                readOnly={readOnly}
                onClick={onClick}
                onChange={onChange}
                // onFocus={(event) => {
                //     if (!event.target.value) {
                //         event.target.parentElement.children[0].classList.add("aaa")
                //     }
                // }}
                disabled={type === "disabled"}
                autoComplete={autoComplete}
            />
        </>
    );
};

export default Input;

// className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className}`}
