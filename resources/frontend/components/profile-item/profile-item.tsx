import React, {FC, useState} from "react"
import cls from "./profile-item.module.scss"

interface ProfileItemProps {
    name: string,
    data: string,
    edit: boolean,
    onFieldEdit: Function,
}

const ProfileItem:FC<ProfileItemProps> = ({
    name,
    data,
    edit,
    onFieldEdit,
}) => {
    return (
        <div className={cls.userData}>
            <span className={cls.title}>{name}:</span>
                {
                    edit ?
                        <input className={cls.editInput} value={data} onChange={(e) => {
                            onFieldEdit(e)
                        }}/>
                        :
                        <span className={cls.value}>{data}</span>
                }
        </div>
    )
}

export default ProfileItem
