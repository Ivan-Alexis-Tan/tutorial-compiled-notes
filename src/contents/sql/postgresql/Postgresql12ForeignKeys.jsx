import DataTable from "../../../components/useDataTable";
import { customersTable, ordersTable } from "./dummyPSQLData";

export default function PostgreSQL12ForeignKeys() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Foreign Keys</h1>
            
            <div className="*:mb-5">
                <ul>
                    <li>A column (or set of columns) that <strong>references the primary key of another table.</strong></li>
                    <li>Creates a <strong>relationship between two tables</strong></li>
                    <li>Ensures <strong>referential integrity</strong> between related data.</li>
                </ul>

                <div>
                    <h2>Referential Integrity</h2>
                    
                    <p className="mb-2">It ensures that:</p>
                    <ul className="mb-3!">
                        <li>A foreign key value <strong>must exist</strong> in the referenced (parent) table.</li>
                        <li>You cannot insert <strong>invalid or orphan records</strong>.</li>
                    </ul>

                    <p>It maintains <strong>consistency accross tables</strong>.</p>
                </div>

                <div className="[&>p]:mb-2 [&>div]:mx-auto [&>div]:max-w-100 [&>div]:mb-5 [&>div>p]:mb-1 [&>div>p]:text-end">
                    <h3>Example:</h3>
                    
                    <div>
                        <p><strong>Customers table</strong></p>
                        <DataTable data={customersTable} />
                    </div>

                    <div>
                        <p><strong>Orders table</strong></p>
                        <DataTable data={ordersTable} />
                    </div>

                    <p><strong>Notice:</strong></p>
                    <p><code>id</code> column in <i>Customers table</i> is the primary key, and it points to the <code>customer_id</code> column in <i>Orders table</i>.</p>
                    <p><i>Orders Table</i> have the <strong>foreign key</strong>.</p>
                    <ul>
                        <li><code>customer_id</code> column (the foreign key) references to the <i>Customers Table</i></li>
                        <li>Thus, orders with <code>id</code> 1 & 2 belongs to customer named "John Smith"</li>
                    </ul>
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Creating New Table with Foreign Keys</h2>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE employee (
    <col_name_1>    SERIAL  PRIMARY KEY,
    <col_name_2>    ...,
    <col_name_3>    INT     REFERENCES <table_name>(<id_col_name>),
);
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
-- Parent Table
CREATE TABLE department {
    id      SERIAL      PRIMARY KEY
    name    VARCHAR(50) UNIQUE      NOT NULL
};

-- Child Table (holds foreign key)
CREATE TABLE employee (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL,
    salary          NUMERIC(10, 2),
    created_at      TIMESTAMP       DEFAULT CRURRENT_TIMESTAMP
    
    -- Foreign Key
    department_id   INT             REFERENCES departments(id),
);
`}
                </code></pre>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Adding Foreign Key to an Existing Table</h2>
                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
ALTER TABLE <child_table_name>
ADD CONSTRAINT <custom_constraint_name>
FOREIGN KEY (<child_column_name>)
REFERENCES <parent_table_name>(<parent_id_column>);
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
ALTER TABLE employees
ADD CONSTRAINT employees_department_fk
FOREIGN KEY (department_id)
REFERENCES department(id);
`}
                </code></pre>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Inserting Data</h2>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
INSERT INTO <child_table_name> (<col_name_1>, ..., <fkey_col_name>)
VALUES (<col_val_1>, ..., <fk_val>);
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
INSERT INTO employees (name, salary, department_id)
VALUES ('Amit', 50000, 5);
`}
                </code></pre>
                <p>This will <strong>fail</strong> if <code>department</code> with <code>id = 5</code> does not exists</p>
            </div>
        </div>
    )
}