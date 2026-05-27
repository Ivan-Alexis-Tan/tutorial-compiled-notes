import { useParams } from "react-router-dom"

import Proj1DigitalClock from "./basics-projects/Proj1DigitalClock"
import Proj2Stopwatch from "./basics-projects/Proj2Stopwatch";
import Proj3PokemonApi from "./basics-projects/Proj3PokemonAPI";

export default function JavascriptProjects() {
    const { id } = useParams();
    const currentId = Number(id)

    switch (currentId) {
        case 1:
            return <Proj1DigitalClock />
        case 2:
            return <Proj2Stopwatch />
        case 3:
            return <Proj3PokemonApi />
        default:
            break;
    }
}