export default function C9SqlAlchemyDefer() {
    return (
        <div>
            <section>
                <h1>SQLAlchemy Deferred Loading</h1>
            </section>
            <hr />

            <section>
                <h2>Models to be Used as Structure</h2>
                <p>The same model will be used to demonstrate code examples.</p>
                <article>
                    <pre><code>
{`from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker, deferred

Base = declarative_base()

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    # heavy columns
    content = deferred(Column(Text))            # defer individually
    notes = Column(Text)                         # normal
    summary = Column(Text)                       # will be part of a defer group

# Defer groups defined at class level
Article.__mapper__.add_property("summary", deferred(Article.summary, group="meta"))
Article.__mapper__.add_property("notes", deferred(Article.notes, group="meta"))

engine = create_engine("sqlite://", echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# seed
a = Article(
    title="SQLAlchemy Guide",
    content="..." * 200,
    notes="..." * 300,
    summary="..." * 100
)
session.add(a)
session.commit()`}
                    </code></pre>
                </article>
            </section>
            <hr />

            <section>
                <h2>1. <code className="hiligt">deferred()</code> (class-level, ORM mapping)</h2>
                <article>
                    <p><strong>Meaning:</strong></p>
                    <ul><li>Don't load this column when the row is loaded. Load only when accessed.</li></ul>

                    <h3>Code:</h3>
                    <pre><code>
{`article = session.query(Article).first()
print(article.title)                        # no extra query
print(article.content)                      # triggers SELECT JUST FOR content`}
                    </code></pre>

                    <h3>Representative SQL (echo=True)</h3>
                    <pre><code>
{`SELECT articles.id AS articles_id,
    articles.title AS articles_title
FROM articles
    LIMIT ? OFFSET ?
(1, 0)

SELECT articles.content AS articles_content
FROM articles
WHERE articles.id = ?
(1,)`}
                    </code></pre>
                    
                    <div className="--check-bullet">
                        <p>Why: Only <code>id</code> + <code>title</code> are loaded initially.</p>
                        <p>Accessing <code>content</code> triggers its own query.</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>2. <code className="hiligt">defer()</code> (query-time control)</h2>
                <article>
                    <p>Lets you say: <i>during THIS query, don’t load certain columns</i> — even if they are not deferred in the model.</p>

                    <h3>Code:</h3>
                    <pre><code>
{`article = session.query(Article).options(
    defer(Article.notes)
).first()

print(article.notes)   # triggers SELECT for notes`}
                    </code></pre>

                    <h3>SQL:</h3>
                    <pre><code>
{`SELECT articles.id, articles.title
FROM articles
...

SELECT articles.notes
FROM articles
WHERE articles.id = ?`}
                    </code></pre>
                    <p>Even though <code>notes</code> is <strong>not deferred</strong> by default, <code>defer()</code> forces it.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>3. <code className="hiligt">undefer()</code> (query-time load-forcing)</h2>
                <article>
                    <p>Sometimes you <i>want to override class-level</i> deferred columns and load them immediately.</p>

                    <h3>Code:</h3>
                    <pre><code>
{`article = session.query(Article).options(
    undefer(Article.content)
).first()`}
                    </code></pre>

                    <h3>SQL:</h3>
                    <pre><code>
{`SELECT articles.id,
    articles.title,
    articles.content
FROM articles`}
                    </code></pre>
                    <p><code>content</code> is normally deferred, but <code>undefer()</code> loads it up front.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>4. Defer Groups (multiple columns, one switch)</h2>
                <article>
                    <p>Reminder:</p>
                    <p>We grouped <code>notes</code> + <code>summary</code> into <code>"meta"</code>.</p>
                    <p>This lets you defer groups:</p>
                    <pre><code>
{`article = session.query(Article).options(
    defer_group("meta")
).first()

print(article.notes)                        # triggers SELECT
print(article.summary)                      # triggers SELECT`}
                    </code></pre>

                    <p>(Syntax in SQLAlchemy 2.x)</p>
                    <pre><code>from sqlalchemy.orm import defer, undefer, defer_group, undefer_group</code></pre>

                    <h3>SQL (initial load):</h3>
                    <pre><code>
{`SELECT articles.id,
    articles.title
FROM articles
        </code></pre>

        <p>Then when accessing:</p>
        <pre><code>
SELECT notes FROM articles WHERE id = ?
SELECT summary FROM articles WHERE id = ?`}
                    </code></pre>
                </article>
            </section>
            <hr />

            <section>
                <h2>5. Undefer Groups</h2>
                <article>
                    <p>Load the entire group immediately.</p>

                    <h3>Code:</h3>
                    <pre><code>
{`article = session.query(Article).options(
    undefer_group("meta")
).first()`}
                    </code></pre>

                    <h3>SQL:</h3>
                    <pre><code>
{`SELECT articles.id,
    articles.title,
    articles.notes,
    articles.summary
FROM articles`}
                    </code></pre>

                    <div className="--check-bullet">
                        <p>Both <code>notes</code> + <code>summary</code> loaded up front</p>
                        <p><code>content</code> is still deferred (unless undeferred separately)</p>
                    </div>
                </article>
            </section>
            <hr />

            <section>
                <h2>6. <code className="hiligt">raiseload</code> (strict mode — accessing column crashes)</h2>
                <article>
                    <p>This is useful for debugging lazy-loading explosions.</p>

                    <h3>Code:</h3>
                    <pre><code>
{`from sqlalchemy.orm import raiseload

article = session.query(Article).options(
    raiseload("*")
).first()

print(article.notes)  # this raises an error`}
                    </code></pre>

                    <h3>Error:</h3>
                    <pre><code>
{`sqlalchemy.exc.InvalidRequestError:
raiseload enabled for attribute 'Article.notes'`}
                    </code></pre>
                    <p>This ensures SQLAlchemy <strong>never</strong> silently lazy-loads anything.</p>
                    <p>Great for performance audits.</p>
                </article>
            </section>
            <hr />

            <section>
                <h2>Sumamry Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Purpose</th>
                            <th>When SQL Fires</th>
                            <th>Usefulness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>deferred()</code></td>
                            <td>Default lazy column</td>
                            <td>When accessed</td>
                            <td>Control heavy fields</td>
                        </tr>
                        <tr>
                            <td><code>defer()</code></td>
                            <td>Disable loading for this query</td>
                            <td>When accessed</td>
                            <td>Query-specific optimization</td>
                        </tr>
                        <tr>
                            <td><code>undefer()</code></td>
                            <td>Force include in query</td>
                            <td>At initial SELECT</td>
                            <td>Fetch everything up-front</td>
                        </tr>
                        <tr>
                            <td><code>defer_group()</code></td>
                            <td>Defer multiple columns</td>
                            <td>When accessed</td>
                            <td>Bulk control of many fields</td>
                        </tr>
                        <tr>
                            <td><code>raiseload</code></td>
                            <td>Disallow any lazy-load</td>
                            <td>N/A (error)</td>
                            <td>Performance debugging</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}