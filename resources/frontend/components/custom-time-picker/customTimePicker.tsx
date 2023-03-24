import React, {FC, useEffect, useState} from "react"
import cls from "./customTimePicker.module.scss"

interface customTimePickerProps {
    labelText?: string,
    value?: string,
    onChange?: Function,
    name: string,
    className?: string,
    setFieldValue?: any,
}

const customTimePicker:FC<customTimePickerProps> = ({
    labelText = "",
    value="",
    onChange= () => {},
    name= "",
    className = "",
}) => {
    const time:Array<string> = value ? value.split(":") : []
    const hoursMinMax:Array<number> = [0,23]
    const minutesMinMax:Array<number> = [0,59]
    const [minutes, setMinutes] = useState("")
    const [hours, setHours] = useState("")
    const handleChange:Function = (type:string ,text:string):void => {
        let min:number,max:number,value:string
        switch (type) {
            case "hours":
                [min,max] = hoursMinMax
                value = Math.max(min, Math.min(max, +text)).toString();
                if (value == "0") {
                    value = "00"
                }
                setHours(value)
                break
            case "minutes":
                [min,max] = minutesMinMax
                value = Math.max(min, Math.min(max, +text)).toString();
                if (value == "0") {
                    value = "00"
                }
                setMinutes(value)
                break
        }
    }
    useEffect(() => {
        handleChange("hours",time[0])
        handleChange("minutes",time[1])
    }, [])
    return (
        <div className={`${cls.container} ${className}`}>
            <div className={cls.top}>
                <span>{labelText}</span>
            </div>
            <div className={cls.bottom}>
                <input
                    type="number"
                    placeholder="--"
                    autoComplete="off"
                    data-input="true"
                    inputMode="numeric"
                    name={name}
                    onChange={(event) => {
                        handleChange("hours",event.target.value)
                        onChange(event)
                    }}
                    value={hours}
                />
                <span>:</span>
                <input
                    type="number"
                    placeholder="--"
                    autoComplete="off"
                    data-input="true"
                    inputMode="numeric"
                    name={name}
                    onChange={(event) => {
                        handleChange("minutes",event.target.value)
                        onChange(event)
                    }}
                    value={minutes}
                />
            </div>
        </div>
    )
}

export default customTimePicker
