import { useState } from "react"

const boxes = ""

const showResultDefault = {
    columns: false,
}

export default function VanillaCssGrid() {
    const [showResult, setShowResult] = useState(showResultDefault)
    
    return (
        <div>
            <h1 className="text-4xl font-bold my-5">Grid Layout</h1>
            
            <div className="my-5 border-b border-2-(--line-break-clr)">
                <h2 className="text-3xl font-bold my-5">3 Things Grid Needs</h2>

                <div className="mb-5">
                    <h3 className="text-2xl my-3 font-bold">1. Grid Container</h3>
                    <p>Set <code>display: grid</code> on the parent element.</p>
                    <pre><code>
{`</> CSS
.container {
    display: grid;
}
`}
                    </code></pre>
                    
                    <p>Now all direct children become grid items</p>
                    <pre><code>
{`</> HTML
<div class="container">
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
</div>
`}
                    </code></pre>
                </div>

                <div className="mb-5">
                    <h3 className="text-2xl my-3 font-bold">2. Columns (most important)</h3>
                    <p>Without columns, Grid behaves almost like block layout.</p>
                    <p>Use 90% of the time the property <code>grid-template-columns</code> to create columns.</p>

                    <pre><code>
{`</> CSS
/* Tailwind -> "grid grid-cols-[repeat(2,200px)] gap-5 p-3" */
.container {
    display: grid;
    grid-template-columns: 200px 200px;

    /* additional styles */
    gap: 1.25rem;
    padding: .75rem;
}

.container > div {
    background-color: hsl(0 , 0%, 60%)
}
`}
                    </code></pre>

                    <p>Meaning:</p>
                    <ul className="mx-10 list-disc mb-5">
                        <li>Create 2 columns</li>
                        <li>Each 200px wide</li>
                    </ul>

                    <div className="mb-3">
                        <p className="inline mb-3 font-bold hover:text-(--link-hover-text-clr) hover:underline"
                            onClick={_ => setShowResult(p => ({...p, columns: !p.columns}) )}
                        >{showResult.columns ? "Result" : "Show Result"}:</p>
                        {showResult.columns
                            && <div className="grid grid-cols-[repeat(2,200px)] gap-5 p-3 bg-white text-black [&>div]:bg-[hsl(0,0%,60%)]">
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                            </div>
                        }
                    </div>
                </div>

                <div className="mb-5">
                    <h3 className="text-2xl font-bold">3. Gap</h3>
                    <p>Without gap, grid looks cramped.</p>
                    <pre><code>
{`</> CSS
gap: 1rem;
`}
                    </code></pre>
                </div>
            </div>

            <div className="mb-5 border-b border-2-(--line-break-clr)">
                <h2 className="text-3xl font-bold">Minimal Useful Grid</h2>
                <pre><code>
{`</> CSS
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
`}
                </code></pre>

                <div className="mb-5">
                    <p><code>fr</code> means:</p>
                    <ul className="mx-10 list-disc ">
                        <li>Fraction of remaining space</li>
                        <li>On this context: split available width equally (50% 50%).</li>
                        <li>If <code>grid-template-columns: 1fr 2fr;</code>, it is <code>33% 66%</code> by doing <code>fraction = x / sum of fr</code>.</li>
                    </ul>
                </div>

                <div>
                    <p>In reality, most professional usage is just:</p>
                    <pre><code>
{`</> CSS
display: grid;
grid-template-columns: repeat( ... );
gap: ...;
`}
                    </code></pre>
                </div>
            </div>

            <div className="mb-5 border-b border-2-(--line-break-clr)">
                <h2 className="text-3xl font-bold">Most Important Pattern in Modern Grid</h2>
                <pre><code>
{`</> CSS
grid-template-columns: repeat(3, 1fr);
`}
                </code></pre>
                <p className=""><strong>Means:</strong> <i>make 3 equal columns</i>.</p>
                
                <p>Equivalent to:</p>
                <pre><code>
{`</> CSS
1fr 1fr 1fr
`}
                </code></pre>
            </div>

            <div className="border-b border-2-(--line-break-clr) pb-3 mb-5">
                <h2 className="text-3xl font-bold">Second Most Important Pattern</h2>
                <p>Responsive auto grid:</p>
                <pre><code>
{`</> CSS
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
`}
                </code></pre>

                <div className="mb-3">
                    <p>It means:</p>
                    <ul className="list-disc mx-10">
                        <li>Each item minimum = 200px</li>
                        <li>Stretch if more room</li>
                        <li>Automatically wrap</li>
                        <li>Automatically determine column count</li>
                    </ul>
                </div>

                <p>This powers modern card layouts.</p>
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
.container {
    display: grid;
    gird-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
`}
                </code></pre>
            </div>

            <div>
                <h2 className="text-3xl font-bold">In Tailwind</h2>
                <p>This:</p>
                <pre><code>
{`</> CSS
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
`}
                </code></pre>

                <p>becomes:</p>
                <pre><code>
{`</> HTML
<div class="grid grid-cols-3 gap-4">
`}
                </code></pre>

                <p>For responsive auto-fit, arbitrary values is necessary:</p>
                <pre><code>
{`</> HTML
<div class="grid grid-cols-[repeat(auto-fit,minmax(200,1fr))] gap-4">
`}
                </code></pre>
            </div>
        </div>
    )
}