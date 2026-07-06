import { Link } from "react-router-dom"
import { capsEveryWord } from "../lib/helpers"

const languageConfig = {
    python: {image: `/python-logo.png`},
    javascript: {image: "/javascript-logo.png"},
    html: {image: "/html-logo.png"},
    css: {image: "/css-logo.png"},
    git: {image: "/git-logo.png"},
    sql: {image: "/sql-logo.png"},
}

export default function LanguageCard({ title = "", language = "", url = "/"}) {
    const imgFile = languageConfig[language]?.image

    return (
        <div className="flex flex-col items-center justify-between gap-5 p-10 
                        hover:border-5 transition-all 
                        border rounded-2xl h-66.5"
        >
            <div className="min-h-37.5">
                <img src={imgFile} className="w-37.5 h-37.5 object-contain" />
            </div>            

            <h2 className="text-xl font-bold">
                {capsEveryWord(title)}
            </h2>
        </div>
    )
}