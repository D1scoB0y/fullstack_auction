import { ValidateResult } from "react-hook-form";

import api from "@/api";


type TypeCheckUsernameIsFree = (username: string, userUsername: string|undefined) => Promise<string|null>

const checkUsernameIsFree: TypeCheckUsernameIsFree = async (
    username,
    userUsername,
) => {

    if (!userUsername || username !== userUsername) {
        try {
            await api.get('/auth/check-username', {params: {username}})
            return null
        } catch(e) {
            return 'Имя пользователя уже занято'
        }
    } 
    return null
}


type TypeCheckEmailIsFree = (email: string, userEmail: string) => Promise<string|null>

const checkEmailIsFree: TypeCheckEmailIsFree = async (
    email,
    userEmail,
) => {

    if (!userEmail || email !== userEmail) {
        try {
            await api.get('/auth/check-email', {params: {email}})
            return null
        } catch(e) {
            return 'Эта почта уже занята'
        }
    }
    return null
}


type TypeCheckPhoneNumberIsFree = (phoneNumber: string, userPhoneNumber: string|undefined|null) => Promise<string|null>

const checkPhoneNumberIsFree: TypeCheckPhoneNumberIsFree = async (
    phoneNumber,
    userPhoneNumber,
) => {

    if (!userPhoneNumber || phoneNumber.replaceAll(' ', '') !== userPhoneNumber) {
        try {
            await api.get('/auth/check-phone', {params: {phone_number: phoneNumber}})
            return null
        } catch(e) {
            return 'Этот номер уже занят'
        }
    }
    return null
}



export {
    checkUsernameIsFree,
    checkEmailIsFree,
    checkPhoneNumberIsFree,
}
