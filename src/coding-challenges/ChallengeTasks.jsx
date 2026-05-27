import { Link, Outlet, useParams } from "react-router-dom"
import { getChallengesData } from "../data/codingChallenges"

export default function ChallengeTasks() {
    const { language, library } = useParams()

    const data = getChallengesData(language)
    const challenges = data.challenges(library)
    const titleIds = Object.keys(challenges).map(id => Number(id))

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold mb-5">Challenge Tasks</h1>

                <div>
                    {titleIds.map(id => (
                        <Link key={id} 
                            to={`/challenges/${language}/${library}/${id}`}
                            className="ml-4 text-xl"
                        >
                            {challenges[id]?.title}
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}