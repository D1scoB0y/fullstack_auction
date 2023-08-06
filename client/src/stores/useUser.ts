import { useEffect, useState } from "react"
import { getUser } from "../services/userService"
import { IUser } from "../types/user.interface"
import useAuthStore from "./authStore"


type TypeUseUser = () => IUser|null
const useUser: TypeUseUser = () => {
    const [user, setUser] = useState<IUser|null>(null)
    const token = useAuthStore(state => state.token)

    useEffect(() => {
        const getUserEffect = async () => {
            if (!token) return
            setUser(await getUser(token))
        }
        getUserEffect()
    }, [token])

    return user
}


export default useUser
