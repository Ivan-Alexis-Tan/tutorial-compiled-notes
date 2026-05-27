
export default function C4SqlAlchemyOrderBy() {
    return (
        <div>
            <section className="sqlalchemy-orderby-guide-sec">
                <h2>SQLAlchemy Order_by</h2>
                <p><code>.order_by()</code> sorts the query results by one or more columns.</p>
            </section>
            <hr />

            {/* Basic Usage */}
            <section className="sqlalchemy-orderby-guide-sec">
                <h2>1. Basic Usage</h2>
                <article className="sqlalchemy-orderby-guide__basic-usage">
                    <div>
                        <h3>Sort by a single column:</h3>
                        <pre><code>{`session.query(<class_name>).order_by(<class_name>.<attribute>).all()`}</code></pre>
                    </div>

                    <div>
                        <h3>Default ordering</h3>
                        <p>&ndash; Ascending (ASC)</p>
                        <p>Same as:</p>
                        <pre><code>{`session.query(<class_name>).order_by(<class_name>.<attribute>.asc())`}</code></pre>
                    </div>
                </article>
            </section>
            <hr />

            {/* Descending Order */}
            <section className="sqlalchemy-orderby-guide-sec">
                <h2>2. Descending Order</h2>
                <pre><code>{`session.query(<class_name>).order_by(<class_name>.<attrib>.desc()).all()`}</code></pre>
            </section>
            <hr />

            <section className="sqlalchemy-orderby-guide-sec">
                <h2>3. Multiple Columns</h2>
                <article>
                    <p>You can sort by several columns in order of priority:</p>
                    <pre><code>{`session.query(<class_name>).order_by(<class_name>.<attrib_1>, <class_name>.<attrib_2>).all()`}</code></pre>
                    <p>Meaning:</p>
                    <ul>
                        <li>sort by age first</li>
                        <li>if ages match, sort by name</li>
                    </ul>
                </article>
            </section>
            <hr />

            <section>
                <h2>4. Mixing ASC and DESC</h2>
                <pre><code>{`session.query(<class_name>).order_by(<class_name>.<attrib_1>.desc(), <class_name>.<attrib_2>.asc()).all()`}</code></pre>
            </section>
            <hr />

            <section>
                <h2>5. Using Text-based Order (rare but possible)</h2>
                <p>Only when you need special SQL expressions:</p>
                <pre><code>
{`from sqlalchemy import text
session.query(<class_name>).order_by(text("<attrib_1> DESC, <attrib_2> ASC")).all()`}
                </code></pre>
            </section>

            <section>
                <h2>6. Ordering With <code className="hiligt">filter()</code></h2>
                <p><code>.order_by()</code> always goes after <code>.filter()</code> in a typical chain:</p>
                <pre><code>
{`session.query(<class_name>)\
    .filter(<class_name>.<attrib_1> > 20)\
    .order_by(<class_name>.<attrib_2>)\
    .all()`}
                </code></pre>
            </section>
            <hr />

            <section>
                <h2>7. Random Ordering (SQLite, PostgreSQL)</h2>
                <p>Useful for "random user pick" type features:</p>
                
                <div>
                    <p>SQLite:</p>
                    <pre><code>
{`from sqlalchemy.sql import func
session.query(<class_name>).order_by(func.random()).all()`}
                    </code></pre>
                </div>

                <div>
                    <p>PostgreSQL:</p>
                    <pre><code>
{`from sqlalchemy.sql import func
session.query(<class_name>).order_by(func.random()).all()`}
                    </code></pre>
                </div>
            </section>
            <hr />

            <section>
                <h2>8. Ordering with <code className="hiligt">limit()</code></h2>
                <pre><code>
{`youngest = session.query(<class_name>)\
    .order_by(<class_name>.<attrib>)\
    .limit(1)\
    .one_or_none()`}
                </code></pre>
            </section>
            <hr />

            <section>
                <h2>Quick Summary (Memorize This Block)</h2>
                <ul>
                    <li><code>.order_by(&lt;class_name&gt;.column)</code> &rarr; ASC</li>
                    <li><code>.order_by(&lt;class_name&gt;.column.desc())</code> &rarr; DESC</li>
                    <li><code>.order_by(&lt;class_name&gt;.col1, &lt;class_name&gt;.col2&gt;)</code> &rarr; multi-sort</li>
                </ul>
                <p>That’s essentially the whole <code>.order_by()</code> toolkit for everyday ORM usage.</p>
            </section>
        </div>
    )
}