import { useState } from "react"
import DataTable, { ToogleDataTable, useToggleDataTable } from "../../../components/useDataTable"
import { mapStudentData, studentsData, studentTHeaders } from "./dummyPSQLData"

const today = new Date().toDateString()
const toggleDefault = {
    a1: false,
    b1: false,
    c1: false,
}

export default function Postgresql4UpdatingRecords() {
    const [showCased, setShowCased] = useState(false)
    const [showReturn, setShowReturn] = useState(toggleDefault)

    function toogleReturn(key) {
        setShowReturn(p => ({...p, [key]: !p[key]}))
    }

    return (
        <div className="[&_h2]:mb-5">
            <h1 className="mb-5">Updating Records</h1>

            {/* BASIC SYNTAX AND SUPPOSED EXAMPLE =========================================== */}
            <div>
                <p className="mb-5">
                    <strong className="text-(--txt-red)">ALWAYS USE <code>WHERE</code></strong> clause to avoid modifying all reacords in the table.
                </p>

                <div>
                    <p><strong>Basic Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
UPDATE <table_name>
SET <column_name> = <val>
WHERE <condition>;
`}
                    </code></pre>
                </div>

                <div>
                    <div className="text-xl font-bold">
                        <span className="hover:text-(--link-hover-bg-clr) hover:underline underline-offset-4"
                            onClick={_ => setShowCased(p => !p)}
                            title={showCased ? "Hide table" : "Show table"}
                        >
                            Supposed the existing table:
                        </span>
                    </div>
                    
                    {showCased
                        && <div className="flex justify-center items-center flex-wrap">
                            <div className="overflow-auto">
                                <pre><code>
{`</> PostgreSQL
CREATE TABLE students(
	id	        SERIAL          PRIMARY KEY,
	name        VARCHAR(100)    NOT NULL,
	marks       INT             CHECK(marks BETWEEN 0 AND 100),
	created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);
`}
                                </code></pre>
                            </div>

                            <div className="flex justify-center">
                                <BaseTable />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <hr className="--hr-faded"/>

            {/* UPDATING SINGLE COLUMN =================================================================== */}
            <div>
                <h2>1. Update Single Column</h2>
                <div>
                    <pre><code>
{`</> PostgreSQL
UPDATE students
SET marks = 95
WHERE id = 1;
`}
                    </code></pre>
                </div>

                <ToggleReturnDataTable
                    toggleStates={{ toogleReturn, showReturn }}
                    toggleId={"a1"}
                    returnText={<>Amir's <code>mark</code> changed from 23 to 95.</>}
                    TableComponent={
                        <div className="w-90">
                            <DataTable 
                                data={studentsData.map(student => {
                                    if (student.id === 1) return mapStudentData(1, "Amir", 95, today)
                                    else return student
                                })} 
                                className="[&_.r0c2]:text-(--txt-red)"
                            />
                        </div>
                    }
                />
            </div>
            <hr className="--hr-faded" />

            {/* UPDATING MULTIPLE COLUMNS =============================================================== */}
            <div>
                <h2>2. Updating Multiple Columns</h2>
                <div>
                    <p><strong>Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
UPDATE <table_name>
SET 
    <column_name1> = <val>,
    <column_name1> = <val>,
WHERE <condition_matched_1_row>;
`}
                    </code></pre>

                    <p><strong>Example Usage:</strong></p>
                    <pre><code>
{`</> PostgreSQL
UPDATE students
SET 
    name = "Amit Sharma",
    marks = 90
WHERE id = 2;
`}
                    </code></pre>
                </div>

                <ToggleReturnDataTable 
                    toggleStates={{ toogleReturn, showReturn }}
                    toggleId={"b1"}
                    returnText={<><code>Piyush</code> is now named as <code>Amit Sharma</code> with mark of 90.</>}
                    TableComponent={
                        <div className="justify-start w-90 h-full">
                            <DataTable 
                                data={studentsData.map(student => {
                                        if (student.id === 1) return mapStudentData(2, "Amit Sharma", 90, today)
                                        else return student
                                    })
                                }
                                className="[&_:is(.r1c1,.r1c2)]:text-(--txt-red)"
                            />
                        </div>
                    }
                />
            </div>
            <hr className="--hr-faded" />

            {/* UPDATING MULTIPLE ROWS ================================================================ */}
            <div>
                <h2>3. Update Multiple Rows</h2>
                <div>
                    <p><strong>Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
UPDATE <table_name>
SET <column_name1> = <val>
WHERE <condition_matched_more_than_1_row>;
`}
                    </code></pre>

                    <p><strong>Example Usage:</strong></p>
                    <pre><code>
{`</> PostgreSQL
UPDATE students
SET marks = marks + 5
WHERE marks < 80;
`}
                    </code></pre>
                </div>

                <ToggleReturnDataTable
                    toggleStates={{ toogleReturn, showReturn }}
                    toggleId={"c1"}
                    returnText={<>Any <code>marks</code> lesser than 80 will increase by 5.</>}
                    TableComponent={
                        <DataTable 
                            data={studentsData.map(student => {
                                    if (student.marks < 80) return {...student, marks: student.marks + 5}
                                    return student
                                })
                            }
                            className="[&_:is(.r0c2,.r3c2,.r4c2,.r5c2)]:text-(--txt-red)"
                        />
                    }
                />
            </div>
        </div>
    )
}

// Utility Components ===================================================
const BaseTable = _ => {
    return (
        <div className="flex justify-start w-90 h-full">
            <DataTable data={studentsData} />
        </div>
    )
}

const CompareToBaseTable = ({ TableComponent }) => {
    return (
        <div className="flex justify-center border p-2 bg-black rounded-2xl">
            <div className="flex justify-start items-center gap-5 overflow-auto">
                <BaseTable />
                <span className="text-6xl">&rarr;</span>
                
                {TableComponent}
            </div>
        </div>
    )
}

const ToggleReturnDataTable = ({ toggleId, returnText, TableComponent, toggleStates }) => {
    return (
        <div className="mb-5">
            {/* Return Message and Toggle Switch */}
            <div className="mb-5">
                <span className="hover:text-(--link-hover-bg-clr) hover:underline underline-offset-4"
                    onClick={_ => toggleStates.toogleReturn(toggleId)}
                >
                    👁️Return:
                </span>
                <p className="mt-2 ml-10">{returnText}</p>
            </div>

            {/* Return Table */}
            {toggleStates.showReturn[toggleId]
                && <CompareToBaseTable TableComponent={TableComponent} />
            }
        </div>
    )
}