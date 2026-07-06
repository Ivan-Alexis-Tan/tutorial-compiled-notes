import { useParams } from "react-router-dom"

import Ts1Introduction from "./typescript-guides/Ts1Intro";
import Ts2PrimitiveTypes from "./typescript-guides/Ts2PrimitiveTypes";
import Ts3ArraysAndTuples from "./typescript-guides/Ts3ArraysAndTuples";
import Ts4LiteralsAndEnums from "./typescript-guides/Ts4LiteralsAndEnums";
import Ts5TypeCastingAnyUnknown from "./typescript-guides/Ts5TypeCastingAnyUnknown";
import Ts6OptionalChainingAndBang from "./typescript-guides/Ts6OptionalChainingAndBang";
import Ts7BasicFunctionTypes from "./typescript-guides/Ts7BasicFuntionTypes";
import Ts8AdvancedFunctionTypes from "./typescript-guides/Ts8AdvancedFunctionTypes";
import Ts9Interfaces from "./typescript-guides/Ts9Interfaces";
import Ts10ClassesAndAbstractClasses from "./typescript-guides/Ts10ClassesAndAbstractClasses";
import Ts11ClassesAndInterfaces from "./typescript-guides/Ts11ClassesAndInterfaces";
import Ts12StaticAttribAndMethods from "./typescript-guides/Ts12StaticAttribAndMethods";
import Ts13Generics from "./typescript-guides/Ts13Generics";
import Ts14AdvancedTypes from "./typescript-guides/Ts14AdvancedTypes";
import Ts15TypeGuard from "./typescript-guides/Ts15TypeGuards";
import Ts16DiscriminatedUnion from "./typescript-guides/Ts16DiscriminatedUnion";
import Ts17UtilityTypes from "./typescript-guides/Ts17UtilityTypes";
import Ts18Modules from "./typescript-guides/Ts18Modules";
import Ts19ModuleConfigs from "./typescript-guides/Ts19ModuleConfigs";
import Ts20Namespaces from "./typescript-guides/Ts20Namespaces";
import Ts21TypeSyntax from "./typescript-guides/Ts21TypeSyntax";

export default function TypescriptBasicsGuides() {
    const { id } = useParams()
     
    return routesTypescriptBasicsGuide[Number(id)]
}

const routesTypescriptBasicsGuide = {
    1: <Ts1Introduction />,
    2: <Ts2PrimitiveTypes />,
    3: <Ts3ArraysAndTuples />,
    4: <Ts4LiteralsAndEnums />,
    5: <Ts5TypeCastingAnyUnknown />,
    6: <Ts6OptionalChainingAndBang />,
    7: <Ts7BasicFunctionTypes />,
    8: <Ts8AdvancedFunctionTypes />,
    9: <Ts9Interfaces />,
    10: <Ts10ClassesAndAbstractClasses />,
    11: <Ts11ClassesAndInterfaces />,
    12: <Ts12StaticAttribAndMethods />,
    13: <Ts13Generics />,
    14: <Ts14AdvancedTypes />,
    15: <Ts15TypeGuard />,
    16: <Ts16DiscriminatedUnion />,
    17: <Ts17UtilityTypes />,
    18: <Ts18Modules />,
    19: <Ts19ModuleConfigs />,
    20: <Ts20Namespaces />,
    21: <Ts21TypeSyntax />,
}