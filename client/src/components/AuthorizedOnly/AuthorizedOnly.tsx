import { useUserContext } from '../../context/UserContext'
import { Outlet } from 'react-router-dom'


const AuthorizedOnly = () => {
    const { user } = useUserContext()

    if (!user) {
        return <>404 not found</>
    }

    return <Outlet />
}

export default AuthorizedOnly
