import { useState } from "react"

const mappedDefault = {
    name: "",
    comp: _ => <></>,
    desc: "",
}

export function useSummaryTable({colnames = [], mappedData = mappedDefault}) {
    const [rowId, setRowId] = useState(0)

    return {
        tableStates: {
            colnames,
            mappedData,
            rowId,
            setRowId,
        },
        colnames,
        mappedData,
        rowId,
        setRowId,
    }
}

export default function SummaryTable(tableStates = mappedDefault) {
    const { colnames, mappedData, rowId, setRowId } = tableStates.tableStates
    const mapIds = Object.keys(mappedData)

    return (
        rowId === 0
            ? <>
                <h2 className="text-3xl font-bold my-3">Summary Table</h2>
                    
                <div className="flex justify-center mb-10">
                    <div className="flex justify-start overflow-auto">
                        <table className="min-w-200 max-w-2xl w-full">
                            <thead>
                                <tr>
                                    {colnames.map((col, idx) => (<th key={`${idx}`+col}>{col}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {mapIds.map(id => {
                                    const sec = mappedData[id]
                                    return <tr key={id}>
                                        <td>
                                            <span className="hover:cursor-pointer hover:text-(--link-hover-text-clr) hover:*:text-(--link-hover-text-clr)!"
                                                onClick={_ => setRowId(id)}
                                            >{typeof(sec.name) === "function" ? sec.name() : sec.name}</span>
                                        </td>
                                        {sec.desc && <td>{typeof(sec.desc) === "function" ? sec.desc() : sec.desc}</td>}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            : <>
                <h3 className="inline hover:text-(--link-hover-text-clr) border rounded-4xl p-1 px-2 text-xl font-bold"
                    onClick={_ => setRowId(0)}
                >&larr; View Summary Table</h3>

                {mappedData[rowId]?.comp}
            </>
    )
}