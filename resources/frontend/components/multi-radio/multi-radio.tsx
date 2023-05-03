import React, {FC} from "react"
import cls from "./multi-radio.module.scss"
import {IOption} from "../select/select";

interface multiRadioProps {
    options: {id: number, value: string, label: string}[],
    name: string,
    id: string,
    onChange?: Function
    selected?: IOption
}

const multiRadio:FC<multiRadioProps> = ({
    options,
    name,
    id,
    onChange= () => {},
    selected
}) => {
    return (
        <div>
            {
                options.map((item,index) => {
                    return (
                        <div>
                            <input defaultChecked={JSON.stringify(item) === JSON.stringify(selected)} type={"radio"} name={name} id={id + index} onChange={() => {
                                onChange(item)
                            }}/>
                            <label htmlFor={id + index}>{item.value}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default multiRadio
