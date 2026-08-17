import DataTable, { ToggleReturnDataTable, ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { studentsData } from "./dummyPSQLData";

const tableIds = {
    e1: false,
    e2: false,
}

export default function PostgreSQL7Filtering() {
    const { useHookTools } = useToggleDataTable({ toggleState: tableIds })
    return (
        <div>
            <h1 className="mb-5">Filtering</h1>

            <div>
                <ul>
                    <li>Filtering means <strong>selecting only required rows</strong> from a table.</li>
                    <li>Uses the <strong>WHERE</strong> clause to apply conditions on rows.</li>
                    <li>It works <strong>row by row</strong></li>
                </ul>

                <p className="mb-3"><strong>Interview Line</strong></p>
                <p className="ml-5 mb-5"><code>WHERE</code> clause filters rows based on conditions before data is returned.</p>
            
                <h3>Syntax</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <col_name>
FROM <table_name>
WHERE <condition>;
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <p className="mb-3">Suppose data table: <code>students</code></p>

                <ToogleDataTable
                    tableKey={"e1"}
                    tableData={studentsData}
                    useHookTools={useHookTools}
                    btnText="Show table"
                />

                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE marks > 50
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"e2"}
                    toggleStates={useHookTools}
                    returnText={"Students that have mark of greater than 50."}
                    TableComponent={
                        <DataTable data={studentsData.filter(student => student.marks > 50)} />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2 className="mb-5">Comparison Operators</h2>
                <DataTable 
                    data={[
                        mapOperators("=", "equal to"),
                        mapOperators("!=", "not equal to"),
                        mapOperators("<>", "not equal to"),
                        mapOperators(">", "greater than"),
                        mapOperators("<", "less than"),
                        mapOperators(">=", "greater than or equal"),
                        mapOperators("<=", "less than or equal"),
                    ]} 
                    capHeaders={true}
                    className="mx-auto max-w-80 [&_td:first-child]:w-30 [&>thead]:font-bold"
                />
            </div>
        </div>
    )
}

function mapOperators(symbol, meaning) {
    return { symbol, meaning }
}