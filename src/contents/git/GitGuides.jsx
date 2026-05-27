import { useState } from "react"

import { routeData } from "../../routeData"

import GitCommands from "./guides/GitCommands"
import MessageConvention from "./guides/MessageConvention"
import GitIgnore from "./guides/GitIgnore"
import MergeBranch from "./guides/GitMergeBranch"
import GitCreateBranch from "./guides/GitCreateBranch"
import GitDeleteCommit from "./guides/GitDeleteCommit"
import GitDeleteBranch from "./guides/GitDeleteBranch"

const guideTitles = routeData.git.guides
const guideNum = Object.keys(guideTitles)

export default function GitGuides() {
    const [guideId, setGuideId] = useState(0)

    return(
        <div>
            <h1>Git Guides</h1>

            {/* Guide Selection */}
            {guideTitles && <ul>{guideNum.map(num => 
                <li key={num} 
                    onClick={_ => setGuideId(Number(num))}
                >{guideTitles[num]}</li>
            )}</ul>}
            
            {/* Guide Content */}
            {guideId >= 1 && <>
                <hr />
                <ShowGuide id={guideId}/>
            </>}
        </div>
    )
}

function ShowGuide({ id }) {
    switch (id) {
        case 1:
            return <GitCommands />;
        case 2:
            return <MessageConvention />;
        case 3:
            return <GitIgnore />;
        case 4:
            return <GitDeleteCommit />;
        case 5:
            return <GitCreateBranch />;
        case 6:
            return <MergeBranch />;
        case 7:
            return <GitDeleteBranch />;
        default:
            break;
    }
}

