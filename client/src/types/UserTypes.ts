import { type } from "os"

interface IUser {
    id: string
    username: string
    email: string
    phone_number: string
    email_is_verified: boolean
    phone_number_is_verified: boolean
}

interface IUserRegistration {
    username: string
    email: string
    phone_number: string
    password: string
}

interface IUserLogin {
    email: string
    password: string
}


type TypeRegistration = (username: string, email: string, phone_number: string, password: string) => Promise<IUser>
type TypeLogin = (email: string, password: string) => Promise<IUser>
type TypeLogout = () => Promise<void>


export type {
    IUser,
    IUserLogin,
    IUserRegistration,
    TypeRegistration,
    TypeLogin,
    TypeLogout,
}