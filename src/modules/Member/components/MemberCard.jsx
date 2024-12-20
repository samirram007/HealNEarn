import emptyUserImage from '@/assets/images/user/empty-user.png';
import { handleCopyClick } from '@/lib/copyClick';
import { upperCase } from '@/lib/removeEmptyStrings';
import ChangeStatus from '@/modules/User/components/ChangeStatus';
import { useUserprofile } from '@/modules/User/hooks/useUserProfile';
import { useState } from 'react';
import { LiaCheckCircleSolid } from 'react-icons/lia';
import { MdOutlinePending } from 'react-icons/md';
import Earning from "./actions/Earning/Earning";
import Payment from "./actions/Payment/Payment";
import Team from "./actions/Team/Team";
import View from "./actions/View/View";
const MemberCard = ({ memberData }) => {
const userProfile=useUserprofile()
    return (
        <>
            <div className='w-full h-[28rem]      py-4 mt-18
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
                    <div className='absolute font-bold    cursor-pointer btn-link top-13 right-2  '  >
                        <span className='  text-teal-500 uppercase'>
                            <div className="text-[0.8rem]">
                                {memberData.userType}
                            </div>

                        </span>
                    </div>
                    <MemberStatus memberData={memberData} />
                    <div className='text-center flex flex-col gap-2 ' >
                        <div className='font-bold  text-xl cursor-pointer btn-link mt-2'  >
                            {memberData.name}
                        </div>
                        <div className='flex flex-col text-center text-[0.9rem]'>


                            <div className={`flex flex-col text-center text-slate-700   p-2 ${memberData.status === 'active' ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-500'}`}>

                                <div className='    cursor-pointer btn-link  '  >
                                    <span className='text-[0.9rem]     uppercase'> CODE : <span onClick={() => handleCopyClick(upperCase(memberData.username))} className="font-bold">{memberData.username}</span></span>
                                </div>
                                <div className='   cursor-pointer btn-link  '  >
                                    <span className='text-[0.9rem]    uppercase'> MOB : <span className="font-bold">{memberData.contactNo ?? '__________'}</span></span>
                                </div>
                            </div>
                        </div>
                        {/* <div className='font-bold  text-md cursor-pointer btn-link'  >
                            Parent: {memberData.parent?.name} <span className='text-md text-teal-600'> [{memberData.parent?.username}]</span>
                        </div> */}

                    </div>

                    <div className='mt-2  flex flex-row justify-center items-center gap-2  
                     text-center uppercase   '>
                        <div className='text-[0.7rem] flex flex-col justify-start items-center'>
                            <div className='text-[0.7rem] text-primary font-bold'>SPONSER</div>
                            <div>
                                <div className='w-12 h-12 rounded-full overflow-clip'>
                                    <img className='w-full h-full object-cover' src={emptyUserImage} alt="" />
                                </div>
                            </div>
                            <div className='text-[0.7rem]'> {memberData?.parent?.name}</div>
                            <div className=' text-[0.8rem] bg-slate-400/60 text-slate-800  font-semibold px-2 rounded-lg'>CODE: <span onClick={() => handleCopyClick(upperCase(memberData?.parent?.username))} className='text-[0.8rem]'> {memberData?.parent?.username}</span></div>

                        </div>
                        {userProfile.data?.data.data.userType === 'admin' &&
                        <div className='text-[0.7rem] flex flex-col justify-start items-center'>
                            <div className='text-[0.7rem] text-primary font-bold'>MANAGER</div>
                            <div>
                                <div className='w-12 h-12 rounded-full overflow-clip'>
                                    <img className='w-full h-full object-cover' src={emptyUserImage} alt="" />
                                </div>
                            </div>
                            <div className='text-[0.7rem]'> {memberData?.manager?.name}</div>
                            <div className=' text-[0.8rem] bg-slate-400/60 text-slate-800  font-semibold px-2 rounded-lg'>CODE: <span onClick={() => handleCopyClick(upperCase(memberData?.manager?.username))} className='text-[0.8rem]'> {memberData?.manager?.username}</span></div>

                        </div>
}

                    </div>
                    <div className="border-t-2 w-[95%] h-[10px] border-t-teal-500   text-transparent mt-2 mx-auto ">-</div>
                    <div className='  px-2 grid grid-cols-3 justify-between items-center gap-2 font-normal text-sm text-center'>

                        <div className='   cursor-pointer btn-link '  >
                            <div className='border-b-[2px] border-slate-500 '>
                                Team
                            </div>
                            <div>
                            {memberData?.userActivity?.immediateCount ?? 0} / {memberData?.childrenCount ?? 0}
                            </div>
                        </div>
                        <div className='     cursor-pointer btn-link'  >

                            <div className='border-b-[2px] border-slate-500 '>
                                Purchase
                            </div>
                            <div>
                            {memberData?.productAmount??0}
+
                            {memberData?.userActivity?.totalBusiness??0}
                            </div>
                        </div>
                        <div className='    cursor-pointer btn-link'  >
                            <div className='border-b-[2px] border-slate-500 '>
                                Earning
                            </div>
                            <div>
                            {memberData?.userActivity?.selfEarning ?? 0}
                            </div>
                        </div>
                    </div>

                    <div className='absolute w-full -bottom-24   px-2 flex flex-row justify-center items-center gap-2 font-normal text-sm text-center'>

                        <View />
                        <Team />
                        <Earning />
                        <Payment />


                    </div>
                </div >

            </div >

        </>
    )
}

export default MemberCard

const MemberStatus = ({ memberData }) => {
    const [isStatusChanging, setStatusChanging] = useState(false)
    const handleClick = () => {
        setStatusChanging(true)
    }
    return (
        <div className='absolute font-bold    cursor-pointer btn-link top-12 left-1  '  >
            <span className='   text-teal-500 uppercase'>
                <div className="text-[1rem] ">
                    {
                        <ChangeStatus
                            memberData={memberData}
                            isStatusChanging={isStatusChanging}
                            setStatusChanging={setStatusChanging} />
                    }
                    <div onClick={handleClick} className='flex flex-row justify-center items-center gap-1'>

                        {
                            memberData.status === 'active' ?
                                <>

                                    <LiaCheckCircleSolid className='text-[1.8rem] font-bold  text-blue-500' />
                                    <div className='text-[0.8rem] '>
                                        {memberData.status}
                                    </div>
                                </>
                                :
                                <>
                                    <MdOutlinePending className='text-[1.8rem] text-slate-500' />
                                    <div className='text-[0.8rem] text-slate-500 '>
                                        {memberData.status}
                                    </div>
                                </>
                        }
                    </div>


                </div>

            </span>
        </div>
    )
}