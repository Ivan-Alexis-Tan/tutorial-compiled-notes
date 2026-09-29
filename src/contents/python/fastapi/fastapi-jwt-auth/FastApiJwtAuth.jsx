import { useParams } from "react-router-dom"
import { languageRoute } from "../../../../routeData"

import C1InstallationAndSetup from "./contents/C1InstallationAndSetup"
import C2SignUp from "./contents/C2SignUp"
import C3UserLogin from "./contents/C3UserLogin"
import C4UserValidationAndAuthorization from "./contents/C4UserValidationAndAuthorization"

const titles = languageRoute("python").libTitles("fastapi")

export default function FastApiJwt() {
    const { id } = useParams()

    switch (Number(id)) {
        case 1:
            return <C1InstallationAndSetup />
        case 2:
            return <C2SignUp />
        case 3:
            return <C3UserLogin /> 
        case 4:
            return <C4UserValidationAndAuthorization />
    }
}