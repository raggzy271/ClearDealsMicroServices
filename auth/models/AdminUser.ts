import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface AdminUserAttributes {
  id: number;
  fullName: string;
  email: string;
  username: string;
  contactNo?: string | null;
  password: string;
  city: string;
  popup?: string | null;
  privilege?: string | null;
  status: '0' | '1';
}

interface AdminUserCreationAttributes extends Optional<AdminUserAttributes, 'id'> {}

class AdminUser extends Model<AdminUserAttributes, AdminUserCreationAttributes> implements AdminUserAttributes {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public username!: string;
  public contactNo!: string | null;
  public password!: string;
  public city!: string;
  public popup!: string | null;
  public privilege!: string | null;
  public status!: '0' | '1';
}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'full_name' // Maps to `full_name` in DB
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    contactNo: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'contact_no' // Maps to `contact_no` in DB
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    popup: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    privilege: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'clear_adminuser', // Ensure correct table name
    timestamps: false
  }
);

export default AdminUser;
