import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

// Sequelize will auto-generate the id since it’s set as autoIncrement in the model.
// So, the id is optional when creating a new user.
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public readonly id!: number;
    public readonly username!: string;
    public email!: string;
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true, // Adds `createdAt` & `updatedAt`
    }
);

export default User;