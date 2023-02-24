import { DataSource, DataSourceOptions } from 'typeorm';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'db-mysql-fra1-88891-do-user-8736755-0.b.db.ondigitalocean.com',
    port: 25060,
    username: 'doadmin',
    password: 'AVNS_GDr8rx2ODBfFI9b1D8l',
    database: 'defaultdb',
    entities: ['dist/src/utils/typeorm/entities/*.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;