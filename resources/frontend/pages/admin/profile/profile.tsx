import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getUserData} from "../../../store/selectors";

interface VendorProfileProps {
    path?: string,
}

const Profile:FC<VendorProfileProps> = ({

}):React.ReactElement => {
    const userData = useSelector(getUserData).user
    console.log(userData)
    return (
        <div>
            {/*{<span><}*/}
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

export default Profile
