import { useParams } from "react-router-dom"
import { languageRoute } from "../../routeData"

import InstallationAndSetup from "./nextjs-guides/Next1InstallationAndSetup"
import CreatingRoutesAndNav from "./nextjs-guides/Next2CreatingRoutesAndNav"
import WorkingWithImageFiles from "./nextjs-guides/Next3ImageFiles"
import ServerAndClientComponents from "./nextjs-guides/Next4ServerAndClientComponents"
import Next5Routing from "./nextjs-guides/Next5Routing"
import Next6Layouts from "./nextjs-guides/Next6Layouts"
import Next7ErrorHandling from "./nextjs-guides/Next7ErrorHandling"
import Next8LoadingUI from "./nextjs-guides/Next8LoadingUI"
import Next9DataFetching from "./nextjs-guides/Next9DataFetching"
import Next10ApiRoutes from "./nextjs-guides/Next10ApiRoutes"
import Next11Caching from "./nextjs-guides/Next11Caching"
import Next12CommonlyUsedHooks from "./nextjs-guides/Next12CommonHooks"
import Next13Authentication from "./nextjs-guides/Next13Authentication"
import Next14NextAuth from "./nextjs-guides/Next14NextAuth"

const titles = languageRoute('javascript').libTitles('nextjs')

export default function NextJSGuide() {
    const { id } = useParams()
    switch (Number(id)) {
        case 1:
            return <InstallationAndSetup />
        case 2:
            return <CreatingRoutesAndNav />
        case 3:
            return <WorkingWithImageFiles />
        case 4:
            return <ServerAndClientComponents />
        case 5:
            return <Next5Routing />
        case 6:
            return <Next6Layouts />
        case 7: 
            return <Next7ErrorHandling />
        case 8:
            return <Next8LoadingUI />
        case 9:
            return <Next9DataFetching />
        case 10:
            return <Next10ApiRoutes />
        case 11:
            return <Next11Caching />
        case 12:
            return <Next12CommonlyUsedHooks />
        case 13:
            return <Next13Authentication />
        case 14:
            return <Next14NextAuth />
        default:
            return
    }
}