import DataTable from "../../../components/useDataTable";

const studentsTable = [
    {
        name: "Juan",
        city: "Maynila",
    },
    {
        name: "Juan",
        city: "Cebu",
    },
]

export default function PostgreSQL17Disctinct() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5"><code>DISTINCT</code> Clause</h1>

            <div className="*:mb-5">
                <div>
                    <h2 className="mb-2">Duplicated Rows</h2>
                    <ul>
                        <li>Are rows where <strong>one or more columns have the same values</strong>.</li>
                        <li>Usually occur due to <strong>bad inserts, missing constraints, or imports</strong>.</li>
                    </ul>

                    <p className="mb-1"><strong>Interview Line:</strong></p>
                    <p className="ml-5">They contain repeated values that can affect query accuracy and performance.</p>
                </div>

                <div>
                    <h2><code>DISTINCT</code></h2>

                    <ul>
                        <li>Used in a <code>SELECT</code> query to <strong>remove duplicated rows from the result set</strong>.</li>
                        <li><strong>Does not delete data from table</strong>, only filters output.</li>
                    </ul>
                </div>
            </div>

            <hr className="my-5" />

            <div>
                <h2>1. <code>DISTINCT</code> on a Single Column</h2>
                <p className="mb-5">Returns <strong>unique values</strong> from one column.</p>
                
                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT <col_name>
FROM <table_name>;
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT city
FROM student;
`}
                </code></pre>
                <p>If 2 or more city dulicates, will <strong>only return once</strong>.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>2. <code>DISTINCT</code> on Multiple Columns</h2>
                <p className="mb-5">Uniqueness is checked on the <strong>combination of columns</strong>.</p>
                
                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT <col_name_1>, <col_name_2>
FROM <table_name>;
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT city, course
FROM student;
`}
                </code></pre>
                <p>Duplicated rows are removed only if <strong>both city and course match</strong>.</p>
            </div>

            <hr className="--hr-faded" />
        
            <div>
                <h2>3. <code>DISTINCT</code> vs Duplicate Rows</h2>
                <p className="mb-3">Consider table data:</p>

                <DataTable className="mx-auto w-50!"
                    data={[{name: "Juan", city: "Maynila"}, ...studentsTable]}
                />

                <div className="mx-auto max-w-100 overflow-auto">
                    <pre><code>
{`</> PostgreSQL
SELECT DISTINCT name, city
FROM student;
`}
                    </code></pre>
                </div>

                <div className="mx-auto w-50! mb-5">
                    <p className="mb-2"><strong>Return:</strong></p>
                    <DataTable
                        data={studentsTable}
                    />

                </div>

                <p>Only <strong>exact duplicate rows</strong> are removed.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>4. <code>DISTINCT</code> with <code>WHERE</code> Clause</h2>
                <p><code>WHERE</code> is applied <strong>before DISTINCT</strong>.</p>

                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT city
FROM students
WHERE marks > 80;
`}
                </code></pre>

                <p>Filter rows first, then removes duplicates.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>5. <code>DISTINCT</code> with <code>ORDER BY</code></h2>
                <p><code>ORDER BY</code> columns must appear in <code>SELECT</code> list.</p>

                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT city
FROM students
ORDER BY city;
`}
                </code></pre>
            </div>

            <hr className="--hr-faded" />
            
            <div>
                <h2>6. <code>DISTINCT</code> with Aggregate Functions</h2>
                <p><code>DISTINCT</code> can be used <strong>inside aggregate functions</strong>.</p>

                <pre><code>
{`</> PostgreSQL
SELECT COUNT(DISTINCT city)
FROM students;
`}
                </code></pre>

                <p>Counts unique cities only.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>7. <code>DISTINCT</code> vs <code>GROUP BY</code> (Very Important)</h2>
                
                <div>
                    <p><code>DISTINCT</code></p>
                    <ul>
                        <li>Removes duplicate rows</li>
                        <li>Simpler syntax</li>
                    </ul>
                </div>

                <div>
                    <p><code>GROUP BY</code></p>
                    <ul>
                        <li>Group rows</li>
                        <li>Used with aggregate functions</li>
                    </ul>
                </div>

                <pre><code>
{`</> PostgreSQL
SELECT DISTINCT city
FROM student;
`}
                </code></pre>

                <p>Same as:</p>

                <pre><code>
{`</> PostgreSQL
SELECT city
FROM student
GROUP BY city;
`}
                </code></pre>
            </div>
        </div>
    )
}