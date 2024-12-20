import { lazy } from 'react';
const Profile = lazy(() => import('./components/Profile'))
const ProfileSettings = lazy(() => import('./components/ProfileSettings'))
const ChangePassword = lazy(() => import('./components/ChangePassword'))
export { ChangePassword, Profile, ProfileSettings };




