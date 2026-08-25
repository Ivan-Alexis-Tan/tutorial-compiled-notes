import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable"
import { ordersTable2, salesPerBrand } from "./dummyPSQLData"

const brandOrderCount = ordersTable2.reduce(
    (acc, order) => {
        const brandVal = acc.find(item => item.brand === order.brand)

        if (brandVal) {
            const filtered = acc.filter(item => item.brand !== order.brand)
            return [...filtered, {brand: order.brand, order_count: brandVal.order_count + 1}]
        }
        return [...acc, {brand: order.brand, order_count: 1}]
    }, []
)

const tableIds = {
    t1: false,
}

export default function PostgreSQL22Having() {
    const { useHookTools } = useToggleDataTable(tableIds)
    
    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-3"><code>HAVING</code> Clause</h1>

            <div>
                <ul>
                    <li>Used <strong>to filter grouped data</strong> after <code>GROUP BY</code> has been applied.</li>
                    <li><code>WHERE</code> &rarr; filters rows</li>
                    <li><code>HAVING</code> &rarr; filters groups</li>
                    <li>Runs after <code>GROUP BY</code> since data needs to be grouped first.</li>
                </ul>

                <div>
                    <h3>Example:</h3>
                    <ToogleDataTable
                        tableKey={"t1"}
                        useHookTools={useHookTools}
                        tableData={ordersTable2}
                        btnText={<><code>orders</code> table</>}
                    />

                    <pre><code>
{`</> PostgreSQL
SELECT 
    brand,
    SUM(quantity * price) AS total_sales
FROM orders
GROUP BY brand
HAVING SUM(quantity * price) > 10000;
`}
                    </code></pre>

                    <div className="mb-5">
                        <p className="mb-5"><strong>Return:</strong></p>
                        <DataTable className="mx-auto w-80!"
                            indexed={true}
                            data={salesPerBrand.filter(brand => brand.total_sales > 10000)}
                        />
                    </div>

                    <div>
                        <p className="mb-3">📝 <strong>NOTE:</strong></p>
                        <ul className="[&>ul]:ml-5 [&>ul]:mb-3!">
                            <li><code>HAVING</code> does not allow aliases and requires to write the aggregate expression again.</li>
                            <ul>
                                <li><code>{`HAVING total_sales > 10000`}</code> does not work.</li>
                            </ul>

                            <li><strong><i>Reason:</i></strong> <code>HAVING</code> runs first, then <code>SELECT</code> later.</li>

                            <li>However, PostgreSQL does allow a <code>SELECT</code> alias in <code>ORDER BY</code></li>
                            <ul>
                                <li>Example: <code>ORDER BY total_sales DESC;</code></li>
                                <li><strong><i>Reason:</i></strong> <code>SELECT</code> gets executed first, then <code>ORDER BY</code> after.</li>
                                <li>Although, the example is about using <code>HAVING</code> not about <code>ORDER BY</code>.</li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>

            <hr className="my-5" />

            <div>
                <h2><code>HAVING</code> with <code>COUNT()</code></h2>

                <p className="mb-3"><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT 
    brand,
    COUNT(*) AS order_count
FROM orders
GROUP BY brand
HAVING COUNT(*) >= 2;
`}
                </code></pre>

                <div>
                    <p className="mb-3"><strong>Return:</strong></p>
                    <DataTable className="mx-auto w-70!"
                        indexed={true}
                        data={brandOrderCount.filter(order => order.order_count >= 2)}
                    />
                </div>
            </div>
        </div>
    )
}