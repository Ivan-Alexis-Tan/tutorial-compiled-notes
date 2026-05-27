import { useParams } from "react-router-dom"

import C1SqlAlchemyIntro from "./sqlalchemy/C1SqlAlchemyIntro"
import C2SqlAlchemyGuide from "./sqlalchemy/C2SqlAlchemyGuide"
import C3SqlAlchemyOrmCrud from "./sqlalchemy/C3SqlAlchemyOrmCrud"
import C4SqlAlchemyOrderBy from "./sqlalchemy/C4SqlAlchemyOrderBy"
import C5SqlAlchemyDataHandling from "./sqlalchemy/C5SqlAlchemyDatahandling"
import C6SqlAlchemyFiltering from "./sqlalchemy/C6SqlAlchemyFiltering"
import C7SqlAlchemyGroupingAndChaining from "./sqlalchemy/C7SqlAlchemyGroupingAndChaining"
import C8SqlAlchemyJoins from "./sqlalchemy/C8SqlAlchemyJoins"
import C9SqlAlchemyDefer from "./sqlalchemy/C9SqlAlchemyDefer"
import C10SqlAlchemyOneToManyRelationship from "./sqlalchemy/C10SqlAlchemyOneToManyRelationship"
import C11SqlAlchemyManyToManyRelationship from "./sqlalchemy/C11SqlAlchemyManyToManyRelationship"
import C12SqlAlchemyAssociationTableAndObject from "./sqlalchemy/C12SqlAlchemyAssociationTableAndObject"
import C13SqlAlchemyV2Relationship from "./sqlalchemy/C13SqlAlchemy2.0Relationship"
import C14SqlAlchemySelfRelationshipAndCircularDependencies from "./sqlalchemy/C14SqlAlchemySelfRelationshipAndCircularDependencies"

export default function SQLAlchemyGuide() {
    const { id } = useParams()
    const currentId = Number(id)
    
    switch (currentId) {
        case 1:
            return <C1SqlAlchemyIntro />
        case 2:
            return <C2SqlAlchemyGuide />
        case 3:
            return <C3SqlAlchemyOrmCrud />
        case 4:
            return <C4SqlAlchemyOrderBy />
        case 5:
            return <C5SqlAlchemyDataHandling />
        case 6:
            return <C6SqlAlchemyFiltering />
        case 7:
            return <C7SqlAlchemyGroupingAndChaining />
        case 8:
            return <C8SqlAlchemyJoins />
        case 9:
            return <C9SqlAlchemyDefer />
        case 10:
            return <C10SqlAlchemyOneToManyRelationship />
        case 11:
            return <C11SqlAlchemyManyToManyRelationship />
        case 12:
            return <C12SqlAlchemyAssociationTableAndObject />
        case 13:
            return <C13SqlAlchemyV2Relationship />
        case 14:
            return <C14SqlAlchemySelfRelationshipAndCircularDependencies />
        default:
            <h2>Sorry, the page is still under development</h2>;
    }
}

