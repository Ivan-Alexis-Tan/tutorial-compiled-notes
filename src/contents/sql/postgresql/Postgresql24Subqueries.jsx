import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable"
import { employeesTable } from "./dummyPSQLData"

const tableIds = {
    t1: false,
}

const avgSalary = employeesTable.reduce((acc, { salary }) => (salary + acc) / 2, 0)
const maxSalary = employeesTable.reduce((acc, { salary }) => Math.max(acc, salary), 0)

export default function PostgreSQLSubqueries() {
    const { useHookTools } = useToggleDataTable(tableIds)
    
    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-5">Subqueries</h1>

            <div>
                <ul>
                    <li>A query written inside another SQL query.</li>
                    <li>Inner query executes first</li>
                    <li>The result is used by the outer query</li>
                    <li>Enclosed in parenthesis</li>
                </ul>

                <h3>Types of Subqueries</h3>
                <ul className="[&>li]:list-decimal!">
                    {["Scalar", "Single-row", "Multi-row", "Correlated"].map(type => (
                        <li key={type}>{type} subquery</li>
                    ))}
                </ul>

                <h3>Data Table Sample</h3>
                <ToogleDataTable
                    tableKey={"t1"}
                    useHookTools={useHookTools}
                    tableData={employeesTable}
                />
            </div>

            <hr className="my-5" />

            <div>
                <h2>1. Scalar Subquery</h2>
                <ul><li>Returns <strong>one value</strong>.</li></ul>
            
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM employees
WHERE salary > (
    SELECT AVG(salary) FROM employees
);
`}
                </code></pre>
                
                <p className="mb-3"><strong>Return:</strong></p>
                <div className="overflow-auto">
                    <DataTable className="mx-auto mb-5 w-100!"
                        data={employeesTable.reduce(
                            (acc, employee) => {
                                if (employee.salary > avgSalary) return [...acc, employee]
                                return acc
                            }, []
                        )}
                    />
                </div>

                <ul>
                    <li>Average salary: {avgSalary}</li>
                    <li>Only returns those who are greater than the average salary.</li>
                </ul>

                <div>
                    <h3>Subquery in <code>SELECT</code> Clause.</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT 
    name,
    salary,
    (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;
`}
                    </code></pre>

                    <p><strong>Return:</strong></p>
                    <div className="overflow-auto">
                        <DataTable className="mx-auto w-90!"
                            indexed={true}
                            data={employeesTable.map(
                                emp => ({
                                    name: emp.name,
                                    salary: emp.salary, 
                                    avg_salary: avgSalary
                                })
                            )}
                        />
                    </div>
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>2. Single-row Subquery</h2>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT name, salary
FROM employees
WHERE salar = (
    SELECT MAX(salary)
    FROM employees
);
`}
                </code></pre>
                
                <p><strong>Return:</strong></p>
                <DataTable className="mx-auto w-70!"
                    indexed={true}
                    data={
                        employeesTable.filter(emp => emp.salary === maxSalary)
                            .map(emp => ({name: emp.name, salary: emp.salary}))
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>3. Multi-row Subquery</h2>
                
                <div>
                    <p className="mb-3">Must be used with operators like:</p>
                    <ul>
                        {["IN", "ANY", "ALL"].map(op => (
                            <li key={op}><code>{op}</code></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}