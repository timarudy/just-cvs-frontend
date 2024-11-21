import React from 'react';
import { UserPreliminaryType } from '../types/userTypes';
import '/src/css/components/PreliminaryCVCard.css';

const UserInfoCard: React.FC<UserPreliminaryType> = ({ full_name, date_of_birth, photos_link }) => {
    return (
        <section className="user-card">
            <div className="avatar">
                <img
                    src={photos_link || '/path/to/default-avatar.png'} width={280} height={280}
                    alt={`${full_name} avatar`}
                />
            </div>
            <h2>{full_name}</h2>
            <p>{date_of_birth}</p>
            <button>see more &gt;&gt;</button>
        </section>
    );
};

export default UserInfoCard;
