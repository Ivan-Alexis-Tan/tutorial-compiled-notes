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

export const ToogleDataTable = ({ headersData = [], tableData = {1: []}, tableKey, useHookTools}) => {
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
                        <DataTable headers={headersData} data={tableData} />
                    </div>
                </div>
            }
        </div>
    )
}

export default function DataTable({ headers = [], data = {1: []} }) {
    const rowIds = Object.keys(data)

    return (
        <table>
            <thead className="bg-[hsl(0,0%,27%)]">
                {headers.length >= 2
                    && <tr>
                        {headers.map(header => (
                            <td key={header}>{header}</td>
                        ))}
                    </tr>
                }
            </thead>
            <tbody>
                {(headers.length >= 2 & rowIds.length >= 1)
                    ? rowIds.map(id => (
                        <tr key={id}>
                            {data[id].map(item => (
                                <td key={id+item}>{item}</td>
                            ))}
                        </tr>
                    ))
                    : <></>
                }
            </tbody>
        </table>
    )
}