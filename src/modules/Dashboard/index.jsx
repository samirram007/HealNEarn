import { lazy } from 'react';
const Dashboard = lazy(() => import('./components/Dashboard'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const Calender = lazy(() => import('./components/Calender'))
const ManagerDashboard = lazy(() => import('./components/ManagerDashboard'))
const MemberDashboard = lazy(() => import('./components/MemberDashboard'))
export { AdminDashboard, Calender, Dashboard, ManagerDashboard, MemberDashboard };




