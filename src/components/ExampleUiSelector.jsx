import { useState } from "react"

const exampleDefault = {
    1: {name: "", comp: <></>, css: <></>, html: <></>}
}

export function useExampleUiSelector({ exampleData = exampleDefault }) {
    const [exampleId, setExampleId] = useState(1)
    const exampleIds = Object.keys(exampleData).map(id => Number(id))

    return {
        exampleId,
        setExampleId,
        exampleIds,
        exampleStates: {
            exampleId,
            setExampleId,
            exampleIds,
            exampleData,
        }
    }
}

export default function ExampleUiSelector({ exampleStates = {} }) {
    const { exampleId, setExampleId, exampleIds, exampleData } = exampleStates
    
    const activeStyle = "bg-white text-black"
    const activeExampleData = exampleData[exampleId]

    function hoverStyle(boolVal) {
        if (boolVal) return "hover:bg-(--link-hover-bg-clr)"
        return "hover:text-(--link-hover-bg-clr)"
    }

    return (
        <div>
            <div className="flex justify-center sticky top-28 sm:top-19 z-(--z-ui-toggles) my-5">
                <div className="flex justify-evenly min-w-md p-2 rounded-4xl border border-(--link-hover-bg-clr) bg-black">
                    {exampleIds.map(id => {
                        const isActive = exampleId === id
                        return (
                            <span key={id}
                                onClick={_ => setExampleId(id)}
                                className={`${isActive && activeStyle} rounded-4xl font-mono font-bold p-2 ${hoverStyle(isActive)}`}
                            >{exampleData[id].name}</span>
                        )
                    })}
                </div>
            </div>
            
            {activeExampleData.html}
            {activeExampleData.css}
            {activeExampleData.comp}
        </div>
    )
}