import ReactGuide from "../contents/javaScript/ReactGuides";
import JsBasics from "../contents/javaScript/JavascriptBasicsGuide";
import JavascriptProjects from "../contents/javaScript/JavascriptProjects";
import NextJSGuide from "../contents/javaScript/NextJsGuide";
import TypescriptBasicsGuides from "../contents/javaScript/TypescriptBasicsGuides";
import PrismaGuides from "../contents/javaScript/PrismaGuide";

export const javascriptGuideRoute = [
    {
        path: 'jsguide1/:id',
        element: <JsBasics />
    },
    {
        path: 'reactGuide/:id',
        element: <ReactGuide />
    },
    {
        path: 'nextjsguide/:id',
        element: <NextJSGuide />
    },
    {
        path: "tsguide/:id",
        element: <TypescriptBasicsGuides />,
    },
    {
        path: "prismaguide/:id",
        element: <PrismaGuides />,
    },
]

export const javascriptProjectsRoute = [
    {
        path:'jsproj/:id',
        element: <JavascriptProjects />
    },
]