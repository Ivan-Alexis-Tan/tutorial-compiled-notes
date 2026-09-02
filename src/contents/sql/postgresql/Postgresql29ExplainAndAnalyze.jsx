import DataTable from "../../../components/useDataTable";

export default function PostgreSQL29ExplainAndAnalyze() {
    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-5"><code>EXPLAIN</code> and <code>EXPLAIN ANALYZE</code></h1>

            <div>
                <h2><code>EXPLAIN</code></h2>
                <ul>
                    <li>Shows <strong>how PostgreSQL plans to run a query</strong>.</li>
                    <li>Query is <strong>NOT executed</strong>.</li>
                    <li>Output is an <strong>estimate</strong></li>
                    <li>Used to understand planner decisions</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
EXPLAIN
SELECT <columns> FROM <table_name>
<query...>;
`}
                </code></pre>

                <h3>Example Output:</h3>
                <pre><code>
{`</> PostgreSQL
Index Scan using idx_transactions_user_id on transactions
  (cost=0.42..12.50 rows=50 width=120)
  (actual time=0.035..0.120 rows=47 loops=1)
  Index Cond: (user_id = 42)
Planning Time: 0.180 ms
Execution Time: 0.145 ms
`}
                </code></pre>

                <h2>Output could be:</h2>
                <ul className="[&>li]:list-decimal! [&>li]:font-bold [&>li]:text-xl [&>div]:ml-10 [&>ul]:ml-5">
                    <li>Scan Type</li>
                    <ul>
                        <li>PostgreSQL scans <strong>every row</strong></li>
                        <li>No index is used</li>
                    </ul>

                    <div>
                        <p className="mb-2"><strong>Common Scan Types</strong></p>
                        <ul>
                            <li><strong>Seq Scan</strong> &rarr; full table scan</li>
                            <li><strong>Index Scan</strong> &rarr; index used</li>
                            <li><strong>Index Only Scan</strong> &rarr; only index data</li>
                        </ul>
                    </div>

                    <li>Cost</li>
                    <div className="mb-3">
                        <p><strong>Example:</strong></p>
                        <pre><code>cost=0.42..12.50</code></pre>

                        <p className="mb-3">Meaning:</p>
                        <ul>
                            <li><code>0.42</code> &rarr; startup cost</li>
                            <li><code>12.50</code> &rarr; total estimated cost</li>
                            <li>Cost is <strong>relative</strong>, not time</li>
                        </ul>
                        <p>Lower cost is better.</p>
                    </div>

                    <li>Rows</li>
                    
                    <div className="mb-3">
                        <p><strong>Example:</strong></p>
                        <pre><code>rows=47</code></pre>
                        <p>Shows how many estimated rows are expected to return</p>
                    </div>

                    <li>Width</li>
                    <div>
                        <p><strong>Example:</strong></p>
                        <pre><code>width=120</code></pre>
                    </div>
                    <ul>
                        <li>Estimated row size in bytes</li>
                        <li>Used for memeory planning</li>
                    </ul>

                    <li>Filter</li>
                    <pre><code>{`Filter: (salary > 6000)`}</code></pre>
                    <ul>
                        <li>Condition applied after reading rows</li>
                    </ul>
                </ul>
            </div>

            <hr className="my-5" />

            <div>
                <h2><code>EXPLAIN ANALYZE</code></h2>

                <div>
                    <ul>
                        <li><strong>Executes the query</strong></li>
                        <li>Shows <strong>actual execution</strong></li>
                        <li>Displays real time and real rows</li>
                        <li>Used to find performance issues</li>
                    </ul>

                    <h3>Syntax:</h3>
                    <pre><code>
{`</> PostgreSQL
EXPLAIN ANALYZE
<query...>;
`}
                    </code></pre>

                    <h3>Example Output</h3>
                    <DataTable className="mx-auto mb-5 max-w-200! [&_tbody_td:is(.r1c0,.r2c0,.r3c0)]:pl-7!"
                        indexed={true}
                        data={[
                            {"QUERY PLAN": "Seq Scan on employees (cost=0.00..18.10 rows=2 width=68) (actual time=0.012..0.041 rows=1 loops=1)"},
                            {"QUERY PLAN": "Filter:(salary>60000)"},
                            {"QUERY PLAN": "Rows Removed by Filter: 4"},
                            {"QUERY PLAN": "Buffers: shared hit=1"},
                            {"QUERY PLAN": "Planning Time: 0.151 ms"},
                            {"QUERY PLAN": "Execution Time: 0.102 ms"}
                        ]}
                    />

                    <ul className="-ml-3! *:ml-5 [&>li]:list-decimal! [&>li]:text-xl [&>li]:font-bold">
                        <li>Estimated Rows vs Actual Rows</li>
                        <div>
                            <pre><code>
{`rows=2              -- estimated
(actual rows=1)     -- actual`}
                            </code></pre>
                            <ul>
                                <li>Planner expected 2 rows</li>
                                <li>Actually got 1 row</li>
                                <li>Large difference = bad estimation</li>
                            </ul>
                        </div>

                        <li>Actual Time</li>
                        <div>
                            <pre><code>actual time=0.012..0.041</code></pre>
                            <ul>
                                <li><code>0.012 ms</code> &rarr; time to first row</li>
                                <li><code>0.041 ms</code> &rarr; total node item</li>
                            </ul>
                        </div>

                        <li>Loops</li>
                        <div>
                            <pre><code>loops=1</code></pre>
                            <ul>
                                <li>Node executed once</li>
                                <li>If loops are high, performance can degrade</li>
                            </ul>
                        </div>

                        <li>Planning Time vs Execution Time</li>
                        <div>
                            <pre><code>
{`Planning Time: 0.110 ms
Execution Time: 0.320 ms`}
                            </code></pre>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}