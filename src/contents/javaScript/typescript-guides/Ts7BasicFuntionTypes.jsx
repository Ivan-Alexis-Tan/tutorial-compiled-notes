
export default function Ts7BasicFunctionTypes() {
    return (
        <div>
            <h1>Basic Function Types</h1>

            <div>
                <h2>Basics</h2>
                <pre><code>
{`</> TypeScript
// Returns String
function fullName(first: string, last: string, middle?: string): string {
    if (!middle) middle = '-';
    return ${"`${last}, ${first} ${middle}`"}
}

// Returns Number
function mul(x: number, y: number) {
    return x * y
}

// Usage
fullName("Juan", "Dela Cruz", "Santos")
fullName("Juan", "Dela Cruz")
mul(1, 1)
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`Dela Cruz, Juan Santos
Dela Cruz, Juan -
1`}
                </code></pre>
            </div>

            <div>
                <h2>Callbacks</h2>
                <pre><code>
{`</> TypeScript
function fullName(first: string, last: string, middle?: string): string {
    if (!middle) middle = '-';
    return ${"`${last}, ${first} ${middle}`"}
}

function callFunc(
    func: (first: string, last: string, middle?: string) => string,
    first: string,
    last: string,
    middle?: string,
) {
    return func(first, last, middle)
}

callFunc(fullName, "Juan", "Dela Cruz")
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>{`Dela Cruz, Juan -`}</code></pre>
            </div>

            <div>
                <h2>Complex Typing</h2>
                <pre><code>
{`</> TypeScript
function mul(x: number, y: number) {
    return x * y
}

function div(x: number, y: number) {
    return x / y
}

function applyFunc(
    funcs: ((x: number, y: number) => number)[], 
    values: [number, number][]
): number[] {   
    const results: number[] = [];

    for (let i = 0; i < funcs.length; i++) {
        const args = values[i];
        const result = funcs[i](args[0], args[1]);
        results.push(result)
    }
    return results
}

console.log(applyFunc([mul, div], [[1, 2], [4, 5]]))
`}
                </code></pre>
                <p>Console Log:</p>
                <pre><code>
{`[ 2, 0.8 ]`}
                </code></pre>
            </div>
        </div>
    )
}