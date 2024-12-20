
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { LuUsers } from "react-icons/lu";
import { MdPayment } from 'react-icons/md';
import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from 'react-router';

const ManagerDashboard = () => {
    return (
        <>
            {/* <CardGroup /> */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <MenuGroup />
            </div>

        </>
    );
};

export default ManagerDashboard;
const MenuGroup = () => {

    const links = [
        {
            path: '/manager/member',
            name: "MEMBER",
            icon: <LuUsers className='text-4xl' />
        },
        {
            path: '/manager/payment',
            name: "PAYMENT",
            icon: <MdPayment className='text-4xl' />
        },
        {
            path: '/manager/report',
            name: "REPORT",
            icon: <TbReportAnalytics className='text-4xl' />
        },

    ]
    return (
        <div className='text-teal-600 flex flex-row flex-wrap gap-6 justify-center items-start
     '>
            {
                links.map((link, index) => (
                    <MenuBlock key={index} link={link} />
                ))
            }
        </div>

    )
}

const MenuBlock = ({ link }) => {
    const [isNavigating, setNavigating] = useState(false)
    const navigate = useNavigate()
    const handleOnClick = () => {
        if (isNavigating) return
        setNavigating(prev => !prev)
        setTimeout(() => {
            console.log(link.path);


            navigate(link.path)
            setNavigating(prev => !prev)

        }, 500)
    }
    return (
        <div onClick={handleOnClick}
            className='flex-1 w-48 h-32 flex flex-col justify-center items-center gap-1
    text-2xl font-bold border-teal-600 border-2 p-4 
    rounded-md
    hover:bg-teal-600 hover:text-slate-200 
    active:bg-teal-600 active:text-white
   
    transition-colors duration-500
    cursor-pointer motion-preset-blur-right motion-duration-1000
    select-none
    '>
            <span className='!text-6xl text-teal-400'>
                {
                    !isNavigating ? link.icon :
                        <Loader className='animate-spin !text-1xl text-slate-100 ' />
                }

            </span>
            <span className='!text-xl hover:underline decoration-red-600/20  active:motion-preset-confetti  motion-duration-2000 '>

                {link.name}
            </span>
        </div>
    )
}
