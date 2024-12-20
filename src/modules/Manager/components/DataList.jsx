import DataTable from './DataTable';
import ManagerCard from './ManagerCard';
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
            header: 'Updated At',
            accessorKey: 'updatedAt', // Ensure this matches the data key
            cell: info => new Date(info.getValue()).toLocaleString(), // Format date
        },
        {
            header: "Particulars", accessorKey: "name", size: 300, visible: true,
            className: '    ',
            cell: info => {
                const thisData = info.row.original
                return <ManagerCard managerData={thisData} />
            }
        },



    ]

    return (
        <DataTable columns={columns} />
    )
}

export default DataList


