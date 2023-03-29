import React, { ChangeEvent } from "react";

import s from "./input.module.scss";

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
        className,
        labelStyle,
        ref
    }) => {
    // console.log(value)

    return (
        <>
            {error && <div className={s.error}>{error}</div>}
            {label &&
                <label
                    className={`${s.label}`}
                    htmlFor={name}
                    style={{
                        color: value ? "#19347a" :  "#C4C4C4"
                    }}
                >
                    {`${label}`} {isAsterisk && <span>*</span>}
                </label>}
            <input
                id={name}
                name={name}
                className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className} ${error && s.errorBorder}`}
                type={type}
                placeholder={placeholder}
                value={value}
                ref={ref}
                onBlur={onChange}
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
