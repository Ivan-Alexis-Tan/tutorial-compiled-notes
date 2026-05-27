export default function Ts20Namespaces() {
    return (
        <div>
            <h1>Namespaces</h1>
            <p>Allows to organize code into different blocks within an individual file.</p>

            Supposed DIR is like this:
            <pre><code>
{`/my-project
├── file.ts
├── types.ts
└── app.ts`}
            </code></pre>

            <p>Exportables from <code>file.ts</code> file:</p>
            <pre><code>
{`</> TypeScript
namespace Utils {
    export class MyClass {

    }

    export function myFunc() {}

    export const NAME = "Tim"

    export interface NewType {
        name: string
    }

    export const MY_CLASS: Utils.NewType = {
        name: Utils.NAME
    }
}
`}
            </code></pre>

            <p>Import to <code>app.ts</code> file.</p>
            <pre><code>
{`</> TypeScript
const namesClass = Utils.MY_CLASS
const NAME = Utils.NAME
`}
            </code></pre>
            <p>No importing needed.</p>
            <p>Just calling as if it's in the same file.</p>
            <p><strong>Not recommended</strong> as it's hard to tell where the definition coming from.</p>
            <p>✔️Although is <strong>viable for separated data type files</strong>, example DIR.</p>
            <pre><code>
{`/my-project
└── /src
    ├── /api
    |   └── types.ts
    ├── /components
    |   └── types.ts
    ├── types.ts
    └── app.ts
`}
            </code></pre>
            <p>Every directory will have a file dedicated for type hintings</p>
        </div>
    )
}