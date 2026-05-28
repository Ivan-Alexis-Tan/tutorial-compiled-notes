import { useParams } from "react-router-dom"
import { languageRoute } from "../../../routeData"

import VanillaCssCombinators from "./guides/VanillaCssCombinators"
import VanillaCssPseudoClasses from "./guides/VanillaCssPsuedoClasses"
import VanillaCssGrid from "./guides/VanillaCssGrid"
import VanillaCssOverflow from "./guides/VanillaCssOverflow"
import VinallaCssPositioning from "./guides/VanillaCssPositioning"
import VanillaCssTransformations from "./guides/VanillaCssTransformations"

const cssTitles = languageRoute('css').libTitles('vanilla')
const routeIds = Object.keys(cssTitles)

export default function VanillaCssGuides() {
    const { id } = useParams()

    switch(Number(id)) {
        case 1:
            return <VanillaCssCombinators />
        case 2:
            return <VanillaCssPseudoClasses />
        case 3:
            return <VinallaCssPositioning />
        case 4:
            return <VanillaCssOverflow />
        case 5:
            return <VanillaCssGrid />
        case 6:
            return <VanillaCssTransformations />
    }
}