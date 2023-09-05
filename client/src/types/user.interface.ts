export interface IUser {
    id: number,
    username: string,
    email: string,
    emailIsVerified: boolean
    phoneNumber: string|null,
    phoneNumberIsVerified: boolean,
    isSeller: boolean
    createdViaGoogle: boolean
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
    phoneNumber: string|null
}


export interface ISettingsData extends IUpdateData {}
