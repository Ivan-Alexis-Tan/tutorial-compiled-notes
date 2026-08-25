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
        </div>
    )
}