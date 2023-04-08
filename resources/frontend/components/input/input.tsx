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
    readOnly?: boolean;
}

const Input: React.FC<IInput> = (
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
        onClick,
        className,
        labelStyle,
        readOnly = false,
        ref
    }) => {
    // console.log(value)

    return (
        <>
            {error && !value && <div className={s.error}>{error}</div>}
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
                style={{
                    border: error && !value ? "1px solid crimson" : ""
                }}
                id={name}
                name={name}
                className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className}`}
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
