import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import BasePropertyDetail from './BasePropertyDetail';

class ResidentialPropertyDetail extends BasePropertyDetail {}

ResidentialPropertyDetail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  no_of_bedrooms: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  no_of_bathrooms: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  offer_price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  offer_price_unit: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  expected_rent: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  expected_rent_unit: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'clear_property_detail',
  timestamps: false
});

export default ResidentialPropertyDetail;
