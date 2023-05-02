import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "../../../store/selectors";
import cls from "./profile.module.scss"
import ProfileItem from "../../../components/profile-item/profile-item";

interface VendorProfileProps {
    path?: string,
}

const VendorProfile: FC<VendorProfileProps> = ({}): React.ReactElement => {
    const userData = useSelector(getUserData).user

    const [data, setData] = useState<Array<any>>([])

    useEffect(() => {
        setData(userData ? [
            {
                name: "Name",
                data: `${userData.name} ${userData.surname}`
            },
            {
                name: "Birthdate",
                data: userData.birthday
            },
            {
                name: "Email",
                data: userData.email
            },
            {
                name: "Number",
                data: userData.phone_number,
            },
            {
                name: "Address",
                data: userData.business_address,
            },
        ] : [])
    }, [userData])

    console.log(data, "dataaaaaaa")

    const [edit, setEdit] = useState<boolean>(false)

    return userData && (<>
        <div className={cls.profileWrapper}>
            <div className={cls.profileContainer}>
                <div className={cls.profileImage}>
                    <img src={userData.image ?? "/images/logo.png"} width={220} height={150}/>
                    <div className={cls.userData}>
                        <span className={`${cls.title} ${cls.role}`}>Role: {userData.role.toLocaleLowerCase()}</span>
                    </div>
                </div>
                <div className={cls.profileInfo}>
                    {
                       userData && <>{
                            data.map((item,index) => {
                                return (
                                    <ProfileItem
                                        key={index}
                                        edit={edit}
                                        editHandler={(newData:string) => {
                                            setData([
                                                ...data.filter(value => value.name !== item.name),
                                                {
                                                    name: name,
                                                    data: newData
                                                }
                                            ])
                                        }}
                                        name={item.name}
                                        data={item.data}
                                    />
                                )
                            })
                        }</>
                    }
                    {/*<div className={cls.userData}>*/}
                    {/*    <span className={cls.title}>Birthdate:</span>*/}
                    {/*    <span className={cls.value}>{userData.birthday || "Unspecified"}</span>*/}
                    {/*</div>*/}
                    {/*<div className={cls.userData}>*/}
                    {/*    <span className={cls.title}>Email:</span>*/}
                    {/*    <span className={cls.value}>{userData.email || "Unspecified"}</span>*/}
                    {/*</div>*/}
                    {/*<div className={cls.userData}>*/}
                    {/*    <span className={cls.title}>Phone Number:</span>*/}
                    {/*    <span className={cls.value}>{userData.phone_number || "Unspecified"}</span>*/}
                    {/*</div>*/}
                    {/*<div className={cls.userData}>*/}
                    {/*    <span className={cls.title}>Address:</span>*/}
                    {/*    <span className={cls.value}>{userData.business_address || "Unspecified"}</span>*/}
                    {/*</div>*/}
                    <div className={cls.buttonsBox}>
                        <button onClick={() => {
                            setEdit(!edit)
                        }}>Edit Profile</button>
                    </div>
                </div>

            </div>
            {/*<div className={cls.profileLeft}>*/}
            {/*    <div className={cls.profileUser}>*/}
            {/*        <div className={cls.userImageWrapper}>*/}
            {/*            <img src={userData.image ?? "/images/logo.png"}/>*/}
            {/*        </div>*/}
            {/*        <div className={cls.userData}>*/}
            {/*            <span className={cls.title}>Role: {userData.role.toLocaleLowerCase()}</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={cls.profileRight}>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Full Name:</span>*/}
            {/*        <span className={cls.value}>{userData.name} {userData.surname}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Birthdate:</span>*/}
            {/*        <span className={cls.value}>{userData.birthday || "Unspecified"}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Email:</span>*/}
            {/*        <span className={cls.value}>{userData.email || "Unspecified"}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Phone Number:</span>*/}
            {/*        <span className={cls.value}>{userData.phone_number || "Unspecified"}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Address:</span>*/}
            {/*        <span className={cls.value}>{userData.business_address || "Unspecified"}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <div className={cls.userData}>*/}
            {/*        <span className={cls.title}>Phone Number:</span>*/}
            {/*        <span className={cls.value}>{userData.phone_number || "Unspecified"}</span>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*</div>*/}
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
