import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "../../../store/selectors";
import cls from "./profile.module.scss"

interface VendorProfileProps {
    path?: string,
}

const VendorProfile:FC<VendorProfileProps> = ({

}):React.ReactElement => {
    const userData = useSelector(getUserData).user
    return (
        <div className={cls.profileWrapper}>
            <div className={cls.profile}>
                <div className={cls.userInfo}>
                    {userData.image && <div className={cls.userImage}>
                        <img src={userData.toString()}/>
                    </div>}
                </div>
            </div>
        </div>
    )

}

// userData.address
// userData.birthday
// userData.email
// userData.image (es pahin chka bayc)
// userData.name
// userData.phone_number
// userData.surname

// userData.role (bayc yanm es petqa vor?) zut cuca talis admines te vendor es

export default VendorProfile
