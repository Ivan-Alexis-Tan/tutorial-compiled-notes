import { Link } from "react-router-dom"
import { capsEveryWord } from "../lib/helpers"

const languageConfig = {
    python: {image: `/python-logo.png`},
    javascript: {image: "/javascript-logo.png"},
    html: {image: "/html-logo.png"},
    css: {image: "/css-logo.png"},
    git: {image: "/git-logo.png"},
}

export default function LanguageCard({ title = "", language = "", url = "/"}) {
    const imgFile = languageConfig[language]?.image

    return (
        <div className="flex flex-col items-center justify-between p-10 gap-5 hover:border-5 transition-all border rounded-2xl h-66.5">
            <img src={imgFile} width={"150px"} height={"150px"} />

            <h2 className="text-xl font-bold">
                {capsEveryWord(title)}
            </h2>
        </div>
    )
}