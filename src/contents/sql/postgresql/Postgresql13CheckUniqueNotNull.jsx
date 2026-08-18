export default function PostgreSQL13CheckUniqueNotNull() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5"><code>CHECK</code>, <code>UNIQUE</code>, and <code>NOT NULL</code> Constraints</h1>

            <div>
                <h2>Contraints</h2>
                <ul>
                    <li>Are <strong>rules applied to table columns</strong>.</li>
                    <li>They ensure <strong>data accuracy, validity, and integrity</strong>.</li>
                    <li>Enforced automatically by PostgreSQL.</li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>NOT NULL</code></h2>

                <ul>
                    <li>Prevents a column from strongin <code>NULL</code> values.</li>
                    <li>Ensures <strong>mandatory data</strong> is always provided.</li>
                </ul>

                <div>
                    <h3>Create Tables with <code>NOT NULL</code> Constraint</h3>
                    <p><strong>Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE <table_name> (
    <col_name_1> SERIAL PRIMARY KEY,
    <col_name_2> VARCHAR(100) NOT NULL,
);
`}
                    </code></pre>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
);
`}
                    </code></pre>
                </div>
            </div>

            <hr className="--hr-faded" />
        
            <div>
                <h2><code>UNIQUE</code></h2>
                <ul>
                    <li>Ensures <strong>all values in a column are different</strong>.</li>
                    <li>Allows only one <code>NULL</code> value.</li>
                    <li>Automatically creates a <strong>unique index</strong>.</li>
                </ul>

                <div>
                    <h3>Creating Table with <code>UNIQUE</code> Constraint</h3>
                    <p><strong>Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE <table_name> (
    <col_name_1> SERIAL PRIMARY KEY,
    <col_name_2> VARCHAR(100) UNIQUE NOT NULL
);
`}
                    </code></pre>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL
);
`}
                    </code></pre>
                </div>

                <div>
                    <h3>Add <code>UNIQUE</code> Constraint on an Existing Table</h3>
                    <pre><code>
{`</> PostgreSQL
ALTER TABLE <table_name>
ADD CONSTRAINT <constraint_name> UNIQUE(<col_name>);
`}
                    </code></pre>

                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
ALTER TABLE user
ADD CONSTRAINT users_email_unique UNIQUE(email);
`}
                    </code></pre>
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>CHECK</code></h2>
                <ul>
                    <li>Restricts values based on a <strong>condition</strong>.</li>
                    <li>Ensures values meet <strong>business rules</strong>.</li>
                </ul>

                <div>
                    <h3>Creating New Table with <code>CHECK</code> Constraint</h3>
                    
                    <p><strong>Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE <table_name> (
    <col_name_1> SERIAL PRIMARY KEY,
    ...,
    <col_name_x> <type> CHECK(<condition>)
);
`}
                    </code></pre>
                    
                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    marks INT CHECK(marks BETWEEN 0 AND 100)
);
`}
                    </code></pre>
                </div>
            </div>
        </div>
    )
}