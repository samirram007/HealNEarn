import { createContext, useMemo, useState } from "react";
import { useMembers } from "../hooks/quaries";


export const MemberContext = createContext({
    data: [],
    fetchedData: {},
    selectedMember: null,
    setSelectedMember: () => { },
});

export const MemberContextProvider = ({ children }) => {
    const [selectedMember, setSelectedMember] = useState(null);


    const fetchedData = useMembers();
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);

    return (<MemberContext value={
        {
            data, fetchedData
        }
    }>
        {children}
    </MemberContext>
    );
};

export default MemberContextProvider;