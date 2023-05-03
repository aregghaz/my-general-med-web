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
                                        onFieldEdit={(e:any) => {
                                            console.log(data.filter(value => value.name !== item.name))
                                            setData([
                                                ...data.map(value => {
                                                    if (value.name === item.name) {
                                                        return {
                                                            name: item.name,
                                                            data: e.target.value
                                                        }
                                                    }
                                                    return value
                                                }),
                                            ])
                                        }}
                                        name={item.name}
                                        data={item.data}
                                    />
                                )
                            })
                        }</>
                    }
                    <div className={cls.buttonsBox}>
                        {
                            edit ? <><button onClick={() => {
                                    setEdit(false)
                                }}>Save</button></>
                                :
                                <button onClick={() => {
                                    setEdit(true)
                                }}>Edit Profile</button>
                        }
                    </div>
                </div>

            </div>

        </div>
    </>)

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
