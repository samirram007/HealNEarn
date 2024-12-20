import { useFormik } from 'formik';
import { useState } from 'react';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { toast } from 'sonner';
import { useMemberContext } from '../context/features/useMemberContext';
import { useMemberDeleteMutation } from '../hooks/useMemberDeleteMutation';
import { useMemberStoreMutation } from '../hooks/useMemberStoreMutation';
import { useMemberUpdateMutation } from '../hooks/useMemberUpdateMutation';


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name field is required"), // Name is required
    contactNo: Yup.string()
        .nullable() // Allows null value
        .notRequired() // Makes the field optional
        .matches(/^\d{10}$/, "Contact No. must be exactly 10 digits"), // Validates if provided
    email: Yup.string()
        .nullable() // Allows null value
        .notRequired() // Makes the field optional
        .email("Invalid email address"), // Validates email format if provided
});

const EntryForm = ({ initialValues, entryMode, handleModalClose }) => {
    const memberStoreMutation = useMemberStoreMutation()
    const memberUpdateMutation = useMemberUpdateMutation()
    const memberDeleteMutation = useMemberDeleteMutation()
    const { data, fetchedData } = useMemberContext()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            memberStoreMutation.mutate(values, {
                onSuccess: () => {
                    toast.success('Member created successfully')
                    fetchedData.refetch()
                    formik.resetForm()
                    handleModalClose()
                }
            })
        } else if (entryMode === 'edit') {
            memberUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            memberDeleteMutation.mutate(values)
        }
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
        <form onSubmit={formik.handleSubmit} className='max-h-full min-h-full'>
            <div className='   max-h-full min-h-full  w-full mx-auto  flex flex-col    '>
                <div className=' max-h-full min-h-full w-full  grid grid-cols-2   '>
                    <div className='max-h-full min-h-full flex flex-col col-span-2  md:col-span-2   
                    justify-start items-center gap-6   overflow-y-auto p-6     '>


                        <FormikInputBox formik={formik} type={"text"} extClass={'align-self-right'} name="name" label="Name" />
                        <FormikInputBox formik={formik} type={"number"} extClass={'align-self-right'} name="contactNo" label="Contact No." />
                        <FormikInputBox formik={formik} type={"text"} extClass={'align-self-right'} name="email" label="Email" />

                    </div>


                </div>
                <div className='h-[8rem] md:h-[10rem]     w-[98%]  
                border-t-2 border-zinc-500
                bottom-0 mx-auto flex flex-col 
                justify-start items-center  pt-6 md:pt-4  '>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>
                    <button type="submit" className='btn btn-primary btn-wide 
                    border-2 border-zinc-800 justify-center
                     hover:bg-zinc-800 hover:text-white'>
                        {entryMode === 'delete' ? 'Delete' : 'Confirm'}
                        {formik.isSubmitting && (
                            <span
                                className='spinner-border spinner-border-sm ms-2'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EntryForm

