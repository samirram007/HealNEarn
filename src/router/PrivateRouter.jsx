
import { useUserprofile } from "@/modules/User/hooks/useUserProfile";
import { useEffect } from "react";
import AdminRouter from "./AdminRouter";
import ManagerRouter from "./ManagerRouter";
import MemberRouter from "./MemberRouter";

const PrivateRouter = () => {
    const userProfile = useUserprofile()
    useEffect(() => {
        userProfile.refetch(); // Manually trigger the query
    }, []);
    // if (userProfile.isFetching) {
    //     return
    //     // return <Loader classname="h-20 w-20 text-yellow-300" />
    // }
    if (userProfile.isError) {
        console.log("Error From Profile.jsx", userProfile.error);
    }



    const roleComponents = {
        admin: <AdminRouter />,
        member: <MemberRouter />,
        manager: <ManagerRouter />,
    };

    return roleComponents[userProfile.data?.data.data.role];
    // return roleComponents[userProfile.data?.data.data.role] || <GuestRouter />;


}

export default PrivateRouter