import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { useState } from 'react';
import { MdOutlineAddCircleOutline, MdOutlineCloseFullscreen } from 'react-icons/md';
import EntryForm from './EntryForm';
import ReferralBlock from './ReferralBlock';

const Create = ({ modal }) => {
  const editData = {
    name: '',
    contactNo: '',
    email: '',
    managerId: null,
    parentId: null,
    userType: 'member'
  }

  const [entryMode, setEntryMode] = useState('create');
  const [isModalOpen, setModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(editData)
  const [isChanging, setChanging] = useState(false)
  const handleModalClose = () => {
    setModalOpen(false)
    setInitialValues(editData)
    setChanging(false)
  }

  return (

    <>

      <button onClick={() => setModalOpen(true)}
        className="       cursor-pointer absolute md:relative  ">

        <MdOutlineAddCircleOutline className='text-5xl text-teal-600 cursor-pointer
                        transition-all duration-500 ease-in-out
                        active:text-teal-300 active:scale-150
                         hover:text-teal-800' />
      </button>
      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'half'}  >
          <div className='w-full h-[90dvh] md:h-[70dvh] max-h-[90dvh]  
          grid grid-rows-[50px_120px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                <div className='text-xl font-bold' >
                  <div>New Member</div>
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
            <ReferralBlock
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              isChanging={isChanging}
              setChanging={setChanging}
            />
            {!isChanging &&
              <EntryForm
                initialValues={initialValues}
                handleModalClose={handleModalClose}
                entryMode={entryMode} />
            }
          </div >
        </FormikEmptyModal>

      }
    </>

  )
}


export default Create