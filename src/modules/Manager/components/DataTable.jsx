import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { useSearchParams } from 'react-router'



import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Loader2 } from 'lucide-react'
import { CiSearch } from 'react-icons/ci'
import { useManagerContext } from '../context/features/useManagerContext'
import Create from './Create'

// import FormikFormModal from '../form-components/FormikFormModal'

export const Icons = {
    spinner: Loader2,
};
export default function DataTable({ columns, pageSize = 2000,
    mobileHeaders = ['id', 'name'], initialFilterValues }) {
    const { data, fetchedData } = useManagerContext()

    const [sorting, setSorting] = useState([
        { id: 'updatedAt', desc: true }, // Default sort state
    ]);
    const [filtering, setFiltering] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [isSearching, setSearching] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination: pagination,
            columnVisibility: {
                id: false,
                username: false,
                contactNo: false,
                updatedAt: false,
                particulars: true,

            },
            rowSelection: rowSelection
        },
        manualPagination: false,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,

    })
    const handleSearching = (e) => {

        if (!isSearching) {
            setSearching(true)
            setTimeout(() => {
                setFiltering(e.target.value)
                setSearching(false)
            }, 1000);
        }

    }


    return (
        <div className=' bg-transparent rounded-lg '>

            <div className='row   flex flex-col md:flex-row justify-between gap-2    '>

                <div className='grid grid-cols-9 w-full gap-2  '>
                    <div className="col-span-9 md:col-span-2 ">

                        <Breadcrumb pageName="managers" parentName="Dashboard" type={"box"} />
                    </div>
                    <div className='col-span-9  md:col-span-5 
                    flex items-center justify-center w-full'>
                        <div className='w-full h-[50px] grid grid-cols-[40px_1fr_30px] justify-between items-center 
                         border-slate-400   border-2  rounded-full  '>

                            <div>
                                <CiSearch className='text-2xl text-teal-400 ml-2 md:ml-4' />
                            </div>
                            <div>

                                <input
                                    type='text'
                                    defaultValue={filtering}
                                    onChange={handleSearching}
                                    className='  text-md md:text-xl pl-2 pt-0 pb-1 line-clamp-1  bg-transparent outline-none placeholder:text-slate-500 '
                                    placeholder='Type to search...'
                                />
                            </div>
                            {isSearching ? <div> <Icons.spinner className="text-2xl text-teal-600 mr-4 animate-spin" /></div> : ''
                            }
                        </div>
                    </div>

                    <div className=' right-0 absolute mt-7 md:mt-0  col-span-2 flex items-center justify-end'  >
                        <Create />
                    </div>

                </div>
            </div>


            <div className="table-responsive overflow-y-auto py-6 ">

                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   auto-cols-max items-center justify-center gap-4 '>
                    {table.getRowModel().rows.map(row => (
                        row.getVisibleCells().map(cell => (

                            <div key={cell.id} className={` flex justify-center items-center gap-6 `} >

                                {
                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                }
                            </div>
                        ))

                    ))}
                </div>


            </div>


        </div>

    )
}


