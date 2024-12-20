import PageTitle from '@/components/PageTitle'
import GuestLayout from '@/layouts/GuestLayout'

import { Login, Registration } from '@/pages/Auth'
import { AboutUs, ContactUs, HotelBooking } from '@/pages/Landing'
import { Navigate, Route, Routes } from 'react-router'

const GuestRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<GuestLayout />} >


        {/* <Route index element={<Landing />} /> */}
        <Route index element={<>
          <PageTitle title="Login" />
          <Login />
        </>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book" element={<HotelBooking />} />

        <Route path="/login" element={
          <>
            <PageTitle title="Login" />
            <Login />
          </>
        }
        />
        <Route path="/register" element={
          <>
            <PageTitle title="Register" />
            <Registration />
          </>
        }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default GuestRouter