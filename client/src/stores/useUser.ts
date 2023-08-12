import { useEffect, useState } from "react"
import { getUser } from "@/services/userServices/helperService"
import { IUser } from "../types/user.interface"
import useUserContext from "@/context/useUserContext"


type TypeUseUser = () => IUser|null
const useUser: TypeUseUser = () => {
    
    const [user, setUser] = useState<IUser|null>(null)
    const { token } = useUserContext()

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
