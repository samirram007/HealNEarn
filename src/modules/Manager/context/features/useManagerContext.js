import { use } from "react";
import { ManagerContext } from "../ManagerContextProvider";



export const useManagerContext = () => {
    return use(ManagerContext);
};