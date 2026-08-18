import { useState } from "react";
import DataTable from "../../../components/useDataTable";
import { capitalize } from "../../../lib/helpers";

export default function PostgreSQL15LikeAndIlike() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5"><code>LIKE</code> and <code>ILIKE</code></h1>

            <div>
                <ul>
                    <li>Are used for pattern matching to <code>search text data partially</code>, not exact matches.</li>
                </ul>

                <div className="mb-5">
                    <p className="mb-2"><strong>Interview Line</strong></p>
                    <p className="ml-5"><code>LIKE</code> and <code>ILIKE</code> are used to match string patterns using wildcard (<code>_</code>, <code>%</code>, and <code>/</code>) characters.</p>
                </div>

                <h3 className="mb-1">Wildcards</h3>
                <div className="mx-auto max-w-100 overflow-auto">
                    <DataTable 
                        className="[&>thead>tr]:font-bold mb-5"
                        data={[
                            {wildcard: <><code>%</code></>, meaning: "Zero or more characters", example: <><code>'John%'</code></>},
                            {wildcard: <><code>_</code></>, meaning: "Exactly one character", example: <><code>'Jo_n'</code></>},
                        ]}
                        capHeaders={true}
                    />
                </div>

                <WilcardExplanation />
            </div>

            <hr className="my-5" />
        
            <div>
                <h2><code>LIKE</code> Operator (Case-sensitive)</h2>
                <ul>
                    <li>Matches text <strong>case-sensitively</strong>.</li>
                    <li><code>'Dog'</code> and <code>'dog'</code> are treated as <strong>different</strong>.</li>
                </ul>

                <h3>Syntax:</h3>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM <table_name>
WHERE <column_name> LIKE <pattern>;
`}
                </code></pre>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM animals
WHERE name LIKE 'D%';
`}
                </code></pre>
                <p>Returns animal name that starts with capital <strong>D</strong> only.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2><code>ILIKE</code> Operator (Case-insensitive)</h2>
                
                <p>With <code>LIKE</code> operator:</p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM customers
WHERE name LIKE '%john%'
`}
                </code></pre>

                <p>It can distinguish:</p>
                <ul>
                    <li>john</li>
                    <li>John</li>
                    <li>JOHN</li>
                    <li>JoHn</li>
                </ul>

                <p>Wherease using <code>ILIKE</code>:</p>
                <pre><code>
{`</> PostgreSQL
SELECT * FROM customers
WHERE name ILIKE '%john%'
`}
                </code></pre>
                <p>Matches all of them.</p>
            </div>
        </div>
    )
}

const WilcardExplanation = ({ className }) => {
    const [show, setShow] = useState(false)
    return (
        <div className={`${className ?? ""} p-2 py-2 flex flex-col ${show && "border rounded-2xl"}`}>
            {show
                ? <>
                    <div className="mb-3 flex justify-between items-center">
                        <h3>Further Examples</h3>
                        <span className="p-1 hover:bg-(--line-break-clr) hover:cursor-pointer rounded-2xl"
                            onClick={_ => setShow(false)}
                            title="Hide examples"
                        >
                            ❌
                        </span>
                    </div>

                    {/* % Wildcard Examples */}
                    <div className="mb-5">
                        <h3 className="mb-3"><code>%</code> &mdash; zero or more characters</h3>

                        <div className="mx-auto max-w-150 overflow-auto">
                            <DataTable className="[&_tbody_td:nth-child(3)]:whitespace-pre-line [&>thead>tr]:font-bold"
                                data={[
                                    {
                                        query: <><code>WHERE name LIKE 'John%'</code></>, 
                                        meaning: `Starts with "John"`, 
                                        "could return": "John \n Johnny \n Johnson"
                                    },
                                    {
                                        query: <><code>WHERE name LIKE '%John'</code></>, 
                                        meaning: `Ends with "John"`, 
                                        "could return": "John \n BigJohn \n OldJohn"
                                    },
                                    {
                                        query: <><code>WHERE name LIKE '%John%'</code></>, 
                                        meaning: `Contains "John"`, 
                                        "could return": "John \n Johnny \n BigJohn \n John Smith"
                                    },
                                    {
                                        query: <><code>WHERE name LIKE 'Jo%n'</code></>, 
                                        meaning: `Starts with "Jo" and ends with "n"`, 
                                        "could return": "Jon \n Jordan \n Jonathan \n Joe Brown"
                                    },
                                ]}
                                capHeaders={"caps"}
                            />
                        </div>
                    </div>
                    
                    {/* _ Further Explanation */}
                    <div>
                        <h3 className="mb-3"><code>_</code> &mdash; exactly one character</h3>

                        <div className="mx-auto max-w-150">
                            <DataTable className="[&>tbody_td:is(:nth-child(2),:nth-child(3))]:whitespace-pre [&>thead_td]:font-bold"
                                data={[
                                    {
                                        query: <><code>WHERE name LIKE 'Jo_n'</code></>,
                                        matches: "John \nJoan \nJorn",
                                        "don't match": "Jon       -- only 3 characters \nJohan   -- too many characters",
                                    },
                                    {
                                        query: <><code>WHERE code LIKE 'A_3'</code></>,
                                        matches: "AB3 \nAX3 \nA93",
                                        "don't match": "A123 \nA3",
                                    },
                                ]}
                                capHeaders="caps"
                            />
                        </div>
                    </div>
                </>
                : <div>
                    <span className="p-1 pr-2 hover:text-(--link-hover-text-clr) hover:bg-(--line-break-clr) hover:cursor-pointer rounded-2xl"
                        title="More wildcard explanation"
                        onClick={_ => setShow(true)}
                    >
                        👁️ Further Wildcard Examples
                    </span>
                </div>
            }
        </div>
    )
}