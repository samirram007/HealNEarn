
import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router';
import * as Yup from "yup";
import { useLogin } from '../hooks/useLogin';

const validationSchema = Yup.object().shape({
  password: Yup.string().required("password field is required"),
  username: Yup.string()
    .required("code is required"),
});
// initailValues must be Empty before Production
const initialValues = {
  username: import.meta.env.VITE_ADMIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
};
const Login = () => {

  const navigate = useNavigate()

  const loginMutation = useLogin()
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      loginMutation.mutate(values), {
        onSuccess: () => {
          //console.log("Login Successfull");

          navigate('/')
        }
        ,
        onError: (error) => {
          // console.error("Login failed:", error);
        },
      }
    },
    onError: (error, formik) => {
      toast.error(error.response.data.message)
    },

  })

  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   const payload = {
  //     email: usernameRef.current.value,
  //     password: passwordRef.current.value,
  //   };
  //   console.log("payload", payload);


  // };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center relative">

      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: 'url(/images/launch.jpg)' }}></div>


      <div className="relative motion-preset-slide-right 
       bg-slate-500 bg-opacity-50 backdrop-filter 
       backdrop-blur-md border border-white border-opacity-30 py-6 px-6 rounded-2xl shadow-xl w-[400px] sm:w-[460px] transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-200 mb-6 text-center">
          {import.meta.env.VITE_APP_NAME}
        </h2>
        <p className="text-center text-gray-300 mb-6">Please login to your account</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">

            <FormikInputBox formik={formik} type={"text"} maxLength={10}
              extClass={'align-self-right uppercase '} name="username" label="Code" placeholder={'Enter Code'} />

          </div>

          <div className="mb-6">
            <FormikInputBox formik={formik} type={"password"}
              extClass={'align-self-right'} name="password" label="Password" />


          </div>

          <FormikSubmit
            formik={formik}
            label="Login"

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
          dont have an account?
          <NavLink to={'/register'}
            className="px-2 text-blue-800 hover:text-blue-600 font-semibold transition-colors duration-200 ease-in-out">
            Click   here
          </NavLink>
        </div>
        <div className="text-center mt-4 hidden">
          <a href="#" className="text-slate-100 hover:text-blue-500
           font-semibold transition-colors duration-200 ease-in-out">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
