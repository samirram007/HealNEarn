import PageTitle from "@/components/PageTitle"
import DefaultLayout from "@/layouts/DefaultLayout"
import { Dashboard } from "@/pages/Dashboard"
import { Managers } from "@/pages/Manager"
import { Members } from "@/pages/Member"
import { Payments } from "@/pages/Payment"
import { Reports } from "@/pages/Report"
import { Profile } from "@/pages/User"

import { Navigate, Route, Routes } from "react-router"
const ManagerRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/manager" />} />
            <Route path='/dashboard' element={<Navigate to="/manager/dashboard" />} />
            <Route path="/manager" element={<DefaultLayout />}>
                <Route index element={<Navigate to="/manager/dashboard" />} />

                <Route
                    path="profile"
                    element={
                        <>
                            <PageTitle title="Profile  " />
                            <Profile />
                        </>
                    }
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="member" element={<Members />} />
                <Route path="manager" element={<Managers />} />
                <Route path="payment" element={<Payments />} />
                <Route path="report" element={<Reports />} />




                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
            <Route path="*" element={<Navigate to="/manager/dashboard" />} />
        </Routes>
    )
}


export default ManagerRouter