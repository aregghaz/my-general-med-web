import React from "react";

import s from "./radio.module.scss";

interface IRadio {
    onChange: () => void;
    label: string;
    checked: boolean;
}

const Radio: React.FC<IRadio> = (
    {
        onChange,
        label,
        checked
    }) => (
    <div className={s.modernRadioContainer} onClick={onChange}>
        <div className={`${s.radioOuterCircle}  ${!checked && s.unselected}`}>
            <div className={`${checked && s.radioInnerCircle}`} />
        </div>
        <div className={`${s.helperText} ${checked && s.helperTextActive}`}>{label}</div>
    </div>
);


export default Radio;

