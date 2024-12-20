import { createPortal } from 'react-dom';
const FormikEmptyModal = ({ isModalOpen, variant, children }) => {


    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",

        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const modalStyle = {

        margin: "0",
        padding: "0",
        border: "2px solid #00000011",

    }

    if (!isModalOpen) return null;



    return createPortal(
        <>

            <div style={overlay} className='bg-black bg-opacity-70'>
                {/* {variant} */}
                <div style={modalStyle} className={`     ${variant === 'half' ? 'xl:w-6/12' : ''} w-11/12 max-h-dvh 
                shadow-md
                 
                bg-slate-200 dark:bg-slate-900
                text-slate-900 dark:text-slate-50
                rounded-xl  
                
                motion-translate-x-in-[116%] motion-translate-y-in-[5%]
              motion-scale-in-[0.5]     motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate
                `}>
                    {children}
                </div>
            </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default FormikEmptyModal



