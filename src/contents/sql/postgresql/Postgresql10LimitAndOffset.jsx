import { useEffect, useState } from "react"
import { mapStudentData, studentData2, studentsData } from "./dummyPSQLData"
import DataTable from "../../../components/useDataTable"

const paginationDefault = {
    limit: 5,
    offset: 0,
}

export default function PostgreSQL10LimitAndOffset() {
    const dbData = [
        ...studentsData, 
        ...studentData2.map(student => mapStudentData(
            student.id, student.name, student.marks, student.created_at
        ))
    ]
    const [pageConfigs, setPageConfigs] = useState(paginationDefault)
    const [currentPage, setCurrentPage] = useState(0)
    
    const derivedConfigs = {
        totalPage: Math.ceil(dbData.length / pageConfigs.limit),
        offset: pageConfigs.limit * currentPage,
    }

    useEffect(() => {
        setPageConfigs(p => ({...p, offset: pageConfigs.limit * currentPage}))
    }, [currentPage])

    function setPage(pageMove) {
        if (pageMove === "left") setCurrentPage(p => Math.max(p - 1, 0));
        if (pageMove === "right" && (currentPage + 1) < derivedConfigs.totalPage) {
            setCurrentPage(p => p + 1);
        }
    }

    const changePageConfigs = (e, configKey) => {
        e.preventDefault()
        let value = e.target.value
        
        if (value === "") {
            setPageConfigs(p => ({...p, [configKey]: ""}) )
            return
        };
        
        value = Number(value)
        if (value < 0) value = 0;

        switch(configKey) {
            case "limit":
                if (value > dbData.length) value = dbData.length;
                break
            case "offset":
                if (value >= dbData.length) value = dbData.length - 1;
                break
        }

        setPageConfigs(p => ({...p, [configKey]: value}))
    }

    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5"><code>LIMIT</code> and <code>OFFSET</code> Clauses</h1>

            <div>
                <h2><code>LIMIT</code></h2>
                <ul>
                    <li>To <strong>restric the number of rows</strong> return by a query.</li>
                    <li>Commonly used for <strong>pagination</strong> and <strong>top-N queries</strong>.</li>
                </ul>

                <h2><code>OFFSET</code></h2>
                <ul>
                    <li>To <strong>skip a specific number of rows</strong> before returning results.</li>
                    <li>Usually used together than <code>LIMIT</code>.</li>
                </ul>
            </div>

            <hr className="my-5" />

            <div>
                <p className="mb-3"><strong>Interactive Example:</strong></p>

                <form className="postgres-pagination-form [&_label]:font-bold">
                    <p className="text-end italic">Configure it yourself:</p>
                    <div>
                        <label>LIMIT:</label>
                        <input type="number" 
                            min={1} 
                            max={dbData.length}
                            value={pageConfigs.limit}
                            onChange={e => changePageConfigs(e, "limit")}
                        />
                    </div>
                    <div>
                        <label>OFFSET:</label>
                        <input 
                            type="number" 
                            min={0} 
                            max={dbData.length}
                            value={pageConfigs.offset}
                            onChange={e => changePageConfigs(e, "offset")}
                        />
                    </div>
                </form>

                <DbPage 
                    currPage={currentPage + 1} 
                    totalPage={Number.isFinite(derivedConfigs.totalPage) ? derivedConfigs.totalPage : dbData.length}
                    setPageFn={setPage}
                    className={"mx-auto w-55 flex gap-5 items-center justify-center mb-3"}
                />

                <div className="mx-auto max-w-150">
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
ORDER BY id
LIMIT ${pageConfigs.limit}
OFFSET ${pageConfigs.offset}
`}
                    </code></pre>
                </div>

                <div>
                    {!pageConfigs.limit 
                        ? <DataTable className="mx-auto max-w-100"
                            data={dbData.slice(pageConfigs.offset)} 
                        />
                        : <DataTable className="mx-auto max-w-100"
                            data={dbData.slice(pageConfigs.offset, pageConfigs.limit + pageConfigs.offset)} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

const DbPage = ({ currPage, totalPage, setPageFn, className }) => {
    return (
        <div className={`${className ?? ""}`}>
            <button onClick={_ => setPageFn("left")}>⬅️</button>
            
            <div className="flex flex-col items-center">
                <span className="font-bold">Page</span>
                {`${currPage}/${totalPage}`}
            </div>

            <button onClick={_ => setPageFn("right")}>➡️</button>
        </div>
    )
}