import React from 'react';
import { UserPreliminaryType } from '../types/userTypes';

const UserInfoCard: React.FC<UserPreliminaryType> = ({ name, dateOfBirth, avatarLink }) => {
    return (
        <div className="user-card">
            <div className="avatar">
                <img
                    src={avatarLink || '/path/to/default-avatar.png'}
                    alt={`${name} avatar`}
                />
            </div>
            <h2>{name}</h2>
            <p>{dateOfBirth}</p>
            <button>see more &gt;&gt;</button>
        </div>
    );
};

export default UserInfoCard;
