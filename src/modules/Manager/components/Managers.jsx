
import { useEffect } from "react";
import { useManagers } from "../hooks/quaries";
import DataList from "./DataList";

const Managers = () => {
    const managers = useManagers();


    useEffect(() => {
        managers.refetch();
    }, [])

    if (managers.isError) {
        console.log("Error From Members.jsx", managers.error);
    }
    return (
        <div className=" flex justify-stretch flex-col w-full overflow-y-auto">
            <div className="motion-translate-x-in-[22%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[30px] motion-duration-[0.94s]/opacity motion-ease-out-cubic motion-duration-300 ">

                <DataList />
            </div>
        </div>
    )
}

export default Managers