export interface IUser {
    id: number,
    username: string,
    email: string,
    emailisVerified: boolean
    phoneNumber: string|null,
    phoneNUmberIsVerified: boolean,
}

export interface IRegistrationData {
    username: string
    email: string
    password: string
}

export interface ILoginData {
    email: string
    password: string
}
