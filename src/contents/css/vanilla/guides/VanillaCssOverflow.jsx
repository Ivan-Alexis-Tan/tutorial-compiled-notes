import { useState } from "react"

const showObj = {
    section: 0,
    example: false,
}
const sectionsStyles = "border-b mb-5 pb-3 border-(--line-break-clr)"
const titlesStyles = "text-3xl font-bold my-5"

export default function VanillaCssOverflow() {
    const [show, setShow] = useState(showObj)
    const sectionId = Object.keys(sectionMapping)

    return (
        <div>
            <h1 className="text-4xl font-bold my-5">Overflow Properties</h1>
            
            <section className={`${sectionsStyles}`}>
                <p>Property that sets the desired behavior when content does not fit in the parent element box (overflows).</p>
                
                <p><strong>Example</strong>:</p>
                <pre><code>
{`</> HTML
<div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nostrum exercitationem ducimus amet distinctio temporibus, placeat, praesentium sit quo consequatur quod corporis non nihil molestias totam voluptatibus, et eius expedita!</p>
<div>
`}
                </code></pre>
                <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
}
`}
                </code></pre>

                <div className="mb-5">
                    {show.example
                        ? <>
                            <p onClick={_ => setShow(p => ({...p, example: false}) )}
                                className="inline hover:text-(--link-hover-text-clr) hover:underline"
                            ><strong>Result:</strong></p>

                            <div className="bg-white text-black m-3 p-3 min-h-50 overflow-auto">
                                <div className="border-2 border-black h-18.75">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                                </div>
                            </div>
                        </>
                        : <p onClick={_ => setShow(p => ({...p, example: true}) )}
                            className="inline hover:text-(--link-hover-text-clr) hover:bg-black border rounded-xl p-1.5"
                        ><strong>👁️ Show Result</strong></p>
                    }
                </div>
                <p>Contents of <code>{`<p>`}</code> is overflowing from the <code>{`<div>`}</code>.</p>
                <p>This happens when <code>height</code> property is fixed (e.g., <code>px</code>)</p>
            </section>
            
            {show.section === 0
                ? <>
                    <h2 className="text-3xl font-bold my-3">Summary Table</h2>
                    
                    <div className="flex justify-center mb-10">
                        <div className="flex justify-start overflow-auto">
                            <table className="min-w-200 max-w-2xl w-full">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>Effect</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sectionId.map(id => {
                                        const sec = sectionMapping[id]
                                        return <tr key={id}>
                                            <td>
                                                <code className="hover:border hover:border-white"
                                                    onClick={_ => setShow(p => ({...p, section: id}) )}
                                                >{sec.name}</code>
                                            </td>
                                            <td>{sec.effect}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                : <>
                    <h3 className="hover:text-(--link-hover-text-clr) hover:underline text-xl font-bold"
                        onClick={_ => setShow(p => ({...p, section: 0}) )}
                    >&larr; View Summary Table</h3>

                    {sectionMapping[show.section].comp}
                </>
            }
        </div>
    )
}

const OverflowVisible = _ => {
    return (
        <section className={`${sectionsStyles}`}>
            <h2 className={`${titlesStyles}`}><code>overflow: visible;</code></h2>
            <p>Basically states &mdash; If any elements overflow, allow it to do so.</p>
            <p>The default &mdash; overflowing is visible.</p>

            <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
    overflow: 
}
`}
            </code></pre>

            <div className="mb-10">
                <p>Result: </p>
                <div className="m-3 p-3 min-h-50 overflow-auto bg-white text-black ">
                    <div className="overflow-visible h-18.75 border-2 border-black">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const OverflowHidden = () => {
    return (
        <section>
            <h2 className={`${titlesStyles}`}><code>overflow: hidden;</code></h2>
            <p>Any overflowing contents are <strong>no longer visible</strong>.</p>
            <p>Although, contents are still can be interacted (e.g., copy text).</p>

            <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
    overflow: hidden;
}
`}
            </code></pre>

            <div className="mb-10">
                <p>Result: </p>
                <div className="m-3 p-3 min-h-50 overflow-auto bg-white text-black ">
                    <div className="overflow-hidden h-18.75 border-2 border-black">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const OverflowClip = () => {
    return (
        <section>
            <h2 className={`${titlesStyles}`}><code>overflow: clip</code></h2>
            <p>Similar to hidden, but <strong>can set value to how much overflow to displace</strong>.</p>
            <p>Used alongside with <code>overflow-clip-margin</code>.</p>

            <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
    overflow: clip;
    overflow-clip-margin: 13px;
}
`}
            </code></pre>

            <div className="mb-10">
                <p>Result: </p>
                <div className="m-3 p-3 min-h-50 overflow-auto bg-white text-black ">
                    <div className="overflow-clip [overflow-clip-margin:17px] h-18.75 border-2 border-black">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const OverflowScroll = () => {
    return (
        <section>
            <h2 className={`${titlesStyles}`}><code>overflow: scroll</code></h2>
            <p>Provides horizontal AND vertical scroll bars to view overflowing contents.</p>
            <p>Usually, use <code>overflow: auto</code> instead.</p>

            <p>The horizontan and vertical scroll bars:</p>
            <ul className="">
                <li>Stays whether there's something to scroll or none.</li>
                <li>Disables it self if full contents already showed.</li>
            </ul>

            <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
    overflow: scroll;
}
`}
            </code></pre>

            <div className="mb-10">
                <p>Result: </p>
                <div className="m-3 p-3 min-h-50 overflow-auto bg-white text-black ">
                    <div className="overflow-scroll h-18.75 border-2 border-black">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const OverflowAuto = () => {
    return (
        <div>
            <h1 className={`${titlesStyles}`}><code>overflow: auto;</code></h1>
            <p>Provides horizontal or/and vertical scroll bar if content is overflowing.</p>

            <pre><code>
{`</> CSS
div {
    border: 2px solid;
    height: 75px;
    overflow: auto;
}
`}
            </code></pre>

            <div className="mb-10">
                <p>Result: </p>
                <div className="m-3 p-3 min-h-50 overflow-auto bg-white text-black ">
                    <div className="overflow-auto h-18.75 border-2 border-black">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cum molestias officia corporis cupiditate maiores tempora odit ratione ut, excepturi inventore doloribus enim! Obcaecati tempore dolor neque eos dicta odio aliquam sunt hic modi nostrum iure consequatur, aspernatur debitis aut doloribus corrupti nemo repudiandae fugit vitae, quas officia ratione quisquam temporibus. Rem ipsum eveniet aliquam aliquid unde qui ducimus corporis temporibus sapiente nostrum adipisci nobis a molestias, odio quae voluptates vitae, commodi sed neque. Quaerat accusantium numquam consequuntur quidem praesentium unde cupiditate repudiandae tenetur ab reiciendis necessitatibus aliquid at iste ipsa rem labore ex, molestiae dignissimos aspernatur. Ab, animi aperiam?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const sectionMapping = {
    1: {name: "overflow: visible;", comp: <OverflowVisible />, effect: "Visibility of overflow"},
    2: {name: "overflow: hidden;", comp: <OverflowHidden />, effect: "Overflowing contents no longer visible."},
    3: {name: "overflow: clip;", comp: <OverflowClip/>, effect: "Similar to hidden, but can set overflow displacement."},
    4: {name: "overflow: scroll", comp: <OverflowScroll />, effect: "Provides scroll bar to view hidden contents."},
    5: {name: "overflow: auto;", comp: <OverflowAuto />, effect: "Similar to scroll overflow, but automates when to show scroll bar."},
}