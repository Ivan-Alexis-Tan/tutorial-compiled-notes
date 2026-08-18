export default function PostgreSQL14DataIntegrity() {
    return (
        <div>
            <h1 className="mb-5">Data Integrity</h1>

            <div>
                <ul>
                    <li>The data stored are <strong>accurate, consistent, and reliable</strong>.</li>
                    <li>Ensures invalid, duplicate, or inconsistent data <strong>cannot be inserted or updated</strong>.</li>
                    <li>Prevents data corruption.</li>
                    <li>Ensures correct relationships between tables.</li>
                    <li>Makes the database <strong>reliable and secure</strong>.</li>
                    <li>Reduces dependency on application-level validation.</li>
                </ul>
            </div>

            <hr className="my-5" />

            <div className="[&_h3]:mb-2 [&>div]:mb-5 [&>div]:ml-5 [&>div>p]:mb-1">
                <h2 className="mb-3">Types:</h2>
                
                <div>
                    <h3>1. Entity Integrity</h3>
                    <p>Enforced using <code>PRIMARY KEY</code></p>
                    <ul>
                        <li>Each table must have a <strong>primary key</strong>.</li>
                        <li>Ensures every record is <strong>uniquely identifiable</strong>.</li>
                    </ul>
                </div>

                <div>
                    <h3>2. Referential Integrity</h3>
                    <p>Enforced using <strong>foreign key</strong></p>
                    <ul>
                        <li>Ensures valid relationships between tables.</li>
                        <li>Prevents orphan records.</li>
                    </ul>

                    <pre><code>
{`</> PostgreSQL
CREATE TABLE department (
    id      SERIAL      PRIMARY KEY,
    name    VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE employees (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100),
    department_id   INT             REFERENCES departments(id)
);
`}
                    </code></pre>
                    <p>Makes data storing on <code>employees</code> table more secured.</p>
                </div>

                <div>
                    <h3>3. Domain Integrity</h3>
                    <p>Enforced using <code>CHECK</code> constraints</p>
                    <ul>
                        <li>Ensures column values fall within valid ranges.</li>
                    </ul>

                    <pre><code>
{`</> PostgreSQL
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    mark INT CHECK (marks BETWEEN 0 AND 100)
)
`}
                    </code></pre>
                    <p>The <code>mark</code> column now checks first if the value falls within the range of 0 and 100.</p>
                </div>
            </div>
        </div>
    )
}