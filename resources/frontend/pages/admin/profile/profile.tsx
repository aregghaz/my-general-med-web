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
    return userData && (
        <div className={cls.profileWrapper}>
            <div className={cls.profile}>
                <div className={cls.profileLeft}>
                    <div className={cls.profileImgWrapper}>
                        <div className={cls.userInfo}>
                            {Object.keys(userData).length > 0 && <div className={cls.userImage}>
                                <img src={userData.toString()}/>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={cls.profileRight}>
                    <div className={cls.nameBox}>
                        <h2>{userData.name} {userData.surname}</h2>
                    </div>

                    <div className={cls.contentBox}>
                        <p><span>Email</span>  {userData.email}</p>
                        <p><span>Phone</span>  {userData.phone_number}</p>
                        <p><span>Birthday</span> {userData.birthday} testBirthday</p>
                        <p><span>Address</span> {userData.business_address} testAddress</p>
                    </div>
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
