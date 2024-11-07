import React from 'react';
import { UserPreliminaryType } from '../types/userTypes';
import './PreliminaryCVCard.css';

const UserInfoCard: React.FC<UserPreliminaryType> = ({ name, dateOfBirth, avatarLink }) => {
    return (
        <div className="user-card">
            <div className="avatar">
                <img
                    src={avatarLink || '/path/to/default-avatar.png'} width={280} height={280}
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
