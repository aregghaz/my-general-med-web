import React from "react";

import s from "./checkbox.module.scss";

interface ICheckbox {
    name?: string;
    label: string;
    checked: boolean;
    handlerCheckbox?: () => void;
    disabled?: boolean;
    onLabelClick?: () => void;
    className?: string;
    labelStyle?: string;
}

const Checkbox: React.FC<ICheckbox> = (
    {
        handlerCheckbox = () => null,
        label,
        name,
        checked,
        disabled,
        className,
        labelStyle
    }) => (
    <span className={s.checkbox} onClick={handlerCheckbox}>
        <input
            type="checkbox"
            name={name}
            id={name}
            disabled={disabled}
            checked={checked}
            onChange={handlerCheckbox}
        />
        <span className={`${className}`} />
            <label
                className={`${s.checkboxLabel}
                ${labelStyle}`}
                htmlFor={name}
            >
                {label}
            </label>
    </span>
);


export default Checkbox;
