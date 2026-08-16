import DataTable, { ToggleReturnDataTable, ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { mapStudentData, studentsData } from "./dummyPSQLData";

const toggleDefault = {
    e1: false,
    e2: false,
    e3: false,
    e4a: false,
    e4b: false,
    e5: false,
}

export default function PostgreSQL5DeletingData() {
    const { useHookTools } = useToggleDataTable({ toggleState: toggleDefault })
    const subqueryResult = studentsData.toSorted((a, b) => b.name.localeCompare(a.name)).slice(0, 2)
    const subqueryResultIds = subqueryResult.map(student => student.id)

    return (
        <div>
            <h1 className="mb-5">Deleting Data</h1>
            
            <div>
                <h2 className="mb-3">Why "safe delete" is important</h2>
                <ul>
                    <li><code>DELETE</code> operation are <strong>permanent</strong> if not handled carefully.</li>
                    <li>A wrong <code>DELETE</code> can <strong>remove critical data</strong> and break relationships.</li>
                </ul>

                <p><strong>Interview line</strong></p>
                <p className="ml-5">Ensures only intended records are removed without harming data integrity.</p>
            
                <div className="mt-5">
                    <h2>Basic Syntax</h2>
                    <pre><code>
{`</> PostgreSQL
DELETE FROM <table_name>
WHERE <condition>;
`}
                    </code></pre>
                </div>
                
                <div className="ml-5 *:mb-1 mb-5">
                    <p><code>DELETE</code> removes <strong>rows</strong>, not the table structure.</p>
                    <p><span className="text-(--txt-red) font-bold">ALWAYS INCLUDE</span> <code>WHERE</code> clause, or else it will wipe all data.</p>
                </div>

                <div className="*:mb-3">
                    <h3>Suppose Base Example: <code>student</code> table</h3>
                    <ToogleDataTable 
                        tableData={studentsData}
                        tableKey={"e1"}
                        useHookTools={useHookTools}
                    />
                </div>
            </div>
            <hr className="my-5" />

            <div>
                <h2 className="mb-3">1. Delete without <code>WHERE</code> clause (<span className="text-(--txt-red)">NOT RECOMMENDED</span>)</h2>
                <ul><li>Wipes all the data entries in one go.</li></ul>

                <pre><code>
{`</> PostgreSQL
DELETE FROM student;
`}
                </code></pre>

                <ToggleReturnDataTable 
                    toggleId={"e2"}
                    returnText={"All rows of data are deleted."}
                    TableComponent={
                        <DataTable
                            data={[mapStudentData()]}
                        />
                    }
                    toggleStates={useHookTools}
                />
            </div>
            <hr className="--hr-faded" />
            
            <div>
                <h2>2. <code>DELETE</code> data with <code>WHERE</code> clause</h2>

                <pre><code>
{`</> PostgreSQL
DELETE FROM student
WHERE id = 5;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleStates={useHookTools}
                    toggleId={"e3"}
                    returnText={<>Student with <code>id = 5</code> (Shyam) is removed.</>}
                    TableComponent={
                        <DataTable data={[studentsData.filter(student => student.id !== 5)]} />
                    }
                />
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>3. Always CHECK FIRST before deleting (Best Practice)</h2>

                <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE id = 4;
`}
                </code></pre>

                <ToogleDataTable
                    tableKey={"e4a"}
                    tableData={studentsData.filter(student => student.id === 4)}
                    useHookTools={useHookTools}
                />

                <p>If there's the data you wanna delete, then commit the deletion:</p>

                <pre><code>
{`</> PostgreSQL
DELETE FROM students
WHERE id = 4;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"e4b"}
                    toggleStates={useHookTools}
                    returnText={<>Student with <code>id = 4</code> (Ram) is removed.</>}
                    TableComponent={
                        <DataTable data={studentsData.filter(student => student.id !== 4)} />
                    }
                />
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2 className="mb-3">4. Delete with LIMIT (Using Subquery)</h2>
                <ul>
                    <li>PostgreSQL does not support LIMIT directly with DELETE.</li>

                    <li><strong>Syntax:</strong></li>
                    <pre><code>
{`</> PostgreSQL
DELETE FROM <table_name>
WHERE <col_name> IN (<subquery>)
`}
                    </code></pre>
                </ul>

                <p>Example:</p>
                <pre><code>
{`</> PostgreSQL
DELETE FROM students
WHERE id IN (
    SELECT id FROM students 
    ORDER BY name DESC
    LIMIT 2
)
`}
                </code></pre>

                <p className="mb-3">The subquery result:</p>
                <DataTable className="mx-auto mb-5 max-w-120"
                    data={subqueryResult}
                />

                <ToggleReturnDataTable 
                    toggleId={"e5"}
                    returnText={<>The subquery result is the one that gets deleted (student <code>id</code> with 5 and 3).</>}
                    toggleStates={useHookTools}
                    TableComponent={
                        <DataTable data={studentsData.filter(student => !subqueryResultIds.includes(student.id))} />
                    }
                />
            </div>
        </div>
    )
}