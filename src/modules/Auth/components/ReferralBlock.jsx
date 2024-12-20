import emptyUserImage from '@/assets/images/user/empty-user.png';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosClient from '@/lib/axios-client';
import { useUserprofile } from "@/modules/User/hooks/useUserProfile";
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { LiaUserEditSolid } from 'react-icons/lia';
import { toast } from 'sonner';
const ReferralBlock = ({ initialValues, setInitialValues, isChanging, setChanging }) => {
    const userProfile = useUserprofile()
    const [parent, setParent] = useState(null)
    const [manager, setManager] = useState(null)


    const handleClick = () => {
        setChanging(prev => !prev)
    }

    return (
        <div className="p-2 uppercase">
            {
                isChanging ?
                    <GetParentBlock setChanging={setChanging} setParent={setParent} setManager={setManager} setInitialValues={setInitialValues} />
                    :

                    <div className='relative mt-2 flex flex-row justify-center items-center gap-4 md:gap-12  
                     text-center uppercase   '>
                        <div
                            onClick={handleClick}
                            className='absolute text-center flex flex-col items-center border-2
                  border-teal-800
                     dark:border-teal-200  text-teal-800
                     dark:text-teal-200 rounded-lg shadow-lg  cursor-pointer
                 z-10 p-1 md:p-2 top-0 right-0  -mr-6     bg-opacity-50'>
                            <LiaUserEditSolid className='text-4xl' />
                            <span className='hidden  '>Change</span>
                        </div>
                        <div className=' text-[0.7rem] flex flex-col justify-start items-center'>

                            <div className='text-[0.7rem]'>SPONSER</div>
                            <div>
                                <div className='w-12 h-12 rounded-full overflow-clip'>
                                    <img className='w-full h-full object-cover' src={emptyUserImage} alt="" />
                                </div>
                            </div>
                            <div className='text-[0.7rem]'> {parent?.name}</div>
                            <div className=' text-[0.8rem] border-2 border-teal-500   font-bold px-2 rounded-lg'>CODE: <span onClick={() => handleCopyClick(parent?.username)} className='text-[0.8rem]'> {parent?.username}</span></div>

                        </div>
                        <div className='text-[0.7rem] flex flex-col justify-start items-center'>
                            <div className='text-[0.7rem]'>MANAGER</div>
                            <div>
                                <div className='w-12 h-12 rounded-full overflow-clip'>
                                    <img className='w-full h-full object-cover' src={emptyUserImage} alt="" />
                                </div>
                            </div>
                            <div className='text-[0.7rem]'> {manager?.name}</div>
                            <div className=' text-[0.8rem] border-2 border-teal-500   font-bold px-2 rounded-lg'>CODE: <span onClick={() => handleCopyClick(manager?.username)} className='text-[0.8rem]'> {manager?.username}</span></div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default ReferralBlock


const GetParentBlock = ({ setChanging, setParent, setManager, setInitialValues }) => {
    const usernameRef = useRef(null)

    const [isFetching, setFetching] = useState(false)
    const handleOnClick = () => {
        if (isFetching) return
        if (usernameRef.current.value.length !== 10) {
            toast.warning("Invalid code")
            usernameRef.current.focus()
            return
        }
        setFetching(true)
        setTimeout(() => {

            const payload = {
                username: usernameRef.current.value
            }
            fetchUserByUserName(payload)

            setFetching(false)
        }, 1000);

    }

    const fetchUserByUserName = async (payload) => {
        await axiosClient.get(`members/username/${payload.username}`)
            .then(response => {
                console.log(response.data.data);
                setInitialValues(prev => (
                    {
                        ...prev,
                        parentId: response.data.data.id,
                        managerId: response.data.data.manager?.id,
                    }
                ))
                setParent(response.data.data)
                setManager(response.data.data.manager)
                setChanging(false)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }


    useEffect(() => {
        usernameRef.current.focus()
    }, [])
    return (
        <div className='flex flex-col justify-start gap-2 md:gap-2 p-4 mx-auto max-w-md'>

            <Label htmlFor="parentId" >Sponser</Label>

            <Input
                ref={usernameRef}
                name="parentId"
                placeholder="Enter sponser code"
                type="text"
                maxLength={10}
                className="  uppercase w-full  input mb-0 input-bordered border-teal-800
                     dark:border-teal-200 input-primary placeholder:text-teal-400/50 dark:placeholder:text-teal-200/50  "
                required
            />
            <div className='flex justify-end gap-4'>

                <Button type="button" onClick={handleOnClick} className="mt-4 block max-w-full" disabled={isFetching} >
                    {isFetching ?
                        <span className='flex flex-row justify-center items-center' >
                            ... <Loader className='animate-spin !text-2xl text-slate-100 ' /> ...
                        </span>
                        :
                        <span>
                            Confirm
                        </span>
                    }
                </Button>
                <Button type="reset" className="mt-4 block max-w-full" onClick={() => setChanging(false)}>Cancel</Button>
            </div>
        </div>
    )
}