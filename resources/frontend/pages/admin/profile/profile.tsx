import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "../../../store/selectors";
import cls from "./profile.module.scss"
import ProfileItem from "../../../components/profile-item/profile-item";
import Modal from "react-modal";
import Password from "../../../components/password/password";

interface VendorProfileProps {
    path?: string,
}

const VendorProfile: FC<VendorProfileProps> = ({}): React.ReactElement => {
    const userData = useSelector(getUserData).user

    const [data, setData] = useState<Array<any>>([])
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordAgain: "",
    })
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
    const [change, setChange] = useState<boolean>(false)
    const [error, setError] = useState<any>({})



    const customStyles: ReactModal.Styles = {
        content: {
            position: "fixed",
            border: "none",
            overflowY: "unset",
            outline: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
        },
        overlay: {
            zIndex: 500,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(5px)"
        }
    };

    const handlePasswordInputChange = (e:any) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordChange = () => {
        setError({})
        if (password.newPassword !== password.newPasswordAgain) {
            setError({
                passwordNotMatch: true
            })
        }
    }


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

                    {
                        change && <>
                                <Modal className={cls.modalBody}
                                       isOpen={change}
                                       style={customStyles}
                                       onRequestClose={() => {
                                           setChange(false)
                                       }}>
                                        <div className={cls.modalTop}>
                                            <div className={cls.closeButton} onClick={() => {
                                                    setChange(false)
                                                }
                                            }>
                                                <i className="cancelicon-"/>
                                            </div>


                                        </div>
                                    <div className={cls.passwordsContainer}>
                                        <Password
                                            name={"currentPassword"}
                                            value={password.currentPassword}
                                            onChange={handlePasswordInputChange}
                                            label={""}
                                            placeholder={"Current password"}
                                            autoComplete={"new-password"}
                                        />
                                        <Password
                                            name={"newPassword"}
                                            value={password.newPassword}
                                            onChange={handlePasswordInputChange}
                                            label={""}
                                            placeholder={"New password"}
                                            autoComplete={"new-password"}
                                        />
                                        <Password
                                            name={"newPasswordAgain"}
                                            value={password.newPasswordAgain}
                                            onChange={handlePasswordInputChange}
                                            label={""}
                                            placeholder={"New password again"}
                                            autoComplete={"new-password"}
                                        />
                                        {
                                            error.passwordNotMatch && <>
                                                <p style={{color: "red"}} className={cls.text}>Password not matching</p>
                                            </>
                                        }
                                        <button onClick={handlePasswordChange} className={cls.changePasswordEnd}>change password</button>
                                    </div>
                                </Modal>
                        </>
                    }


                    <div className={cls.buttonsBox}>
                        {
                            edit ? <>
                                    <button onClick={() => {
                                setEdit(false)
                                }}>Save</button>
                                    <button className={cls.changePassword} onClick={() => {
                                        setChange(true)

                                    }
                                    }>
                                        Change Password
                                    </button>
                                </>
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


// userData.address aa
// userData.birthday aa
// userData.email aa
// userData.image (es pahin chka bayc) aa
// userData.name aa
// userData.phone_number aa
// userData.surname aa

// userData.role (bayc yanm es petqa vor?) zut cuca talis admines te vendor es

export default VendorProfile
