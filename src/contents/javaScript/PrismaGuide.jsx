import { useParams } from "react-router-dom";

import Prisma1InstallationAndSetup from "./prisma-guides/Prisma1InstallationAndSetup";
import Prisma2ModelCreation from "./prisma-guides/Prisma2ModelCreation";
import Prisma3Migration from "./prisma-guides/Prisma3Migration";
import Prisma4CRUD from "./prisma-guides/Prisma4CRUD";
import Prisma5AssociationTable from "./prisma-guides/Prisma5AssociationTable";

export default function PrismaGuides() {
    const { id } = useParams()

    switch(Number(id)) {
        case 1:
            return <Prisma1InstallationAndSetup />
        case 2: 
            return <Prisma2ModelCreation />
        case 3:
            return <Prisma3Migration />
        case 4:
            return <Prisma4CRUD />
        case 5:
            return <Prisma5AssociationTable />
        default:
            return null
    }
}