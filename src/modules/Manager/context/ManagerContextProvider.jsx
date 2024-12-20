import { createContext, useMemo, useState } from "react";
import { useManagers } from "../hooks/quaries";


export const ManagerContext = createContext({
    data: [],
    fetchedData: {},
    selectedManager: null,
    setSelectedManager: () => { },
});

export const ManagerContextProvider = ({ children }) => {
    const [selectedManager, setSelectedManager] = useState(null);

    const fetchedData = useManagers();
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);

    return (<ManagerContext value={
        {
            data, fetchedData
        }
    }>
        {children}
    </ManagerContext>
    );
};

export default ManagerContextProvider;