import { useState } from "react"

export default function C20ZustandGuide({ title }) {
    const titleIds = Object.keys(titleGuides)
    const [guideId, setGuideId] = useState(1)

    return (
        <div className="[&_h2]:text-2xl [&_h2,&_h3]:font-bold [&_h2]:mb-5 [&_h3]:text-xl [&_h3]:mb-3">
            <h1 className="text-4xl font-bold mb-5">{title} Guide</h1>

            <div className="flex flex-col gap-1 mb-5">
                {titleIds.map(id => (
                    <span key={id} 
                        onClick={_ => setGuideId(Number(id))}
                        className={`pl-5 rounded-2xl ${guideId === Number(id) && "bg-black"}
                                    hover:bg-black hover:text-(--link-hover-bg-clr) hover:cursor-pointer`}
                    > 
                        {titleGuides[id].title}
                    </span>
                ))}
            </div>
            <hr className="mb-5"/>
            
            {titleGuides[guideId].comp}
        </div>
    )
}

function InstallationAndSetup() {
    return (
        <div>
            <h2>Installation and Setup</h2>
            <h3>A. Installation</h3>
            <pre><code>
{`</> Bash
npm install zustand
`}
            </code></pre>

            <h3>B. File Setup</h3>
            <pre><code>
{`/root-proj
├── /stores
|   └── auth-store.js       <- zustand create(set => ({ ... }) )
├── /hooks
└── /components
`}
            </code></pre>
        </div>
    )
}

function HookUsage() {
    return (
        <div>
            <h2>Zustand Hook Usage</h2>
            <div>
                <ul>
                    <li>Usage of <code>create()</code> and <code>set()</code>.</li>
                    <pre><code>
{`</> JavaScript
const <hookVar> = create((set) => { <objKey>: <objVal> })
`}
                    </code></pre>
                </ul>
                <h3>Example 1: Typical Usage</h3>
                <pre><code>
{`</> JavaScript
import { create } from "zustand"

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set(state => ({cart: [...state.cart, product]}) ),
    removeFromCart: (productId) => set(state => (
        {cart: state.cart.filter(prod => prod.id !== productId)}
    )),
    clearCart: () => set({ cart: [] })
}))
`}
                </code></pre>
                <div className="mb-5">
                    <p><code>useCartStore</code> allows to <strong>add, remove, or clearing products on cart</strong> (example of online shopping app)</p>
                    
                    <p className="font-bold mt-3">Functionality:</p>
                    <ul className="[&>li]:ml-10 [&>li]:list-disc [&>li]:mb-1">
                        <li><code>cart</code> &mdash; an array data structure for storing selected products.</li>
                        <li><code>addToCart</code> &mdash; adds product to cart.</li>
                        <li><code>removeFromCart</code> &mdash; removes product from the cart.</li>
                        <li><code>clearCart</code> &mdash; clears cart into an empty array.</li>
                    </ul>
                </div>
            </div>

            <h3>Example 2: Authentication (UI State)</h3>
            <pre><code>
{`</> JavaScript
import { create } from "zustand"

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) =>
    set({
        user: <useAuth>,
        isAuthenticated: true
    }),

    clearUser: () =>
    set({
        user: null,
        isAuthenticated: false
    })
}))
`}
            </code></pre>

            <div>
                <h3>Example: Hook Usage</h3>
                <ul><li>From certain component:</li></ul>
                <pre><code>
{`</> js
import { useCartStore } from '../store/cart-store.js'

export default function Cart() {
    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const clearCart = useCartStore(state => state.clearCart)

    return (
        <div>
            <h1>Cart</h1>
            {cart?.map(product => (
                <div key={product.id}>
                    <button onClick={_ => removeFromCart(product.id)}>Remove</button>
                    <span> {product.name}</span>
                </div>
            ))}
            {cart?.length > 0 && (
                <button onClick={clearCart}>Clear Cart</button>
            )}
        </div>
    )
}
`}
                </code></pre>
            </div>
        </div>
    )
}

function RecommendedTechniques() {
    return (
        <div>
            <h2>Recommended Techniques</h2>
            <div>
                <h3>A. Selectors</h3>
                <ul className="[&>li]:ml-10 [&>li]:list-disc mb-5">
                    <li><strong>Avoids repetition</strong> of defining the state or function state.</li>
                    <li>Could be created inside <code>/root-proj/stores/cart-store.js</code></li>
                    <li>From there, it can be called easily by importing.</li>
                </ul>

                <p><i>Selector creation</i>: <code>/root-proj/stores/cart-store.js</code></p>
                <pre><code>
{`</> js
import { create } from "zustand"

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set(state => ({cart: [...state.cart, product]}) ),
    removeFromCart: (productId) => set(state => (
        {cart: state.cart.filter(prod => prod.id !== productId)}
    )),
    clearCart: () => set({ cart: [] })
}))

// Selectors
export const cartSelector = (state) => state.cart
export const addToCartSelector = (state) => state.addToCart
export const removeFromCartSelector = (state) => state.removeFromCart
export const clearCartSelector = (state) => state.clearCart
`}
                </code></pre>

                <p>Usage: <code>/root-proj/components/Cart.jsx</code></p>
                <pre><code>
{`</> JavaScript
import { 
    cartSelector, 
    clearCartSelector, 
    removeFromCartSelector,
    useCartStore
} from "../store/cart-store"

export default function Cart() {
    const cart = useCartStore(cartSelector)
    const removeFromCart = useCartStore(removeFromCartSelector)
    const clearCart = useCartStore(clearCartSelector)

    return (
        <div>
            <h1>Cart</h1>
            {cart?.map(product => (
                <div key={product.id}>
                    <button onClick={_ => removeFromCart(product.id)}>Remove</button>
                    <span> {product.name}</span>
                </div>
            ))}
            {cart?.length > 0 && (
                <button onClick={clearCart}>Clear Cart</button>
            )}
        </div>
    )
}
`}
                </code></pre>
            </div>
            <hr className="--hr-faded"/>

            <div>
                <h3>B. Use of <code>Immer</code> Library</h3>
                <ul className="mb-5 [&>li]:ml-10 [&>li]:list-disc">
                    <li>Manages nested object or API data.</li>
                    <li>Helps to <strong>auto-navigate what to object key to update</strong>, then <strong>auto-copy the rest</strong>.</li>
                </ul>

                <p>Example problem: Update value on <code>street</code></p>
                <pre><code>
{`</> JavaScript
const initState = {
    user: {
        id: 'user123',
        friends: ["Jack", "Jessica", "Colin", "Paulo"],
        profile: {
            name: "John Doe",
            email: "john.doe@example.com",
            address: {
                street: "123 Main St",
                city: "Anytown",
                zipCode: "12345",
            },
        }
    }
}
`}
                </code></pre>

                <p>Basic Solution:</p>
                <pre><code>
{`</> JavaScript
import { create } from "zustand";

export const useUser = create(set => ({
    ...initState,
    updateAdressStreet: (newStreet) => set(state => ({
        user: {
            ...state.user,
            profile: {
                ...state.user.profile,
                address: {
                    ...state.user.profile.address,
                    street: newStreet,
                }
            }
        }
    }))
}))
`}
                </code></pre>
                <p>Works, but:</p>
                <ul className="mb-5 [&>li]:ml-10 [&>li]:list-disc">
                    <li>Needs object key navation.</li>
                    <li>Hard coding on copying the old data.</li>
                    <li>Readability is getting worse as the data shape gets longer and more nested.</li>
                </ul>

                <p>With <code>immer</code>:</p>
                <ol>
                    <li><p>Install <code>immer</code>.</p></li>
                    <pre><code>
{`</> Bash
npm install immer
`}
                </code></pre>

                    <li>Then the solution:</li>
                    <pre><code>
{`</> JavaScript
import { produce } from 'immer'

export const useUser = create(set => ({
    ...initState,
    updateStreetAddress: (newStreet) => set(
        produce(state => {state.user.profile.address.street = newStreet})
    ),
}))
`}
                    </code></pre>
                    <ul className="mb-5 [&>li]:ml-5 [&>li]:list-disc">
                        <li>More readable.</li>
                        <li>Easy object key navigation.</li>
                        <li>Less hard coding on copying the rest of the data.</li>
                    </ul>
                </ol>
            </div>
        </div>
    )
}

const titleGuides = {
    1: {title: 'Installation and Setup', comp: <InstallationAndSetup />},
    2: {title: "Hook Usage", comp: <HookUsage />},
    3: {title: "Recommended Techniques", comp: <RecommendedTechniques />},
}