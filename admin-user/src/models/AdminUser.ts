import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { AdminUserRole, adminUserRoles } from '../types/adminUserTypes';
import { DB_TABLES } from '../constants/db.constants';

interface AdminUserAttributes {
  id: number;
  full_name: string;
  email: string;
  username: string;
  contact_no: string;
  password: string;
  city: string;
  popup: string | null;
  privilege: string | null;
  status: '0' | '1';
  role: AdminUserRole;
}

interface AdminUserCreationAttributes extends Omit<AdminUserAttributes, 'id'> {}

class AdminUser extends Model<AdminUserAttributes, AdminUserCreationAttributes> implements AdminUserAttributes {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public username!: string;
  public contact_no!: string;
  public password!: string;
  public city!: string;
  public popup!: string | null;
  public privilege!: string | null;
  public status!: '0' | '1';
  public role!: AdminUserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    contact_no: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    popup: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    privilege: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...adminUserRoles),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: DB_TABLES.ADMIN_USERS,
    timestamps: true,
  }
);

export default AdminUser;