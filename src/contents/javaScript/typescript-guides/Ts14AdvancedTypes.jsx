export default function Ts14AdvancedTypes() {
    return (
        <div>
            <h1>Advanced Types</h1>

            <div>
                <h2>1. Type Aliases</h2>
                <ul>
                    <li>Use of <code>type</code> keyword.</li>
                    <li>Allows to create custom names for complex types.</li>
                    <li>Makes the code <strong>more readable and maintainable</strong>.</li>
                </ul>

                <h3>Example 1</h3>
                <p>Hard to read, too messy, and too redundant:</p>
                <pre><code>
    {`</> TypeScript
    function compareCoords(
        coords1: [number, number], 
        coords2: [number, number]
    ): [number, number] {
        return [coords1[0], coords2[1]]
    }
    `}
                </code></pre>

                <p>Cleaner and easier to read:</p>
                <pre><code>
    {`</> TypeScript
    type Coords = [number, number]          //<- Type aliase

    function compareCoords(coords1: Coords, coords2: Coords): Coords {
        return [coords1[0], coords2[1]]
    }
    `}
                </code></pre>

                <h3>Example 2</h3>
                <p><strong>RECOMMENDATION:</strong> If going to map an object alias, example:</p>
                <pre><code>
    {`</> TypeScript
    type Coords = {
        row: string
        col: string
    }

    function compareCoords(coords1: Coords, coords2: Coords): Coords {
        return [coords1[0], coords2[1]]
    }
    `}
                </code></pre>
                <p>Better to just use interface instead.</p>
                <pre><code>
    {`</> TypeScript
    interface Coords {
        row: string
        col: string
    }

    function compareCoords(coords1: Coords, coords2: Coords): Coords {
        return [coords1[0], coords2[1]]
    }
    `}
                </code></pre>
                <p>Type aliases cannot be implemented/extended to class.</p>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h2>Union and Intersection Types</h2>
                <p>Allows to <i>combine mulitiple types</i> together to create more complex types.</p>
                <h3>Union Type</h3>
                <ul>
                    <li>Using pipe operator <code>|</code>.</li>
                    <li>Means either one of the defined types.</li>
                </ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> TypeScripts
type Primitives = string | number | boolean

function acceptVal(val: Primitives) {
    ...
}
`}
                </code></pre>

                <h3>Intersection Type</h3>
                <ul>
                    <li>Using "and" operator <code>&</code>.</li>
                    <li>All declared types should match.</li>
                </ul>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> TypeScript
interface BusinessPartner {
    name: string
}

interface ContactDetails {
    email: string
    phone: string
}

// Intersection Type Declaration
type BusinessContact = BusinessPartner & ContactDetails

const contact: BusinessContact = {
    name: "Juan",
    email: "juan@gmail.com",
    phone: "95010323571",
}
`}
                </code></pre>
            </div>
            
        </div>
    )
}