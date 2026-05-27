
export default function Ts4LiteralsAndEnums() {
    return (
        <div>
            <h1>Literals and Enums</h1>
            <div>
                <h2>Literals</h2>
                <p>A textual representation (notation) of a value as it is written in source code.</p>
                <pre><code>
{`</> TypeScript
let direction: "north" | "south" | "west" | "east";
let responseCode: 200 | 404 | 201;
`}
                </code></pre>
                <p>Typescript throws error if value not <i>literally</i> the same as specified.</p>
                <p>Coding IDE literally gives us what exact values are allowed.</p>
            </div>

            <div>
                <h2>Enums</h2>
                <p>Means <i>"enumeration"</i>.</p>
                <p>This enables devs to establish a collection of named constants (enumerators), each linked with an integer value.</p>
                <p>Are treated as data types, and you can use them to create sets of constants for use with variables and properties.</p>
                <pre><code>
{`</> TypeScript
enum Size {
    Small,
    Medium,
    Large,
}

var sizeA: Size = 0;
var sizeB: Size = Size.Medium;

function getSize(size: Size): string {
    if (size === Size.Small) return "small"
    else if (size === Size.Large) return "large"
    else return "Size is medium"
}

console.log(getSize(sizeA))
console.log(getSize(sizeB))
console.log(${"`sizeA = (${typeof sizeA}) ${sizeA}`"})
console.log(${"`sizeB = (${typeof sizeA}) ${sizeA}`"})
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`small
Size is medium
sizeA = (number) 0
sizeB = (number) 1
`}
                </code></pre>

                <h2>Customisable Enum:</h2>
                <h3>1. Incremental Enum</h3>
                <pre><code>
{`</> TypeScript
enum Size {
    Small = 100,
    Medium,
    Large,
}

let sizeA: Size = Size.Small;
let sizeB: Size = Size.Medium;
let sizeC: Size = Size.Large;

console.log(${"`sizeA (${typeof sizeA}) = ${sizeA}`"})
console.log(${"`sizeB (${typeof sizeB}) = ${sizeB}`"})
console.log(${"`sizeC (${typeof sizeC}) = ${sizeC}`"})
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`sizeA (number) = 100
sizeB (number) = 102
sizeC (number) = 103
`}
                </code></pre>

                <h3>2. Manual Mapping</h3>
                <pre><code>
{`</> TypeScript
enum Size {
    Small = 10,
    Medium = 15,
    Large = 20,
}

let sizeA: Size = Size.Small;
let sizeB: Size = Size.Medium;
let sizeC: Size = Size.Large;

console.log(${"`sizeA (${typeof sizeA}) = ${sizeA}`"})
console.log(${"`sizeB (${typeof sizeB}) = ${sizeB}`"})
console.log(${"`sizeC (${typeof sizeC}) = ${sizeC}`)`"}
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`sizeA (number) = 10
sizeB (number) = 15
sizeC (number) = 20`}
                </code></pre>
                
                <h3>3. String Enums</h3>
                <p>Can also be customized what data types enums will return:</p>
                <pre><code>
{`</> TypeScript
enum Size {
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = 'LARGE',
}

let sizeA: Size = Size.LARGE;

console.log(${"`size = (${typeof sizeA}) ${sizeA}`"})
`}
                </code></pre>
                <p>Console log:</p>
                <pre><code>{`size = (string) LARGE`}</code></pre>
            </div>
        </div>
    )
}