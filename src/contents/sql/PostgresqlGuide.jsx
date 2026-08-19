import { useParams } from "react-router-dom"

import Postgresql1DesigningTables from "./postgresql/Postgresql1DesigningTables"
import Postgresql2NullValue from "./postgresql/Postgresql2NullValue"
import Postgresql3InsertingData from "./postgresql/Postgresql3InsertingData"
import Postgresql4UpdatingRecords from "./postgresql/Postgresql4UpdatingRecords"
import PostgreSQL5DeletingData from "./postgresql/Postgresql5DeletingData"
import Postgresql6SelectClause from "./postgresql/Postgresql6SelectClause"
import PostgreSQL7Filtering from "./postgresql/Postgresql7Filtering"
import PostgreSQL8AndOrNotOperators from "./postgresql/PostgreSQL8AndOrNotOperators"
import PostgreSQL9SortingData from "./postgresql/Postgresql9SortingData"
import PostgreSQL10LimitAndOffset from "./postgresql/Postgresql10LimitAndOffset"
import PostgreSQL11PrimaryKeys from "./postgresql/Postgresql11PrimaryKeys"
import PostgreSQL12ForeignKeys from "./postgresql/Postgresql12ForeignKeys"
import PostgreSQL13CheckUniqueNotNull from "./postgresql/Postgresql13CheckUniqueNotNull"
import PostgreSQL14DataIntegrity from "./postgresql/Postgresql14DataIntegrity"
import PostgreSQL15LikeAndIlike from "./postgresql/Postgresql15LikeAndIlike"
import PostgreSQL16Regex from "./postgresql/Postgresql16Regex"
import PostgreSQL17Disctinct from "./Postgresql17Distinct"

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
    1: mapPostgresGuide("Designing Tables", <Postgresql1DesigningTables />),
    2: mapPostgresGuide("Null Value", <Postgresql2NullValue />),
    3: mapPostgresGuide("Inserting Data", <Postgresql3InsertingData />),
    4: mapPostgresGuide("Updating Records", <Postgresql4UpdatingRecords />),
    5: mapPostgresGuide("Deleting Data", <PostgreSQL5DeletingData />),
    6: mapPostgresGuide("SELECT Clause", <Postgresql6SelectClause />),
    7: mapPostgresGuide("Filtering", <PostgreSQL7Filtering />),
    8: mapPostgresGuide("AND, OR, NOT Operators", <PostgreSQL8AndOrNotOperators />),
    9: mapPostgresGuide("Sorting", <PostgreSQL9SortingData />),
    10: mapPostgresGuide("LIMIT and OFFSET", <PostgreSQL10LimitAndOffset />),
    11: mapPostgresGuide("Primary Keys", <PostgreSQL11PrimaryKeys />),
    12: mapPostgresGuide("Foreign Keys", <PostgreSQL12ForeignKeys />),
    13: mapPostgresGuide("CHECK, UNIQUE, NOT NULL Constraints", <PostgreSQL13CheckUniqueNotNull />),
    14: mapPostgresGuide("Data Integrity", <PostgreSQL14DataIntegrity />),
    15: mapPostgresGuide("LIKE and ILIKE", <PostgreSQL15LikeAndIlike />),
    16: mapPostgresGuide("Regex", <PostgreSQL16Regex />),
    17: mapPostgresGuide("DISTINCT Clause", <PostgreSQL17Disctinct />),
}

function mapPostgresGuide(title, comp) {
    return { title, comp }
}