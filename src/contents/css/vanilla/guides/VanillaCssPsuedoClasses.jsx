import {useState } from "react"

const PseudoTitleStyles = "text-2xl mb-3"
const idDefault = {kind: "", id: 0}

export default function VanillaCssPseudoClasses() {
    const [pseudoId, setPseudoId] = useState(idDefault)

    const createTdTag = (kind) => {
        const classKind = pseudoClassMapping[kind]

        return Object.keys(classKind).map(id => {
            const pseudoClass = classKind[id]
            return (
                <tr key={id}>
                    <td>
                        <code onClick={_ => setPseudoId({kind: kind, id: Number(id)})} className="hover:border-1"
                        >:{pseudoClass.name}</code>
                    </td>
                    <td>{pseudoClass.desc}</td>
                </tr> 
            )     
        })
    }

    const summaryTable = <>
        <h2 className="text-2xl font-bold mb-3">Most Important Pseudo-Classes First</h2>
        <table>
            <thead>
                <tr>
                    <th>Pseudo-class</th>
                    <th>Triggers</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={2}>User Interaction</td>
                </tr>
                {createTdTag("userInteraction")}
                
                <tr>
                    <td colSpan={2}>Form Pseudo-Classes</td>
                </tr>
                {createTdTag("formPseudo")}

                <tr>
                    <td colSpan={2}>Structural Pseudo-Classes &mdash; target elements based on position</td>
                </tr>
                {createTdTag("structuralPseudo")}

                <tr>
                    <td colSpan={2}>Negation and Logic</td>
                </tr>
                {createTdTag("negationAndLogic")}
            </tbody>
        </table>
    </>

    return (
        <div>
            <h1 className="text-4xl font-bold">Pseudo-Classes</h1>
            <div>
                <p>Syntax:</p>
                <pre><code>
{`</> CSS
selector:pseudo-class {
    /* styles */
}
`}
                </code></pre>

                <p>Example:</p>
                <pre><code>
{`</> CSS
button:hover {
    background: blue;
}
`}
                </code></pre>
            </div>

            {pseudoId.id === 0
                ? summaryTable
                : <>
                    <p onClick={_ => setPseudoId(idDefault)} 
                        className="hover:text-[hsl(281,100%,50%)] font-bold inline"
                    >View Summary Table</p>
                    {pseudoClassMapping[pseudoId.kind][pseudoId.id].comp}
                </>
            }

        </div>
    )
}

// User Interaction Pseudo-Classes
const PseudoHover = () => {
    return (
        <div>
            <h2 className={`${PseudoTitleStyles}`}>
                <code>:hover</code>
            </h2>
            <p>When mouse is over the element.</p>
            <pre><code>
{`</> CSSS
button:hover {
    background: black;
    color: white;
}
`}
            </code></pre>
            <p>Used for:</p>
            <ul>
                {["buttons", "cards", "links", "menus", "animation"].map(em => (
                    <li key={em}>{em}</li>
                ))}
            </ul>
        </div>
    )
}

const PseudoActive = () => {
    return (
        <div>
            <h3>
                <code>:active</code>
                <p>While clicking.</p>

                <pre><code>
{`</> CSS
button:active {
    transform: scale(0.95);
}
`}
                </code></pre>

                <p>Comonly used for:</p>
                <ul>
                    <li>Click feedback</li>
                    <li>Press effects</li>
                </ul>
            </h3>
        </div>
    )
}

const PseudoFocus = () => {
    return (
        <div>
            <h2>
                <code>:focus</code>
            </h2>

            <p>When element is focused.</p>
            <p>Usually via:</p>
            <ul>
                <li>Tab key</li>
                <li>Click</li>
                <li>Keyboard navigation</li>
            </ul>

            <pre><code>
{`</> CSS
input:focus {
    border-color: blue;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoFocusVisible = () => {
    return (
        <div>
            <h2>
                <code>:focus-visible</code>
            </h2>
            <p>More modern and better than <code>:focus</code> in many situations.</p>
            <p>Show focus only when browser thinks keyboard focus indicator is needed.</p>

            <pre><code>
{`</> CSS
button:focus-visible {
    outline: 2px solid blue;
}
`}
            </code></pre>

            <p>This avoids ugly outlines on mouse click but preserves accessibility.</p>
            <p>Very important for accessibility.</p>
        </div>
    )
}

const PseudoVisited = () => {
    return (
        <div>
            <h2 className="">
                <code>:visited</code>
            </h2>
            <p>Visited links.</p>

            <pre><code>
{`</> CSS
a:visited {
    color: purple;
}
`}
            </code></pre>
        </div>
    )
}

// User Interaction Pseudo-Classes
const PseudoChecked = () => {
    return (
        <div>
            <h2>
                <code>:checked</code>
            </h2>
            <p>Checkboxes/radios.</p>

            <pre><code>
{`</> CSS
input:checked {
    accent-color: green;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoDisabled = () => {
    return (
        <div>
            <h2>
                <code>:disabled</code>
            </h2>
            <p>When form tags are disabled.</p>

            <pre><code>
{`</> CSS
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoRequired = () => {
    return (
        <div>
            <h2>
                <code>:required</code>
            </h2>
            <p>When form tags are required.</p>

            <pre><code>
{`</> CSS
input:required {
    border-left: 3px solid orange;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoValid = () => {
    return (
        <div>
            <h2>
                <code>:valid</code>
            </h2>
            <p>When elements contents successfully validated.</p>

            <pre><code>
{`</> CSS
input:valid {
    border-color: green;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoInvalid = () => {
    return (
        <div>
            <h2>
                <code>:invalid</code>
            </h2>
            <p>When contents do not match their validation requirements.</p>

            <pre><code>
{`</> CSS
input:invalid {
    border-color: red;
}
`}
            </code></pre>
        </div>
    )
}

// Structural Pseudo-Class
const PseudoFirstChild = () => {
    return (
        <div>
            <h2>
                <code>:first-child</code>
            </h2>
            <p>Targets the first child inside a parent.</p>

            <pre><code>
{`</> CSS
li:first-child {
    font-weight: bold;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoLastChild = () => {
    return (
        <div>
            <h2>
                <code>:last-child</code>
            </h2>
            <p>Targets the last child inside a parent.</p>

            <pre><code>
{`</> CSS
li:last-child {
    color: red;
}
`}
            </code></pre>
        </div>
    )
}

const PseudoNthChild = () => {
    return (
        <div>
            <h2>
                <code>:nth-child()</code>
            </h2>
            <p>Target specific elements inside a parent.</p>

            <pre><code>
{`</> CSS
li:nth-child(2) {
    color: blue;
}
`}
            </code></pre>
            
            <p>Or patterns:</p>
            <pre><code>
{`</> CSS
li:nth-child(even)
li:nth-child(odd)
`}
            </code></pre>

            <p>Or:</p>
            <pre><code>
{`</> CSS
li:nth-child(3n)
`}
            </code></pre>
        </div>
    )
}

const PseudoNthOfType = () => {
    return (
        <div>
            <h2>
                <code>:nth-of-type()</code>
            </h2>
            <p>Targets the specific <i>n-th</i> number of that element type.</p>

            <p>Example:</p>
            <pre><code>
{`</> HTML
<div>
    <p>One</p>
    <span>Two</span>
    <p>Three</p>
</div>
`}
            </code></pre>
            <pre><code>
{`</> CSS
p:nth-of-type(2) {
    color: red;
}
`}
            </code></pre>
            <p>Targets:</p>
            <ul>
                <li>the SECOND <code>{`<p>`}</code></li>
                <li>NOT the second child overall</li>
            </ul>
        </div>
    )
}

// Nagation and Logic Pseudo-Classes
const PseudoNot = () => {
    return (
        <div>
            <h2>
                <code>:not()</code>
            </h2>
            <p>Every element except x.</p>
            
            <pre><code>
{`</> CSS
button:not(.primary) {
    background: gray;
}
`}
            </code></pre>
            <p>Meaning: Every button except <code>class="primary"</code></p>
        </div>
    )
}

const PseudoIs = () => {
    return (
        <div>
            <h2>
                <code>:is()</code>
            </h2>
            <p>Group elements.</p>

            <pre><code>
{`</> CSS
:is(h1, h2, h3) {
    font-family: sans-serif;
}
`}
            </code></pre>

            <p>Instead of:</p>
            <pre><code>
{`</> CSS
h1, h2, h3 {
    // some styles
}
`}
            </code></pre>
        </div>
    )
}

const PseudoWhere = () => {
    return (
        <div>
            <h2>
                <code>:where()</code>
            </h2>
            <p>Similar to <code>:is()</code> but with ZERO speficity.</p>
        </div>
    )
}

const PseudoHas = () => {
    return (
        <div>
            <h2>
                <code>:has()</code>
            </h2>
            <p>Parent selector behavior.</p>

            <pre><code>
{`</> CSS
.card:has(img) {
    padding: 1rem;
}
`}
            </code></pre>
            <p>Meaning: style <code>.card</code> if it contains an image.</p>
            
            <p>Or:</p>
            <pre><code>
{`</> CSS
form:has(input:invalid) {
    border: 1px solid red;
}
`}
            </code></pre>
        </div>
    )
}

// Add Components here for easier accessibility
const pseudoClassMapping = {
    userInteraction: {
        1: {name: "hover", comp: <PseudoHover />, desc: "When mouse is over the element."},
        2: {name: "active", comp: <PseudoActive />, desc: "While clicking."},
        3: {name: "focus", comp: <PseudoFocus />, desc: "When element is focused."},
        4: {name: "focus-visible", comp: <PseudoFocusVisible />, desc: "Shows focus only when browser thinks keyboard focus indicator is needed."},
        5: {name: "visited", comp: <PseudoVisited />, desc: "Visited links."},
    },
    formPseudo: {
        1: {name: "checked", comp: <PseudoChecked />, desc: "Checkboxes/radios."},
        2: {name: "disabled", comp: <PseudoDisabled />, desc: "When form tags are disabled."},
        3: {name: "required", comp: <PseudoRequired />, desc: "When form tags are required."},
        4: {name: "valid", comp: <PseudoValid />, desc: "When elements contents successfully validated."},
        5: {name: "invalid", comp: <PseudoInvalid />, desc: "When contents do not match their validation requirements."},
    },
    structuralPseudo: {
        1: {name: "first-child", comp: <PseudoFirstChild />, desc: "Targets the first child inside a parent."},
        2: {name: "last-child", comp: <PseudoLastChild />, desc: "Targets the last child inside a parent."},
        3: {name: "nth-child()", comp: <PseudoNthChild />, desc: "Target specific elements inside a parent."},
        4: {name: "nth-of-type()", comp: <PseudoNthOfType />, desc: "Targets the specific n-th number of that element type."},
    },
    negationAndLogic: {
        1: {name: "not()", comp: <PseudoNot />, desc: "Every element except x."},
        2: {name: "is()", comp: <PseudoIs />, desc: "Group elements."},
        3: {name: "where()", comp: <PseudoWhere />, desc: "Similar to ':is()' but with ZERO speficity."},
        4: {name: "has()", comp: <PseudoHas />, desc: "Parent selector behavior."},
    },
}