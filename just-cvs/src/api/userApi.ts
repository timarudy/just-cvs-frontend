import { UserPreliminaryType, UserType } from '../types/userTypes';

const ALL_USERS_DATA_ENDPOINT: string = "https://just-cvs.free.beeceptor.com/all-users";
const ALL_PRELIMINARY_USERS_DATA_ENDPOINT: string = "https://just-cvs.free.beeceptor.com/all-preliminary-users";

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

