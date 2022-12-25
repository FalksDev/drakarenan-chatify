import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'unnamed12345',
    database: 'chatify_test',
    entities: ['dist/src/utils/typeorm/entities/*.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;