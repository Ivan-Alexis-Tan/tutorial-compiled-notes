import DataTable from "../../../components/useDataTable";
import { employeesTable } from "./dummyPSQLData";

export default function PostgreSQL25CTE() {
    return (
        <div>
            <h1 className="mb-5">Common Table Expression (CTE)</h1>

            <div>
                <ul>
                    <li>A temporary named result set defined using <code>WITH</code></li>
                    <li>Exists only for the duration of the query.</li>
                    <li>Improves readability and structure</li>
                    <li>Can be referenced multiple times in the same query.</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
WITH <cte_name> AS ( SELECT <query> )
SELECT *
FROM <cte_name>;
`}
                </code></pre>
            
                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
WITH high_salary_exp AS ( 
    SELECT id, name, salary
    FROM employees
    WHERE salary > 50000 
)
SELECT *
FROM high_salary_exp;
`}       
                </code></pre>

                <p><strong>Return:</strong></p>
                <DataTable className="mx-auto max-w-70!"
                    indexed={true}
                    data={
                        employeesTable.reduce(
                            (acc, { id, name, salary }) => {
                                if (salary > 50000) return [...acc, {id, name, salary}]
                                return acc
                            }, []
                        )
                    }
                />
            </div>
        </div>
    )
}