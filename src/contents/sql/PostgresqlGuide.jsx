import { useParams } from "react-router-dom"

import Postgresql1DesigningTables from "./postgresql/Postgresql1DesigningTables"
import Postgresql2NullValue from "./postgresql/Postgresql2NullValue"
import Postgresql3InsertingData from "./postgresql/Postgresql3InsertingData"
import Postgresql4UpdatingRecords from "./postgresql/Postgresql4UpdatingRecords"

export default function PostgresqlGuide() {
    const { id } = useParams()

    return (
        <div className="mb-5 [&_h1,&_h2,&_h3]:font-bold [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl
                        [&_ul]:mb-5 [&_ul>li]:ml-10 [&_ul>li]:mb-1 [&_ul>li]:list-disc"
        >
            {routesPostgresqlGuides[Number(id)].comp}
        </div>
    )
}

export const routesPostgresqlGuides = {
    1: {title: "Designing Tables", comp: <Postgresql1DesigningTables />},
    2: {title: "Null Value", comp: <Postgresql2NullValue />},
    3: {title: "Inserting Data", comp: <Postgresql3InsertingData />},
    4: {title: "Updating Records", comp: <Postgresql4UpdatingRecords />},
}