import DataTable, { ToggleReturnDataTable, ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable";
import { studentsData } from "./dummyPSQLData";

const tableIds = {
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
    t6: false,
}

export default function PostgreSQL18ColumnAliasAndExpression() {
    const { useHookTools } = useToggleDataTable(tableIds)
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Column Aliases and Expression</h1>

            <div>
                <ul>
                    <li><strong>Column Alias</strong> is a temporary name given to a column in the result set.</li>
                    <li>Used to make output <strong>more readable</strong>.</li>
                    <li>Exists <strong>only during query execution</strong>.</li>
                </ul>

                <h2>Syntax:</h2>
                <pre><code>
{`</> PostgreSQL
SELECT <col_name> AS <alias>
FROM <table_name>;
`}
                </code></pre>

                <div>
                    <div className="gap-2 flex items-center mb-3">
                        <h3>Example data table:</h3>
                        <code>students</code>
                    </div>

                    <ToogleDataTable 
                        tableKey={"t1"}
                        tableData={studentsData}
                        useHookTools={useHookTools}
                        btnText="Data table"
                    />
                </div>
            </div>

            <hr className="my-5" />

            <div>
                <h2>1. Column Alias</h2>

                <p><strong>Example:</strong></p>

                <pre><code>
{`</> PostgreSQL
SELECT 
    name AS student_name,
    marks AS student_marks
FROM students;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"t2"}
                    toggleStates={useHookTools}
                    returnText={<><code>name</code> and <code>marks</code> columns rename into <code>student_name</code> and <code>student_marks</code></>}
                    TableComponent={
                        <DataTable 
                            indexed={true}
                            data={studentsData.map(student => ({student_name: student.name, student_marks: student.marks}))}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>2. Alias Without <code>AS</code></h2>

                <p><strong>Example:</strong></p>

                <pre><code>
{`</> PostgreSQL
SELECT 
    name student_name,
    marks student_marks
FROM students;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"t3"}
                    toggleStates={useHookTools}
                    returnText={<><code>name</code> and <code>marks</code> columns rename into <code>student_name</code> and <code>student_marks</code></>}
                    TableComponent={
                        <DataTable 
                            indexed={true}
                            data={studentsData.map(student => ({student_name: student.name, student_marks: student.marks}))}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>3. Alias with Spaces (Use Double Quotes)</h2>
                <p>Using double quotations <code>"</code> and spaces instead of <code>_</code>.</p>
            
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name AS "student name",
    marks AS student_marks
FROM students;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"t4"}
                    toggleStates={useHookTools}
                    returnText={<><code>name</code> and <code>marks</code> columns rename into <code>student name</code> and <code>student_marks</code></>}
                    TableComponent={
                        <DataTable 
                            indexed={true}
                            data={studentsData.map(student => ({"student name": student.name, student_marks: student.marks}))}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>4. Arithmetic Expressions</h2>

                <div className="mb-5">
                    <p>Arithmetic expressions are allowed in <code>SELECT</code></p>
                    <p>Aliasing is important as it names the column.</p>
                </div>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name,
    marks + 5 AS updated_marks
FROM students;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"t5"}
                    toggleStates={useHookTools}
                    returnText={<><code>marks</code> increased by 5 and renamed into <code>updated_marks</code></>}
                    TableComponent={
                        <DataTable 
                            indexed={true}
                            data={studentsData.map(student => ({
                                name: student.name, 
                                updated_marks: typeof student.marks === "number" 
                                    ? student.marks + 5 
                                    : student.marks
                            }))}
                        />
                    }
                />
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>5. Expresions with Functions</h2>
                <p className="mb-5">Alias is important as well as it names the new column</p>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT 
    name,
    UPPER(name) AS upper_name
FROM students;
`}
                </code></pre>

                <ToggleReturnDataTable
                    toggleId={"t6"}
                    toggleStates={useHookTools}
                    returnText={<>New column <code>upper_name</code> all caps <code>name</code> column.</>}
                    TableComponent={
                        <DataTable 
                            indexed={true}
                            data={studentsData.map(student => ({
                                name: student.name, 
                                upper_name: `${student.name}`.toUpperCase()
                            }))}
                        />
                    }
                />
            </div>
        </div>
    )
}