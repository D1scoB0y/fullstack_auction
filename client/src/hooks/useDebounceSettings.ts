import debounce from "lodash.debounce";
import useUser from "../stores/useUser";
import { UseFormSetError, UseFormTrigger } from "react-hook-form";
import { ISettingsData } from "../types/user.interface";
import { checkEmail, checkPhone, checkUsername } from "../services/userService";


type TypeDebouncedCallback = (callback: (inputValue: string) => Promise<void>) => Function

type TypeUseDebounceSettings = (
    trigger: UseFormTrigger<ISettingsData>,
    setError: UseFormSetError<ISettingsData>,
) => {
    checkUsername: Function,
    checkPhone: Function,
    checkEmail: Function,
}


const useDebounceSettings: TypeUseDebounceSettings = (trigger, setError) => {

    const user = useUser()

    const debouncedCallback: TypeDebouncedCallback = (
        callback
    ) => debounce(callback, 250)

    return ({
        checkUsername: debouncedCallback(

            async (username: string) => {

                if (username === user?.username) {
                    
                    return
                }

                if (await checkUsername(username)) {
                    
                    return
                }
                setError('username', {message: 'Имя пользователя уже занято'})
            }
        ),

        checkEmail: debouncedCallback(

            async (email: string) => {

                if (email === user?.email) {
                    trigger('email')
                    return
                }
                    
                if (await checkEmail(email)) {
                    trigger('email')
                    return
                }
                setError('email', {message: 'Эта почта уже занята'})
            }
        ),

        checkPhone: debouncedCallback(

            async (phoneNumber: string) => {

                if (phoneNumber === user?.phone_number) {
                    trigger('phone_number')
                    return
                }
                    
                if (await checkPhone(phoneNumber)) {
                    trigger('phone_number')
                    return
                }

                
                setError('phone_number', {message: 'Этот номер уже занят'})
            }
        )
    })
}


export default useDebounceSettings
