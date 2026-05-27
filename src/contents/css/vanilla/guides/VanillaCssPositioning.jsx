import { useState } from "react";
import SummaryTable, { useSummaryTable } from "../../../../components/SummaryTable";

export default function VinallaCssPositioning() {
    const { tableStates } = useSummaryTable({
        colnames: ["Property", "Description"],
        mappedData: mappedSections,
    })

    return (
        <div>
            <h1 className="text-4xl font-bold my-3">Positioning</h1>
            
            <SummaryTable tableStates={tableStates} />
        </div>
    )
}

const TestingField = ({box1Styles = "", box2Styles = "", box3 = false, box3Style = ""}) => {
    return (
        <div className="mb-5">
            <div className="my-3">
                <p><strong>Result:</strong></p>
                <p>Observe the position of the boxes.</p>
            </div>

            <div className="relative z-(--z-page) [&>p]:mb-2 p-3 mx-5 max-h-150 overflow-auto bg-white text-black">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>

                <div className={`${box1Styles} h-50 w-50 bg-[hsl(221,100%,46%)] border border-black`}>
                    {box3 && <div className={`${box3Style} h-25 w-25 border bg-[hsl(53,100%,46%)]`}></div>}
                </div>
                <div className={`${box2Styles} h-25 w-25 bg-[hsl(143,100%,46%)] border border-black`}></div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam doloremque quos reprehenderit maxime? Earum debitis totam necessitatibus nihil, eaque cupiditate tenetur veniam aut iste, rerum animi fuga perferendis laborum corrupti! Exercitationem ut veritatis maxime veniam expedita neque fugit. Perferendis nostrum tenetur animi ipsam, qui aliquam sed, dolore maiores vero quod nobis, cum eum nulla porro sapiente. Similique nobis molestiae corporis doloremque! Cum dolores necessitatibus qui iusto quos quo mollitia id esse nostrum, aspernatur similique omnis. Error, nulla eos exercitationem quis ea voluptatibus incidunt explicabo nobis architecto nam accusamus temporibus officia beatae quisquam repudiandae. Illum iste adipisci quo est deleniti.</p>
            </div>
        </div>
    )
}

const PositionStatic = () => {
    return (
        <section>
            <h2 className="h2-title">
                <code>position: static;</code>
            </h2>
            <p>The default <code>position: ;</code> value.</p>
            <p>Elements are positioned in its normal state.</p>

            <p>Example:</p>
            <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);

    position: static
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);
}
`}
            </code></pre>

            <TestingField />
        </section>
    )
}

const PositionRelative = () => {
    return (
        <section>
            <h2 className="h2-title">
                <code>position: relative;</code>
            </h2>
            <p>An element <strong>can be moved from its point of origin</strong>.</p>
            <p>Has an offset: <code>top: x;</code>, <code>bottom: x;</code>, <code>left: x;</code>, and/or <code>right: x;</code></p>
            <p>Offset dictates how much the element be displaced from its point of origin.</p>

            <div className="my-3">
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);

    position: relative;
    /* Offset */
    top: 50px;
    left: 100px;
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);

    position: relative;
    /* Offset */
    top: -200px;
    left: -20px;
}
`}
                </code></pre>
            </div>

            <TestingField box1Styles="relative top-[50px] left-[100px]" box2Styles="relative top-[-200px] left-[-20px]" />
        </section>
    )
}

const PositionAbsolute = () => {
    const [exampleId, setExampleId] = useState(1)

    const activeStyle = "p-2 rounded-4xl bg-white text-black font-bold"
    
    const examples = {
        1: {name: "Example 1", comp: <TestingField box2Styles="absolute top-0"/>, cssExample: <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);

    position: absolute;
    /* Offset */
    top: 0;
}
`}
            </code></pre>},
        2: {name: "Example 2", comp: <TestingField box2Styles="absolute top-50 left-[50%]"/>, cssExample: <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);

    position: absolute;
    /* Offset */
    top: 200px;
    left: 50%;
}
`}
            </code></pre>},
        3: {name: "Example 3", comp: <TestingField box1Styles="relative top-[50%] left-[50%]" box3={true} box3Style="absolute top-[50px] left-[50px]" />, cssExample: <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);

    position: relative;
    /* Offset */
    top: 50%;
    left: 50%;
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);
}

#box3 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(53, 100%, 46%);

    position: absolute;
    /* Offset */
    top: 50%
    left: 50%
}
`}
            </code></pre>},
    }

    return (
        <section>
            <h2 className="h2-title">
                <code>position: absolute;</code>
            </h2>
            <p>Similar to <code>position: relative;</code>, but elements will be taken out from the normal flow.</p>
            <p>It <strong>will search a non-static positioned parent</strong> element and treat as its point of origin.</p>
            
            <div className="sticky z-(--z-ui-toggles) top-28 sm:top-20 my-4">
                <div className="flex justify-evenly items-center bg-black rounded-4xl p-2 max-w-md mx-auto border border-(--link-hover-bg-clr) [&>.exampleComp]:hover:font-bold">
                    {Object.keys(examples).map(id => {
                        const num = Number(id)
                        return (
                            <p key={num}
                                className={`exampleComp ${exampleId === num && activeStyle}`}
                                onClick={_ => setExampleId(num)}
                            >{examples[num].name}</p>
                        )
                    })}
                </div>
            </div>
            
            {examples[exampleId].cssExample}
            {examples[exampleId].comp}
        </section>
    )
}

const PositionFixed = () => {
    return (
        <section>
            <h2 className="h2-title">
                <code>position: fixed;</code>
            </h2>
            <p>The element will stay in the position in the view port.</p>
            
            <div className="my-3">
                <p><strong>Example:</strong></p>
                <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);

    position: fixed;
    /* Offset */
    bottom: 0;
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);
}
`}
                </code></pre>
            </div>

            <TestingField box1Styles="fixed bottom-0" />
        </section>
    )
}

const PositionSticky = () => {
    return (
        <section>
            <h2 className="h2-title">
                <code>position: sticky;</code>
            </h2>
            <p>Element <strong>sticks at the end</strong> (top or bottom) <strong>of the view port when scrolled past</strong>.</p>
            <p>Then the element snaps back to its orginal position if it is reached after scrolling.</p>

            <div className="my-5">
                <p><strong>Example:</strong></p>

                <pre><code>
{`</> CSS
#box1 {
    border: 1px solid;
    height: 200px;
    width: 200px;
    background-color: hsl(221, 100%, 46%);

    position: sticky;
    /* Offset */
    top: 0;
    bottom: 0;
}

#box2 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(143, 100%, 46%);
}

#box3 {
    border: 1px solid;
    height: 100px;
    width: 100px;
    background-color: hsl(53, 100%, 46%);

    position: absolute;
    /* Offset */
    top: 50px;
    left: 50px;
}
`}
                </code></pre>
            </div>

            <TestingField box1Styles="sticky top-0 bottom-0" box3={true} box3Style="absolute top-[50px] left-[50px]" />
        </section>
    )
}

const mappedSections = {
    1: {name: "position: static;", comp: <PositionStatic />, desc: "Static positioning (default)."},
    2: {name: "position: relative;", comp: <PositionRelative />, desc: "Move element from its point of origin."},
    3: {name: "position: absolute;", comp: <PositionAbsolute />, desc: "Highly customizable positioning. Leaves from normal flow."},
    4: {name: "position: fixed;", comp: <PositionFixed />, desc: "Stays positioned in view port."},
    5: {name: "position: sticky", comp: <PositionSticky />, desc: "Stays on view port when scrolled past."},
}