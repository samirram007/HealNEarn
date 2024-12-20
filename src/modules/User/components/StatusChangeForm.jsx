import { useFormik } from 'formik';
import { useState } from 'react';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { Button } from '@/components/ui/button';
import { useMemberContext } from '@/modules/Member/context/features/useMemberContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useUserprofile } from '../hooks/useUserProfile';
import { useUserStatusChangeMutation } from '../hooks/useUserStatusChangeMutation';




const validationSchema = Yup.object().shape({
    status: Yup.string()
        .required("Status is required"), // Name is required
    purchaseDate: Yup.date()
        .required("Activation Date is required")
        .nullable() // Allows empty value, if needed
        .typeError("Activation Date is invalid"),

});

const StatusChangeForm = ({ memberData, initialValues, entryMode, handleModalClose }) => {
    const userStatusChangeMutation = useUserStatusChangeMutation()
    const userProfile = useUserprofile()
    const { data, fetchedData } = useMemberContext()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        console.log("values", values)
        userStatusChangeMutation.mutate(values, {
            onSuccess: () => {
                toast.success('Status change successfully')
                formik.resetForm()
                fetchedData.refetch()
                handleModalClose()
            }
        })

    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values)
            handleFormSubmit(values)
        },
        onError: (error, formik) => {
            toast.error(error.response.data.message)
        },

    })

    return (
        <div className='max-h-full min-h-full grid grid-rows-[200px_1fr]'>
            <div className='mx-auto w-full md:w-1/2 overflow-clip'>
                <div className='flex justify-center items-center mb-4 text-2xl font-bold'>
                    {memberData?.name}
                </div>
                <div className='flex justify-center items-center mb-0'>
                    Code: <span className='font-bold pl-4 uppercase'> {memberData?.username}</span>
                </div>
                <div className='flex justify-center items-center mb-4'>
                    Mob: <span className='font-bold pl-4'>{memberData?.contactNo || '_____N__/__A_____'}</span>
                </div>
                <div className='flex justify-center items-center mb-4 gap-6'>
                    <div className='inline-flex flex-col justify-center items-center'>
                        <div>
                            Current Status
                        </div>
                        <div className='font-bold text-lg uppercase text-slate-500'>
                            {memberData?.status}
                        </div>
                    </div>
                    {

                        initialValues?.status !== memberData?.status &&
                        <>
                            <div className='border-r-2 border-blue-500 p-1 h-10'></div>

                            <div className='inline-flex flex-col justify-center items-center'>
                                <div>
                                    Updatable Status:
                                </div>
                                <div className='font-bold text-lg uppercase text-teal-600 dark:text-teal-500'>

                                    {initialValues?.status}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {
                userProfile.data?.data.data.userType === 'admin' ?

                    <form onSubmit={formik.handleSubmit} className='max-h-full min-h-full grid grid-rows-[1fr_100px] '>
                        <div className='   max-h-full min-h-full  w-full mx-auto  flex flex-col    '>
                            <div className=' max-h-full min-h-full w-full  grid grid-cols-2   '>
                                <div className='max-h-full min-h-full flex flex-col col-span-2  md:col-span-2   
                    justify-start items-center gap-6   overflow-y-auto p-6     '>


                                    {/* <FormikInputBox formik={formik} type={"status"} extClass={'align-self-right'} name="status" label="New status" /> */}
                                    {/* <FormikInputBox formik={formik} type={"text"} extClass={'align-self-right'} name="purchaseNo" label="Pruchase No." /> */}
                                    <FormikInputBox formik={formik} type={"date"} extClass={'align-self-right rtl:mr-3'} name="purchaseDate" label="Activation Date" />

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

                                >
                                    {/* {userStatusChangeMutation.isPending && (
                                <Loader
                                    className='animate-spin h-5 w-5 text-white mr-3'
                                />
                            )} */}
                                    {entryMode === 'delete' ? 'Delete' : 'Activate'}
                                </Button>
                            </div>
                        </div>
                    </form>
                    :
                    <ActivationDateBlock memberData={memberData} />
            }
        </div>
    )
}
export default StatusChangeForm;

const ActivationDateBlock = ({ memberData }) => {
    const purchaseDate = memberData?.purchaseDate
        ? format(new Date(memberData.purchaseDate), 'dd-MMM-yyyy')
        : 'N/A';
    return (

        purchaseDate === 'N/A' ?
            <div className='max-h-full  min-h-full text-teal-700 dark:text-teal-500
w-full mx-auto flex flex-col justify-start items-center gap-4'>
                <div className='uppercase  text-2xl font-semibold border-b-2 border-red-400 '>
                    Activation is pending
                </div>
                <p className='text-center px-2 text-slate-500'>
                    If you already have booked our product please wait for confirmation from our team.
                    <div className='border-t-2 border-zinc-300 dark:border-zinc-600 mx-4 mt-2 italic '>
                        Thank you for your patience
                    </div>
                </p>
            </div>
            :
            <div className='max-h-full  min-h-full text-teal-500
w-full mx-auto flex flex-row justify-center items-start gap-4'>
                <span className=' text-2xl '>Activation Date: </span>
                <span className='uppercase  text-2xl font-semibold '>{purchaseDate}</span>
            </div>

    )
}