import { useUserContext } from "../../context/UserContext"
import { Outlet } from "react-router-dom"


const SellersOnly = () => {
    const { user } = useUserContext()

    if (!user?.isSeller) {
        return <>404</>
    } 

    return <Outlet />
}

export default SellersOnly