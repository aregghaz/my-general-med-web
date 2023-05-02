import React, {FC, useState} from "react"
import cls from "./profile-item.module.scss"

interface ProfileItemProps {
    name: string,
    data: string,
    edit: boolean,
    editHandler: Function
}

const ProfileItem:FC<ProfileItemProps> = ({
    name,
    data,
    edit,
    editHandler = () => {},
}) => {
    return (
        <div className={cls.userData}>
            <span className={cls.title}>{name}:</span>
                {
                    edit ?
                        <input className={cls.editInput} defaultValue={data} onChange={e => {
                            editHandler(e.target.value)
                        }}/>
                        :
                        <span className={cls.value}>{data}</span>
                }
        </div>
    )
}

export default ProfileItem
