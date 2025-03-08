import React from 'react';
import {useUserStore} from "../store/user-store.ts";

const Profile: React.FC = () => {
    const {user: data} = useUserStore();

    console.log('profile user', data.user);

    return (
        <div>
            {data.user.username}
        </div>
    );
};

export default Profile;