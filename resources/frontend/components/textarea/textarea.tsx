import React, { ChangeEvent } from "react";

import s from "./textarea.module.scss";

interface ITextarea {
    name: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    label?: string;
    readonly?: boolean
}

const Textarea: React.FC<ITextarea> = (
    {
        name,
        placeholder,
        onChange,
        value,
        label,
        readonly = false,
    }) => (
    <>
        <label className={s.label} htmlFor={name}>{label}</label>
        <textarea
            name={name}
            className={s.textarea}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            readOnly={readonly}
        />
    </>
);

export default Textarea;
