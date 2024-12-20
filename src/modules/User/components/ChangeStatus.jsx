import FormikEmptyModal from "@/components/form-components/FormikEmptyModal"
import { useState } from "react"
import { MdOutlineCloseFullscreen } from "react-icons/md"
import StatusChangeForm from "./StatusChangeForm"


const ChangeStatus = ({ memberData, isStatusChanging, setStatusChanging }) => {
    const [initialValues, setInitialValues] = useState({
        userId: memberData?.id,
        productAmount: 300,
        productId: 1,
        productNo: '1',
        purchaseDate: new Date().toISOString().split('T')[0],
        status: "active",
    })
    const handleModalClose = () => {
        // alert('Modal closed')
        setStatusChanging(false)
        console.log(isStatusChanging)
    }
    return (
        <>


            {
                isStatusChanging &&

                <FormikEmptyModal isModalOpen={isStatusChanging}
                    variant={'half'} >
                    <div className='w-full h-[90dvh] md:h-[70dvh] max-h-[90dvh]  
                                  grid grid-rows-[50px_1fr]  '>

                        <div className=' py-1 px-2  h-[50px]'>
                            <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                                <div className='text-xl font-bold' >
                                    <div>Update status</div>
                                </div>
                                <button onClick={handleModalClose} type="button"
                                    className='rounded-full p-2
                                          bg-slate-50/5 text-orange-500 cursor-pointer
                                          hover:text-yellow-500 hover:bg-slate-600
                                          active:text-orange-600 active:touch-pinch-zoom '>
                                    <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                                </button>
                            </div>
                        </div>
                        {isStatusChanging &&
                            <StatusChangeForm
                                memberData={memberData}
                                initialValues={initialValues}
                                handleModalClose={handleModalClose}
                                entryMode={'edit'} />
                        }

                    </div>
                </FormikEmptyModal>



            }
        </>
    )
}

export default ChangeStatus
