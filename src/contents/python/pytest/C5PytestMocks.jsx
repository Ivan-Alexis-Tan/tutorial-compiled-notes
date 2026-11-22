import { useEffect, useRef, useState } from "react";

import GuideContentContainer from "../../../components/GuideContentContainer";
import MockPatchGuide from "./MockPatchGuide";
import MockObjGuide from "./MockObjGuide";
import OtherMockMethod from "./OtherMockMethod";

const defaultWindow = {
    patchGuide: false,
    mockObjGuide: false,
    otherMethod: false,
}

function mapWindowGuide(text, windowStr, Guidecomponent) {
    return { text, windowStr, Guidecomponent }
}

export default function C5PytestMocks() {
    const [showGuide, setShowGuide] = useState({...defaultWindow, patchGuide: true})

    const rootDir = "C:\\Users\\Acer\\Documents\\root-project"
    const cliCommand = `(root-project) ${rootDir}>uv run pytest`
    const guideWindows = [
        mapWindowGuide(<code>patch()</code>, "patchGuide", MockPatchGuide),
        mapWindowGuide(<code>Mock()</code>, "mockObjGuide", MockObjGuide),
        mapWindowGuide(<code>Other</code>, "otherMethod", OtherMockMethod),
    ]

    function switchWindow(window) {
        setShowGuide({...defaultWindow, [window]: true})
    }

    return (
        <GuideContentContainer>
            <h1>Mocks</h1>
            <ul>
                <li>Needs to install <code>pytest-mock</code> package.</li>
                <li>Type <code>pip install pytest-mock</code> on CLI to install package.</li>
                <li>Allows to test a part of your code that relies on something that's not active in a testing environment.</li>
            </ul>

            <hr />

            <div className={`max-w-150 mx-auto py-1 gap-3 sticky top-45 sm:top-18.5 z-(--z-ui-toggles) flex justify-evenly items-center bg-(--blk-lucent) rounded-2xl`}>
                {guideWindows.map(guide => (
                    <div className="">
                        <div onClick={_ => switchWindow(guide.windowStr)}>
                            <p className={`${showGuide[guide.windowStr] ? "border border-(--link-hover-bg-clr) bg-(--line-break-clr)" : "border-(--bg-clr)"} mb-0! font-bold rounded-[7.5px]`}>
                                {guide.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {showGuide.patchGuide
                && <MockPatchGuide rootDir={rootDir} cliCommand={cliCommand} />
            }

            {showGuide.mockObjGuide
                && <MockObjGuide rootDir={rootDir} cliCommand={cliCommand} />
            }

            {showGuide.otherMethod
                && <OtherMockMethod />
            }
        </GuideContentContainer>
    )
}