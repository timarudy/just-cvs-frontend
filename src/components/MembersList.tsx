import { useEffect, useState } from "react";
import { fetchAllUsersPreliminaryInfo } from "../api/userApi";
import { UserPreliminaryType } from "../types/userTypes";
// @ts-ignore
import { Link } from "react-router-dom";
import '../css/components/MembersList.css';

import React from 'react';
import PreliminaryCVCard from './PreliminaryCVCard';

const MembersList: React.FC = () => {
    const [users, setUsers] = useState<UserPreliminaryType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAllUsersPreliminaryInfo()
            .then((response) => setUsers(response))
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <main>
                <div className="user-grid">
                    {users.map((user, index) => (
                        <PreliminaryCVCard
                            id={user.id}
                            key={index}
                            full_name={user.full_name}
                            date_of_birth={user.date_of_birth}
                            photos_link={user.photos_link}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MembersList;