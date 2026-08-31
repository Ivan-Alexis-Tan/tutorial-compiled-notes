import DataTable from "../../../components/useDataTable";
import { employeesTable } from "./dummyPSQLData";

const groupByDepartment = employeesTable.reduce(
    (acc, employee) => {
        const department = employee.department
        const exists = acc?.[department] ?? [];

        acc[department] = [...exists, employee].sort((a, b) => b.salary - a.salary)
        return acc
    }, {}
)

export default function PostgreSQL28PartitionByAndOrderBy() {
    return (
        <div className="[&_h2,&_h3]:mb-3 [&>hr]:my-5">
            <h1 className="mb-5"><code>PARTITION BY</code> and <code>ORDER BY</code></h1>

            <div>
                <h3>Window Functions</h3>
                <ul>
                    <li>Perfom calculations across a <strong>set of rows related to the current row</strong>.</li>
                    <li>Rows are not grouped or removed</li>
                    <li>Each row keeps its identity</li>
                    <li>Defined using <code>OVER()</code></li>
                </ul>

                <h3>Role of <code>OVER()</code></h3>

                <ul>
                    <li>The window of rows</li>
                    <li>How rows are grouped (<code>PARTITION BY</code>)</li>
                    <li>How rows are ordered (<code>ORDER BY</code>)</li>
                </ul>

                <p><strong>Syntax:</strong></p>
                <pre><code>
{`</> PostgreSQL
<function_name>() OVER ( <operations> )
`}
                </code></pre>
            </div>

            <hr />

            <div>
                <h2><code>PARTITION BY</code></h2>
                <ul>
                    <li>Divides rows into <strong>independent partitions</strong>.</li>
                    <li>Similar to <code>GROUP BY</code></li>
                    <li>Does not reduce rows</li>
                    <li>Window calculation restarts for each partition</li>
                </ul>

                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS row_num
FROM employees;
`}
                </code></pre>
                
                <p className="mb-3"><strong>Return:</strong></p>
                <div className="overflow-auto">
                    <DataTable className="mx-auto w-100!"
                        indexed={true}
                        data={
                            Object.entries(groupByDepartment)
                                .reduce((acc, item) => [...acc, ...item[1]], [])
                                .map(({name, department, salary}, idx) => ({name, department, salary, row_num: idx + 1}))
                        }
                    />
                </div>
            </div>

            <hr />

            <div>
                <h2><code>ORDER BY</code></h2>
                
                <ul>
                    <li>Defines the <strong>order of rows inside each partition</strong>.</li>
                    <li>Mandatory for ranking functions</li>
                    <li>Controls calculation sequence for cumulative functions</li>
                </ul>

                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT
    name,
    department,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
`}
                </code></pre>
            </div>
        </div>
    )
}