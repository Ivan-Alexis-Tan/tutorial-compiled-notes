import { useParams } from "react-router-dom"
import Tailwind1InstallationAndSetup from "./guides/Tailwind1InstallationAndSetup"

export default function TailwinGuides() {
    const { id } = useParams()

    switch(Number(id)) {
        case 1:
            return <Tailwind1InstallationAndSetup />
    }
}