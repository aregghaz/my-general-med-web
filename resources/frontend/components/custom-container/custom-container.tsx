import React from 'react'

import s from './custom-container.module.scss'

interface ICustomContainer {
    className?: string
}

const CustomContainer: React.FC<ICustomContainer> = (
    {
        children,
        className
    }) => (
    <div className={`${s.container} ${className} `}>
        {children}
    </div>
)


export default CustomContainer

