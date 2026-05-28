import { useParams } from "react-router-dom"

import GitCommands from "./guides/GitCommands"
import MessageConvention from "./guides/MessageConvention"
import GitIgnore from "./guides/GitIgnore"
import MergeBranch from "./guides/GitMergeBranch"
import GitCreateBranch from "./guides/GitCreateBranch"
import GitDeleteCommit from "./guides/GitDeleteCommit"
import GitDeleteBranch from "./guides/GitDeleteBranch"

export default function GitGuides() {
    const { id } = useParams()
    const currId = Number(id)

    switch (currId) {
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