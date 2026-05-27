export default function C6SqlAlchemyFiltering() {
    return (
        <div>
            <section className="sqlalchemy-filter-guide-title">
                <h1>SQLAlchemy Filtering Guide</h1>

                <div className="sqlalchemy-filter-guide__summary-sec-hypelnk">
                    <a href="#sqlalchemy-filter-guide-summary">&rarr; Summary part 1</a>
                    <a href="#sqlalchemy-filter-guide-summary-2">&rarr; Summary part 2</a>
                </div>
            </section>
            <hr />

            {/* filter_by() */}
            <section className="sqlalchemy-filter-guide-sec">
                <h2>1. <code className="hiligt">filter_by()</code> &mdash; Simple equality only</h2>
                <article  className="sqlalchemy-filter-guide__filterby">
                    <p>Uses keyword arguments.</p>
                    <pre><code>session.query(User).filter_by(name="John", age=30)</code></pre>
                    <h3>Limitations:</h3>
                    <ul>
                        <li>Only works with <code>=</code> comparisons.</li>
                        <li>Cannot user <code>&lt;</code>, <code>&gt;</code>, <code>!=</code>, <code>LIKE</code>, <code>IN</code>, etc.</li>
                    </ul>
                    <p>Think of it as shorthand or convenience.</p>
                </article>
            </section>
            <hr />

            {/* filter() */}
            <section className="sqlalchemy-filter-guide-sec">
                <h2>2. <code className="hiligt">filter()</code> &mdash; Full power filtering</h2>
                <article>
                    <p>Use this for all real conditions.</p>
                    <p>Examples:</p>
                    <pre><code>
{`session.query(User).filter(User.age > 20)
session.query(User).filter(User.name != "John")
session.query(User).filter(User.name.like("%hn%"))
session.query(User).filter(User.age.in_([20, 30, 40]))`}
                    </code></pre>
                </article>
            </section>
            <hr />

            {/* Logical Operator */}
            <section>
                <h2>3. Logical Operators</h2>
                <article>
                    <div>
                        <h3>A. AND conditions</h3>
                        <p>Option 1 &mdash; Python <code>&</code> operator</p>
                        <pre><code>
{`session.query(<class_name>).filter(
    (<class_name>.age > 20) & (User.age < 50)
)`}
                        </code></pre>

                        <p>Option 2 &mdash; <code>and_()</code> function</p>
                        <pre><code>
{`from sqlalchemy import and_

session.query(User).filter(
    and_(User.age > 20, User.age < 50)
) `}
                        </code></pre>
                        <p>Both do the same thing.</p>
                    </div>

                    <div>
                        <h3>B. OR condition</h3>
                        <p>Option 1 &mdash; Python <code>|</code> operator</p>
                        <pre><code>
{`session.query(User).filter(
    (User.name == "John") | (User.name == "Jane")
)`}
                        </code></pre>

                        <p>Option 2 &mdash; <code>or_()</code> function</p>
                        <pre><code>
{`from sqlalchemy import or_

session.query(User).filter(
    or_(User.name == "John", User.name == "Jane")
)`}
                        </code></pre>
                        <p>Same result.</p>
                    </div>
                    
                    <div>
                        <h3>C. NOT conditions</h3>
                        <p>Option 1 &mdash; Python <code>~</code> operator</p>
                        <pre><code>
{`session.query(User).filter(
    ~ (User.age < 30)
)`}
                        </code></pre>

                        <p>Option 2 &mdash; <code>not_()</code> function</p>
                        <pre><code>
{`from sqlalchemy import not_

session.query(User).filter(
    not_(User.age < 30)
)`}
                        </code></pre>
                        <p>Same effect.</p>
                    </div>
                </article>
            </section>
            <hr />

            {/* Combining Everything */}
            <section>
                <h2>4. Combining Everything</h2>
                <article>
                    <p>Example combining AND, OR, NOT together:</p>
                    <pre><code>
{`from sqlalchemy import and_, or_, not_

session.query(User).filter(
    and_(
        User.age > 18,
        or_(User.name == "John", User.name == "Jane"),
        not_(User.age == 99)
    )
)`}
                    </code></pre>
                    <p>This is readable and recommended for long conditions.</p>
                </article>
            </section>
            <hr />

            {/* Summary */}
            <section id="sqlalchemy-filter-guide-summary">
                <div className="sqlalchemy-filter-guide-summary-title">
                    <h2>5. Short Practical Summary</h2>
                    <a href="#sqlalchemy-filter-guide-summary-2">&rarr; Summary part 2</a>
                </div>
                
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>Function/Operator</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>filter_by()</code></td>
                                <td>simple equalities only</td>
                            </tr>
                            <tr>
                                <td><code>filter()</code></td>
                                <td>full expression</td>
                            </tr>
                            <tr>
                                <td><code>&</code></td>
                                <td>AND</td>
                            </tr>
                            <tr>
                                <td><code>|</code></td>
                                <td>OR</td>
                            </tr>
                            <tr>
                                <td><code>~</code></td>
                                <td>NOT</td>
                            </tr>
                            <tr>
                                <td><code>and_()</code></td>
                                <td>AND function (useful for multiple conditions)</td>
                            </tr>
                            <tr>
                                <td><code>or_()</code></td>
                                <td>OR function</td>
                            </tr>
                            <tr>
                                <td><code>not_()</code></td>
                                <td>NOT function</td>
                            </tr>
                            <tr>
                                <td><code>underscore</code></td>
                                <td>only because <code>and</code>, <code>or</code>, <code>not</code> are Python keywords</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>
            <hr />

            {/* like() */}
            <section>
                <h2>6. <code className="hiligt">like()</code> &mdash; case-sensitive pattern matching</h2>
                <pre><code>session.query(User).filter(User.name.like("%hn%"))</code></pre>
                <p>Wildcards can be:</p>
                <ul>
                    <li><code>"%"</code> = wildcard (means: any characters)</li>
                    <li><code>"_"</code> = wildcard (means: exactly one character)</li>
                </ul>
            </section>
            <hr />

            {/* ilike() */}
            <section>
                <h2>7. <code className="hiligt">ilike()</code> &mdash; case-insensitive LIKE</h2>
                <article>
                    <pre><code>session.query(User).filter(User.name.ilike("john%"))</code></pre>
                    <p>Finds:</p>
                    <ul>
                        <li>"John", "john", "JOHN", etc.</li>
                        <li>Starts with "john"</li>
                    </ul>
                    <p>(<strong>Note:</strong> Some dialects don't support <code>ilike()</code>; SQLite & PostgreSQL do.)</p>
                </article>
            </section>
            <hr />

            {/* in_() */}
            <section>
                <h2>8. <code className="hiligt">in_()</code> &mdash; match any value in a list</h2>
                <article>
                    <pre><code>session.query(User).filter(User.age.in_([20, 25, 30]))</code></pre>
                    <p><strong>Negation:</strong></p>
                    <pre><code>session.query(User).filter(~User.age.in_([20, 25, 30]))</code></pre>
                </article>
            </section>
            <hr />

            {/* between() */}
            <section>
                <h2>9. <code className="hiligt">between()</code> &mdash; inclusive range</h2>
                <article>
                    <pre><code>session.query(User).filter(User.age.between(18, 30))</code></pre>
                    <p>Equivalent to:</p>
                    <pre><code>{`(User.age >= 18) & (User.age <= 30)`}</code></pre>
                </article>
            </section>
            <hr />

            {/* is_() */}
            <section>
                <h2>10. <code className="hiligt">is_()</code> and <code className="hiligt">isnot()</code> &mdash; NULL checking</h2>
                <article>
                    <p>SQL uses <code className="hiligt">IS NULL</code> and <code className="hiligt">IS NOT NULL</code>, not <code className="hiligt">= NULL</code>.</p>
                    <h3>Check if NULL:</h3>
                    <pre><code>session.query(User).filter(User.name.is_(None))</code></pre>

                    <h3>Check if NOT NULL:</h3>
                    <pre><code>session.query(User).filter(User.name.isnot(None))</code></pre>
                </article>
            </section>
            <hr />

            {/* startswith() and endswith() */}
            <section>
                <h2>11. <code className="hiligt">startswith()</code>/<code className="hiligt">endswith()</code></h2>
                <p>Python-style string helpers.</p>
                <article>
                    <h3>Starts with:</h3>
                    <pre><code>session.query(User).filter(User.name.startswith("J"))</code></pre>

                    <h3>Ends with:</h3>
                    <pre><code>session.query(User).filter(User.name.endswith("n"))</code></pre>
                    <p>These convert under the hood to LIKE operations.</p>
                </article>
            </section>
            <hr />

            {/* contains() */}
            <section>
                <h2>12. <code className="hiligt">contains()</code></h2>
                <p>Same spirit, but nicer syntax:</p>
                <pre><code>session.query(User).filter(User.name.contains("oh"))</code></pre>
                <p>Equivalent to <code>LIKE "%oh%"</code>.</p>
            </section>
            <hr />

            {/* Combination */}
            <section>
                <h2>13. Combining multiple filters </h2>
                <article>
                    <h3>Chain <code className="hiligt">filter()</code> calls:</h3>
                    <pre><code>
{`session.query(User)\
    .filter(User.age > 18)\
    .filter(User.name.ilike("%john%"))`}
                    </code></pre>

                    <h3>Equivalent to:</h3>
                    <pre><code>
{`session.query(User).filter(
    (User.age > 18) & (User.name.ilike("%john%"))
)`}
                    </code></pre>
                </article>
            </section>
            <hr />

            {/* Filtering by multiple tables */}
            <section>
                <h2>14. Filtering by multiple tables (when joins appear later)</h2>
                <article>
                    <pre><code>session.query(User).join(Address).filter(Address.city == "Manila")</code></pre>
                    <p>(Not needed yet &mdash; just good to know.)</p>
                </article>
            </section>
            <hr />

            {/* Summary 2 */}
            <section id="sqlalchemy-filter-guide-summary-2">
                <div className="sqlalchemy-filter-guide-summary-title">
                    <h2>Summary</h2>
                    <a href="#sqlalchemy-filter-guide-summary">&rarr; Summary part 1</a>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>LIKE</td>
                            <td><code>User.name.like("%x%")</code></td>
                        </tr>
                        <tr>
                            <td>ILIKE</td>
                            <td><code>User.name.ilike("%x%")</code></td>
                        </tr>
                        <tr>
                            <td>IN</td>
                            <td><code>User.age.in_([20, 30, 40])</code></td>
                        </tr>
                        <tr>
                            <td>NOT IN</td>
                            <td><code>~User.age.in_([20, 30, 40])</code></td>
                        </tr>
                        <tr>
                            <td>BETWEEN</td>
                            <td><code>User.age.between(18, 30)</code></td>
                        </tr>
                        <tr>
                            <td>IS NULL</td>
                            <td><code>User.name.is_(None)</code></td>
                        </tr>
                        <tr>
                            <td>NOT NULL</td>
                            <td><code>User.name.isnot(None)</code></td>
                        </tr>
                        <tr>
                            <td>STARTS</td>
                            <td><code>User.name.startswith("J")</code></td>
                        </tr>
                        <tr>
                            <td>ENDS</td>
                            <td><code>User.name.endswith("n")</code></td>
                        </tr>
                        <tr>
                            <td>CONTAINS</td>
                            <td><code>User.name.contains("oh")</code></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}