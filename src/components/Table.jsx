import { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

const Table = ({ data, columns }) => {

    const [pageIndex, setPageIndex] = useState(0); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Track the page size

    const totalPages = Math.ceil(data?.length / pageSize);
    useEffect(() => {
        setPageIndex(0);
    }, [data])

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const getPageNumbers = () => {
        const pages = [];
        // Current page
        pages.push(pageIndex);
        // Next two pages
        for (let i = 1; i <= 2; i++) {
            const nextPage = pageIndex + i;
            if (nextPage < totalPages) {
                pages.push(nextPage);
            }
        }
        return pages;
    };

    const pages = getPageNumbers();
    return (
        <div className="overflow-x-auto">
            <table className="w-100">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="text-start" key={header.id}>{header.column.columnDef.header}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className="border-bottom" style={{height: '50px'}} key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className="border-bottom" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between py-3 px-0">
                Mostrando registros del {pageIndex + 1} al {pageSize * (pageIndex + 1)} de un total de {data.length} registros.
                <div>
                    <span style={{
                        border: 'solid 1px #F2F2F2',
                        padding: '10px 11px',
                        cursor: 'pointer',
                    }} onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
                        Anterior
                    </span>
                    {pages.map(page => (
                        <span
                        
                            key={page}
                            onClick={() => setPageIndex(page)}
                            style={{
                                fontWeight: page === pageIndex ? 'normal' : 'normal',
                                color: page === pageIndex && '#ffffff',
                                backgroundColor: page === pageIndex && '#000000',
                                padding: '10px 11px',
                            }}
                        >
                            {page + 1}
                        </span>
                    ))}
                    <span 
                    style={{
                        border: 'solid 1px #F2F2F2',
                        padding: '10px 11px',
                        cursor: 'pointer',
                    }} onClick={() => setPageIndex(prev => Math.min(prev + 1, totalPages - 1))} disabled={pageIndex === totalPages - 1}>
                        Siguiente
                    </span>
                </div >
            </div >
        </div>
    )
}

export default Table;