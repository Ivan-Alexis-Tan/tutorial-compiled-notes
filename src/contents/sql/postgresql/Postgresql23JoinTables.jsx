import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { customersTable3, employeesTable, ordersTable3 } from "./dummyPSQLData";

const tableIds = {
    t1: false,
    t2: false,
    t3: false,
}

const customerPurchases = customersTable3.reduce(
    (acc, customer) => {
        const matched = ordersTable3.find(order => order.customer_id === customer.id)
        
        if (!matched) return acc
        return [...acc, {name: customer.name, product: matched.product, amount: matched.amount}]
    }, []
)

const employeeManagers = employeesTable.reduce(
    (acc, employee) => {
        const manager = employeesTable.find(item => item.id === employee.manager_id)
        
        if (!manager) return acc
        return [...acc, {employee: employee.name, manager: manager.name}]
    }, []
)

const leftJoin = customersTable3.reduce(
    (acc, { id, name }) => {
        const orders = ordersTable3.filter(({ customer_id }) => customer_id === id)
        
        if (orders.length >= 1) {
            return [
                ...acc,
                ...orders.map(({ product, amount, id: order_id }) => ({ name, product, amount, order_id, customer_id: id }))
            ]
        }
        else return [...acc, { name, product: null, amount: null, order_id: null, customer_id: id }]
    }, []
)

const rightJoin = ordersTable3.reduce(
    (acc, { id, customer_id, product, amount }) => {
        const customer = customersTable3.find(({ id }) => id === customer_id)

        if (customer) return [...acc, {name: customer.name, product, amount, order_id: id, customer_id}]
        return [...acc, {name: null, product, amount, order_id: id, customer_id}]
    }, []
)

const fullOuterJoin = [...leftJoin, ...rightJoin].reduce(
    (acc, item) => {
        const exists = acc.filter(({ customer_id, order_id }) => customer_id === item.customer_id && order_id === item.order_id)

        if (exists.length >= 1) return acc;
        return [...acc, item]
    }, []
)

export default function PostgreSQL23JoinTable() {
    const { useHookTools } = useToggleDataTable(tableIds)

    return (
        <div className="[&_h2,&_h3]:mb-3 [&>hr]:my-5">
            <h1 className="mb-5"><code>JOIN</code> Tables</h1>

            <div>
                <h2>Database Example to work with</h2>
                <pre><code>
{`</> PostgreSQL
CREATE TABLE customers ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50)
); 

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    product VARCHAR(50), 
    amount INT
);
`}
                </code></pre>

                <p className="mb-3"><strong>Data Tables</strong>:</p>
                <div className="gap-5 max-w-300 mx-auto flex flex-col lg:flex-row justify-evenly lg:items-start [&_button.data-table-btn]:mx-auto [&_button.data-table-btn]:w-50!">
                    {/* Customers Table */}
                    <ToogleDataTable className="[&_div.data-table]:min-w-70!"
                        tableKey={"t1"}
                        useHookTools={useHookTools}
                        tableData={customersTable3}
                        btnText={<><code>customers</code> table</>}
                    />

                    {/* Orders Table */}
                    <ToogleDataTable
                        tableKey={"t2"}
                        useHookTools={useHookTools}
                        tableData={ordersTable3}
                        btnText={<><code>orders</code> table</>}
                    />
                </div>
            </div>

            <hr />

            {/* Inner Join */}
            <div>
                <h2>1. <code>INNER JOIN</code></h2>
                <ul>
                    <li>Returns only those rows where the join condition matches on <strong>both tables</strong>.</li>
                    <li>Rows without a match are discarded.</li>
                    <li>Evaluated during the <code>FROM</code> phase.</li>
                </ul>

                <div>
                    <h3>Syntax:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT <col_names>
FROM <table_name_1>
INNER JOIN <table_name_2>
    ON <join_condition>;
`}
                    </code></pre>
                    
                    <h3>Example:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT 
    c.name,
    o.product,
    o.amount
FROM customers c
INNER JOIN orders o
    ON c.id = o.customer_id;
`}
                    </code></pre>

                    <h3>Return:</h3>
                    <div className="mb-5 overflow-auto">
                        <DataTable className="mx-auto min-w-80! max-w-100!"
                            indexed={true}
                            data={customerPurchases}
                        />
                    </div>

                    <div>
                        <h3>Execution Order</h3>
                        <ul className="[&>li]:list-decimal!">
                            <li><code>FROM</code></li>
                            <li><code>JOIN</code> (<code>ON</code> condition)</li>
                            {["WHERE", "SELECT", "ORDER BY"].map(clause => (
                                <li key={clause}><code>{clause}</code></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            {/* Self Join */}
            <div>
                <h2>2. <code>SELF JOIN</code></h2>

                <ul className="[&>ul]:ml-5">
                    <li>A table joined with itself.</li>
                    <li>A table has a <strong>relationship within itself</strong>.</li>
                    <li>Used when rows need to be compared with other rows from the same table.</li>
                    <li>Aliases are mandatory</li>
                    <ul>
                        <li>Since the same table is used twice, aliases are required <strong>to distinguish roles</strong>.</li>
                        <li>Each alias represents a logical copy of the table.</li>
                    </ul>
                </ul>

                <div>
                    <h3>Syntax:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT <columns>
FROM <table_name_1> <t1_alias_1>
INNER JOIN <table_name_1> <t1_alias_2>
    ON <join_condition>;
`}
                    </code></pre>

                    <h3>Example:</h3>

                    <p className="mb-3">Data Table Example</p>
                    <ToogleDataTable className="[&_div.data-table-container]:mx-auto [&_div.data-table-container]:max-w-150"
                        key={"t3"}
                        useHookTools={useHookTools}
                        tableData={employeesTable}
                        btnText={<><code>employees</code> table</>}
                    />

                    <pre><code>
{`</> PostgreSQL
SELECT 
    e.name as employee,
    m.name as manager,
FROM employees e
INNER JOIN employees m
    ON e.manager_id = m.id;
`}
                    </code></pre>

                    <p className="mb-3"><strong>Return:</strong></p>
                    <div className="overflow-auto">
                        <DataTable className="mx-auto w-60!"
                            indexed={true}
                            data={employeeManagers}
                        />
                    </div>
                </div>
            </div>
            
            <hr />

            <div>
                <h2>3. <code>LEFT JOIN</code></h2>

                <ul>
                    <li>Returns all rows from the <strong>left table</strong>.</li>
                    <li>Matching rows from the right table</li>
                    <li><code>NULL</code> for right-table columns when no match exists.</li>
                </ul>

                <div>
                    <h3>Basic Syntax:</h3>
                    <pre><code>
{`</> PostgreSQL
SELECT <col_names>
FROM <table_name_1>
LEFT JOIN <table_name_2>
    ON <join_condition>;
`}
                    </code></pre>

                    <p className="mb-3"><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
SELECT 
    c.name,
    o.product,
    o.amount
FROM customers c
LEFT JOIN orders o
    ON c.id = o.customer_id;
`}
                    </code></pre>
                    
                    <p className="mb-3"><strong>Return:</strong></p>
                    <div className="overflow-auto">
                        <DataTable className="mx-auto w-100!"
                            indexed={true}
                            data={leftJoin.map(({ name, product, amount }) => ({ name, product, amount }))}
                        />
                    </div>
                </div>
                
                <hr className="--hr-faded" />

                <div>
                    <h3>Filtering LEFT JOIN Results</h3>
                    
                    <div className="*:mb-1">
                        <p className="mb-3!">Condition must be placed in the <code>ON</code> clause.</p>
                        <p>❌ <code>{`WHERE o.amount > 2000`}</code></p>
                        <p className="ml-5 mb-3!">- This converts the <code>LEFT JOIN</code> into an <code>INNER JOIN</code>.</p>
                        <p>✅Correct:</p>
                    </div>

                    <pre><code>
{`</> PostgreSQL
SELECT 
    c.name,
    o.product,
    o.amount
FROM customers c
LEFT JOIN orders o
    ON c.id = o.customer_id
    AND o.amount > 2000;    -- Place here
`}
                    </code></pre>

                    <p className="mb-3"><strong>Return:</strong></p>
                    <div className="overflow-auto">
                        <DataTable className="mx-auto w-100!"
                            indexed={true}
                            data={
                                leftJoin
                                    .filter(({ amount }) => amount > 2000 || amount === null)
                                    .map(({ name, product, amount }) => ({ name, product, amount }))
                            }
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div>
                <h2>4. <code>RIGHT JOIN</code></h2>

                <ul>
                    <li>All rows from the <strong>right table</strong>.</li>
                    <li>Matching rows from the left table</li>
                    <li><code>NULL</code> for left-table columns when no match exists.</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <col_names>
FROM <table_name_1>
RIGHT JOIN <table_name_2>
    ON <join_condition>;
`}
                </code></pre>

                <h3>Return:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT
    c.name,
    o.product,
    o.amount
FROM customer c
RIGHT JOIN orders o
    ON c.id = o.customer_id;
`}
                </code></pre>

                <div className="overflow-auto">
                    <DataTable className="mx-auto w-100!"
                        indexed={true}
                        data={rightJoin.map(({ name, product, amount }) => ({ name, product, amount }))}
                    />
                </div>
            </div>

            <hr />

            <div>
                <h2>5. <code>FULL OUTER JOIN</code></h2>

                <ul>
                    <li>All matching rows from both tables.</li>
                    <li>All unmatched rows from the left table.</li>
                    <li>All unmatched rows from the right table.</li>
                    <li>Unmatched columns are filled with <code>NULL</code></li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <col_names>
FROM <table_name_1>
FULL OUTER JOIN <table_name_2>
    ON <join_condition>;
`}
                </code></pre>
                
                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT
    c.name,
    o.product,
    o.amount
FROM customer c
FULL OUTER JOIN orders o
    ON c.id = o.customer_id;
`}
                </code></pre>

                <p className="mb-3"><strong>Return:</strong></p>
                <div className="overflow-auto">
                    <DataTable className="mx-auto w-100!"
                        indexed={true}
                        data={fullOuterJoin.map(({ name, product, amount }) => ({ name, product, amount }))}
                    />
                </div>
            </div>
        </div>
    )
}