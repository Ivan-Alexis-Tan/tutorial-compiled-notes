import DataTable, { useToggleDataTable } from "../../../components/useDataTable";
import { fullStudentsData, jrLevels, studentsData } from "./dummyPSQLData";

const tableIds = {
    t1: false,
}

export default function PostgreSQL20AggregateFn() {
    const { useHookTools } = useToggleDataTable(tableIds)
    const noNulls = studentsData.filter(student => student.marks !== null)
    const avgPerGradeLvl = fullStudentsData.reduce(
        (acc, student) => {
            if (student.marks === null) return acc;

            const avg = acc[student.grade_level]
            avg 
                ? acc[student.grade_level] = (avg + student.marks) / 2
                : acc[student.grade_level] = student.marks

            return acc
        }, {}
    )

    const avgPerGradeLvlArr = jrLevels.map(lvl => ({
        grade_level: lvl, 
        avg: avgPerGradeLvl[lvl],
    }))

    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Aggregate Functions</h1>

            <div>
                <ul>
                    <li><strong>Performs calculations on multiple rows</strong> and return <strong>one single result</strong>.</li>
                    <li>Maily used with <code>SELECT</code> statements and often combined with <code>GROUP BY</code>.</li>
                </ul>
            </div>

            <hr className="my-5" />

            <div>
                <h2><code>COUNT()</code></h2>
                <div className="mb-5">
                    <ul>
                        <li>Counts all rows.</li>
                        <li>Counts only non-<code>NULL</code> values.</li>
                    </ul>
                </div>

                <p>Example:</p>
                <pre><code>
{`</> PostgreSQL
SELECT COUNT(marks) FROM students;
`}
                </code></pre>

                <p>Return:</p>
                <DataTable 
                    className="mx-auto w-50!"
                    indexed={true}
                    data={[{count: noNulls.length}]}
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>SUM()</code></h2>
                <ul>
                    <li>Adds all non-<code>NULL</code> values</li>
                </ul>

                <p>Example:</p>
                <pre><code>
{`</> PostgreSQL
SELECT SUM(marks) FROM students
`}
                </code></pre>

                <p>Return:</p>
                <DataTable className="mx-auto w-50!"
                    data={[{
                        sum: noNulls.reduce((acc, student) => acc + student.marks, 0)
                    }]}
                    indexed={true}
                />
            </div>

            <hr className="--hr-faded" />
        
            <div>
                <h2><code>AVG()</code></h2>

                <ul className="mb-5">
                    <li>Stands for average</li>
                    <li>Calculates average, <strong>excluding <code>NULL</code> values</strong>.</li>
                    <li>Result is usually a <strong>decimal number</strong>.</li>
                </ul>

                <p>Example:</p>
                <pre><code>
{`</> PostgreSQL
SELECT AVG(marks) FROM students
`}
                </code></pre>

                <p>Return:</p>
                <DataTable className="mx-auto w-50!"
                    indexed={true}
                    data={[{
                        avg: noNulls.reduce((acc, student) => (acc + student.marks) / 2, 0)
                    }]}
                />
            </div>

            <hr className="--hr-faded" />

            <div className="[&>div]:mb-5">
                <h2><code>MIN()</code> and <code>MAX()</code></h2>
                
                <ul className="mb-5">
                    <li><code>MIN()</code> &mdash; lowest value</li>
                    <li><code>MAX()</code> &mdash; highest value</li>
                </ul>

                <div>
                    <p>Example 1: <code>MIN()</code></p>
                    <pre><code>
{`</> PostgreSQL
SELECT MIN(marks) FROM students
`}
                    </code></pre>
                    <DataTable className="mx-auto w-50!"
                        indexed={true}
                        data={[{
                            min: noNulls.reduce((acc, student) => Math.min(acc, student.marks), 500)
                        }]}
                    />
                </div>
                
                <div>
                    <p>Example 2: <code>MAX()</code></p>
                    <pre><code>
{`</> PostgreSQL
SELECT MAX(marks) FROM students
`}
                    </code></pre>
                    <DataTable className="mx-auto w-50!"
                        indexed={true}
                        data={[{
                            max: noNulls.reduce((acc, student) => Math.max(acc, student.marks), 0)
                        }]}
                    />
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>With <code>GROUP BY</code></h2>

                <pre><code>
{`</> PostgreSQL
SELECT
    grade_level,
    AVG(marks)
FROM students
GROUP BY grade_level;
`}
                </code></pre>
                
                <p>Return:</p>
                <DataTable className="mx-auto mb-5 w-60!"
                    indexed={true}
                    data={avgPerGradeLvlArr}
                />

                <ul>
                    <li>Calculates average marks on each grade levels.</li>
                    <li>Every column in <code>SELECT</code> (except aggregates) must be in <code>GROUP BY</code>.</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Using <code>HAVING</code> with Aggregates</h2>
                <ul>
                    <li><code>HAVING</code> filters <strong>after aggregation</strong>.</li>
                    <li><code>WHERE</code> filters <strong>before aggregation</strong>.</li>
                </ul>

                <pre><code>
{`</> PostgreSQL
SELECT 
    grade_level, 
    AVG(marks)
FROM students
GROUP BY grade_level
HAVING AVG(marks) > 80;
`}
                </code></pre>

                <p>Return:</p>
                <DataTable className="mx-auto mb-5 w-60!"
                    indexed={true}
                    data={avgPerGradeLvlArr.filter(item => item.avg > 80)}
                />
            </div>
        </div>
    )
}