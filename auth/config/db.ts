import { Sequelize } from 'sequelize';

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

if (!database) {
    throw new Error('Please set the DB_NAME environment variable');
}
if (!username) {
    throw new Error('Please set the DB_USER environment variable');
}
if (!password) {
    throw new Error('Please set the DB_PASSWORD environment variable');
}
if (!host) {
    throw new Error('Please set the DB_HOST environment variable');
}
if (!port) {
    throw new Error('Please set the DB_PORT environment variable');
}

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        port: parseInt(port),
        dialect: 'mysql',
        logging: console.log, // Enable logging
    }
);

export default sequelize;