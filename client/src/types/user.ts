export interface User {
    userId: number
    username: string
    email: string
    emailIsVerified: boolean
    phoneNumber: string | null
    phoneNumberIsVerified: boolean
    isSeller: boolean
    createdViaGoogle: boolean
    contacts: string | null
}

export interface GetToken {
    email: string
    password: string
}

export interface CreateUser extends GetToken {
    username: string
}

export interface UpdateUser {
    username: string
    email: string
    phoneNumber: string | null
    contacts: string | null
}
