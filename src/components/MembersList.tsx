import { useEffect, useState } from "react";
import { fetchAllUsersPreliminaryInfo } from "../api/userApi";
import { UserPreliminaryType } from "../types/userTypes";
// @ts-ignore
import { Link } from "react-router-dom";
import './MembersList.css';

import React from 'react';
import PreliminaryCVCard from './PreliminaryCVCard';

// const usersMock: UserPreliminaryType[] = [
//     { id: 1, name: 'Alice Johnson Boris Boris', dateOfBirth: '15/01/1990', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 2, name: 'Bob Smith', dateOfBirth: '22/07/1985', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 3, name: 'Carol Williams', dateOfBirth: '30/05/1992', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 4, name: 'Alice Johnson', dateOfBirth: '15/01/1990', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 5, name: 'Bob Smith', dateOfBirth: '22/07/1985', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 6, name: 'Carol Williams', dateOfBirth: '30/05/1992', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 7, name: 'Alice Johnson', dateOfBirth: '15/01/1990', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 8, name: 'Bob Smith', dateOfBirth: '22/07/1985', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
//     { id: 9, name: 'Carol Williams', dateOfBirth: '30/05/1992', avatarLink: 'https://od.lk/s/Nl8yMTA1MjE1ODlf/profile%20pic%20default.png' },
// ];

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