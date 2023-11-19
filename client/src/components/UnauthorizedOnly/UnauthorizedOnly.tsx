import { Outlet } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"


const UnauthorizedOnly = () => {
    const { user } = useUserContext()

    if (user) {
        return <>404 Not Found</>
    }

    return <Outlet />
}

export default UnauthorizedOnly
