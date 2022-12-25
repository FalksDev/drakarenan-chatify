import { DataSource, EntityTarget } from "typeorm"
import { Database } from "../constants"

export const repositoryResolver = <ObjectLiteral>(repository: string, entity: EntityTarget<ObjectLiteral>) => {
    return [
        {
            provide: repository,
            useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
            inject: [Database.DataSource]
        }
    ]
}