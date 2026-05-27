import { useParams } from "react-router-dom"
import { getChallengesData } from "../data/codingChallenges"
import { capsEveryWord } from "../lib/helpers"

export default function ChallengesPage() {
    const { language, library, id } = useParams()

    const { getChallenge } = getChallengesData(language)
    const { title, component } = getChallenge(library, id)
    
    return (
        <div>
            <h1 className="text-2xl font-bold">{capsEveryWord(title)}</h1>

            <div>
                {component}
            </div>
        </div>
    )
}