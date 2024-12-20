





import DataTable from './DataTable';

import MemberCard from './MemberCard';
const DataList = () => {


    /** @type {import('@tanstack/react-table').ColumnDef<any>} */
    const columns = [
        {
            header: "ID", accessorKey: "id", visible: false,
        },
        {
            header: "username", accessorKey: "username", visible: false,
            className: 'hidden'
        },
        {
            header: "contactNo", accessorKey: "contactNo", visible: false,
            className: 'hidden'
        },
        {
            header: "status", accessorKey: "status", visible: false,
            className: 'hidden'
        },
        {
            header: "Manager Username", id: "managerUsername", accessorKey: "manager.username", visible: false,
            cell: info => {
                const thisData = info.row.original
                return thisData.manager?.username
            }
        },
        {
            header: "Manager Name", id: "managerName", accessorKey: "manager.name", visible: false,
            cell: info => {
                const thisData = info.row.original
                return thisData.manager?.name
            }
        },
        {
            header: 'Updated At',
            accessorKey: 'updatedAt', // Ensure this matches the data key
            cell: info => new Date(info.getValue()).toLocaleString(), // Format date
        },
        {
            header: "Particulars", accessorKey: "name", size: 300, visible: true,
            className: '    ',
            cell: info => {
                const thisData = info.row.original
                return <MemberCard memberData={thisData} />
            }
        },


    ]

    return (
        <DataTable columns={columns} />
    )
}

export default DataList


