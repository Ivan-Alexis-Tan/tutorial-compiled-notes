export default function Ts17UtilityTypes() {
    return (
        <div>
            <h1>Utility Types</h1>
            <p>Are built-in types that enable you to transform and manipulate existing types in various ways.</p>

            <div>
                <h2>❓ Partial Utility Type</h2>
                <p>Takes an existing type and makes all its properties <code>optional</code> type.</p>
                <p>IDE will show the properties like <code>{"<obj>?.name"}</code></p>

                <p><strong>Example:</strong></p>
                <pre><code>
{`</> TypeScript
interface Todo {
    title: string
    description: string
}

const updateTodo = (todo: Partial<Todo>) => {
    todo.description            //<- Optional type properties
}
`}
                </code></pre>
                <p>All <code>todo</code>'s properties will become <code>optional</code> type. As if:</p>
                <pre><code>
{`</> TypeScript
todo {
    title?: string
    description?: string
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>📝 Readonly Utility Type</h2>
                <p>Creates a new type where all properties are <code>readonly</code>.</p>
                <p>Properties <strong>cannot be modified</strong> once assigned a value.</p>

                <pre><code>
{`</> TypeScript
interface Todo {
    title: string
}

const myTodo: Readonly<Todo> = {
    title: "Learn TypeScript"
}

// Mutate title (throws error)
myTodo.title = 'Do nothing'
`}
                </code></pre>
                <p>During mutation, <strong>IDE will highlight error</strong> saying <i>"Cannot assign to 'title' because it is a read-only property."</i></p>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>🗒️ Record Utility Type</h2>
                <p>Helps define a type with property names such as <code>id</code> and <strong>map the values</strong> to the type of the data.</p>

                <pre><code>
{`</> TypeScript
interface PageInfo {
    title: string
}

const pages: Record<string, PageInfo> = {
    home: { title: "Home" },
    about: { title: "About" },
    contact: { title: "Contact" },
} 

const pagesNumber: Record<number, PageInfo> = {
    1: { title: "Home" },
    2: { title: "About" },
    3: { title: "Contact" },
} 
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>👆 Pick Utility Type</h2>
                <p>Allows to create new types by <strong>picking a set of properties</strong> from an existing type.</p>
                <p>Convenient <strong>if only needs a subset of the properties</strong> from an existing object.</p>
                <pre><code>
{`</> TypeScript
interface Todo {
    id: number
    title: string
    completed: boolean
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
}
`}
                </code></pre>
                <p><code>todo</code> object only needs <code>title</code> and <code>completed</code> properties.</p>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>🚫 Omit Utility Type</h2>
                <p><strong>Opposite of <code>{"Pick<>"}</code></strong>.</p>
                <p>Constructs a new type by picking all properties from an existing type but <strong>excluding a set of keys</strong>.</p>
            
                <pre><code>
{`</> TypeScript
interface Todo {
    id: number
    title: string
    completed: boolean
}

type TodoPreview = Omit<Todo, "id">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
}
`}
                </code></pre>
            </div>
        </div>
    )
}