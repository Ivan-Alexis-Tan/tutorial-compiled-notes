export default function C7SqlAlchemyGroupingAndChaining() {
    return (
        <div>
            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>SQLAlchemy Grouping and Chaining</h2>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>1. <code className="hiligt">GROUP BY</code></h2>
                <article>
                    <h3>Querying entire objects</h3>
                    <pre><code>session.query(User).group_by(User.age).all()</code></pre>
                    <ul>
                        <li>Returns <strong>User objects</strong>, but grouped by age.</li>
                        <li><strong>Important:</strong> SQLAlchemy returns one representative per group (often the <i>first</i> row encounter in that group).</li>
                        <li>Equivalent SQL:</li>
                        <pre><code>
{`SELECT * 
FROM users 
GROUP BY age;`}
                        </code></pre>
                        <li>Not logically sound in strict SQL, but SQLAlchemy (and many SQL engines) allow it.</li>
                    </ul>

                    <h3>Querying Specific Columns</h3>
                    <pre><code>session.query(User.age).group_by(User.age).all()</code></pre>
                    <ul>
                        <li>Now you’re selecting <b>only the</b> <code>age</code> <b>column</b>, not the entire row.</li>
                        <li>Output becomes: <code>{`[(<age>,), (<age>,), (<age>,), ...]`}</code></li>
                        <li><strong>Example Output:</strong></li>
                        <pre><code>[(20,), (22,), (23,), ...]</code></pre>
                        <li>Each element is a <strong>tuple</strong>, because SQLAlchemy always returns rows as tuples, even if it’s one column.</li>
                    </ul>
                    <p>Equivalent SQL:</p>
            <pre><code>
{`SELECT age 
FROM users 
GROUP BY age;`}
            </code></pre>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>2. Using <code className="hiligt">func</code> (aggregation)</h2>
                <article>
                    <p>Import:</p>
                    <pre><code>from sqlalchemy import func</code></pre>

                    <h3>Counting rows per group</h3>
                    <pre><code>session.query(User.age, func.count(User.id)).group_by(User.age).all()</code></pre>
                    <ul>
                        <li>Returns: <code>[(20, 3), (22, 1), (23, 3), ...]</code></li>
                        <li>Interpretation:</li>
                        <ul>
                            <li><code>20</code> &rarr; age</li>
                            <li><code>3</code> &rarr; number of users with that age</li>
                        </ul>
                        <li><code>count(User.id)</code> = count how many rows have a non-null <code>id</code> (basically: count users).</li>
                    </ul>
                    <p>Equivalent SQL:</p>
            <pre><code>
{`SELECT age, 
    COUNT(id) 
FROM users 
GROUP BY age;`}
            </code></pre>

                    <h3>Grouping by name</h3>
                    <pre><code>session.query(User.name, func.count(User.id)).group_by(User.name).all()</code></pre>
                    <p>Returns name + count of same name.</p>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>3. Chaining filters</h2>
                <article>
                    <h3>Multiple <code className="hiligt">.filter()</code> calls</h3>
            <pre><code>
{`session.query(User)
    .filter(User.age > 24)
    .filter(User.age < 50)
    .all()`}
            </code></pre>

                    <h3>Comma versioni (same logic)</h3>
                    <pre><code>{`session.query(User).filter(User.age > 24, User.age < 50).all()`}</code></pre>
                    <p>both mean:</p>
                    <pre><code><span className="--blue">WHERE</span> age &gt; 24 <span className="--blue">AND</span> age &lt; 50</code></pre>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>4. Full Combination Example</h2>
                <article>
                    <pre><code>
{`session.query(User.age, func.count(User.id))
    .filter(User.age > 24)
    .order_by(User.age)
    .filter(User.age < 50)
    .group_by(User.age)
    .all()`}
                    </code></pre>
                <p>SQL:</p>
                <pre><code>
{`SELECT age, 
    COUNT(id)
FROM users
WHERE age &gt; 24 AND age < 50
GROUP BY age
ORDER BY age;`}
                </code></pre>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>5. Conditional Chaining (dynamic queries)</h2>
                <article>
                    <p>Useful when filters depend on variables:</p>
                    <pre><code>
{`only_iron_man = True
group_by_age = True

users = session.query(User)

if only_iron_man:
    users = users.filter(User.name == "Iron Man")

if group_by_age:
    users = users.group_by(User.age)

users = users.all()`}
                    </code></pre>
                    <p>Equivalent SQL:</p>
                    <pre><code>
{`SELECT * 
FROM users
WHERE name = "Iron Man"
GROUP BY age;`}
                    </code></pre>
                    <p>Flip flags &rarr; behavior instantly changes.</p>
                    <p>This is one of SQLAlchemy’s biggest strengths: <code>incremental</code>, <code>editable queries</code>.</p>
                </article>
            </section>
            <hr />

            <section className="sqlalchemy-grouping-chaining-sec">
                <h2>6. Why grouping "age by age" make sense</h2>
                <article>
                    <p>Example Query:</p>
                    <pre><code>session.query(User.age).group_by(User.age).all()</code></pre>
                    <p>Even though it sounds weird, this is the SQL way of saying:</p>
                    <p className="--indented-meaning-text">"Give me each age category once."</p>
                    <p>You are not grouping <i>values</i> by themselves. You are grouping <i>rows</i> by a category.</p>
                    <p>It's like:</p>
                    <ul>
                        <li>You have 10 rows with age 20</li>
                        <li>5 rows with age 25</li>
                        <li>7 rows with age 30</li>
                    </ul>
                    <p><code>GROUP BY age</code> reduces this to one row per age <i>group</i>.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>7. Remember:</h2>
                <article>
                    <p className="--check-bullet"><code>group_by()</code> determines how rows are grouped.</p>
                    <p className="--check-bullet">Selecting entire objects with <code>GROUP BY</code> is allowed but not strictly SQL-safe</p>
                    <p className="--check-bullet">Aggregations (count, sum, avg, min, max) require <code>func</code></p>
                    <p className="--check-bullet">Output is always list of tuples unless you select whole objects</p>
                    <p className="--check-bullet">Multiple <code>.filter()</code> vs <code>.filter(a, b)</code> → same</p>
                    <p className="--check-bullet">Query chaining is lazy: nothing runs until <code>.all()</code>, <code>.first()</code>, <code>.one()</code>, etc.</p>
                    <p className="--check-bullet">Conditional building of queries is powerful for dynamic apps</p>
                </article>
            </section>
        </div>
    )
}