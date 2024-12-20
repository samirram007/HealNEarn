import { TfiEye } from "react-icons/tfi"

const View = () => {
    const handleOnClick = () => {

    }
    return (
        <div onClick={handleOnClick} className='w-18 h-18 p-2 border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-md flex flex-col justify-between items-center   '>
            <div>
                <TfiEye className='text-3xl' />
            </div>
            <div className='text-[0.8rem]'>
                VIEW
            </div>
        </div>
    )
}

export default View