import useAuthStore from "./AuthStore"
import { IUser } from "@/types/user.interface"
import { getUser } from "@/service/userService"
import { useEffect, useState } from "react"
import useStore from "./useStore"

type TypeUseUser = () => IUser|null
const useUser: TypeUseUser = () => {
    const [user, setUser] = useState<IUser|null>(null)

    const token = useStore(useAuthStore, state => state.token)

    useEffect(() => {
        const getUserEffect = async () => {
            if (!token) return
            const user = await getUser(token)
            setUser(user)
        }
        getUserEffect()
    }, [token])

    return user
}


export default useUser
