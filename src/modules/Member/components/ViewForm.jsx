import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';

import * as Yup from "yup";

import { FormikViewBox } from '@/components/form-components/FormikViewBox';
import { toast } from 'sonner';


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name field is required"),
    contactNo: Yup.string()
        .nullable().notRequired()
        .matches(/^\d{10}$/, "Contact No. must be exactly 10 digits"),
    alternateContactNo: Yup.string()
        .nullable() // Allows `null` or `undefined`
        .notRequired() // Explicitly mark as optional
        .matches(/^\d{10}$/, "Contact No. must be exactly 10 digits"),
    email: Yup.string()
        .nullable().notRequired()
        .email("Invalid email address"),
    website: Yup.string()
        .nullable().notRequired()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ),
})

const ViewForm = ({ initialValues, entryMode }) => {

    const formik = useFormik({
        initialValues,

    })

    return (
        <div className='max-h-full min-h-full '>
            <div className='   max-h-full min-h-full  w-full mx-auto  flex flex-col    '>
                <div className=' max-h-full min-h-full w-full  grid grid-cols-2   '>
                    <div className='max-h-full min-h-full flex flex-col col-span-2  md:col-span-2   
                    justify-start items-center gap-3   overflow-y-auto p-6 pt-2    '>


                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="name" label="Name" />

                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="address" label="Address" />
                        <FormikViewBox formik={formik} type={"number"} extClass={'align-self-right'} name="contactNo" label="Contact No." />
                        <FormikViewBox formik={formik} type={"number"} extClass={'align-self-right'} name="alternateContactNo" label="Alternate Contact No." />
                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="email" label="Email" />
                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="website" label="Website" />
                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="registrationNo" label="Registration No" />
                        <FormikViewBox formik={formik} type={"text"} extClass={'align-self-right'} name="gstNo" label="Gst No" />

                    </div>


                </div>
                <div className='h-[8rem] max-h-[4rem] md:h-[4rem] md:max-h-[2rem] hidden     w-[98%]  
                border-t-2 border-zinc-500
                bottom-0 mx-auto  flex-col 
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
        </div>
    )
}



export const FeeItems = ({ formik, changes, setChanges }) => {
    const [feeItemsData, setFeeItemsData] = useState(formik.values.fee_items)
    useEffect(() => {
        setFeeItemsData(prev => formik.values.fee_items)

    }, [changes]);
    // console.log(formik.values.fee_items);
    return (
        <>


            {
                feeItemsData && feeItemsData.map((fee_item, index) => (
                    <FeeItemRow key={index} fee_item={fee_item} />
                ))
            }


        </>
    )
}

const FeeItemRow = ({ fee_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>{fee_item.fee_head.name}</div>
                <div className='text-right'>{fee_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const FeeItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const feeHeadRef = useRef()
    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.fee_items[0], fee_head_id: '', amount: ''}



    const addFee = () => {
        const existingHead = formik.values.fee_items.find(x => x.fee_head_id == feeHeadRef.current.value)

        let errorString = ""
        if (existingHead) {
            errorString += "<p>Duplicate Entry</p>"
        }
        if (feeHeadRef.current.value <= 0) {
            errorString += "<p>Fee head is required</p>"
        }
        if (totalAmountRef.current.value <= 0) {
            errorString += "<p>Amount is required</p>"
        }
        if (errorString.length > 0) {
            toast.info(<HTMLContent htmlString={errorString} />, { transition: Flip })
            return
        }

        const initData = {
            fee_head_id: parseFloat(feeHeadRef.current.value),
            fee_head: FeeHeadData.data.data.find(x => x.id == feeHeadRef.current.value),
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.fee_items.push(initData)
        setChanges(prev => prev + 1)
        // console.log( formik.values.fee_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`fee_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={feeHeadRef}
                        onChange={handleDropdownChange}

                        className={`select  w-full  select-primary`}
                    >
                        <option value='0'      >-- please select</option>
                        {
                            FeeHeadData.data.data &&
                            FeeHeadData.data.data.map(({ id: key, name: value }, index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='col-span-4'></div>
                <div className='text-right col-span-2'>
                    <input type={"number"} ref={totalAmountRef} step={"100"} className={`  input mb-0 input-bordered input-primary  `} />
                </div>

                <div className='text-center col-span-2'>
                    <button type="button" onClick={addFee} className='btn btn-primary btn-sm btn-rounded'>Add</button>
                </div>
            </div>


        </>
    )
}

export default ViewForm