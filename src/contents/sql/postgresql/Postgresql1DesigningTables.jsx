export default function Postgresql1DesigningTables() {
    return (
        <div>
            <h1>Designing Tables</h1>
            <p><strong>Example Syntax:</strong></p>
            <pre><code>
{`</> SQL
// Creating database
CREATE DATABASE <dbName>;

// Creating table
CREATE TABLE <tableName>(
    <colName1>  SERIAL      PRIMARY KEY,
    <colName4>  VARCHAR(n)  UNIQUE,
    <colName2>  VARCHAR(n)  NOT NULL,
    <colName3>  SMALLINT,
    <colName4>  DATE    DEFUALT CURRENT_DATE,
);
`}
            </code></pre>
            <ul>
                <li><code>SERIAL</code> &rarr; sets auto-incremental int values</li>
            </ul>
            
            <p><strong>Usage Example:</strong></p>
            <pre><code>
{`</> SQL
// Creating database
CREATE DATABASE school;

// Creating table
CREATE TABLE students(
    id          SERIAL      PRIMARY KEY,
    email       VARCHAR(100)  UNIQUE,
    name        VARCHAR(50)  NOT NULL,
    age         SMALLINT,
    enrol_date  DATE        DEFUALT CURRENT_DATE,
);
`}
            </code></pre>
        </div>
    )
}