import DataTable from "../../../components/useDataTable";
import { employeesTable } from "./dummyPSQLData";

export default function PostgreSQL26RowNumberFn() {
    return (
        <div>
            <h1 className="mb-5"><code>ROW_NUMBER()</code></h1>

            <ul>
                <li>Assigns <strong>unique sequential number</strong> to each row.</li>
                <li>No duplicate numbers</li>
                <li>Even equal values get different numbers</li>
                <li>Requires <code>OVER</code> clause</li>
                <li>Execution order:</li>
                <ul className="ml-5 [&>li]:list-decimal!">
                    {["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ROW_NUMBER()", "ORDER BY"].map(clause => (
                        <li key={clause}><code>{clause}</code></li>
                    ))}
                </ul>
            </ul>

            <h3>Syntax:</h3>
            <pre><code>
{`</> PostgreSQL
ROW_NUMBER() OVER(
    ORDER BY <column_name>
)
`}
            </code></pre>

            <h3>Example:</h3>
            <pre><code>
{`</> PostgreSQL
SELECT
    name,
    salary,
    ROW_NUMBER() OVER (
        ORDER BY salary DESC
    ) AS row_num
FROM employees;
`}
            </code></pre>

            <p className="mb-3"><strong>Return:</strong></p>
            <DataTable className="mx-auto w-90! [&_td:nth-child(4)]:w-25"
                indexed={true}
                data={employeesTable.map(
                        ({ name, salary }, idx) => ({name, salary, row_num: idx + 1})
                    )
                }
            />
        </div>
    )
}