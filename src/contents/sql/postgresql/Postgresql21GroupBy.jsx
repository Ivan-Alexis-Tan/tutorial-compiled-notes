import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { fullStudentsData, jrLevels, ordersTable2, salesPerBrand } from "./dummyPSQLData";

const tableIds = {
    t1: false,
}

const countPerLvl = fullStudentsData.reduce(
    (acc, student) => {
        const accCount = acc[student.grade_level]
        accCount
            ? acc[student.grade_level] = accCount + 1
            : acc[student.grade_level] = 1
        
        return acc
    }, {}
)

const groupByCat = ordersTable2.reduce(
    (acc, order) => {
        const catVal = acc[order.category]
        const productVal = order.price * order.quantity
        catVal
            ? acc[order.category] = catVal + productVal
            : acc[order.category] = productVal

        return acc
    }, {}
)

const ordersCat = Object.entries(groupByCat)

const groupByCatAndBrand = ordersTable2.reduce(
    (acc, order) => {
        const catVal = acc[order.category]
        const brandVal = catVal?.[order.brand]
        
        // Shape: {category_1: { brand_1: quantity, brand_2: quantity, ...},
        //          category_2: { brand_1: quantity, brand_2: quantity, ...},
        //          ...}
        catVal
            ? acc[order.category] = {
                ...catVal,
                [order.brand]: (
                    brandVal 
                        ? brandVal + order.quantity
                        : order.quantity
                )
            }
            : acc[order.category] = {[order.brand]: order.quantity}

        return acc
    }, {}
)

const ordersCatAndBrands = Object.entries(groupByCatAndBrand)

const electronicsSold = ordersTable2
    .filter(order => order.category === "Stationery")
    .reduce(
        (acc, order) => {
            const brandVal = acc.find(item => item.brand === order.brand)

            if (brandVal) {
                const filtered = acc.filter(item => item.brand !== order.brand)
                return [...filtered, {brand: brandVal.brand, sum: brandVal.sum + order.quantity}]
            }
            
            return [...acc, {brand: order.brand, sum: order.quantity}]
        }, []
    )

export default function PostgreSQL21GroupBy() {
    const { useHookTools } = useToggleDataTable(tableIds)

    const multiColQuery = ordersCatAndBrands.reduce(
        (acc, [cat, brandsQnty]) => {
            const unpacked = Object.entries(brandsQnty).map(
                ([brand, qnty]) => ({ category: cat, brand, total_qnty: qnty })
            )

            return [...acc, ...unpacked]
        }, []
    )

    return (
        <div className="[&_h2,&_h3]:mb-3">
            <h1 className="mb-5"><code>GROUP BY</code></h1>

            <div>
                <ul>
                    <li><strong>Groups rows having same values</strong></li>
                    <li><strong>Applies aggregate functions</strong> on each group</li>
                </ul>

                <p className="mb-3">Aggregate Functions:</p>
                <ul>
                    {["SUM()", "COUNT()", "AVG()", "MIN()", "MAX()"].map(fn => (
                        <li key={fn}><code>{fn}</code></li>
                    ))}
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Query Execution Order</h2>
                <p className="mb-5">SQL does <strong>NOT</strong> execute top-to-bottom.</p>
                <p className="mb-3">Actual execution order:</p>
                <ul>
                    {["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"].map(clause => (
                        <li key={clause}><code>{clause}</code></li>
                    ))}
                </ul>

                <h3>Example:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT 
    grade_level,
    COUNT(id)
FROM students
GROUP BY grade_level;
`}
                </code></pre>

                <div className="mb-5">
                    <h3>Return:</h3>
                    <DataTable className="mx-auto w-55!"
                        indexed={true}
                        data={jrLevels.map(lvl => ({grade_level: lvl, count: countPerLvl[lvl]}))}
                    />
                </div>

                <div>
                    <p className="mb-3"><strong>Execution Order:</strong></p>
                    <ul className="[&>li]:list-decimal! [&>ul>li]:ml-15!">
                        <li><code>FROM</code></li>
                        <ul><li>All rows are loaded from the table</li></ul>
                        
                        <li><code>WHERE</code> (if present)</li>
                        <ul>
                            <li>Executes conditions</li>
                            <li>In this example, <code>WHERE</code> wasn't used.</li>
                        </ul>

                        <li><code>GROUP BY</code></li>
                        <ul>
                            <li>Rows are grouped.</li>
                            <li>In this example, students are grouped by <code>grade_level</code> column.</li>
                        </ul>

                        <li>Aggregate Functions (<code>COUNT()</code>, <code>AVG()</code> etc.)</li>
                        <ul>
                            <li>Executes aggregation based on the result of <code>GROUP BY</code></li>
                        </ul>

                        <li><code>SELECT</code></li>
                        <ul><li>Executes what columns to show</li></ul>
                    </ul>
                </div>
            </div>
            
            <hr className="--hr-faded" />

            <div>
                <h2><code>GROUP BY</code> with <code>SUM()</code></h2>

                <ToogleDataTable
                    tableKey={"t1"}
                    useHookTools={useHookTools}
                    tableData={ordersTable2}
                    btnText={<><code>orders</code> Table</>}
                />

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT
    category,
    SUM(quantity * price) AS total_cost
FROM orders
GROUP BY category
`}
                </code></pre>

                <p className="mb-3"><strong>Return:</strong></p>
                <DataTable className="mb-5 mx-auto w-80!"
                    indexed={true}
                    data={ordersCat.map(cat => ({category: cat[0], total_cost: cat[1]}))}
                />

                <p className="mb-3">Process:</p>
                <ul>
                    <li>Groups by <code>category</code></li>
                    <li>Calculates <code>quantity * price</code> for each row</li>
                    <li>Append them on each <code>category</code></li>
                </ul>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>GROUP BY</code> with Multiple Columns</h2>
                <p>Total <code>quantity</code> sold per <code>category</code> and <code>brand</code></p>

                <pre><code>
{`</> PostgreSQL
SELECT 
    category,
    brand,
    SUM(quantity) AS total_qnty
FROM orders
GROUP BY category, brand;
`}
                </code></pre>

                <div className="mb-5">
                    <p className="mb-3"><strong>Return:</strong></p>

                    <DataTable className="mx-auto w-100!"
                        indexed={true}
                        data={multiColQuery}
                    />
                </div>

                <h3>This Query fails:</h3>

                <pre><code>
{`</> PostgreSQL
SELECT 
    category,
    brand,
    SUM(quantity) AS total_qnty
FROM orders
GROUP BY brand;
`}
                </code></pre>

                <div>
                    <p className="mb-3"><strong>Because:</strong></p>
                    <ul>
                        <li><code>category</code> is in <code>SELECT</code>, but not in <code>GROUP BY</code>.</li>
                        <li><code>category</code> must be included in <code>GROUP BY</code> as well.</li>
                    </ul>
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>GROUP BY</code> + <code>WHERE</code> (Filtering BEFORE Grouing)</h2>
                <p className="mb-3"><strong>Example:</strong></p>

                <pre><code>
{`</> PostgreSQL
SELECT
    brand,
    SUM(quantity)
FROM orders
WHERE category = 'Electronics'
GROUP BY brand;
`}
                </code></pre>

                <div className="mb-5">
                    <p className="mb-3"><strong>Return:</strong></p>
                    <DataTable className="mx-auto w-50!"
                        indexed={true}
                        data={electronicsSold}
                    />
                </div>
                
                <p><code>WHERE</code> filters rows <strong>before grouping</strong>.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>GROUP BY</code> with <code>HAVING</code></h2>

                <p className="mb-3"><strong>Example:</strong></p>
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

                <div>
                    <p className="mb-3"><strong>Return:</strong></p>
                    <DataTable className="mx-auto w-80!"
                        indexed={true}
                        data={salesPerBrand.filter(brand => brand.total_sales > 10000)}
                    />
                </div>
            </div>
        </div>
    )
}