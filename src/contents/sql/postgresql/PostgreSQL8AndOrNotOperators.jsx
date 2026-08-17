import DataTable, { ToggleReturnDataTable, ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { studentsData } from "./dummyPSQLData";

const tableIds = {
    e1: false,
    e2: false,
    e3: false,
    e4: false,
}

export default function PostgreSQL8AndOrNotOperators() {
    const { useHookTools } = useToggleDataTable({ toggleState: tableIds })
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5"><code>AND</code>, <code>OR</code>, <code>NOT</code> Operators</h1>

            <div>
                <h2>1. <code>AND</code> operator</h2>

                <ul>
                    <li><code>AND</code> means <strong>all conditions must be true</strong>.</li>
                    <li>Used for <code>narrow filtering</code>.</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <cols>
FROM <table_name>
WHERE <condition_1> AND <condition_2>;
`}
                </code></pre>

                <p className="mb-3"><strong>Example: <code>students</code> table</strong></p>
                <ToogleDataTable
                    tableKey={"e1"}
                    tableData={studentsData}
                    useHookTools={useHookTools}
                    btnText="Show table"
                />

                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE marks > 30 AND marks < 80;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"e2"}
                    toggleStates={useHookTools}
                    returnText={<>Students with <code>marks</code> between 30 and 80.</>}
                    TableComponent={
                        <DataTable 
                            data={studentsData.filter(student => student.marks > 30 && student.marks < 80)}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>2. <code>OR</code> operator</h2>

                <ul>
                    <li><code>OR</code> means <strong>any one condition can be true</strong></li>
                    <li>For <strong>wider filtering</strong></li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <cols>
FROM <table_name>
WHERE <condition_1> OR <condition_2>;
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE marks < 50 OR marks IS NULL;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"e3"}
                    toggleStates={useHookTools}
                    returnText={<>Student with <code>null</code> or less than 50 marks</>}
                    TableComponent={
                        <DataTable
                            data={studentsData.filter(student => student.marks < 50 || student.marks === "[null]")}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>3. <code>NOT</code> operator</h2>

                <ul>
                    <li>Reverses the condition</li>
                    <li>To exclude specific values</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT <cols>
FROM <table_name>
WHERE NOT <condition>;
`}
                </code></pre>

                <p>Example:</p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE marks IS NOT NULL;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"e4"}
                    toggleStates={useHookTools}
                    returnText={<>Students with none <code>NULL</code> marks.</>}
                    TableComponent={
                        <DataTable data={studentsData.filter(student => student.marks !== "[null]")} />
                    }
                />
            </div>
        </div>
    )
}