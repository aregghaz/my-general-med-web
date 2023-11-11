import React, {FC} from "react"
import cls from "./multi-radio.module.scss"
import {IOption} from "../select/select";
import {Translation, useTranslation} from "react-i18next";

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
    const {t} = useTranslation()
    return (
        <div className={cls.radioWrapper}>
            {
                options.map((item,index) => {
                    return (
                        <label htmlFor={id + index}>
                            <div className={cls.radioItem} >
                                <input defaultChecked={JSON.stringify(item) === JSON.stringify(selected)} type={"radio"} name={name} id={id + index} onChange={() => {
                                    onChange(item)
                                }}/>
                                <label htmlFor={id + index}>{t(item.value)}</label>
                            </div>
                        </label>

                    )
                })
            }
        </div>
    )
}

export default multiRadio
