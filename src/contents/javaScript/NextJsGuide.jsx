import { useParams } from "react-router-dom"

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

export default function NextJSGuide() {
    const { id } = useParams()

    return routesNextJSGuide[Number(id)]
}

const routesNextJSGuide = {
    1: <InstallationAndSetup />,
    2: <CreatingRoutesAndNav />,
    3: <WorkingWithImageFiles />,
    4: <ServerAndClientComponents />,
    5: <Next5Routing />,
    6: <Next6Layouts />,
    7: <Next7ErrorHandling />,
    8: <Next8LoadingUI />,
    9: <Next9DataFetching />,
    10: <Next10ApiRoutes />,
    11: <Next11Caching />,
    12: <Next12CommonlyUsedHooks />,
    13: <Next13Authentication />,
    14: <Next14NextAuth />,
}