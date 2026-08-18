import DataTable from "../../../components/useDataTable";

export default function PostgreSQL16Regex() {
    return (
        <div className="[&_h2]:mb-3">
            <h1 className="mb-5">Regex (Regular Expression)</h1>

            <div>
                <ul>
                    <li>For <strong>advanced pattern matching</strong> in text data.</li>
                    <li>More powerful than <code>LIKE</code> and <code>ILIKE</code>.</li>
                </ul>

                <p className="mb-1"><strong>Interview Line</strong></p>
                <p className="ml-5">Allows complex pattern matching using special operators and symbols.</p>
            </div>

            <hr className="my-5" />

            <div>
                <h2>Regex Operators</h2>

                <div className="mx-auto mb-5 max-w-100">
                    <DataTable className="[&>thead_td]:font-bold"
                        data={[
                            {
                                symbol: <><code>~</code></>,
                                meaning: "match, case-sensitive",
                            },
                            {
                                symbol: <><code>~*</code></>,
                                meaning: "match, case-insensitive",
                            },
                            {
                                symbol: <><code>!~</code></>,
                                meaning: "NOT match, case-sensitive",
                            },
                            {
                                symbol: <><code>!~*</code></>,
                                meaning: "NOT match, case-insensitive",
                            },
                        ]}
                        capHeaders="caps"
                    />
                </div>

                <div>
                    <p><strong>Example 1:</strong> Case-sensitive</p>
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE name ~ '^John';
`}
                    </code></pre>
                    <p>Matches:</p>
                    <ul>
                        <li>John</li>
                        <li>Johnny</li>
                        <li>Johnson</li>
                    </ul>
                </div>

                <div>
                    <p><strong>Example 2:</strong> Case-insensitive</p>
                    <pre><code>
{`</> PostgreSQL
SELECT * FROM students
WHERE name ~* '^John';
`}
                    </code></pre>
                    <p>Matches:</p>
                    <ul>
                        <li>John</li>
                        <li>JoHN</li>
                        <li>john</li>
                        <li>Johnny</li>
                    </ul>
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Regex Wildcards</h2>
                <div className="mx-auto overflow-auto">
                    <DataTable className="w-180! [&>tbody_td:is(:nth-child(4),:nth-child(5))]:whitespace-pre-line [&>thead_td]:font-bold"
                        data={[
                            {
                                symbol: <code>^</code>,
                                meaning: "Beginning of string",
                                example: <code>WHERE name ~ '^John'</code>,
                                matches: <RenderToBullets 
                                    itemArray={["John", "Johnny", "John Smith"]} 
                                    before="✅"
                                />,
                                "don't matches": <RenderToBullets 
                                    itemArray={["Big John", "Old John"]} 
                                />,
                            },
                            {
                                symbol: <code>$</code>,
                                meaning: "End of string",
                                example: <code>WHERE name ~ 'John$'</code>,
                                matches: <RenderToBullets 
                                    itemArray={["John", "Big John", "Old John"]} 
                                    before="✅"
                                />,
                                "don't matches": <RenderToBullets 
                                    itemArray={["Johnny", "John Smith"]} 
                                /> ,
                            },
                            {
                                symbol: <code>.</code>,
                                meaning: "Any single character",
                                example: <code>WHERE name ~ 'J.hn'</code>,
                                matches: <RenderToBullets 
                                    itemArray={["John", "Jahn", "Juhn"]} 
                                    before="✅"
                                />,
                                "don't matches": "",
                            },
                        ]}
                        capHeaders="caps"
                    />
                </div>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Repeatition Control</h2>

                <div className="mb-5 mx-auto overflow-auto">
                    <DataTable className="w-150! [&>thead_td]:font-bold"
                        data={[
                            {
                                symbol: <code>*</code>,
                                meaning: "Zero or more",
                                example: <code>WHERE name ~ 'a*'</code>,
                                "meaning of example": <>Zero or more <code>a</code>s</>,
                            },
                            {
                                symbol: <code>+</code>,
                                meaning: "One or more",
                                example: <code>WHERE name ~ 'a+'</code>,
                                "meaning of example": <>One or more <code>a</code>s</>,
                            },
                            {
                                symbol: <code>?</code>,
                                meaning: "Zero or one",
                                example: <code>WHERE name ~ 'a?'</code>,
                                "meaning of example": <>zero or one <code>a</code>s</>,
                            },
                        ]}
                        capHeaders="caps"
                    />
                </div>

                <p><strong>Example</strong></p>
                <pre><code>
{`</> PostgreSQL
WHERE name ~ '^Jo+hn$'
`}
                </code></pre>

                <p>Matches:</p>
                <ul>
                    <li>John</li>
                    <li>Joohn</li>
                    <li>Jooohn</li>
                </ul>
                <p>Because <code>o+</code> means one or more <code>o</code>s.</p>
            </div>

            <hr className="--hr-faded" />

            <div>
                <h2>Character Groups</h2>
                <div className="mb-5 overflow-auto">
                    <DataTable className="w-150! [&>thead_td]:font-bold"
                        data={[
                            {
                                example: <code>WHERE name ~ '^[ABC]'</code>,
                                meaning: "Starts with A, B, or C",
                            },
                            {
                                example: <code>WHERE name ~ '^[A-Z]'</code>,
                                meaning: "Starts with an uppercase letter",
                            },
                            {
                                example: <code>WHERE name ~ '^[0-9]'</code>,
                                meaning: "Starts with a digit",
                            },
                            {
                                example: <code>WHERE name ~ '^[^0-9]'</code>,
                                meaning: "Starts with something other than a digit (negation)",
                            },
                        ]}
                        capHeaders="caps"
                    />
                </div>
            </div>

            <hr className="--hr-faded" />
        
            <div>
                <h2>Common Regex Patterns</h2>

                <div>
                    <DataTable className="max-w-190! [&>thead_td]:font-bold"
                        data={[
                            {
                                pattern: "Only numbers",
                                query: <code>WHERE value ~ '^[0-9]+$'</code>,
                            },
                            {
                                pattern: "Only letters",
                                query: <code>WHERE value ~ '^[A-Za-z]+$'</code>,
                            },
                            {
                                pattern: "Letters and numbers",
                                query: <code>WHERE value ~ '^[A-Za-z0-9]+$'</code>,
                            },
                            {
                                pattern: "Exactly 5 digits",
                                query: <code>WHERE value ~ '^[0-9]{5}$'</code>,
                            },
                            {
                                pattern: "Email-ish pattern",
                                query: <code>WHERE email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{`{2,}$'`}</code>,
                            },
                        ]}
                        capHeaders="caps"
                    />
                </div>
            </div>
        </div>
    )
}

const RenderToBullets = ({ itemArray = [], before = false }) => {
    return itemArray.map(item => (
        <li key={item}
            className={`${before ? `before:content-['${before}']!`: ""}`}
        >
            {item}
        </li>
    ))
}