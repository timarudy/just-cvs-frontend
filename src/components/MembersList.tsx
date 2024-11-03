import { useEffect, useState } from "react";
import { fetchAllUsersPreliminaryInfo } from "../api/userApi";
import { UserPreliminaryType } from "../types/userTypes";
import { Link } from "react-router-dom";

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
                            name={user.name}
                            dateOfBirth={user.dateOfBirth}
                            avatarLink={user.avatarLink}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MembersList;