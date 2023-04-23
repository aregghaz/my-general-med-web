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
    return userData && (<>
        <div className={cls.profileWrapper}>
            <div className={cls.profileLeft}>
                <div className={cls.profileUser}>
                    <div className={cls.userImageWrapper}>
                        <img src={userData.image ?? "/images/logo.png"}/>
                    </div>
                    <hr/>
                    <div className={cls.userData}>
                        <span className={cls.title}>Role: {userData.role.toLocaleLowerCase()}</span>
                    </div>
                </div>
            </div>
            <div className={cls.profileRight}>
                <div className={cls.userData}>
                    <span className={cls.title}>Full Name:</span>
                    <span className={cls.value}>{userData.name} {userData.surname}</span>
                </div>
                <hr/>
                <div className={cls.userData}>
                    <span className={cls.title}>Birthdate:</span>
                    <span className={cls.value}>{userData.birthday || "Unspecified"}</span>
                </div>
                <hr/>
                <div className={cls.userData}>
                    <span className={cls.title}>Email:</span>
                    <span className={cls.value}>{userData.email || "Unspecified"}</span>
                </div>
                <hr/>
                <div className={cls.userData}>
                    <span className={cls.title}>Phone Number:</span>
                    <span className={cls.value}>{userData.phone_number || "Unspecified"}</span>
                </div>
                <hr/>
                <div className={cls.userData}>
                    <span className={cls.title}>Address:</span>
                    <span className={cls.value}>{userData.business_address || "Unspecified"}</span>
                </div>
                <hr/>
                <div className={cls.userData}>
                    <span className={cls.title}>Phone Number:</span>
                    <span className={cls.value}>{userData.phone_number || "Unspecified"}</span>
                </div>
                <hr/>
            </div>
        </div>
    </>)

}


// userData.address aa
// userData.birthday aa
// userData.email aa
// userData.image (es pahin chka bayc) aa
// userData.name aa
// userData.phone_number aa
// userData.surname aa

// userData.role (bayc yanm es petqa vor?) zut cuca talis admines te vendor es

export default VendorProfile
