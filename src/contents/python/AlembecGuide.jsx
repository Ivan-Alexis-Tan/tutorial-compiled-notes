import { routeData } from "../../routeData"
import { useLocation, useParams } from "react-router-dom"

const titles = routeData.python.libraries.alembic.titles

export default function AlembicGuide() {
    const { id } = useParams()

    function test() {
        console.log(loc)
        console.log()
    }

    switch (Number(id)) {
        case 1:
            return <InstallationAndSetup />
        case 2:
            return <CreatingRevision />
        case 3:
            return <CommonAlembicCommands />
    }
}

function InstallationAndSetup() {
    return (
        <div>
            <h2>{titles[useParams().id]}</h2>
            <div>
                <h3>A. Installation</h3>
                <p>In CMD:</p>
                <pre><code>
{`pip install alembic`}
                </code></pre>
            </div>

            <div>
                <h3>B. Environment Setup</h3>
                <p>Create an alembic environment in a terminal:</p>
                <pre><code>
{`alembic init <project_name>`}
                </code></pre>
                
                <p>After running this, the directory will have these <strong>new directory/files</strong>:</p>
                <pre><code>
{`├── /yourProject
│      └── /alembic
|          ├── env.py
|          ├── README
|          ├── script.py.mako
|          └── /versions
|              ├── 3512b954651e_add_account.py
|              ├── 2b1ae644e5cd_add_order_id.py
|              └──3adcc9a56557_rename_username_field.py
└── /alembic.ini
`}
                </code></pre>

                <h3>In <code>alembic.ini</code> file, edit:</h3>
                <pre><code>
{`sqlalchemy.url = driver://user:pass@localhost/dbname`}
                </code></pre>
                <p>Into:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Driver</th>
                            <th>Rewrite into</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>SQLite</th>
                            <td><code>{`"sqlite://./dir/<db_name>.db"`}</code></td>
                        </tr>
                        <tr>
                            <th>PostgreSQL</th>
                            <td><code>{`"postgresql://<user>:<password>@<host>/<db_name>.db"`}</code></td>
                        </tr>
                    </tbody>
                </table>
                
                <div>
                    <h3>Edit in <code>env.py</code>:</h3>
                    <p>In <code>alembic/env.py</code>, import the Base metadata</p>
                    <pre><code>
{`from app.models.base import BaseModel
from app.models.models import User, Product, Purchase

target_metadata = BaseModel.metadata
`}
                    </code></pre>
                    <p>Allows Alembic to "see" the SQLAlchemy models.</p>
                    <p>Don't also forget to <strong>import the models</strong> themselves.</p>
                </div>
            </div>

            <h2>That's it, and it is set.👍</h2>
        </div>
    )
}

function CreatingRevision() {
    return (
        <div>
            <h2>{titles[useParams().id]}</h2>
            <div>
                <ul>
                    <li>Uses <code>{`alembic revision -m "<message>"`}</code></li>
                    <li>Similar to the message to give in Git when commiting.</li>
                    <li>The message describes the migration that we're about to create.</li>
                    <li>Creates a python file that <strong>defines how the database upgrades to or downgrades to</strong>.</li>
                    <li><strong>Manual Process:</strong></li>
                        <ol>
                            <li><strong>Create python file</strong> by writing <code>{`alembic revision -m "<message>"`}</code> in the terminal.</li>
                            <li>Navigate the newly created file, open it, then <strong>find <code>upgrade()</code> and <code>downgrade()</code> functions</strong> inside the file.</li>
                            <li>Define the <code>upgrade()</code> function on <i>what changes the database gonna have</i> when upgraded.</li>
                            <li>Then also define the <code>downgrade()</code> function that <i>drops everything built in <code>upgrade()</code></i>.</li>
                            <li>Run <code>alembic upgrade head</code> to <strong>execute the defined <code>upgrade()</code></strong> function.</li>
                        </ol>
                    <li>The process works on many different operations (creating new table or dropping one, creating new column or dropping one, etc.)</li>
                </ul>
            </div>

            <div>
                <h3>A. Example Usage 1: Creating New Table</h3>
                <p><strong>Step 1.</strong> Create a revision to create new python file.</p>
                <pre><code>
{`alembic revision -m "Create User table"`}
                </code></pre>

                <p><strong>Step 2.</strong> Navigate the location of new file and open it.</p>
                    <ul>
                        <li>The file have revision ID generated by Alembic (example: <code>5763d1a96886</code>)</li>
                        <li>The file name is concatenation of ID and message.</li>
                            <ul><li>Example: <code>5763d1a96886_create_user_table.py</code></li></ul>
                        <li>Inside the file, <code>upgrade()</code> and <code>downgrade()</code> is also created.</li>
                            <ul>
                                <li><code>upgrade()</code> defines how to upgrade revision.</li>
                                <li><code>downgrade()</code> defines how to reverse the revision.</li>
                            </ul>
                    </ul>
                <p><strong>Step 3.</strong> Define <code>upgrade()</code> and <code>downgrade()</code>.</p>
                <div>
                    <ul>
                        <li><code>op</code> from <code>from alembic import op</code> means operate</li>
                        <ul>
                            <li>Allows to define operations in the database for a particular revision.</li>
                            <li>Example: <code>op.create_table()</code>. Parameters include:</li>
                                <ul>
                                    <li><code>table_name: str</code>,</li>
                                    <li><code>*columns: SchemaItem</code>,</li>
                                    <li><code>**kw: Any</code></li>
                                </ul>
                        </ul>

                        <li><code>sqlalchemy</code> is also imported, written as <code>import sqlalchemy as sa</code>.</li>
                    </ul>

                    <pre><code>
{`def upgrade() -> None:
    op.create_table(
        "employee",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(50), nullable=False),
        sa.Column("current", sa.Boolean, default=True)
    )
`}
                </code></pre>

                <p><code>downgrade()</code> can be used to define how this version be downgraded.</p>
                <pre><code>
{`def downgrade() -> None:
    op.drop_table("employee")
`}
                </code></pre>
                </div>

                <p><strong>Step 4.</strong> Run:</p>
                <pre><code>
{`alembic upgrade head`}
                </code></pre>
                    <ul>
                        <li>This executes <code>upgrade()</code> function.</li>
                        <li>If run <code>alembic downgrade -1</code> instead, executes <code>downgrade()</code>.</li>
                    </ul>
            </div>

            <div>
                <h3>Usage Example 2: Creating New Column</h3>
                <p><strong>Step 1.</strong> Create new revision (python file).</p>
                <pre><code>{`alembic revision -m "Add new column"`}</code></pre>
                <ul><li>This creates new file <code>xxxxxxxxxxxx_add_new_column.py</code></li></ul>

                <p><strong>Step 2.</strong> Define <code>upgrade()</code> function.</p>
                <pre><code>
{`def upgrade() -> None:
    op.add_column(
        "employee",
        sa.Column("job_title", sa.String(64), nullable=True)
    )
`}
                </code></pre>

                <p><strong>Step 3.</strong> Define <code>downgrade()</code> function.</p>
                <pre><code>
{`def downgrade() -> None:
    op.drop_column("employee", "job_title")
`}
                </code></pre>
                <ul>
                    <li>Parameters of <code>op.drop_column()</code>:</li>
                    <ul>
                        <li><code>table_name: str</code>,</li>
                        <li><code>column_name: str</code></li>
                    </ul>
                </ul>

                <p><strong>Step 4.</strong> Run: </p>
                <pre><code>{`alembic upgrade head`}</code></pre>
                <ul>
                    <li>This executes <code>upgrade()</code>.</li>
                    <li>Meanwhile <code>alembic downgrade -1</code> executes <code>downgrade()</code></li>
                </ul>
            </div>
        </div>
    )
}

function CommonAlembicCommands() {
    return (
        <div>
            <h2>{titles[useParams().id]}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Command</th>
                        <th>Effect</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>{`revision -m "<message>"`}</code></td>
                        <td>Creates new db version operator python file.</td>
                    </tr>
                    <tr>
                        <td><code>{`revision --autogenerate -m "<message>"`}</code></td>
                        <td>Creates autogenerated <code>upgrade()</code> and <code>downgrade()</code> defined functions based on the before and after changes when <code>models.py</code> is saved</td>
                    </tr>
                    <tr>
                        <td><code>upgrade head</code></td>
                        <td>Executes the <code></code></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}