import { UserPreliminaryType, UserType } from '../types/userTypes';

const ALL_USERS_DATA_ENDPOINT: string = "http://127.0.0.1:8000/cv-details/";
const ALL_PRELIMINARY_USERS_DATA_ENDPOINT: string = "http://127.0.0.1:8000/personal-details/";

export const fetchAllUsersInfo = async (): Promise<UserType[]> => {
    const response = await fetch(ALL_USERS_DATA_ENDPOINT);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
};

export const fetchAllUsersPreliminaryInfo = async (): Promise<UserPreliminaryType[]> => {
    const response = await fetch(ALL_PRELIMINARY_USERS_DATA_ENDPOINT);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
};