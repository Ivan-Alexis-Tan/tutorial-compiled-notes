export default function Ts16DiscriminatedUnion() {
    return (
        <div>
            <h1>Discriminated Union Types</h1>
            <p>Allows you to <strong>create a type that can represent several different possibilities</strong>.</p>
            <p>Each identified by a common "discriminant" property.</p>
            <pre><code>
{`</> TypeScript
interface Warning {
    type: "warning"
    message: string
}

interface Info {
    type: "info"
    text: string
}

interface Success {
    type: "success"
    detail: string
}

type Log = Warning | Info | Success

function handleMessage(log: Log) {
    switch(log.type) {
        case "warning":
            console.log(log.message)
            break;
        case "info":
            console.log(log.text)
            break
        case "success":
            console.log(log.detail)
            break            
    }
}
`}
            </code></pre>
            <p>Handling messages with different properties to access messages mapped easier.</p>
            <p>They have this identifier <code>type</code> property to distinguish them.</p>
        </div>
    )
}