import { useState } from "react"

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

export const ToogleDataTable = ({ tableData = {1: []}, tableKey, useHookTools}) => {
    return (
        <div>
            <div className="mb-3">
                <span className="px-3 py-1 hover:bg-[hsl(0,0%,0%)] hover:text-(--link-hover-bg-clr) rounded-2xl border"
                    onClick={_ => useHookTools.toggleTable(tableKey)}
                    title={useHookTools.viewTable[tableKey] ? "Hide" : "Show return"}
                >{useHookTools.viewTable[tableKey] ? "❌Return" : "👁️Return"}</span>
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
    const colHeads = Object.keys(data[0])
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