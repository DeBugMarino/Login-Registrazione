import pgPromise from 'pg-promise';

const db = pgPromise()({
  host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
});