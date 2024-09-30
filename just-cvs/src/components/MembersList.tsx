import { useEffect, useState } from "react";
import { fetchAllUsersInfo, fetchAllUsersPreliminaryInfo } from "../api/userApi";
import { UserType, UserPreliminaryType } from "../types/userTypes";

const MembersList: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAllUsersInfo()
            .then(setUsers)
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <div key={user.id}>
                        <li>{user.name}</li>
                        <li>{user.dateOfBirth}</li>
                        <li>
                            {user.languages.map((language) => (
                                <span>{language} </span>
                            ))}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default MembersList