import DataTable from "../../../components/useDataTable";
import { employeesTable } from "./dummyPSQLData";

const employees = [
    {id: 1, name: 'Taro Yamada', salary: 8000},
    {id: 2, name: 'Juan Dela Cruz', salary: 7000},
    {id: 3, name:'John Smith', salary: 7000},
    {id: 4, name:'John Doe', salary: 6000},
    {id: 5, name:'Charles Sandwich', salary: 6000},
    {id: 6, name:'Lina Pickles', salary: 5000},
]

export default function PostgreSQL27RankAndDenseRank() {
    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-5"><code>RANK()</code> and <code>DENSE_RANK()</code></h1>

            <ul>
                <li>Are <strong>window functions</strong>.</li>
                <li>Assign ranking numbers to rows</li>
                <li>Do not reduce the number of rows</li>
                <li>Require the <code>OVER()</code> clause</li>
                <li>Depend on <code>ORDER BY</code></li>
            </ul>

            <hr className="my-5" />

            <div>
                <h2><code>RANK()</code></h2>
                <p className="mb-3">Assigns the <strong>same rank to equal values</strong> and <strong>skips the next rank numbers</strong>.</p>
            
                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
RANK() OVER ( ORDER BY <col_name> )
`}
                </code></pre>

                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name, 
    salary,
    RANK() OVER ( ORDER BY salary DESC ) as rank
FROM employees;
`}
                </code></pre>

                <h3>Return:</h3>
                <DataTable className="mx-auto w-80! [&_td:nth-child(4)]:w-15 [&_tbody_td:nth-child(4)]:text-(--txt-red)"
                    indexed={true}
                    data={
                        employees.toSorted((a, b) => b.salary - a.salary)
                            .reduce((acc, { id, salary }, idx) => {
                                const exists = acc.filter(item => item.salary === salary)

                                if (exists.length >= 1) return [...acc, {id, salary, rank: exists[0]?.rank}]
                                
                                return [...acc, {id, salary, rank: idx + 1}]
                        }, [])
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>DENSE_RANK()</code></h2>
                <p>Assigns the <strong>same rank to equal values</strong> but <strong>does not skip numbers</strong>.</p>
                
                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
DENSE_RANK() OVER ( ORDER BY <col_name> )
`}
                </code></pre>

                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
`}
                </code></pre>

                <p><strong>Return:</strong></p>
                <DataTable className="mx-auto w-80! [&_td:nth-child(3)]:w-15 [&_tbody_td:nth-child(3)]:text-(--txt-red)"
                    data={
                        employees.toSorted((a, b) => b.salary - a.salary)
                            .reduce((acc, { id, salary }) => {
                                const lastRank = acc[acc.length - 1]?.dense_rank ?? 0
                                const exists = acc.filter(item => item.salary === salary)

                                if (exists.length >= 1) return [...acc, {id, salary, dense_rank: exists[0].dense_rank}]

                                return [...acc, {id, salary, dense_rank: lastRank + 1}]
                        }, [])
                    }
                />
            </div>
        </div>
    )
}