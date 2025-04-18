import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize;