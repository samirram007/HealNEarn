import { useUserprofile } from "@/modules/User/hooks/useUserProfile";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import MemberDashboard from "./MemberDashboard";



const Dashboard = () => {

    const userProfile = useUserprofile()
    const roleComponents = {
        admin: <AdminDashboard />,
        member: <MemberDashboard />,
        manager: <ManagerDashboard />,
    };

    return roleComponents[userProfile.data?.data.data.role] || <NotFound />;

}

export default Dashboard