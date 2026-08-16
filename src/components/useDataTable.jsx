import { useState } from "react"
import { studentsData } from "../contents/sql/postgresql/dummyPSQLData"

const toogleStateDefault = {
    tableKey: false
}

export function useToggleDataTable({ toggleState = toogleStateDefault }) {
    const [viewTable, setViewTable] = useState(toggleState)
    
    function toggleTable(tableKey) {
        setViewTable(p => ({...p, [tableKey]: !p[tableKey]}))
    }

    return {
        useHookTools: { toggleTable, viewTable },
    }
}

export const ToogleDataTable = ({ tableData = [], tableKey, useHookTools}) => {
    return (
        <div>
            <div className="mb-3">
                <span className="px-3 py-1 hover:bg-[hsl(0,0%,0%)] hover:text-(--link-hover-bg-clr) rounded-2xl border"
                    onClick={_ => useHookTools.toggleTable(tableKey)}
                    title={useHookTools.viewTable[tableKey] ? "Hide" : "Show return"}
                >
                    {useHookTools.viewTable[tableKey] ? "❌Return" : "👁️Return"}
                </span>
            </div>

            {useHookTools.viewTable[tableKey] 
                && <div className="flex justify-center p-2 py-5 rounded-2xl bg-black">
                    <div className="w-auto">
                        <DataTable data={tableData} />
                    </div>
                </div>
            }
        </div>
    )
}

export default function DataTable({ data = [{},], className = "" }) {
    const colHeads = Object.keys(data[0]) ?? []
    const dataVals = data.map(item => Object.values(item))
    
    return (
        <table className={className ?? ""}>
            <thead className="bg-[hsl(0,0%,27%)]">
                {colHeads.length >= 2
                    && <tr>
                        {colHeads.map(header => (
                            <td key={header}>{header}</td>
                        ))}
                    </tr>
                }
            </thead>
            <tbody>
                {(colHeads.length >= 2 & data.length >= 1)
                    ? dataVals.map((row, idx) => (
                        <tr key={`r${idx}`} className={`r${idx}`}>
                            {row.map((item, index) => {
                                const coord = `r${idx}c${index}`
                                return (
                                    <td key={coord} className={coord}>{item}</td>
                                )
                            })}
                        </tr>
                    ))
                    : <></>
                }
            </tbody>
        </table>
    )
}

// Comparing Table Utilities
export const BaseTable = ({ data = studentsData}) => {
    return (
        <div className="flex justify-start w-90 h-full">
            <DataTable data={data} />
        </div>
    )
}

export const CompareToBaseTable = ({ TableComponent }) => {
    return (
        <div className="flex justify-center border p-2 bg-black rounded-2xl">
            <div className="flex justify-start items-center gap-5 overflow-auto">
                <BaseTable />
                <span className="text-6xl">&rarr;</span>
                
                {TableComponent}
            </div>
        </div>
    )
}

export function ToggleReturnDataTable({ toggleId, returnText, TableComponent, toggleStates = toggleStates }) {
    return (
        <div className="mb-5">
            {/* Return Message and Toggle Switch */}
            <div className="mb-5">
                <span className="hover:text-(--link-hover-bg-clr) hover:underline underline-offset-4"
                    onClick={_ => toggleStates.toggleTable(toggleId)}
                >
                    👁️Return:
                </span>
                <p className="mt-2 ml-10">{returnText}</p>
            </div>

            {/* Return Table */}
            {toggleStates.viewTable[toggleId]
                && <CompareToBaseTable TableComponent={TableComponent} />
            }
        </div>
    )
}