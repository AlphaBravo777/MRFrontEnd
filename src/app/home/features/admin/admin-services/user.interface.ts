export class IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export class IUserBackend {
    id: number;
    username: string; // Max 150 characters
    password: string; // Min 8 characters
    email: string;  // Optional
    first_name: string; // Max 30 characters
    last_name: string; // Max 150 characters
}

export function userBackendFactory(userDetail: IUser): IUserBackend {
    return {
        id: userDetail.id || null,
        email: userDetail.email || null,
        first_name: userDetail.firstName || null,
        last_name: userDetail.lastName || null,
        password: userDetail.password || null,
        username: userDetail.username || null,
    };
}
