import React, {FC} from "react";

interface ProfileProps {
    path?: string,
}

const Profile:FC<ProfileProps> = ():React.ReactElement => {
    return (
        <div>
            ADMIN PROFILE
        </div>
    )
}

export default  Profile
