import React, {ChangeEvent} from 'react'

import s from './text-field.module.scss'

interface ITextField {
    name: string
    value: string
    placeholder?: string
    type: string
    error?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    autoComplete?: string
    disable?: boolean
    label?: string
    className?: string
}


const TextField: React.FC<ITextField> = (
    {
        name,
        value,
        placeholder = '',
        type = 'text',
        error,
        onChange,
        disable,
        label,
        autoComplete = 'off',
        className = ''
    }) => (
    <div className={s.inputWrapper}>
        {error && <div className={s.error}>{error}</div>}
        <input
            id={name}
            disabled={disable}
            name={name}
            className={className ? className : s.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
        />
        {
            label &&
            <label className={s.label} htmlFor={name}>
                {label}
            </label>
        }
    </div>
)

export default TextField
