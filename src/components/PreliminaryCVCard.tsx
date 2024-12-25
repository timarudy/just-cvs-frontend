import React from 'react';
import { Link } from 'react-router-dom';
import { UserPreliminaryType } from '../types/userTypes';
import '../css/components/PreliminaryCVCard.css';

const PreliminaryCVCard: React.FC<UserPreliminaryType> = ({ id, full_name, date_of_birth, photos_link }) => {
    return (
        <section className="user-card">
            <div className="avatar">
                <img
                    src={photos_link || '../../ui samples/mutual samples/profile pic default.png'} width={280} height={280}
                    alt={`${full_name} avatar`}
                />
            </div>
            <h2>{full_name}</h2>
            <p>{date_of_birth}</p>
            <Link to={`/cv-details/${id}`} className="user-card-link"><button>see more &gt;&gt;</button></Link>
        </section>
    );
};

export default PreliminaryCVCard;
