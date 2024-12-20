import FormikEmptyModal from "@/components/form-components/FormikEmptyModal"
import { useState } from "react"
import { MdOutlineCloseFullscreen } from "react-icons/md"
import PasswordChangeForm from "./PasswordChangeForm"

const ChangePassword = ({ isPasswordChanging, setIsPasswordChanging }) => {
    const [initialValues, setInitialValues] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
    })
    const handleModalClose = () => {
        setIsPasswordChanging(false)
    }
    return (
        <>



            {
                isPasswordChanging &&
                <FormikEmptyModal isModalOpen={isPasswordChanging} variant={'half'}
                    title="Change password">
                    <div className='w-full h-[90dvh] md:h-[70dvh] max-h-[90dvh]  
                                  grid grid-rows-[50px_1fr]  '>

                        <div className=' py-1 px-2  h-[50px]'>
                            <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                                <div className='text-xl font-bold' >
                                    <div>Change password</div>
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
                        {isPasswordChanging &&
                            <PasswordChangeForm

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

export default ChangePassword
