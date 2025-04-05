import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import BaseProperty from './BaseProperty';
import ResidentialPropertyDetail from './ResidentialPropertyDetail';

class ResidentialProperty extends BaseProperty {
  public readonly propertyDetail?: ResidentialPropertyDetail;
}

ResidentialProperty.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  form_no: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  property_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  property_type: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  for_property: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  State: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '1'
  },
  display_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  hit: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'clear_property',
  timestamps: false
});

export default ResidentialProperty;