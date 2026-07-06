import { ToogleDataTable, useToggleDataTable } from "../../../hooks/useDataTable"
import { sliceDummyData, studentsData, studentTHeaders } from "./dummyPSQLData"

const stateDefault = {
    a1: false,
    b1: false,
    c1: false,
    d1: false,
}

export default function Postgresql3InsertingData() {
    const { useHookTools } = useToggleDataTable({
        toggleState: stateDefault,
    })

    return (
        <div className="[&_h2]:mb-5">
            <h1 className="mb-5">Inserting Data</h1>
            <div className="mb-5">
                <ul>
                    <li><code>INSERT INTO</code> is used to <strong>add new rows</strong> into a table.</li>
                    <li>Data must match <strong>column order, data type, and constraints</strong>.</li>
                </ul>
                              
                <h3>Supposed the table is this:</h3>
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
            <hr className="--hr-faded"/>

            <div>
                <h2>1. By Specifying Column Names (Best Practice)</h2>
                <div className="mb-5">
                    <p><strong>Basic Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO <table_name> 
VALUES(<val1>, <val2>, <val3>, ...);
`}
                    </code></pre>
                </div>

                <div>
                    <p><strong>Example Usage:</strong></p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO students(id, name, marks)
VALUES(1, 'Amir', 23);
`}
                    </code></pre>
                </div>

                <div>
                    <ToogleDataTable 
                        headersData={studentTHeaders} 
                        tableData={sliceDummyData(studentsData, 0, 1)} 
                        tableKey={"a1"}
                        useHookTools={useHookTools}
                    />
                </div>
                
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>2. <code>SERIAL</code> Primary Key Table</h2>
                <div>
                    <ul>
                        <li>Do <strong>NOT insert value</strong> for <code>SERIAL</code> column.</li>
                        <li>PostgreSQL auto-generates it.</li>
                    </ul>
                </div>

                <div>
                    <p><strong>Example:</strong></p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO students(name, marks)
VALUES('Piyush', 96);

INSERT INTO students(name, marks)
VALUES('Riya', 86);
`}
                    </code></pre>

                    <div>
                        <ToogleDataTable 
                            headersData={studentTHeaders} 
                            tableData={sliceDummyData(studentsData, 0, 3)} 
                            tableKey={"b1"}
                            useHookTools={useHookTools}
                        />
                    </div>
                </div>
            </div>
            <hr className="--hr-faded"/>
            
            <div className="[&>div]:mb-5">
                <h2>3. Insert Multiple Rows at Once</h2>
                <p className="mb-5">Faster and efficient.</p>

                <div>
                    <p><strong>Basic Syntax:</strong></p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO <table_name> 
VALUES
    (<val1>, <val2>, <val3>, ...),
    (<val1>, <val2>, <val3>, ...),
    (<val1>, <val2>, <val3>, ...),
`}
                    </code></pre>
                </div>
                
                <div>
                    <p><strong>Example Usage:</strong></p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO students (name, marks)
VALUES
	('Ram', 56),
	('Shyam', 45),
	('Preeti', 67);
`}
                    </code></pre>
                </div>

                <div>
                    <ToogleDataTable 
                        headersData={studentTHeaders} 
                        tableData={sliceDummyData(studentsData, 0,  6)} 
                        tableKey={"c1"}
                        useHookTools={useHookTools}
                    />
                </div>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>4. Insert with Omitted Columns</h2>
                <ul className="mb-5">
                    <li>Only works among the <strong>columns with set a default value</strong>.</li>
                    <li>And nullable columns (have no <code>NOT NULL</code>)</li>
                </ul>
                
                <div>
                    <p><strong>Example Usage:</strong></p>
                    <p>Earlier this where executed</p>
                    <pre><code>
{`</> PostgreSQL
INSERT INTO students(name)
VALUES('Piyush');
`}
                    </code></pre>

                    <div>
                        <ToogleDataTable 
                            headersData={studentTHeaders} 
                            tableData={sliceDummyData(studentsData, 0, 7)} 
                            tableKey={"d1"}
                            useHookTools={useHookTools}
                        />
                    </div>

                    <div>
                        <p>Can be omitted:</p>
                        <ul>
                            <li><code>id</code> &rarr; has default <code>SERIAL</code>.</li>
                            <li><code>created_at</code> &rarr; set to <code>DEFAULT CURRENT_TIMESTAMP</code></li>
                            <li><code>marks</code> &rarr; it's nullable.</li>
                            <li><code>name</code> can't be omitted; it has no default value.</li>
                        </ul>
                    </div>

                    <p>Meanwhile, <code>name</code> can't be omitted since it's set to <code>NOT NULL</code>.</p>
                </div>
            </div>
        </div>
    )
}

