import emptyUserImage from '@/assets/images/user/empty-user.png';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { handleCopyClick } from '@/lib/copyClick';
import { upperCase } from '@/lib/removeEmptyStrings';
import { BiDollar } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { PiTreeViewThin } from "react-icons/pi";
import { TfiEye } from "react-icons/tfi";
const ManagerCard = ({ managerData }) => {
    return (
        <>
            <div className='w-full h-80  first-line:min-h-[100px]   py-4 mt-18
             bg-gradient-to-br from-transparent via-transparent/10 to-teal-500/10 
            backdrop-filter backdrop-blur-sm    
            shadow-lg

             border-b-4 border-teal-500
             border-t-2   border-t-teal-500/30
             border-l-2   border-l-teal-500/30
             border-r-2   border-r-teal-500/30
             rounded-lg 
             '>

                <div className='relative '>

                    <div className='  flex justify-center items-center -mt-15 '>
                        <div className='w-20 h-20 rounded-full shadow   shadow-teal-500 overflow-clip
                                              '>
                            <img className='w-full h-full object-cover' src={emptyUserImage} alt="" />
                        </div>
                    </div>
                    <div className='absolute font-bold    cursor-pointer btn-link top-15 right-2  '  >
                        <span className='  text-teal-500 uppercase'>
                            <div className="text-[0.8rem]">
                                {managerData.userType}
                            </div>

                        </span>
                    </div>
                    <div className='text-center flex flex-col gap-2 ' >
                        <div className='font-bold  text-xl cursor-pointer btn-link mt-2'  >
                            {managerData.name}
                        </div>
                        <div className='flex flex-col text-center text-[0.9rem]'>


                            <div className='flex flex-col text-center   p-2 bg-teal-500'>

                                <div className='    cursor-pointer btn-link  '  >
                                    <span className='text-[0.9rem]  text-white  uppercase'> CODE : <span onClick={() => handleCopyClick(upperCase(managerData.username))} className="font-bold">{managerData.username}</span></span>
                                </div>
                                <div className='   cursor-pointer btn-link  '  >
                                    <span className='text-[0.9rem]  text-white uppercase'> MOB : <span className="font-bold">{managerData.contactNo ?? '__________'}</span></span>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='  px-2 grid grid-cols-3 justify-between items-center gap-2 font-normal text-sm text-center'>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className='   cursor-pointer btn-link '  >
                                    <div className='border-b-[2px] border-slate-500 '>
                                        Team
                                    </div>
                                    <div>
                                    {managerData?.childrenCount ?? 0} 
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className='bg-slate-200 dark:bg-slate-600  ' >
                                <p> Immmediate Members</p>
                            </TooltipContent>
                        </Tooltip>


                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className='     cursor-pointer btn-link'  >

                                    <div className='border-b-[2px] border-slate-500 '>
                                        Business
                                    </div>
                                    <div>

                                        {managerData?.userActivity?.totalBusiness ?? 0}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className='bg-slate-200 dark:bg-slate-600  ' >
                                <p >Total Team Business</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                            <div className='    cursor-pointer btn-link'  >
                            <div className='border-b-[2px] border-slate-500 '>
                                Earning
                            </div>
                            <div>
                                {managerData?.userActivity?.totalEarning ?? 0}
                            </div>
                        </div>
                            </TooltipTrigger>
                            <TooltipContent className='bg-slate-200 dark:bg-slate-600  ' >
                                <p >Total Earning by Team</p>
                            </TooltipContent>
                        </Tooltip>

                        
                    </div>

                    <div className='absolute w-full -bottom-24 mt-2 px-2 flex flex-row justify-center items-center gap-2 font-normal text-sm text-center'>

                        <div className='w-18 h-18 p-2 border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-md flex flex-col justify-between items-center   '>
                            <div>
                                <TfiEye className='text-3xl' />
                            </div>
                            <div className='text-[0.8rem]'>
                                VIEW
                            </div>
                        </div>
                        <div className='w-18 h-18 p-2 border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-md flex flex-col justify-between items-center   '>
                            <div>
                                <PiTreeViewThin className='text-3xl' />
                            </div>
                            <div className='text-[0.8rem]'>
                                TEAM
                            </div>
                        </div>
                        <div className='w-18 h-18 p-2 border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-md flex flex-col justify-between items-center   '>
                            <div>
                                <FaHandHoldingDollar className='text-3xl' />
                            </div>
                            <div className='text-[0.8rem]'>
                                EARNING
                            </div>
                        </div>
                        <div className='w-18 h-18 p-2 border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-md flex flex-col justify-between items-center   '>
                            <div>
                                <BiDollar className='text-3xl' />
                            </div>
                            <div className='text-[0.8rem]'>
                                PAYMENT
                            </div>
                        </div>


                    </div>
                </div >

            </div >

        </>
    )
}
export default ManagerCard;