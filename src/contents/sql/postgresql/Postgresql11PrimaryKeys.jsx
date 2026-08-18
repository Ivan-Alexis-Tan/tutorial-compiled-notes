export default function PostgreSQL11PrimaryKeys() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Primary Keys</h1>
            <ul>
                <li>A column (or group of columns) that <strong>uniquely identifies each row</strong> in a table.</li>
                <li>A table can have <strong>only one primary key</strong>.</li>
                <li>Cannot be <code>NULL</code> and <strong>cannot be duplicated</strong></li>
                <li>Ensures <strong>data uniqueness</strong></li>
                <li>Improves <strong>data integrety</strong></li>
                <li>Helps identify rows efficiently</li>
                <li>Automatically creates a <strong>unique index</strong></li>
            </ul>

            <hr className="--hr-faded" />
            
            <div>
                <h2>Creating New Table with Primary Key</h2>
                <h3>Syntax</h3>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE <table_name> (
    <col_name_1>    SERIAL  PRIMARY KEY,
    <col_name_2>    ...,
    <col_name_3>    ...
);`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE students (
    id          SERIAL          PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    marks       INT,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP    
);
`}
                </code></pre>
                <p><code>id</code> uniquely identifies each student.</p>
            </div>
            
            <hr className="--hr-faded" />

            <div>
                <h2>Adding on an Existing Table</h2>
                <pre><code>
{`</> PostgreSQL
ALTER TABLE <table_name>
ADD CONSTRAINT <custom_pk_name> PRIMARY KEY (<col_name>);
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
ALTER TABLE students
ADD CONSTRAINT students_pkey PRIMARY KEY (id);
`}
                </code></pre>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Composite Primary Key (Multiple Columns)</h2>
                <div className="mb-5">
                    <p>Used when <strong>one column alone is not unique</strong>.</p>
                    <p>Also common in <strong>many-to-many relationships</strong></p>
                </div>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE enrollments (
    <col_name_1> INT,
    <col_name_2> INT,
    PRIMARY KEY (<col_name_1>, <col_name_2>)
)
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id)
)
`}
                </code></pre>
            </div>
        </div>
    )
}