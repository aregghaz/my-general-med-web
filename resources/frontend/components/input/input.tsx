import React, {ChangeEvent} from 'react'

import s from './input.module.scss'

interface IInput {
    name: string
    value?: string
    placeholder?: string
    type: string
    error?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    autoComplete?: string
    disable?: boolean
    label?: string
    isAsterisk?: boolean
    className?: string
    labelStyle?: string
}

const Input: React.FC<IInput> = (
    {
        name,
        value,
        label,
        autoComplete = 'off',
        disable,
        error,
        onChange,
        placeholder,
        type= 'text',
        isAsterisk,
        className,
        labelStyle
    }) => (
    <>
        {error && <div className={s.error}>{error}</div>}
        {label &&
        <label
            className={`${s.label} ${labelStyle}`}
            htmlFor={name}
        >
            {`${label}`} {isAsterisk && <span>*</span>}
        </label>}
        <input
            id={name}
            disabled={disable}
            name={name}
            className={`${s.input}  ${className} ${error && s.errorBorder}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
        />
    </>
)


export default Input
