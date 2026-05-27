// import '../styles/styles.css'

export default function C1SqlAlchemyIntro() {
    return (
        <div>
            <section className="intro-sqlalchemy-guide-page-title">
                <h1>SQLAlchemy Guide</h1>
                <p><a href="#intro-sqlalchemy-guide-full-code-example">View full code example</a></p>
            </section>
            <hr />

            {/* SQLAlchemy Def */}
            <section className="intro-sqlalchemy-guide-sec">
                <h2>1. What is SQLAlchemy?</h2>
                <article className="intro-sqlalchemy-guide__sqlalchemy-def">
                    <ul>
                        <div>
                            <li><b>A python library.</b></li>
                            <p>&ndash; For working databases.</p>
                        </div>
                        <div>
                            <li><b>ORM (Object Relational Mapping)</b></li>
                            <p>&ndash; Allows to interact with database using python objects.</p>
                            <p>&ndash; Makes much easier to work with database than writing raw SQL code.</p>
                            <p>&ndash; Because of popularity, there are many documentations and supports to be efficient.</p>
                        </div>
                    </ul>

                    <div>
                        <h3>Installation (using cmd or terminal)</h3>
                        <pre><code>pip install sqlalchemy</code></pre>
                    </div>
                </article>
            </section>
            <hr />

            <section className="intro-sqlalchemy-guide-sec">
                <h2>2. Importing <code className="hiligt">create_engine()</code></h2>
                <p>Is responsible for connecting to the database and executing SQL commands.</p>
                <article className="intro-sqlalchemy-guide__import-create-engine">
                    <div className="intro-sqlalchemy-guide-importing__code-example">
                        <h3>Import <code className="hiligt">create_engine</code> from <code className="hiligt">sqlalchemy</code></h3>
                        <pre><code>
{`from sqlalchemy import create_engine

engine = create_engine("<url>;")`}
                        </code></pre>
                        <p></p>
                        <p>Inside <code>create_engine</code> pass a database url or directory.</p>
                    </div>

                    <div className="intro-sqlalchemy-guide-importing__url-example">
                        <h3>URL Patterns</h3>
                        <div className="intro-sqlalchemy-guide-importing__url-example-genrl-pattern">
                            <p>General Pattern:</p>
                            <pre><code><code>"&lt; dialect &gt;+&lt; driver &gt;://&lt; username &gt;:&lt; password &gt;@&lt; host &gt;:&lt; port &gt;/&lt; database&gt;"</code></code></pre>
                            <ul>
                                <li><strong>Dialect</strong></li>
                                <p>&ndash; Variation of SQL standard</p>
                                <p>Example: mysql, sqlite, postgresql, oracle, etc.</p>

                                <li><strong>Driver</strong></li>
                                <p>&ndash; The Python package to use for communication with the database.</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>DB</th>
                                            <th>Drivers</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SQLite</td>
                                            <td>(no driver needed)</td>
                                        </tr>
                                        <tr>
                                            <td>PostgreSQL</td>
                                            <td><code>psycopg2</code>, <code>asyncpg</code></td>
                                        </tr>
                                        <tr>
                                            <td>MySQL</td>
                                            <td><code>pymysql</code>, <code>mysqlconnector</code></td>
                                        </tr>
                                        <tr>
                                            <td>MSSQL</td>
                                            <td><code>pyodbc</code></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <li><strong><code>&lt;username&gt;:&lt;password&gt;</code></strong></li>
                                <p>&ndash; Credintials for DB authentication.</p>
                                <p>Example: <code>root:1234</code>, or <code>admin:supersecret</code></p>
                                <p>SQLite doesn't need this because it's file-based.</p>

                                <li><strong><code>@&lt;host&gt;:&lt;port&gt;</code></strong></li>
                                <p>Where the database server is running.</p>
                                <p>Example: <code>localhost:5432</code>, <code>127.0.0.1:3306</code>, <code>db.example.com:1521</code></p>
                                <p>SQLite does NOT require <code>host:port</code>.</p>

                                <li><strong><code>/&lt;database&gt;</code></strong></li>
                                <p>The database you want to connect to.</p>
                            </ul>
                        </div>

                        <p>Examples:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dialect</th>
                                    <th>Example URL</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SQLite</td>
                                    <td><code>sqlite:///something.db</code></td>
                                    <td>Local file database, no username/password</td>
                                </tr>
                                <tr>
                                    <td>PostgreSQL</td>
                                    <td><code>postgresql://user:pass@localhost/mydb</code></td>
                                    <td>Needs server running</td>
                                </tr>
                                <tr>
                                    <td>MySQL</td>
                                    <td><code>mysql+pymysql://user:pass@localhost/mydb</code></td>
                                    <td>Needs driver</td>
                                </tr>
                                <tr>
                                    <td>SQLite in-memory</td>
                                    <td><code>sqlite:///:memory:</code></td>
                                    <td>Auto-deletes when script ends</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>The engine URL format depends on the database type.</p>
                    </div>
                    
                    <div className="intro-sqlalchemy-guide-importing__more-details">
                        <h3>Why SQLite is good for learning?</h3>
                        <ul>
                            <li>filed-based</li>
                            <li>zero setup needed</li>
                        </ul>

                        <h3><code className="hiligt">sqlite:///:memory:</code></h3>
                        <p>This means:</p>
                        <ul>
                            <li>database lives in RAM</li>
                            <li>auto-deletes when script ends</li>
                            <li>good for demos/tests</li>
                        </ul>

                        <h3><code className="hiligt">sqlite:///path/to/database.db</code></h3>
                        <p>Three slashes <code>///</code> means "from the current working directory.</p>
                    </div>
                </article>
            </section>
            <hr />

            {/* create_engine + Base + Metadata */}
            <section className="intro-sqlalchemy-guide-sec">
                <h2>2. Creating the Engine + Base + Metadata</h2>
                <p>This is the standard SQLAlchemy ORM initialization workflow.</p>
                <article className="intro-sqlalchemy-guide__engine-base-metadata">
                    <div className="intro-sqlalchemy-guide-engine-base-metadata__create-engine">
                        <h3>Step 1 &mdash; Create engine</h3>
                        <pre><code>engine = create_engine("sqlite:///database.db")</code></pre>
                        <p>This <b>creates the connection</b> to that SQLite file.</p>
                    </div>
                    
                    <div className="intro-sqlalchemy-guide-engine-base-metadata__create-base">
                        <h3>Step 2 &mdash; Create a Base class</h3>
                        <pre><code>
{`from sqlalchemy.orm import declarative_base
Base = declarative_base()`}
                        </code></pre>
                        <p>All models (User, Product, Post, etc.) will inherit from this <code>Base</code>.</p>
                        <p>It gives classes ORM superpowers:</p>
                        <ul>
                            <li>mapping Python class &rarr; DB table</li>
                            <li>mapping attributes &rarr; DB columns</li>
                            <li>attaching metadata ABOUT the tables</li>
                        </ul>
                    </div>

                    <div className="intro-sqlalchemy-guide-engine-base-metadata__base-metadata">
                        <h3>Step 3 &mdash; <code className="hiligt">Base.metadata.create_all(engine)</code></h3>
                        <p>Inspects all models that subclass <code>Base</code> and <b>creates the tables in the database</b> if they don’t exist yet.</p>
                        <p>This is why when he ran the script, <code>database.db</code> appeared — SQLAlchemy created the file and the tables.</p>
                    </div>
                </article>
            </section>
            <hr />

            {/* VSCode "Database Client" */}
            <section className="intro-sqlalchemy-guide-sec">
                <h2>3. Using the VSCode "Database Client" Extension</h2>
                <article>
                    <p>A VSCode extension to visually inspect the database.</p>
                    <p>It's the same as opening SQLite with:</p>
                    <ul>
                        <li>DB Browser for SQLite</li>
                        <li>DBeaver</li>
                        <li>TablePlus</li>
                    </ul>
                </article>
            </section>
            <hr />

            {/* Creating Model */}
            <section className="intro-sqlalchemy-guide-sec">
                <h2>4. Creating models</h2>
                <article className="intro-sqlalchemy-guide__creating-models">
                    <p>Basic SQLAlchemy ORM model structure</p>
                    <pre><code>
{`class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)`}
                    </code></pre>

                    <div>
                        <h3>Why class name singular but <code className="hiligt">__tablename__</code> plural?</h3>
                        <p>It's just a naming convention:</p>
                        <ul>
                            <li>Python class = one object &rarr; singular ("User")</li>
                            <li>Database table = collection of rows &rarr; plural ("users")</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Why <code className="hiligt">__tablename__</code>?</h3>
                        <p>SQLAlchemy needs to know what table name to map to.</p>
                        <p>If you don’t set it, SQLAlchemy will try to guess.</p>
                    </div>

                    <div>
                        <h3>After defining the model</h3>
                        <p>When you run the script again with:</p>
                        <pre><code>Base.metadata.create_all(engine)</code></pre>
                        <p>SQLAlchemy sees the new model → adds the table → VSCode extension shows it.</p>
                    </div>
                </article>
            </section>
            <hr />

            {/* The Purpose of all this */}
            <section className="intro-sqlalchemy-guide-sec">
                <h2>The purpose of doing this</h2>
                <article>
                    <p>Setting up what every SQLAlchemy ORM app always needs:</p>
                    <ol>
                        <li><strong>engine</strong> &rarr; database connection</li>
                        <li><strong>Base</strong> &rarr; ORM foundation</li>
                        <li><strong>models</strong> &rarr; database tables</li>
                        <li><strong>create_all</strong> &rarr; create actual tables</li>
                    </ol>

                    <div>
                        <p>This is the backbone before you start doing CRUD operations:</p>
                        <ul>
                            <li>INSERT (add)</li>
                            <li>SELECT (query)</li>
                            <li>UPDATE</li>
                            <li>DELETE</li>
                        </ul>
                    </div>
                </article>
            </section>

            <section id="intro-sqlalchemy-guide-full-code-example">
                <h2>Full Code Example:</h2>
                <pre><code>
{`from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

engine = create_engine("sqlite:///database_name.db")

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

Base.metadata.create_all(engine)`}
                </code></pre>
                <p>&rarr; <a href="{{ url_for('views.sqlalchemy_orm_crud') }}">View continuation (<code>session.py</code>)</a></p>
            </section>
        </div>
    )
}