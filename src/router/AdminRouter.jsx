import PageTitle from "@/components/PageTitle"
import DefaultLayout from "@/layouts/DefaultLayout"
import { Dashboard } from "@/pages/Dashboard"
import { Managers } from "@/pages/Manager"
import { Members } from "@/pages/Member"
import { Payments } from "@/pages/Payment"
import { Reports } from "@/pages/Report"
import { Profile } from "@/pages/User"

import { Navigate, Route, Routes } from "react-router"
const AdminRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="/admin" />} />
            <Route path='/dashboard' element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin" element={<DefaultLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" />} />

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
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />

        </Routes>
    )
}

export default AdminRouter