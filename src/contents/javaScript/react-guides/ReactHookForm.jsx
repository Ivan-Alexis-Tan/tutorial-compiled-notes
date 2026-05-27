import { useState } from "react"

const guideTitles = {
    1: 'Basics and Setup',
    2: "Validations and Messages",
    3: "Async and Fetching API from Backend",
    4: "Additional Techniques",
}

export default function C21ReactHookForm({ title }) {
    const [selectedId, setSelectedId] = useState(0)
    
    let showGuide
    switch(selectedId) {
        case 1: 
            showGuide = <Basics />
            break
        case 2:
            showGuide = <ValidationsAndMessages />
            break
        case 3:
            showGuide = <AsyncAndFetchingFromBackend />
            break
        case 4:
            showGuide = <AdditionalTechniques />
            break
        default:
            break
    }

    return (
        <div>
            <h1>{title} Guides</h1>

            <ol>{Object.keys(guideTitles).map(id => <li key={id} onClick={_ => setSelectedId(Number(id))}
                >{guideTitles[id]}</li>)}
            </ol>

            {(selectedId > 0) && (
                <>
                    <hr/>
                    {showGuide}
                </>
            )}
        </div>
    )
}

const Basics = _ => {
    return (
        <div>
            <h1>{guideTitles[1]}</h1>
            <p><code>useForm()</code> can be unpacked with:</p>
            <ul>
                <li><code>register</code> </li>
                <ul><li>Registers variables and records data to object.</li></ul>

                <li><code>handleSubmit</code></li>
                <ul>
                    <li>Allows <code>useForm()</code> handle data submission.</li>
                    <li>A callback &mdash; <strong>needs a submission function</strong>.</li>
                </ul>

            </ul>
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
            <p><code>register()</code> have second parameter for optional configurations such as:</p>
            <ul>
                <li><code>required:</code></li>
                <li><code>validate:</code></li>
                <li><code>minLengh:</code></li>
            </ul>

            <p>Example usage:</p>
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
            <h1>{guideTitles[2]}</h1>
            <ul>
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
            <h1>{guideTitles[3]}</h1>
            <h2>A. Bare Basic Async Backend Fetching</h2>
            <p><code>{`{ formState: { isSubmitting }, } = useForm()`}</code></p>
            <ul>
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
            
            <h2>B. Handling Backend Fetching Errors</h2>

            <h3>1. Destructure <code>setError</code></h3>
            <pre><code>{`{ setError } = useForm()`}</code></pre>
            <ul>
                <li>Allows to set an error message</li>
            </ul>

            <h3>2. Encaptulate fetching with <code>try-catch</code> block</h3>
            <p>A. Referencing to email input errors.</p>
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
            <ul>
                <li>This code supposed to <strong>throw error when an email input is already taken</strong>.</li>
                <li>Only throws solely referencing from email input.</li>
            </ul>

            <p>B. Referencing any input in the form or as a whole.</p>
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
            <ul><li><code>error.root.message</code> is where error message can be accessed.</li></ul>
            
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
            <h1>{guideTitles[4]}</h1>

            <div>
                <h2>A. Setting Default Values</h2>
                <p><code>{`useForm({ defaultValues: {<key>: <val>} })`}</code></p>
                <ul>
                    <li><code>defaultValues:</code> Allows to set initail values on the field.</li>
                    <li><code>{`defaultValues: {<key>: <val>}`}</code>, <code>key</code> must be an existing input field and <code>val</code> is the default value.</li>
                </ul>

                <p>Example Usage:</p>
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
                <ul>
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