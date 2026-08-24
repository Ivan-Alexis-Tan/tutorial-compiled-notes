import { useState } from "react"
import { studentsData } from "../contents/sql/postgresql/dummyPSQLData"
import { capitalize, capsEveryWord } from "../lib/helpers"

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

export const ToogleDataTable = ({ tableData = [], tableKey, useHookTools, btnText = "Return"}) => {
    return (
        <div>
            <div className="mb-3 [&_span]:px-3 [&_span]:py-1 
                            [&_span]:hover:bg-[hsl(0,0%,0%)] [&_span]:hover:text-(--link-hover-bg-clr) 
                            [&_span]:rounded-2xl [&_span]:border"
            >
                {useHookTools.viewTable[tableKey] 
                    ? <span
                        onClick={_ => useHookTools.toggleTable(tableKey)}
                        title={useHookTools.viewTable[tableKey] ? "Hide" : "Show return"}
                    >
                        ❌ {btnText}
                    </span>
                    : <span
                        onClick={_ => useHookTools.toggleTable(tableKey)}
                        title={useHookTools.viewTable[tableKey] ? "Hide" : "Show return"}
                    >
                        👁️ {btnText}
                    </span>
                }
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

export default function DataTable({ 
    data = [{},],
    className = "", 
    indexed = false, 
    capHeaders = false 
}) {
    const colHeads = Object.keys(data[0]) ?? []
    const dataVals = data.map(item => Object.values(item))

    function frmtHeader(headerStr) {
        switch(capHeaders) {
            case true:
            case "everyWord":
                return capsEveryWord(headerStr)
            case "caps":
                return capitalize(headerStr)
            default:
                return headerStr
        }
    }
    
    return (
        <table className={className ?? ""}>
            <thead className="bg-[hsl(0,0%,27%)]">
                {colHeads.length >= 1
                    && <tr>
                        {indexed && <td></td>}

                        {colHeads.map((header, idx) => (
                            <td key={header} className={`hc${idx}`}>
                                {frmtHeader(header)}
                            </td>
                        ))}
                    </tr>
                }
            </thead>
            <tbody>
                {(colHeads.length >= 1 & data.length >= 1)
                    ? dataVals.map((row, idx) => (
                        <tr key={`r${idx}`} className={`r${idx}`}>
                            {indexed && <td>{idx + 1}</td>}

                            {row.map((item, index) => {
                                const coord = `r${idx}c${index}`
                                return (
                                    <td key={coord} className={coord}>{item === null ? "[null]" : item}</td>
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