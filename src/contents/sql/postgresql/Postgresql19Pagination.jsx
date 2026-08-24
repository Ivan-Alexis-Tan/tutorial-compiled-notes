import { useState } from "react"
import { mapStudentData, studentData2, studentsData } from "./dummyPSQLData"
import DataTable from "../../../components/useDataTable"

const sampleData = [
    ...studentsData, 
    ...studentData2.map(student => mapStudentData(
        student.id, 
        student.name, 
        student.marks, 
        student.created_at
    ))
]
const sampleLength = sampleData.length
const currentStates = {
    id: 1,
    limit: 5,
    page: 1,
}

export default function PostgreSQL19Pagination() {
    const [current, setCurrent] = useState(currentStates)
    const totalPages = Math.ceil(sampleLength / current.limit)

    function flipPage(direction) {
        if (direction === "left") {
            setCurrent(p => ({
                ...p, 
                id: Math.max(p.id - current.limit, 1),
                page: Math.max(p.page - 1, 1),
            }) )
            return
        };
        if (direction === "right") {
            if ((current.id + current.limit) < sampleLength) {
                setCurrent(p => ({
                    ...p, 
                    id: Math.min(p.id + current.limit, sampleLength),
                    page: p.page + 1,
                }))
            };
            return
        }
    }

    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Pagination</h1>

            <div>
                <ul>
                    <li>Means dividing large result sets into <strong>smaller pages</strong>.</li>
                    <li>Commonly used in <strong>web applications</strong> to show data page by page.</li>
                </ul>
            </div>

            <hr className="my-5" />

            <div>
                <h2><code>OFFSET</code>-based Pagination (Basic Idea)</h2>
                <h3>Syntax:</h3>

                <pre><code>
{`</> PostgreSQL
SELECT <col_names> 
FROM <table_name>
ORDER BY <col_name>
LIMIT <int_val>
OFFSET <int_val>
`}
                </code></pre>
                
                <ul>
                    <li>PostgreSQL uses <code>LIMIT</code> and <code>OFFSET</code> for pagination.</li>
                    <li><code>LIMIT</code> &rarr; how many rows to return</li>
                    <li><code>OFFSET</code> &rarr; how many rows to skip</li>
                    <li>Without <code>ORDER BY</code>, result order <strong>leads to inconsistent pages</strong>.</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Internal Working of <code>OFFSET</code></h2>

                <ul>
                    <li>PostgreSQL <strong>reads and skips</strong> rows equal to <code>OFFSET</code>.</li>
                    <li>Even skipped rows are <strong>processed internally</strong>.</li>
                    <li>Larg <code>OFFSET</code> = more work for database.</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Drawbacks of <code>OFFSET</code>-based Pagination</h2>

                <ul className="[&>li]:list-decimal! [&>li]:font-bold [&>ul]:ml-5 [&>ul]:mb-5">
                    <li>Poor Performance</li>
                    <ul>
                        <li>Higher <code>OFFSET</code> &mdash; slower query</li>
                        <li>Database still scans skipped rows</li>
                    </ul>

                    <li>Inconsistent Results</li>
                    <ul className="[&>li]:ml-15!">
                        <p className="ml-5">If rows are inserted or deleted:</p>
                        <li>Same record may appear on multiple pages.</li>
                        <li>Or may skipped completely</li> 
                    </ul>

                    <li>Not Scalable</li>
                    <ul>
                        <li>Works fine for small datasets</li>
                        <li>Performs badly for large tables</li>
                    </ul>     

                    <li>User Experience Issues</li>
                    <ul><li>Pages may show duplicate or missing records</li></ul>               
                </ul>

                <div>
                    <h2><code>OFFSET</code> Pagination is Bad for Large Data</h2>
                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 100000;
`}
                    </code></pre>
                
                    <p>Problems:</p>
                    <ul>
                        <li>PostgreSQL still <strong>scans and skips 100,000 rows</strong>.</li>
                        <li>Performance becomes <strong>very slow</strong> as data grows.</li>
                    </ul>
                </div>
            </div>
            
            <hr className="--hr-faded" />

            <div>
                <h2>Better Alternative</h2>
                <ul>
                    <li><strong>Keyset / Cursor-based pagination</strong></li>
                    <li>Uses last seen value instead of <code>OFFSET</code></li>
                    <li>Faster and consistent</li>
                </ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
WHERE id > <last_seen_id>
ORDER BY id
LIMIT <int_val>;
`}
                </code></pre>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Keyset Pagination</h2>
                <ul>
                    <li>A pagination technique where the last seen value is used to fetch the next set of rows.</li>
                    <li>Instead of using <code>OFFSET</code>, it uses a <strong><code>WHERE</code> condition with an indexed column</strong> (usually <code>id</code> or <code>created_at</code>)</li>
                    <li>Also called as <strong>Seek Pagination</strong></li>
                </ul>

                <p><strong>Example:</strong></p>
                <div className="mx-auto max-w-100">
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE id >= ${current.id}
ORDER BY id
LIMIT ${current.limit};
`}
                    </code></pre>
                </div>
                
                <div className="mx-auto mb-3 w-50 flex justify-center">
                    <PageFlipper
                        currentPage={current.page}
                        totalPages={totalPages}
                        flipperFn={flipPage}
                    />
                </div>

                <div className="mx-auto max-w-120">
                    <DataTable
                        data={
                            sampleData
                                .toSorted((a, b) => a.id - b.id)
                                .filter(student => Number(student.id) >= current.id)
                                .slice(0, current.limit)
                        }
                    />
                </div>

            </div>
        </div>
    )
}

const PageFlipper = ({ currentPage, totalPages, flipperFn, className }) => {
    return (
        <div className={`${className ?? ""} flex gap-3`}>
            <button onClick={_ => flipperFn("left")}>⬅️</button>

            <div>
                <p><strong>Page</strong></p>
                <p>{currentPage} / {totalPages}</p>
            </div>

            <button onClick={_ => flipperFn("right")}>➡️</button>
        </div>
    )
}