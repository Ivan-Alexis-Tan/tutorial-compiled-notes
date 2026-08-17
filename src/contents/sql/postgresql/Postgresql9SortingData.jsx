import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { studentsData } from "./dummyPSQLData";

const tableIds = {
    e1: false,
}

const grade_levels = [9, 9, 8, 8, 9, 8, 8]

export default function PostgreSQL9SortingData() {
    const { useHookTools } = useToggleDataTable({ toggleState: tableIds })
    const dbData = studentsData.map((student, idx) => {
        return {... student, 
            grade_level: grade_levels[idx], 
            remarks: student.marks > 50 ? "PASSED" : "FAILED",
        }
    })
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Sorting Data</h1>

            <div>
                <ul>
                    <li>Using <code>ORDER BY</code> clause</li>
                    <li>To <strong>sort the result set</strong> of a <code>SELECT</code> query</li>
                    <li>Happens after <code>WHERE</code> filtering</li>
                    <li>Default order is <strong>ascending</strong> <code>ASC</code></li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <col_1>, <col_2>
FROM <table_name>
ORDER BY <col_name>;
`}
                </code></pre>

                <p className="mb-3">Suppose database table: <code>students</code></p>
                <ToogleDataTable 
                    tableKey={"e1"}
                    useHookTools={useHookTools}
                    tableData={dbData}
                    btnText="Show table"
                />
            </div>

            <hr className="my-5" />

            <div>
                <h2>1. Sorting in ascending order (default)</h2>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
ORDER BY marks;
`}
                </code></pre>

                <p className="mb-3">Return:</p>

                <div className="px-2 mx-auto max-w-125 overflow-auto">
                    <DataTable
                        className="[&_tbody_td:nth-child(3)]:text-(--txt-red)"
                        data={dbData.toSorted((a, b) => a.marks - b.marks)}
                    />
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>2. Sorting in descending order</h2>

                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
ORDER BY marks DESC;
`}
                </code></pre>

                <p className="mb-3">Return:</p>

                <div className="px-2 mx-auto max-w-125 overflow-auto">
                    <DataTable
                        className="[&_tbody_td:nth-child(3)]:text-(--txt-red)"
                        data={dbData.toSorted((a, b) => b.marks - a.marks)}
                    />
                </div>
            </div>

            <hr className="--hr-faded" />

            <div className="[&>div]:mb-5 [&_h3]:mb-2">
                <h2>3. Sorting by Multiple Columns</h2>

                <div>
                    <h3>Example 1:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
ORDER BY grade_level, name;
`}
                    </code></pre>

                    <p><strong>Return:</strong></p>
                    <p className="mb-3">Sorts <code>grade_level</code> column ascending first, then the <code>name</code> after.</p>
                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_tbody_td:is(:nth-child(2),:nth-child(5))]:text-(--txt-red)"
                            data={dbData.toSorted((a, b) => (a.grade_level - b.grade_level) || (a.name - b.name) )}
                        />
                    </div>
                </div>

                <div>
                    <h3>Example 2:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
ORDER BY grade_level ASC, marks DESC;
`}
                    </code></pre>

                    <p><strong>Return:</strong></p>
                    <p className="mb-3">Sorts <code>grade_level</code> column ascending first, then the <code>marks</code> descending after.</p>

                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_tbody_td:is(:nth-child(3),:nth-child(5))]:text-(--txt-red)"
                            data={dbData.toSorted((a, b) => (a.grade_level - b.grade_level) || (b.marks - a.marks) )}
                        />
                    </div>
                </div>

                <div>
                    <h3>Example 3:</h3>
                    <p>While using <code>WHERE</code> clause.</p>

                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE remarks = 'PASSED'
ORDER BY grade_level ASC, marks DESC;
`}
                    </code></pre>

                    <p className="mb-2"><strong>Return:</strong></p>
                    <ul className="[&>li]:list-decimal!">
                        <li><i>Filter</i> the students that <code>PASSED</code></li>
                        <li><i>Sort</i> <code>grade_level</code> ascending</li>
                        <li><i>Sort</i> <code>marks</code> descending</li>
                    </ul>

                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_tbody_td:is(:nth-child(3),:nth-child(5),:nth-child(6))]:text-(--txt-red)"
                            data={dbData
                                .filter(student => student.remarks === "PASSED")
                                .toSorted((a, b) => (a.grade_level - b.grade_level) || (b.marks - a.marks) )}
                        />
                    </div>
                </div>

                <div>
                    <h3>Example 4:</h3>
                    <p>While selecting specific columns to display.</p>

                    <pre><code>
{`</> PostgreSQL
SELECT 
    name, 
    grade_level, 
    remarks 
FROM students
ORDER BY grade_level, name;
`}
                    </code></pre>

                    <p className="mb-2"><strong>Return:</strong></p>
                    <ul className="[&>li]:list-decimal!">
                        <li><i>Sort</i> <code>grade_level</code> ascending</li>
                        <li><i>Sort</i> <code>name</code> ascending</li>
                        <li><i>Display</i> <code>name</code>, <code>grade_level</code>, and <code>remarks</code> columns only</li>
                    </ul>

                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_td:nth-child(2)]:w-30"
                            data={dbData
                                .map(student => ({
                                    name: student.name, 
                                    grade_level: student.grade_level, 
                                    remarks: student.remarks
                                }))
                                .toSorted((a, b) => (a.grade_level - b.grade_level) || (a.name - b.name))
                            }
                        />
                    </div>
                </div>

                <div>
                    <h3>Example 5:</h3>
                    <p>While using indexing in <code>ORDER BY</code>.</p>

                    <pre><code>
{`</> PostgreSQL
SELECT 
    name, 
    remarks 
FROM students
ORDER BY 1;
`}
                    </code></pre>

                    <p className="mb-2"><strong>Return:</strong></p>
                    <ul className="[&>li]:list-decimal!">
                        <li><i>Select</i> <code>name</code> and <code>remarks</code> to display</li>
                        <li><i>Sort</i> by <code>name</code> ascending</li>
                        <ul className="ml-5">
                            <li>The <code>int</code> value <code>1</code> works like indexing on the selected columns.</li>
                        </ul>
                    </ul>

                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_tbody_td:first-child]:text-(--txt-red)"
                            data={dbData
                                .map(student => ({
                                    name: student.name, 
                                    remarks: student.remarks
                                }))
                                .toSorted((a, b) => a.name - b.name)
                            }
                        />
                    </div>
                </div>

                <div>
                    <h3>Example 6:</h3>
                    <p>While using <code>LIMIT</code> clause.</p>

                    <pre><code>
{`</> PostgreSQL
SELECT 
	name, 
	marks
FROM students
WHERE marks IS NOT NULL
ORDER BY 2 DESC
LIMIT 5;
`}
                    </code></pre>

                    <p className="mb-2"><strong>Return:</strong></p>
                    <ul className="[&>li]:list-decimal!">
                        <li><i>Select</i> <code>name</code> and <code>marks</code> to display</li>
                        <li><i>Filters</i> none <code>null</code> marks</li>
                        <li><i>Sort</i> by <code>marks</code> descending</li>
                        <ul className="ml-5">
                            <li>The <code>int</code> value <code>2</code> works like indexing on the selected columns.</li>
                        </ul>
                    </ul>

                    <div className="px-2 mx-auto max-w-125 overflow-auto">
                        <DataTable
                            className="[&_tbody_td:nth-child(2)]:text-(--txt-red)"
                            data={dbData
                                .toSorted((a, b) => b.marks - a.marks)
                                .map(student => ({
                                    name: student.name, 
                                    marks: student.marks
                                }))
                                .splice(0, 5)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}