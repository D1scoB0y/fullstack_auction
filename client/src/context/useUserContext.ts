import { useContext } from "react";

import { UserContext } from "./UserContext";
import { IUserContext } from "./UserContext";

const useUserContext = () => useContext(UserContext) as IUserContext


export default useUserContext 
