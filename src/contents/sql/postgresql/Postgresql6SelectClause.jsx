import DataTable from "../../../components/useDataTable";
import { studentsData } from "./dummyPSQLData";

export default function Postgresql6SelectClause() {
    return (
        <div>
            <h1 className="mb-5"><code>Select</code> Clause</h1>

            <div>
                <h2>1. What does "<code>SELECT</code> works internally" means?</h2>
                <ul>
                    <li>Explains <strong>how PostgreSQL processes your <code>SELECT</code> query step by step</strong>.</li>
                    <li>Helps you <strong>write faster queries</strong> and <strong>debug performance issues</strong>.</li>
                </ul>

                <p><strong>Interview Line</strong></p>
                <p className="ml-5 mt-2">PostgreSQL converts a <code>SELECT</code> query into an execution plan and then executes it using the most efficient strategy.</p>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>2. High-level flow of a <code>SELECT</code> query</h2>

                <ul>
                    <li>SQL query is received</li>
                    <li>Query is parsed and validated</li>
                    <li>Query planner creates multiple plans</li>
                    <li>Best plan is selected (cost-based)</li>
                    <li>Execution runs the plan and returns rows</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2 className="mb-5">3. Execution order of <code>SELECT</code> clauses (Logical order)</h2>

                <p className="mb-2">Logical execution order:</p>
                <ul className="[&>li]:list-decimal! mb-5">
                    <li><code>FROM</code></li>
                    <li><code>WHERE</code></li>
                    <li><code>GROUP BY</code></li>
                    <li><code>HAVING</code></li>
                    <li><code>SELECT</code></li>
                    <li><code>ORDER BY</code></li>
                    <li><code>LIMIT</code></li>
                </ul>

                <p>Example:</p>
                <pre><code>
{`</> PogstgreSQL
SELECT name 
FROM users
WHERE age > 18
ORDER BY name
LIMIT 5;
`}
                </code></pre>
                <p>Filtering happens before selecting columns.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2 className="mb-3">4. <code>EXPLAIN</code> &mdash; See how PostgreSQL plans a query</h2>
                <ul>
                    <li><code>EXPLAIN</code> shows the <strong>execution plan</strong>, not the actual execution.</li>
                </ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
EXPLAIN
SELECT * FROM students;
`}
                </code></pre>

                <p className="mb-2">Result:</p>
                <DataTable className="mb-5 mx-auto max-w-120"
                    data={[{"": 1, "QUERY PLAN text":"Seq Scan on students (cost=0.00..13.10 rows=310 width=234)"}]}
                />

                <p className="mb-1">Shows:</p>
                <ul>
                    <li>Scan type</li>
                    <li>Cost &mdash; the greater the value, the more inefficient the query is</li>
                    <li>Estimated rows</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2 className="mb-3">5. <code>EXPLAIN ANALYZE</code> &mdash; Real execution details</h2>
                <ul><li>Executes the query and shows <strong>actual time and rows</strong>.</li></ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
EXPLAIN ANALYZE
SELECT * FROM students;
`}
                </code></pre>

                <p className="mb-2">Result:</p>
                <DataTable className="mb-5 mx-auto max-w-120"
                    data={[
                        {"": 1, "QUERY PLAN text": "Seq Scan on students (cost=0.00..13.10 rows=310 width=234)"},
                        {"": 2, "QUERY PLAN text": "Buffers: shared hit=1" },
                        {"": 3, "QUERY PLAN text": "Planning Time: 0.194 ms"},
                        {"": 4, "QUERY PLAN text": "Execution Time: 0.110 ms"},
                    ]}
                />

                <p>Used for:</p>
                <ul>
                    <li>Performance tuning</li>
                    <li>Index validation</li>
                </ul>
            </div>
        </div>
    )
}