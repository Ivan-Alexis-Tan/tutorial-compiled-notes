import TailwinGuides from "../contents/css/tailwind/TailwindGuides";
import VanillaCssGuides from "../contents/css/vanilla/VanillaCssGuides";

export const cssGuideRoute = [
    {
        path: "tailwindguide/:id",
        element: <TailwinGuides />,
    },
    {
        path: "vanillacssguide/:id",
        element: <VanillaCssGuides />,
    },
]