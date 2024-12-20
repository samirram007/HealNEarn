import { useState } from 'react'

import FormikEmptyModal from '@/components/form-components/FormikEmptyModal'
import { MdOutlineCloseFullscreen } from 'react-icons/md'
import { RiEdit2Line } from 'react-icons/ri'
import EntryForm from './EntryForm'



const Edit = ({ initialValues, setEntryId }) => {

  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>

      <button onClick={() => setModalOpen(true)}
        className="       cursor-pointer ">
        <RiEdit2Line className='text-2xl text-slate-600 cursor-pointer
                        transition-all duration-500 ease-in-out
                        active:text-blue-300 active:scale-150
                         hover:text-blue-800' />
      </button>
      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} >
          <div className='w-full h-[90dvh] md:h-[70dvh] max-h-[90dvh]  
          grid grid-rows-[50px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                <div className='text-xl font-bold' >Changing information of hotel {initialValues.name} ..</div>
                <button onClick={() => setModalOpen(false)} type="button"
                  className='rounded-full p-2
 bg-slate-50/5 text-orange-500 cursor-pointer
  hover:text-yellow-500 hover:bg-slate-600
   active:text-orange-600 active:touch-pinch-zoom '>
                  <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                </button>
              </div>
            </div>
            <EntryForm
              initialValues={initialValues}
              entryMode={'edit'} />
          </div>
        </FormikEmptyModal>
      }
    </>

  )
}

export default Edit

