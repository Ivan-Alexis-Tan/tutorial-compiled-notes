import { useState } from "react"

export default function C21ReactHookForm({ title }) {
    const [guideId, setGuideId] = useState(1)

    return (
        <div className="[&_h2]:text-2xl [&_h2,&_h3]:font-bold [&_h2]:mb-5 [&_h3]:text-xl [&_h3]:mb-3">
            <h1 className="text-4xl font-bold mb-5">{title} Guides</h1>

            <div className="flex flex-col gap-1 mb-5">
                {Object.keys(guideTitles).map(id => (
                    <span key={id} onClick={_ => setGuideId(Number(id))}
                        className={`pl-5 rounded-2xl  ${guideId === Number(id) && "bg-black"}
                                    hover:bg-black hover:text-(--link-hover-bg-clr) hover:cursor-pointer`}
                    >
                        {guideTitles[id].title}
                    </span>
                ))}
            </div>
            <hr className="mb-5"/>
            
            {guideTitles[guideId].comp}
        </div>
    )
}

const Basics = _ => {
    return (
        <div>
            <h2>{guideTitles[1].title}</h2>
            <p className="mb-3"><code>useForm()</code> can be unpacked with:</p>
            <ol className="mb-5 [&>ul]:mb-3 [&>li]:ml-5 [&>li]:list-decimal [&_ul>li]:list-disc [&_ul>li]:ml-10 [&_li]:mb-1">
                <li><code>register</code> </li>
                <ul><li>Registers variables and records data to object.</li></ul>

                <li><code>handleSubmit</code></li>
                <ul>
                    <li>Allows <code>useForm()</code> handle data submission.</li>
                    <li>A callback &mdash; <strong>needs a submission function</strong>.</li>
                </ul>

            </ol>
            <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form"

export default function App() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <input type="text"
                    placeholder="Email"
                    {...register('email')}
                />

                <input type="password"
                    placeholder="Password"
                    {...register('password')}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
`}
            </code></pre>
            
            <h2>Optional Parameters</h2>
            <div className="mb-5">
                <p className="mb-3"><code>register()</code> have second parameter for optional configurations such as:</p>
                <ul className="[&>li]:mb-1 [&>li]:ml-10 [&>li]:list-disc">
                    <li><code>required: {`<value>`}</code></li>
                    <li><code>validate: {`<value>`}</code></li>
                    <li><code>minLengh: {`<value>`}</code></li>
                </ul>
            </div>

            <p className="font-bold">Example usage:</p>
            <pre><code>
{`</> JavaScript
// Email Input
<input type="text"
    placeholder="Email"
    {...register('email'), {
        required: true,
        validate: (val) => val.indcludes('@'),
    }}
/>

// Password Input
<input type="password"
    placeholder="Password"
    {...register('password'), {
        required: true,
        minLength: 8,
    }}
/>
`}
            </code></pre>
        </div>
    )
}

const ValidationsAndMessages = _ => {
    return (
        <div>
            <h2>{guideTitles[2].title}</h2>
            <ul className="mb-5 [&>ul]:mb-3 [&>li]:ml-5 [&>li]:mb-1 [&_li]:list-disc [&>ul>li]:ml-10">
                <li><code>register()</code> have second parameter to put message.</li>
                <ul>
                    <li>Can param <strong>can be set to return a string</strong> to show a message.</li>
                    <li>Other params <strong>can set to a function to set and return a string if error</strong>, and return true if successful.</li>
                    <li>Other params <strong>can be set with object</strong> <code>{`{value: x, message: y}`}</code> to set error message.</li>
                </ul>

                <li><code>formState: {`{ errors }`}</code> allows to set and show the a custom message.</li>
                <ul>
                    <li><code>{`errors.<registerObjKey>.message`}</code> allows to access the return error message.</li>
                    <li>Without this erorr message does not show.</li>
                </ul>
            </ul>
            <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form"

export default function App() {
    const { 
        register, 
        handleSubmit,
        formState: { errors }, 
    } = useForm();

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                // Email Input
                <input type="text"
                    placeholder="Email"
                    {...register('email')
                        required: "Email is required.",
                        validate: (val) => {
                            if (!val.includes("@") return "Must have '@' character.");
                            return true
                        }
                    }
                />

                // Password Input
                <input type="password"
                    placeholder="Password"
                    {...register('password'), {
                        required: 'Password is required.', 
                        minLength: {
                            value: 8,
                            message: 'Must have 8 characters.'
                        }
                    }}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
`}
            </code></pre>
        </div>
    )
}

const AsyncAndFetchingFromBackend = _ => {
    return (
        <div>
            <h2>{guideTitles[3].title}</h2>
            <h3>A. Bare Basic Async Backend Fetching</h3>
            <p className="mb-2"><code>{`{ formState: { isSubmitting }, } = useForm()`}</code></p>
            <ul className="[&>li]:ml-5 [&>li]:list-disc">
                <li><code>isSubmitting</code> acts like <code>isLoading</code> in @tanstack useQuery</li>
                <li><strong>Returns boolean value</strong> to indicate that <i>is in state of processing submission</i>.</li>
            </ul>

            <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form";

const { 
    register, 
    handleSubmit,
    formState: { errors, isSubmitting},
} = useForm();
`}
            </code></pre>

            <p>Example Usage:</p>
            <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form"

export default function App() {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },        //! Deconstruct isSubmitting
    } = useForm();

    async function onSubmit(data) {
        await new Promise( (resolve) => {
            setTimeout(resolve, 1000)               //! Simulates delayed data fetching from backend    
        })
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                // Email Input
                <input type="text"
                    placeholder="Email"
                    {...register('email')
                        required: "Email is required.",
                        validate: (val) => {
                            if (!val.includes("@") return "Must have '@' character.");
                            return true
                        }
                    }
                />

                // Password Input
                <input type="password"
                    placeholder="Password"
                    {...register('password'), {
                        required: 'Password is required.', 
                        minLength: {
                            value: 8,
                            message: 'Must have 8 characters.'
                        }
                    }}
                />
                
                //! Submit button is disabled during submission
                <button type='submit'
                    disable={isSubmitting} 
                >{isSubmitting ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    )
}
`}
            </code></pre>
            <hr className="--hr-faded"/>


            <h2>B. Handling Backend Fetching Errors</h2>

            <h3>1. Destructure <code>setError</code></h3>
            <pre><code>{`{ setError } = useForm()`}</code></pre>
            <ul>
                <li>Allows to set an error message</li>
            </ul>

            <h3>2. Encaptulate fetching with <code>try-catch</code> block</h3>
            <p className="font-bold">A. Referencing to email input errors.</p>
            <pre><code>
{`</> JavaScript
async function onSubmit(data) {
    try {
        await setTimeout(resolve, 1000);
        console.log(data)
    }
    catch(error) {
        setError("email", {
            message: "Email is already taken."
        })
    }
}
`}
            </code></pre>
            <ul className="mb-5 [&>li]:ml-5 [&>li]:list-disc">
                <li>This code supposed to <strong>throw error when an email input is already taken</strong>.</li>
                <li>Only throws solely referencing from email input.</li>
            </ul>

            <p className="font-bold">B. Referencing any input in the form or as a whole.</p>
            <p>Use <code>{`setError("root", { ... })`}</code> on <code>catch</code> instead.</p>
            <pre><code>
{`</> JavaScript
async function onSubmit(data) {
    try {
        await setTimeout(resolve, 1000);
        console.log(data)
    }
    catch(error) {
        setError("root", {
            message: "Email is already taken."
        })
    }
}
`}
            </code></pre>
            <p>Then show to HTML the error message:</p>
            <pre><code>{`{error.root && <div>{error.root.message}</div>}`}</code></pre>
            <ul className="mb-5">
                <li className="ml-10 list-disc"><code>error.root.message</code> is where error message can be accessed.</li>
            </ul>
            
            <h2>Full Sample Code</h2>
            <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form"

export default function App() {
    const { 
        register, 
        handleSubmit,
        formState: { errors }, 
        setError,
    } = useForm();

    async function onSubmit(data) {
        try {
            await setTimeout(resolve, 1000);        //<- Simulates delayed data fetching from backend
            console.log(data)
        }
        catch(error) {
            setError("root", {
                message: "Email is already taken."
            })
        }
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                // Email Input
                <input type="text"
                    placeholder="Email"
                    {...register('email')
                        required: "Email is required.",
                        validate: (val) => {
                            if (!val.includes("@") return "Must have '@' character.");
                            return true
                        }
                    }
                />

                // Password Input
                <input type="password"
                    placeholder="Password"
                    {...register('password'), {
                        required: 'Password is required.', 
                        minLength: {
                            value: 8,
                            message: 'Must have 8 characters.'
                        }
                    }}
                />

                // Root Error Message
                {error.root && <div>{error.root.message}</div>}

                <button type='submit'
                    disable={isSubmitting} 
                    >{isSubmitting ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    )
}
`}
            </code></pre>
        </div>
    )
}

const AdditionalTechniques = _ => {
    return (
        <div>
            <h2>{guideTitles[4].title}</h2>

            <div>
                <h3>A. Setting Default Values</h3>
                <p className="mb-3"><code>{`useForm({ defaultValues: {<key>: <val>} })`}</code></p>
                <ul className="[&>li]:ml-10 [&>li]:list-disc [&>li]:mb-1 mb-5">
                    <li><code>defaultValues:</code> Allows to set initail values on the field.</li>
                    <li><code>{`defaultValues: {<key>: <val>}`}</code>, <code>key</code> must be an existing input field and <code>val</code> is the default value.</li>
                </ul>

                <p className="font-bold">Example Usage:</p>
                <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form";

export default function App() {
    const { register, handleSubmit } = useForm({
        defaultValues: { email: "test@gmail.com" }
    });

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <input type="text"
                    placeholder="Email"
                    {...register('email')}
                />

                <input type="password"
                    placeholder="Password"
                    {...register('password')}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h2>B. Integration with Zod library</h2>
                <p>Other than <code>react-hook-form</code>, install other dependencies:</p>
                <ul className="[&>li]:ml-5 [&>li]:list-disc [&>li]:mb-1">
                    <li><code>zod</code></li>
                    <li><code>@hookform/resolvers</code></li>
                </ul>

                <pre><code>
{`</> Bash
npm install zod @hookform/resolvers
`}
                </code></pre>

                <h4>Integration Example:</h4>
                <pre><code>
{`</> JavaScript
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

//! Zod Schema Building
const userFormSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(8),
})

// React Application
export default function App() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({
        defaultValues: { email: "test@gmail.com" },
        resolver: zodResolver(userFormSchema)
    });

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) } >
                <input type="text"
                    placeholder="Email"
                    {...register('email')}
                />
                //! Error message for email input
                {errors.email && <p>{errors.email.message}</p>}

                <input type="password"
                    placeholder="Password"
                    {...register('password')}
                />
                //! Error message for password input
                {errors.password && <p>{errors.password.message}</p>}

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
`}
                </code></pre>
            </div>
        </div>
    )
}

const guideTitles = {
    1: {title: 'Basics and Setup', comp: <Basics />},
    2: {title: "Validations and Messages", comp: <ValidationsAndMessages />},
    3: {title: "Async and Fetching API from Backend", comp: <AsyncAndFetchingFromBackend />},
    4: {title: "Additional Techniques", comp: <AdditionalTechniques />},
}