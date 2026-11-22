// Router dom imports
import { useParams } from "react-router-dom"

// Components
import C1PytestIntallationAndBasicTesting from "./pytest/C1PytestIntallationAndBasicTesting"
import C2PytestUnitTesting from "./pytest/C2PytestUnitTesting"
import C3PytestFixtures from "./pytest/C3PytestFixtures"
import C4PytestParameterizedTesting from "./pytest/C4PytestParameterizedTesting"
import C5PytestMocks from "./pytest/C5PytestMocks"

export default function PytestGuide() {
    const { id } = useParams()

    switch (Number(id)) {
        case 1:
            return <C1PytestIntallationAndBasicTesting />
        case 2:
            return <C2PytestUnitTesting />
        case 3:
            return <C3PytestFixtures />
        case 4:
            return <C4PytestParameterizedTesting />
        case 5:
            return <C5PytestMocks />
        default:
            break
    }
}