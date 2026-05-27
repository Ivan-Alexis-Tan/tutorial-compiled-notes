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
    const currentId = Number(id)

    switch (currentId) {
        case 1:
            return <Ts1Introduction />
        case 2:
            return <Ts2PrimitiveTypes />
        case 3:
            return <Ts3ArraysAndTuples />
        case 4:
            return <Ts4LiteralsAndEnums />
        case 5:
            return <Ts5TypeCastingAnyUnknown />
        case 6: 
            return <Ts6OptionalChainingAndBang />
        case 7: 
            return <Ts7BasicFunctionTypes />
        case 8: 
            return <Ts8AdvancedFunctionTypes />
        case 9:
            return <Ts9Interfaces />
        case 10:
            return <Ts10ClassesAndAbstractClasses />
        case 11:
            return <Ts11ClassesAndInterfaces />
        case 12:
            return <Ts12StaticAttribAndMethods />
        case 13:
            return <Ts13Generics />
        case 14:
            return <Ts14AdvancedTypes />
        case 15:
            return <Ts15TypeGuard />
        case 16:
            return <Ts16DiscriminatedUnion />
        case 17:
            return <Ts17UtilityTypes />
        case 18: 
            return <Ts18Modules />
        case 19: 
            return <Ts19ModuleConfigs />
        case 20:
            return <Ts20Namespaces />
        case 21:
            return <Ts21TypeSyntax />
        default:
            break;
    }
}