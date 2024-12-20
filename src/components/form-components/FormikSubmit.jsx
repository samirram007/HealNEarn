export const FormikSubmit = (
    { formik, label, btnColor = `btn-primary`, ...props }
) => {

    return (
        <>
            <button type="submit"
                {...props}
                className={`text-center motion-preset-expand   btn cursor-pointer  ${btnColor} 
                flex flex-row flex-nowrap text-nowrap justify-center items-center
                 ${props.className}`}>
                {formik.isSubmitting}
                {formik.isSubmitting && <span className="loading loading-spinner"></span>}
                {label}


            </button>
        </>

    )
}