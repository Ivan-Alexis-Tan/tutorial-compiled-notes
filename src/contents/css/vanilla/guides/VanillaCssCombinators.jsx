import { useState } from "react"

const titleSyle = "text-2xl font-bold"

export default function VanillaCssCombinators() {
    const [combinatorId, setCombinatorId] = useState(0)

    const summaryTable = <table>
        <thead>
            <tr>
                <th>Combinator</th>
                <th>Meaning</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(summaryTableDetails).map(detail => {
                const row = summaryTableDetails[detail]
                return (
                    <tr key={row.symbol}>
                        <td><code onClick={_ => setCombinatorId(detail)} className="hover:border-1">
                            {row.symbol === "" ? <span>&nbsp;</span> : row.symbol}
                        </code></td>
                        <td>{row.meaning}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>

    return (
        <div>
            <h1 className="text-4xl font-bold my-5">Combinators</h1>

            {combinatorId === 0
                ? summaryTable
                : <>
                    <p className="hover:text-[hsl(281,100%,50%)] text-xl font-bold mb-10" 
                        onClick={_ => setCombinatorId(0)}
                    >&rarr; View Summary Table</p>
                    {summaryTableDetails[combinatorId].comp}
                </>
            }
        </div>
    )
}

const Descendant = () => {
    return (
        <div>
            <h2 className={`${titleSyle}`}>Descendant (<code>&nbsp;</code>)</h2>
            <p>Somewhere inside the selected element.</p>
            <p>Example:</p>
            <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <p>Paragraph D</p>
    <p>Paragraph E</p>
</main>
`}
            </code></pre>
            <pre><code>
{`</> CSS
#container {
    border: 2px solid;
}

#container p {
    background-color: hsl(60, 100%, 70%)
}
`}
            </code></pre>
            <p>Result:</p>

            <div className="flex flex-col justify-start gap-3 bg-white text-black p-5 m-5">
                <div className="flex flex-col justify-start gap-3 py-3 border-2 [&_p]:bg-[hsl(60,100%,70%)]">
                    <p>Paragraph A</p>
                    <p>Paragraph B</p>

                    <div>
                        <p>Paragraph C</p>
                    </div>
                </div>

                <p>Paragraph D</p>
                <p>Paragraph E</p>
            </div>
        </div>
    )
}

const DirectChild = () => {
    const directChildStyles = "[&>p]:bg-[hsl(60,100%,70%)]"
    
    return (
        <div>
            <h2 className={titleSyle}>Direct Child (<code>{`>`}</code>)</h2>
            <p>Selected element's direct child.</p>
            <p>Grandchildren are not included.</p>
            <p>Example:</p>
            <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <p>Paragraph D</p>
    <p>Paragraph E</p>
</main>
`}
            </code></pre>
            <pre><code>
{`</> CSS
#container {
    border: 2px solid;
}

#container > p {
    background-color: hsl(60, 100%, 70%)
}
`}
            </code></pre>
            <p>Result:</p>
            <div className="flex flex-col justify-start gap-3 bg-white text-black p-5 m-5">
                <div className={`flex flex-col justify-start gap-3 py-3 border-2 ${directChildStyles}`}>
                    <p>Paragraph A</p>
                    <p>Paragraph B</p>

                    <div>
                        <p>Paragraph C</p>
                    </div>
                </div>

                <p>Paragraph D</p>
                <p>Paragraph E</p>
            </div>
        </div>
    )
}

const GeneralSibling = () => {
    const generalSiblingStyles = "[&~p]:bg-[hsl(60,100%,70%)]"
    
    return (
        <div>
            <h2 className={titleSyle}>General Sibling (<code>~</code>)</h2>
            <p>All selected element in the similar DOM level (sibling).</p>
            <p>Example:</p>
            <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <p>Paragraph D</p>
    <p>Paragraph E</p>
</main>
`}
            </code></pre>
            <pre><code>
{`</> CSS
#container {
    border: 2px solid;
}

// Tailwind -> "[&~p]:bg-[hsl(60,100%,70%)]"
#container ~ p {
    background-color: hsl(60, 100%, 70%)
}
`}
            </code></pre>

            <p>Result:</p>
            <div className="flex flex-col justify-start gap-3 bg-white text-black p-5 m-5">
                <div className={`flex flex-col justify-start gap-3 py-3 border-2 ${generalSiblingStyles}`}>
                    <p>Paragraph A</p>
                    <p>Paragraph B</p>

                    <div>
                        <p>Paragraph C</p>
                    </div>
                </div>

                <p>Paragraph D</p>
                <p>Paragraph E</p>
            </div>

            <p>If we change the HTML element:</p>
            <div className="flex justify-center">
                <div className="flex items-center max-w-4xl overflow-auto">
                    <div>
                        <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <p>Paragraph D</p>
    <p>Paragraph E</p>
</main>
`}
                        </code></pre>
                    </div>
                    <p className="text-5xl">&rarr;</p>
                    <div>
                        <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <div>
        <p>Paragraph D</p>
        <p>Paragraph E</p>
    </div>
</main>
`}
                        </code></pre>
                    </div>
                </div>
            </div>

            <p>Result:</p>
            <div className="flex flex-col justify-start gap-3 bg-white text-black p-5 m-5">
                <div className={`flex flex-col justify-start gap-3 py-3 border-2 ${generalSiblingStyles}`}>
                    <p>Paragraph A</p>
                    <p>Paragraph B</p>

                    <div>
                        <p>Paragraph C</p>
                    </div>
                </div>

                <div>
                    <p>Paragraph D</p>
                    <p>Paragraph E</p>
                </div>
            </div>

            <p>There's no <code>{`<p>`}</code> sibling.</p>
            <p>Only <code>{`<div>`}</code> is the sibling</p>
        </div>
    )
}

const AdjacentSibling = () => {
    const adjacentSibling = "[&+p]:bg-[hsl(60,100%,70%)]"
    return (
        <div>
            <h2 className={`${titleSyle}`}>Adjacent Sibling (<code>+</code>)</h2>
            <p>Immediate sibling element.</p>

            <pre><code>
{`</> HTML
<main>
    <div id="container">
        <p>Paragraph A</p>
        <p>Paragraph B</p>

        <div>
            <p>Paragraph C</p>
        </div>
    </div>

    <p>Paragraph D</p>
    <p>Paragraph E</p>
</main>
`}
            </code></pre>
            <pre><code>
{`</> CSS
#container {
    border: 2px solid;
}

// Tailwind -> "[&+p]:bg-[hsl(60,100%,70%)]"
#container + p {
    background-color: hsl(60, 100%, 70%)
}
`}
            </code></pre>
            
            <p>Result:</p>
            <div className="flex flex-col justify-start gap-3 bg-white text-black p-5 m-5">
                <div className={`flex flex-col justify-start gap-3 py-3 border-2 ${adjacentSibling}`}>
                    <p>Paragraph A</p>
                    <p>Paragraph B</p>

                    <div>
                        <p>Paragraph C</p>
                    </div>
                </div>

                <p>Paragraph D</p>
                <p>Paragraph E</p>
            </div>
        </div>
    )
}

const summaryTableDetails = {
    1: {symbol: "", comp: <Descendant />, meaning: "Descendant"},
    2: {symbol: ">", comp: <DirectChild />, meaning: "Direct child"},
    3: {symbol: "~", comp: <GeneralSibling />, meaning: "General sibling"},
    4: {symbol: "+", comp: <AdjacentSibling />, meaning: "Adjacent sibling"},
}