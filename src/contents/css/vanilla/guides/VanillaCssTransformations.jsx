import { useState } from "react";
import SummaryTable, { useSummaryTable } from "../../../../components/SummaryTable";
import ExampleUiSelector, { useExampleUiSelector } from "../../../../components/ExampleUiSelector";

const centerBoxes = "[&_.transformBox]:flex [&_.transformBox]:justify-center [&_.transformBox]:min-h-30 [&_.transformBox]:items-center [&_.adjust-w-box]:min-w-30 [&_.adjust-h-box]:min-h-50"
const boxStyle = "w-20 h-20 bg-white text-black text-center"

export default function VanillaCssTransformations() {
    const { tableStates } = useSummaryTable({
        colnames: ["Property", "Description"],
        mappedData: mappedSection,
    })
    const [showChain, setShowChain] = useState(false)

    return (
        <div>
            <h1 className="text-4xl font-bold my-5">Transformations</h1>
            <p>Allows element to rotate, scale, skew, or translate.</p>
            <p className="align-middle">
                It also <strong>allows chaining</strong>. 
                <span className={`hover:text-[hsl(0, 0%, 24%)] hover:bg-black px-1 rounded-4xl mx-2 bg-(--line-break-clr) ${showChain && "rounded-2xl px-1 hover:bg-black"}`}
                    onClick={_ => setShowChain(p => !p)}
                >{showChain ? "❌Hide" : "👁️Show"}</span>
            </p>
            
            {showChain  
                && <div>
                    <pre><code>
{`</> HTML
<div>
    <div id="box">Box</div>
</div>
`}
                    </code></pre>
                    <pre><code>
{`</> CSS 
#box {
    width: 50px;
    height: 50px;
    border: 1px solid hsl(160, 100%, 50%);

    transform: translateX(100%) rotateZ(90deg) scale(0.5);
}
`}
                    </code></pre>

                    <div>
                        <p className="my-2">Result:</p>

                        <div className="flex justify-center items-center h-30 mx-3 rounded-2xl bg-white text-black">
                            <div className="translate-x-full rotate-z-90 scale-[0.5] w-25 h-25 border bg-(--link-hover-bg-clr)">Box</div>
                        </div>
                    </div>
                </div>            
            }
            <hr className="--hr-faded my-5" />

            <div className="my-5">
                <SummaryTable tableStates={tableStates} />
            </div>
        </div>
    )
}

const TestingField = ({ transform = '' }) => {
    return (
        <div className="m-3 h-70 bg-white text-black">
            <div className={`${transform} w-25 h-25 border text-xl bg-[hsl(60,100%,50%)]`}>Box</div>
        </div>
    )
}

const TransformTranslate = () => {
    const { exampleStates } = useExampleUiSelector({ exampleData: {
        1: {name: "translateX()", comp: <TestingField transform="translate-x-12.5" />, html: <pre><code>
{`</> HTML
<div>
    <div id="box1">Box</div>
</div>
`}
            </code></pre>, 
            css: <pre><code>
{`</> CSS
#box1 {
    width: 100px;
    height: 100px;
    border: 1px solid;
    
    transform: translateX(50px)
}
`}
            </code></pre>},
        2: {name: "translateY()", comp: <TestingField transform="translate-y-12.5" />, html: <pre><code>
{`</> HTML
<div>
    <div id="box1">Box</div>
</div>
`}
            </code></pre>, 
            css: <pre><code>
{`</> CSS
#box1 {
    width: 100px;
    height: 100px;
    border: 1px solid;
    
    transform: translateY(50px)
}
`}
            </code></pre>},
        3: {name: "translate()", comp: <TestingField transform="translate-12.5" />, html: <pre><code>
{`</> HTML
<div>
    <div id="box1">Box</div>
</div>
`}
            </code></pre>,
            css: <pre><code>
{`</> CSS
#box1 {
    width: 100px;
    height: 100px;
    border: 1px solid;
    
    transform: translate(50px, 50px)
}
`}
            </code></pre>}
    }})

    return (
        <div>
            <h2 className="h2-title">
                <code>transform: translate()</code>
            </h2>
            <p>Moves an element from its original position without affecting the surrounding layout.</p>
            <p>Properties:</p>
            <ul className="list-disc mx-10">
                <li><code>translateX(xVal)</code></li>
                <li><code>translateY(yVal)</code></li>
                <li><code>translate(xVal, yVal)</code></li>
            </ul>
            <p>Negative values can also be used to refer an opposite direction.</p>

            <ExampleUiSelector exampleStates={exampleStates} />
        </div>
    )
}

const TransformRotate = () => {
    const degVals = [45, 90, 135, 180 ]

    function setRotate(val, direction) {
        return `rotate-${String(direction).toLowerCase()}-${val}`
    }
    return (
        <div>
            <h2 className="h2-title">
                <code>transform: rotate()</code>
            </h2>
            <p>Turns an element around a fixed point on a 2D plane.</p>
            <p>Accepts degree int value.</p>
            
            <div className="my-2">
                <p><strong>Includes:</strong></p>
                <ul className="mx-10 list-disc">
                    <li><code>rotateX(degValue)</code></li>
                    <li><code>rotateY(degValue)</code></li>
                    <li><code>rotateZ(degvalue)</code></li>
                </ul>
            </div>

            <div className="my-2">
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
.box1 {
    transform: rotateX(45deg);
}

.box2 {
    transform: rotateY(135deg);
}

.box3 {
    transform: rotateZ(180deg);
}
`}
                </code></pre>
            </div>

            <div className="flex justify-center">
                <div className="my-5 max-w-xl w-full">
                    <table>
                        <thead>
                            <tr>
                                <th>Angle</th>
                                <th><code>rotateX()</code></th>
                                <th><code>rotateY()</code></th>
                                <th><code>rotateZ()</code></th>
                            </tr>
                        </thead>
                        <tbody>
                            {degVals.map(val => (
                                <tr key={val} className="[&_.rotateBox]:flex [&_.rotateBox]:justify-center [&_.rotateBox]:min-h-30 [&_.rotateBox]:items-center">
                                    <td>{val}</td>
                                    <td>
                                        <div className="rotateBox">
                                            <div className={`${boxStyle}`} style={{ transform: `rotateX(${val}deg)` }}>{val}°</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="rotateBox">
                                            <div className={`${boxStyle}`} style={{ transform: `rotateY(${val}deg)` }}>{val}°</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="rotateBox">
                                            <div className={`${boxStyle}`} style={{ transform: `rotateZ(${val}deg)` }}>{val}°</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

const TransformScale = () => {
    const valsList = [0.5, 1, 1.5]
    return (
        <div>
            <h2 className="h2-title">
                <code>transform: scale();</code>
            </h2>
            
            <div className="my-5">
                <p>Resizes an element on a 2D plane.</p>
                <p>Adjusts an element's width and height visually without affecting the surrounding page layout.</p>
                <p>In percentage: <code>0.5</code> = <code>50%</code>; <code>1</code> = <code>100%</code>; <code>1.5</code> = <code>150%</code></p>
            </div>

            <div className="my-4">
                <p><strong>Includes:</strong></p>
                <ul className="mx-10 list-disc [&>li]:my-1">
                    <li><code>transform: scaleX(xVal)</code></li>
                    <li><code>transform: scaleY(yVal)</code></li>
                    <li><code>transform: scale(xVal, yVal)</code></li>
                </ul>
            </div>
            
            <div className="my-2">
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
.box1 {
    transform: scaleX(0.5);
}

.box2 {
    transform: scaleY(1);
}

.box3 {
    transform: scale(0.5, 1);
}
`}
                </code></pre>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
                <div className="flex gap-5 justify-center items-center">
                    <h3 className="text-lg font-bold">Normal Size:</h3>
                    <div className={boxStyle}>
                        Normal
                    </div>
                </div>

                <div className="overflow-auto">
                    <table className="min-w-160 max-w-2xl">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th><code>scaleX()</code></th>
                                <th><code>scaleY()</code></th>
                                <th><code>scale()</code></th>
                                <th><code>scale3d()</code></th>
                            </tr>
                        </thead>
                        <tbody>
                            {valsList.map(val => (
                                <tr key={val}>
                                    <td>{val}</td>
                                    <td className={centerBoxes}>
                                        <div className="transformBox">
                                            <div className={boxStyle} style={{ transform: `scaleX(${val})` }}>{val}</div>
                                        </div>
                                    </td>
                                    <td className={centerBoxes}>
                                        <div className="transformBox">
                                            <div className={boxStyle} style={{ transform: `scaleY(${val})` }}>{val}</div>
                                        </div>
                                    </td>
                                    <td className={centerBoxes}>
                                        <div className="transformBox">
                                            <div className={boxStyle} style={{ transform: `scale(${val}, ${val - 0.5 === 0 ? val : val - 0.5})` }}>({val}, {val - 0.5 === 0 ? val : val - 0.5})</div>
                                        </div>
                                    </td>
                                    <td className={centerBoxes}>
                                        <div className="transformBox adjust-w-box">
                                            <div className={boxStyle} 
                                                style={{ transform: `scale3D(${val + 0.5}, ${val}, ${val - 0.5 === 0 ? val : val - 0.5})` }}
                                            >({val + 0.5}, {val - 0.5 === 0 ? val : val - 0.5}, {val})</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

const TransformSkew = () => {
    const angleVals = [45, 90, 135, 180]
    return (
        <div>
            <h2 className="h2-title">
                <code>transform: skew()</code>
            </h2>
            
            <div>
                <p>Tilt or slant an element along the X and Y axes.</p>
                <p>Does not change the element's actual dimentions.</p>
                <p>Accepts <strong>angle values</strong>.</p>
            </div>

            <div className="my-5">
                <p><strong>Includes:</strong></p>
                <ul className="mx-10 list-disc [&>li]:my-1">
                    <li><code>skewX(xAngle)</code></li>
                    <li><code>skewY(yAngle)</code></li>
                    <li><code>skew(xAngle, yAngle)</code></li>
                </ul>
            </div>

            <div>
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
.box1 {
    transform: skewX(45deg);
}

.box2 {
    transform: skewY(135deg);
}

.box3 {
    transform: skew(90deg, 180deg);
}
`}
                </code></pre>
            </div>

            <table className="">
                <thead>
                    <tr>
                        <th>Angle</th>
                        {["skewX()", "skewY()", "skew()"].map(func => (
                            <th key={func}><code>{func}</code></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {angleVals.map(val => (
                        <tr key={val} className={centerBoxes}>
                            <td>{val}</td>
                            <td>
                                <div className="transformBox">
                                    <div className={boxStyle}
                                        style={{ transform: `skewX(${val}deg)` }}
                                    >{val}°</div>
                                </div>
                            </td>
                            <td>
                                <div className="transformBox">
                                    <div className={boxStyle}
                                        style={{ transform: `skewY(${val}deg)` }}
                                    >{val}°</div>
                                </div>
                            </td>
                            <td>
                                <div className="transformBox">
                                    <div className={boxStyle}
                                        style={{ transform: `skew(${val}deg, ${val + 60}deg)` }}
                                    >({val}°, {val + 60}°)</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

const mappedSection = {
    1: {name: "transform: translate();", comp: <TransformTranslate />, desc: "Move element without affecting the surrounding layout."},
    2: {name: "transform: rotate();", comp: <TransformRotate />, desc: "Turns an element around a fixed point on a 2D plane."},
    3: {name: "transform: scale();", comp: <TransformScale />, desc: "Adjust width and height without affecting the surrounding page layout."},
    4: {name: "transform: skew();", comp: <TransformSkew />, desc: "Tilt or slant an element along the X and Y axes."},
}