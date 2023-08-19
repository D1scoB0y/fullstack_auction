export interface IUser {
    id: number,
    username: string,
    email: string,
    email_is_verified: boolean
    phone_number: string|null,
    phone_number_is_verified: boolean,
    is_seller: boolean
    created_via_google: boolean
}

export interface ILoginData {
    email: string
    password: string
}

export interface IRegistrationData extends ILoginData {
    username: string
}

export interface IUpdateData {
    username: string
    email: string
    phone_number: string|null
}

export interface ISettingsData extends IUpdateData {}
