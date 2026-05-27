import { Link } from "react-router-dom";
import { challengeLanguages, getChallengesData, } from "../data/codingChallenges";
import { capsEveryWord } from "../lib/helpers";

export default function CodingChallengeLanguages() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-5">
                Coding Challenge
            </h1>
            
            <div className="ml-3">
                {challengeLanguages.map(lang => {
                    const { langTitle, libList } = getChallengesData(lang)
                    if (!langTitle) return

                    return (
                        <div key={lang}>
                            <h2 className="text-2xl font-bold mb-1">{langTitle}</h2>

                            {libList().map(lib => (
                                <Link key={lib}
                                    to={`challenges/${lang}/${lib}`}
                                    className="ml-5"
                                >
                                    {capsEveryWord(lib)}
                                </Link>
                            ))}
                        </div>
                    )
                })}
            </div>
        </>
    )
}