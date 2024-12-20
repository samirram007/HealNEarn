import useDebouncedFormik from "../../hooks/useDebouncedFormik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
export const FormikInputBox = (
    { formik, label, name, placeholder, type, extClass, ...props }
) => {
    const debouncedFormik = useDebouncedFormik(formik, 1000);
    return (
        <div className="grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor={name} className={` ${extClass}`}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type ?? 'text'}
                placeholder={placeholder ?? `Enter ${label}`}
                onChange={debouncedFormik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                {...props}
                className={` ${extClass} rtl:mr-3 w-full flex flex-row justify-end  input mb-0 input-bordered border-teal-800
                     dark:border-teal-200 input-primary placeholder:text-teal-600 dark:placeholder:text-teal-600    ${formik.errors[name] ? 'input-error' : ''}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-red-500 text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}