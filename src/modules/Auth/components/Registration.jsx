
import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useFormik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import * as Yup from "yup";
import { useRegistration } from '../hooks/useRegistration';
import ReferralBlock from './ReferralBlock';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required"),
});
// initailValues must be Empty before Production

const Registration = () => {

  const navigate = useNavigate()

  const registrationMutation = useRegistration()
  const [isChanging, setChanging] = useState(true)
  const [initialValues, setInitialValues] = useState({
    name: '',
    contactNo: '',
    email: '',
    password: '',
    parentId: null,
    managerId: null,
    userType: 'member',
  })
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      registrationMutation.mutate(values), {
        onSuccess: () => {
          console.log("Registration Successfull");
          navigate('/')
        }
        ,
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    },
    onError: (error, formik) => {
      toast.error(error.response.data.message)
    },

  })



  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 
    via-gray-800 to-gray-700 flex items-center justify-center relative">

      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: 'url(/images/launch.jpg)' }}></div>


      <div className="relative motion-preset-slide-right 
       bg-slate-500 bg-opacity-50 backdrop-filter 
       backdrop-blur-md border border-white border-opacity-30 py-6 px-6 rounded-2xl shadow-xl w-[400px] sm:w-[460px] transform transition-all hover:shadow-2xl">
        <h2 className="text-2xl sm:text-2xl font-bold text-gray-100 mb-1 text-center">
          {import.meta.env.VITE_APP_NAME}
        </h2>
        <div className='text-center text-gray-400 mb-4'>
          <span className='border-b-2 border-teal-400 pb-2'>

            Registration
          </span>
        </div>
        <ReferralBlock
          initialValues={initialValues}
          setInitialValues={setInitialValues}
          isChanging={isChanging}
          setChanging={setChanging}
        />
        {
          !isChanging &&

          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">

                <FormikInputBox formik={formik} type={"text"} extClass={'align-self-right'} name="name" label="Name" />

              </div>

              <div className="mb-6">
                <FormikInputBox formik={formik} type={"password"} extClass={'align-self-right'} name="contactNo" label="Contact No." />
              </div>
              <div className="mb-6">
                <FormikInputBox formik={formik} type={"password"} extClass={'align-self-right'} name="email" label="Email" />
              </div>

              <FormikSubmit
                formik={formik}
                label="Register"

                className="w-full py-3 bg-gradient-to-r
            outline-0
            border-0
            shadow-md

             from-blue-600 to-teal-600 
             text-white font-bold rounded-lg
              hover:from-blue-700 hover:to-teal-700 
             transition-all active:ring-4 active:ring-blue-300/20
             focus:bg-blue-600 active:text-white
             "
              />

            </form>

            <div className="text-center mt-4 ">
              already have an account?
              <NavLink to={'/login'}
                className="px-2 text-blue-600 hover:text-blue-600 font-semibold transition-colors duration-200 ease-in-out">
                Click here
              </NavLink>
            </div>
            <div className="text-center mt-4 hidden">
              <a href="#" className="text-slate-100 hover:text-blue-500
           font-semibold transition-colors duration-200 ease-in-out">
                Forgot your password?
              </a>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Registration;
