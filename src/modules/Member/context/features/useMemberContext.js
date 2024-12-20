import { use } from "react";
import { MemberContext } from "../MemberContextProvider";



export const useMemberContext = () => {
    return use(MemberContext);
};