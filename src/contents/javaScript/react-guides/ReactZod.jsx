import { useState } from "react"

function setComponent(title, component) {
    return {title, component}
}

export default function C22ZodGuides({ title }) {
    const [guideId, setGuideId] = useState(1) 

    return (
        <div className="[&_h2]:text-2xl [&_h2,&_h3]:font-bold [&_h2]:mb-5 [&_h3]:text-xl [&_h3]:mb-3 mb-5">
            <h1 className="text-2xl font-bold mb-5">{title} Guides</h1>

            <div className="flex flex-col gap-1 mb-5">
                {Object.keys(guideTitles).map(id => (
                    <span key={id} 
                        onClick={_ => setGuideId(Number(id))}
                        className={`pl-10  rounded-2xl ${guideId === Number(id) && "bg-black"}
                                    hover:bg-black hover:text-(--link-hover-bg-clr) hover:cursor-pointer`}
                    >
                        {guideTitles[id].title}
                    </span>
                ))}
            </div>
            <hr className="mb-5" />

            {guideTitles[guideId].component}
        </div>
    )
}

const BasicsAndSetup = _ => {
    return (
        <div>
            <h2>{guideTitles[1].title}</h2>
            <div className="mb-5">
                <h3>Installation</h3>
                <p>Write <code>npm install zod</code> using a CLT.</p>
            </div>
            
            <div>
                <h3>Basics: Schema building</h3>

                <pre><code>
{`</> JavaScript
import { z } from 'zod'

const userSchema = z.object({
  firstName: z.string(),
  email: z.email(),
})
`}
                </code></pre>
                <div className="mb-5">
                    <p className="font-bold">Zod's <code>z</code> accesses:</p>
                    <ul className="[&>li]:list-decimal [&>li]:ml-5 [&>ul]:mb-3 [&>ul]:ml-10 [&>ul>li]:list-disc">
                        <li><strong>Data structure</strong> (etc. object, array, etc.)</li>
                            <ul>
                                <li>Allows formation of data structure.</li>
                                <li><code>z.object()</code>, <code>z.array()</code></li>
                            </ul>
                        
                        <li><strong>Data types</strong> (etc. string, number, boolean, etc.)</li>
                        <ul>
                            <li>Allows data type validations.</li>
                            <li><code>z.string()</code>, <code>z.number()</code>, <code>z.boolean()</code>, etc.</li>
                        </ul>
                    </ul>
                </div>

                <p>To parse and validate input, example:</p>
                <pre><code>
{`</> JavaScript
const user = {
  firstName: "Juan",
  email: "test@gmail.com"
};

console.log(userSchema.safeParse(user))
console.log(userSchema.parse(user))
`}
                </code></pre>
                <p>Output:</p>
                <pre><code>
{`{success: true, data: {…}}
{firstName: 'Juan', email: 'test@gmail.com'}
`}
                </code></pre>
                <div className="[&>ul]:mb-5 [&>ul>li]:ml-10 [&>ul>li]:list-disc">
                    <p><code>{`<schema>.safeParse()`}</code></p>
                    <ul>
                        <li><strong>Does not automatically throws error</strong>.</li>
                        <li>Returns a boolean value of the status and other details about the error.</li>
                    </ul>

                    <p><code>{`<schema>.parse()`}</code></p>
                    <ul>
                        <li>Much more strict version.</li>
                        <li><strong>Automatically throws error</strong>.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const BasicUsage = _ => {
    return (
        <div>
            <h2>{guideTitles[2].title}</h2>
            <div>
                <h3>1. Schema Building</h3>
                <pre><code>
{`</> JavaScript
import { z } from 'zod'

const userSchema = z.object({
    firstName: z.string(),
    email: z.email(),
    profileUrl: z.url().nullable(),
    age: z.number().min(1),
    friends: z.array(z.string()).max(3),
    settings: z.object({
        isSubscribed: z.boolean(),
    }),
})

const user = {
    firstName: "Juan",
    email: "test@gmail.com",
    profileUrl: "https://www.myprofile.com",
    age: 18,
    friends: ["friend 1", "friend 2", "friend 3"],
    settings: {isSubscribed: true}
};

console.log(userSchema.safeParse(user))
console.log(userSchema.parse(user))
`}
                </code></pre>

                <p>Console Output:</p>
                <pre><code>
{`{success: true, data: {…}}
{
    firstName: 'Juan', 
    email: 'test@gmail.com', 
    profileUrl: 'https://www.myprofile.com', 
    age: 18, 
    friends: Array(3), 
    …
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h3>2. Pure Hardcoded Form</h3>
                <pre><code>
{`</> JavaScript
import z from "zod"
import { useState } from "react"

const userSchema = z.object({
    firstName: z.string().trim().min(1),
    email: z.email(),
})

const inputDefault = {
    firstName: '',
    email: ""
}

export default function HardcodedForm() {
    const [inputData, setInputData] = useState(inputDefault)
    const [message, setMessage] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        const validated = userSchema.safeParse(inputData)

        if (!validated.success) {
            const errorData = validated.error?.flatten().fieldErrors
            setMessage({firstName: errorData.firstName, email: errorData.email})
        }
        else {
            console.log(validated?.data)
            setMessage()
        }
    }

    return (
        <div>
            <h1>Hardcoded Form Way</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="First Name"
                    value={inputData.firstName}
                    onChange={e => setInputData(prev => ({...prev, firstName: e.target.value}) )}
                />
                {message?.firstName && <p>{message.firstName}</p>}

                <input type="email"
                    placeholder="Email"
                    value={inputData.email}
                    onChange={e => setInputData(prev => ({...prev, email: e.target.value}) )}
                />
                {message?.email && <p>{message.email}</p>}

                <button type="submit">Submit</button>
                
            </form>
        </div>
    )
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h3>3. Integration: Zod and React Hook Form</h3>
                <pre><code>
{`</> JavaScript
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const userFormSchema = z.object({
  firstName: z.string().trim().min(1),
  email: z.email(),
})

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userFormSchema),
  })

  function onSubmit(data) {
    console.log({...data, firstName: capitalize(data.firstName)})
  }

  return (
    <>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <input type="text" placeholder='First Name' {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <input type="email" placeholder='Email' {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

function capitalize(str) {
  const splitted = ${"`${str}`"}.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1, s.length))
  return splitted.join(' ')
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />
            
            <div>
                <h3>4. With API Request</h3>
                <pre><code>
{`</> TypeScript
import { z } from "zod";

const getUserSchema = z.object({
    limit: z.number(),
    offset: z.number(),
});

type UsersFilters = z.infer<typeof getUserSchema>;

export async function getUsers(filters: UsersFilters) {
    const result = getUserSchema.safeParse(filters);

    if (!result.success) {
        const error = result.error.flatten().fieldErrors
        console.error(errors)
        return
    }
    
    console.log(result.data)
}
`}
                </code></pre>

                <p>Usage:</p>
                <pre><code>
{`const users = getUsers({
    limit: 10,
    offset: 15,
})
`}
                </code></pre>
            </div>
            <hr className="--hr-faded" />

            <div>
                <h3>5. Working with <code>.env</code> files</h3>
                <p>Supposed the DIR is:</p>
                <pre><code>
{`/root-proj
├── /src
│   ├── /utils
│   │   └── env.js
│   └── App.jsx
└── .env
`}
                </code></pre>

                <p>In <code>.env</code></p>
                <pre><code>SECRET_KEY=12345</code></pre>

                <p>In <code>env.js</code></p>
                <pre><code>
{`</> JavaScript
import { z } from "zod";

const envSchema = z.object({
    SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env);
`}
                </code></pre>

                <p>In <code>App.jsx</code></p>
                <pre><code>
{`</> JavaScript
import { z } from "zod";

const getUserSchema = z.object({
    limit: z.number(),
    offset: z.number(),
})

export async function getUsers(filters) {
    const result = getUserSchema.safeParse(filters);

    if (result.success) {
        const errors = result.error.flatten().fieldError
        console.error(errors)
        return
    }
    
    fetch("/api", {
        headers: {
            Authorization: ${'`Bearer ${env.SECRET_KEY}`'},
        }
    })
}
`}
                </code></pre>
            </div>
        </div>
    )
}

const PrimitiveTypes = _ => {
    return (
        <div>
            <h2>{guideTitles[3].title}</h2>
            <p className="mb-5">Basic JS value types.</p>
            <h3>1. String &mdash; <code>z.string()</code></h3>
            <pre><code>
{`const userSchema = z.object({
    firstName: z.string(),
})`}
            </code></pre>

            <h3>2. Integer &mdash; <code>z.number()</code></h3>
            <pre><code>
{`const userSchema = z.object({
    age: z.number(),
})
`}
            </code></pre>

            <h3>3. Boolean &mdash; <code>z.boolean()</code></h3>
            <pre><code>
{`const userSchema = z.object({
    isStudent: z.boolean(),
})`}
            </code></pre>

            <h3>4. Big Integer &mdash; <code>z.bigint()</code></h3>

            <h3>5. Symbol &mdash; <code>z.symbol()</code></h3>

            <h3>6. Date &mdash; <code>z.date()</code></h3>

            <h3>7. Undefined &mdash; <code>z.undefined()</code></h3>

            <h3>8. Null &mdash; <code>z.null()</code></h3>

            <h3>9. Void &mdash; <code>z.void()</code></h3>

            <h3>10. Any &mdash; <code>z.any()</code></h3>

            <h3>11. Unknown &mdash; <code>z.unknown()</code></h3>

            <h3>12. Never &mdash; <code>z.never()</code></h3>
        </div>
    )
}

const Structures = _ => {
    return (
        <div>
            <h2>Structures</h2>
            <p className="mb-5">Containers that hold other types.</p>

            <h3>1. Object &mdash; <code>{`z.object({ <key>: <zMethod> })`}</code></h3>
            <pre><code>
{`const userSchema = z.object({
    address: z.object({
        city: z.string(),
        country: z.string(),
    }),
})
`}
            </code></pre>

            <h3>2. Array &mdash; <code>{`z.array(<zMethod>)`}</code></h3>
            <pre><code>
{`const userSchema = z.object({
    friends: z.array(z.string()),
})`}
            </code></pre>

            <h3>3. Tuple &mdash; <code>{`z.tuple([ <zMethod>, <zMethod> ])`}</code></h3>
            <p>Fixed-length and mixed type.</p>
            <pre><code>
{`const userSchema = z.object({
    grade: z.tuple(z.string(), z.number())
})`}
            </code></pre>

            <h3>4. Record &mdash; <code>{`z.record(z.string(), z.number())`}</code></h3>
            <p>Behaves like dicitionary/map.</p>
            <pre><code>
{`const userSchema = z.object({
    grade: z.record(z.string(), z.number()),
})`}
            </code></pre>

            <h3>5. Map &mdash; <code>{`map(z.string(), z.number())`}</code></h3>

            <h3>6. Set &mdash; <code>{`set(z.string())`}</code></h3>
        </div>
    )
}

const StringFormat = _ => {
    return (
        <div>
            <h1>String Format (v4 top-level)</h1>

            <h3>1. Email &mdash; <code>z.email()</code></h3>
            <pre><code>
{`const userSchema = z.object({
    email: z.email(),
})`}
            </code></pre>

            <h3>2. URL &mdash; <code>z.url()</code></h3>
            <pre><code>
{`const userSchema = z.object({
    personalUrl: z.url(),
})`}
            </code></pre>

            <h3>3. UUID &mdash; <code>z.uuid()</code>, <code>z.uuidv4()</code>, <code>z.uuidv7()</code></h3>
            <h3>4. IP &mdash; <code>z.ip()</code></h3>
            <p>IPv4 or IPv6</p>

            <h3>5. IP block &mdash; <code>z.cidr()</code></h3>
            <p>IP block ranges</p>

            <h3>6. MAC address &mdash; <code>z.mac()</code></h3>

            <h3>7. JWT &mdash; <code>z.jwt()</code></h3>

            <h3>8. Base64 &mdash; <code>z.base64()</code></h3>

            <h3>9. Date and Time &mdash; <code>z.iso.datetime()</code></h3>

            <h3>10. Date &mdash; <code>z.iso.date()</code></h3>

            <h3>11. Time &mdash; <code>z.iso.time()</code></h3>
        </div>
    )
}

const Literals = _ => {
    return (
        <div>
            <h2>Literals</h2>
            <p className="mb-5">An exact specific value.</p>

            <p>Example:</p>
            <ul className="[&>li]:ml-10 [&>li]:list-disc [&>li]:mb-1">
                <li><code>z.literal("admin")</code></li>
                <li><code>z.literal(42)</code></li>
                <li><code>z.literal(true)</code></li>
            </ul>
        </div>
    )
}

const CombiningTypes = _ => {
    return (
        <div className="[&>p]:mb-10">
            <h2>Combining Types</h2>

            <h3>1. Union &mdash; <code>{`z.union([ <zMethod1>, <zMethod2> ])`}</code></h3>
            <p>Either/or these types.</p>

            <h3>2. Discrimated Union &mdash; <code>{`z.discriminatedUnion("type", [...])`}</code></h3>
            <p>Smarter union with a key.</p>

            <h3>3. Intersection &mdash; <code>{`z.intersection(<SchemaA>, <SchemaB>)`}</code></h3>
            <p>Must satisfy both types.</p>

            <h3>4. Enumerated &mdash; <code>{`z.enum(["admin", "user", "guest"])`}</code></h3>
            <p>One of these types.</p>
        </div>
    )
}

const ModifiersAndSpecialWrappers = _ => {
    return (
        <div className="[&>p]:mb-10">
            <h2>Modifiers/Special Wrappers</h2>
            <h3>1. Optional &mdash; <code>z.optional(z.string())</code></h3>
            <p>The indicated value or undefined.</p>

            <h3>2. Nullable &mdash; <code>z.nullable(z.string())</code></h3>
            <p>The indicated value or null.</p>

            <h3>3. Nullish &mdash; <code>z.nullish()</code></h3>
            <p>Key can be both nullable and undefined</p>

            <h3>4. Default &mdash; <code>z.default(z.string(), "fallback")</code></h3>

            <h3>5. Coerce &mdash; <code>z.coerce.number()</code></h3>
            <p>Tries to convert the input (e.g. <code>"42"</code> &rarr; <code>42</code>)</p>

            <h3>6. Lazy &mdash; <code>{`z.lazy( () => <schema> )`}</code></h3>
            <p>For recursive/self-referencing schemas</p>

            <h3>7. Promise &mdash; <code>z.promise(z.string())</code></h3>
            <p>Validates a <code>Promise</code> that resolves to string</p>
        </div>
    )
}

const TypeInference = _ => {
    return (
        <div className="[&>p]:mb-1">
            <h2>Type Inference</h2>
            <p>Arguably one of Zod's killer features.</p>
            <p>Not a validator but very important.</p>
            <p><strong>Automatically gives you the TypeScript type from your schema</strong> &mdash; no duplication!</p>
            <pre><code>
{`</> TypeScript
type User = z.infer< typeof <schema> >`}
            </code></pre>
            
        </div>
    )
}

const guideTitles = {
    1: setComponent("Basics and Setup", <BasicsAndSetup />),
    2: setComponent("Basic Usage", <BasicUsage />),
    3: setComponent("Zod Primitive Types", <PrimitiveTypes />),
    4: setComponent("Zod Structures", <Structures />),
    5: setComponent("Zod String Format", <StringFormat />),
    6: setComponent("Zod Literals", <Literals />),
    7: setComponent("Zod Combining Types", <CombiningTypes />),
    8: setComponent("Zod Modifiers/Special Wrappers", <ModifiersAndSpecialWrappers />),
    9: setComponent("Zod Type Inference", <TypeInference />),
}