import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { languageRoute, languages } from "../routeData";
import { capsEveryWord } from "../lib/helpers";

import CodingChallengeLanguages from "../coding-challenges/ChallengeLanguages";
import LanguageCard from "../components/LanguageCard";

export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold my-5">Notes Compilation</h1>
            
            <div className="mx-5 list-none mb-10">
                {(languages.length >= 1)
                    ? <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
                        {languages.map(lang => {
                            const { url, langTitle } = languageRoute(lang)
                            const { initUrl } = url

                            return (
                                <Link to={`/guides/${lang}/${initUrl}/1`} key={lang}>
                                    <LanguageCard title={langTitle ?? capsEveryWord(lang)} 
                                        language={lang} 
                                        url={`/guides/${lang}/${initUrl}/1`} 
                                    />
                                </Link>
                            )
                        })}
                    </div>
                    : <p>Nothing to display</p>
                }
            </div>

            <div>
                <CodingChallengeLanguages />
            </div>
        </>
    )
}