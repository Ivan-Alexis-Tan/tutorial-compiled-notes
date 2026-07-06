export default function Postgresql2NullValue() {
    return (
        <div className="[&>h1,&_h2]:mb-5">
            <h1>Null Value</h1>
            
            <div>
                <h2>1. Null is NOT THE SAME as 0 or Empty String</h2>

                <div className="flex justify-center">
                    <div className="w-90">
                        <table>
                            <thead>
                                <tr>
                                    <th>Value</th>
                                    <th>Meaning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>NULL</code></td>
                                    <td>Unknown or not provided</td>
                                </tr>
                                <tr>
                                    <td><code>0</code></td>
                                    <td>A valid integer</td>
                                </tr>
                                <tr>
                                    <td><code>""</code></td>
                                    <td>Empty string (valid text)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> SQL
SELECT NULL = 0;        -- returns NULL (not a value of ${"`true`"})
SELECT "" = NULL;       -- returns NULL
`}
                </code></pre>
                <p>If you compare anything to <code>NULL</code> it will always return <code>NULL</code>, not boolean value.</p>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>2. <code>IS NULL</code> and <code>IS NOT NULL</code></h2>
                <p className="mb-5">The only way to check <code>NULL</code> values.</p>
                <p><strong>Example:</strong></p>
                <p>Checking if <code>email</code> column</p>
                <pre><code>
{`</> SQL
-- Find rows that where email is missing
SELECT * FROM users 
WHERE email IS NULL;

-- Find rows where email filled with values other than null
SELECT * FROM users 
WHERE email IS NOT NULL;
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />
            
            <div className="[&>div]:mb-5">
                <h2>3. <code>NULL</code> in <code>WHERE</code> Clause and Aggregate Functions (Very Important)</h2>
                <div className="mb-5">
                    <p>Rows with <code>NULL</code> are <strong>excluded</strong> in normal comparisons.</p>
                    <p>The same as aggregate functions.</p>
                </div>
                
                <div>
                    <p><strong>Example 1:</strong> In <code>WHERE</code> clause </p>
                    <pre><code>
{`</> SQL
SELECT * FROM students 
WHERE marks > 60
`}
                    </code></pre>
                    <p>If column <code>marks</code> is <code>NULL</code> &rarr; that row is <strong>ignored and not returned</strong>, not included</p>
                </div>
                
                <div>
                    <p><strong>Example 2:</strong> Aggregation Functions</p>
                    <p>Check <code>marks</code> column</p>
                    <pre><code>
{`</> SQL
SELECT AVG(marks) FROM students;
`}
                    </code></pre>
                    <p>Rows with <code>NULL</code> value in <code>marks</code> column are <strong>NOT counted</strong> in result of average function.</p>
                </div>
                
                <div>
                    <p><strong>Example 3:</strong> Counting rows instead certain column</p>
                    <pre><code>
{`</> SQL
SELECT COUNT(marks) FROM students;      -- ignores NULL
SELECT COUNT(*) FROM stundents;         -- counts all rows
`}
                    </code></pre>
                </div>
            </div>
        </div>
    )
}