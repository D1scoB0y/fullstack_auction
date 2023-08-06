import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../stores/authStore"


type TypeUseIsAuthenticated = () => void

const useIsAuthenticated: TypeUseIsAuthenticated = () => {
    const navigation = useNavigate()
    
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) navigation('/')
    }, [isAuthenticated])
}


export default useIsAuthenticated
