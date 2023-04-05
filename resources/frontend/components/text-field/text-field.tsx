import React, { ChangeEvent } from "react";

import s from "./text-field.module.scss";

interface ITextField {
    name: string;
    value: string;
    placeholder?: string;
    type: string;
    error?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    autoComplete?: string;
    disable?: boolean;
    label?: string;
    className?: string;
}


const TextField: React.FC<ITextField> = (
    {
        name,
        value,
        placeholder = "",
        type = "text",
        error,
        onChange,
        disable,
        label,
        autoComplete = "off",
        className = "",
    }) => (
    <div className={s.inputWrapper}>
        {error && <div className={s.error}>{error}</div>}
        <div className={s.labelWrapper}>
            {
                label &&
                <label className={s.label} htmlFor={name} style={{
                    color: value ? "#194b76" : "#757575"
                }}>
                    {label}
                </label>
            }
        </div>
        <div className={s.textareaWrapper}>
            <textarea
                id={name}
                disabled={disable}
                name={name}
                className={`${className ? className : ""} ${s.input}`}
                // type={type}
                // placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                style={{
                    borderColor: value ? "#194b76" : "#19347a"
                }}
            />
        </div>
    </div>
);

export default TextField;
