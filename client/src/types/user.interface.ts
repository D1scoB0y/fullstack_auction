export interface IUser {
    id: number,
    username: string,
    email: string,
    email_is_verified: boolean
    phone_number: string|null,
    phone_number_is_verified: boolean,
    is_seller: boolean
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
