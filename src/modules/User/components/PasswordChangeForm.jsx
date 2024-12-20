import { useFormik } from 'formik';
import { useState } from 'react';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { Button } from '@/components/ui/button';
import { useMemberContext } from '@/modules/Member/context/features/useMemberContext';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useUserPasswordChangeMutation } from '../hooks/useUserPasswordChangeMutation';



const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"), // Name is required
    newPasswordConfirmation: Yup.string()
        .required("New password  is required")
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),

});

const PasswordChangeForm = ({ initialValues, entryMode, handleModalClose }) => {
    const userPasswordChangeMutation = useUserPasswordChangeMutation()

    const { data, fetchedData } = useMemberContext()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        console.log("values", values)
        userPasswordChangeMutation.mutate(values, {
            onSuccess: () => {
                toast.success('Password change successfully')

                formik.resetForm()
                handleModalClose()
            }
        })

    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {

            handleFormSubmit(values)
        },
        onError: (error, formik) => {
            toast.error(error.response.data.message)
        },

    })

    return (
        <form onSubmit={formik.handleSubmit} className='max-h-full min-h-full grid grid-rows-[1fr_8rem] '>
            <div className='   max-h-full min-h-full  w-full mx-auto  flex flex-col    '>
                <div className=' max-h-full min-h-full w-full  grid grid-cols-2   '>
                    <div className='max-h-full min-h-full flex flex-col col-span-2  md:col-span-2   
                    justify-start items-center gap-6   overflow-y-auto p-6     '>


                        <FormikInputBox formik={formik} type={"password"} extClass={'align-self-right'} name="newPassword" label="New password" />
                        <FormikInputBox formik={formik} type={"password"} extClass={'align-self-right'} name="newPasswordConfirmation" label="Confirm new password" />

                    </div>


                </div>


                <div className='h-[8rem] md:h-[10rem]     w-[98%]  
                border-t-2 border-teal-500/50
                bottom-0 mx-auto flex flex-col 
                justify-start items-center  pt-6 md:pt-4  '>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>
                    <Button type="submit" className='  
                    border-2 border-teal-800 justify-center
                     hover:bg-teal-800 hover:text-white'
                        disabled={userPasswordChangeMutation.isPending}
                    >
                        {userPasswordChangeMutation.isPending && (
                            <Loader
                                className='animate-spin h-5 w-5 text-white mr-3'
                            />
                        )}
                        {entryMode === 'delete' ? 'Delete' : 'Confirm'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
export default PasswordChangeForm;