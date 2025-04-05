import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import BasePropertyDetail from './BasePropertyDetail';

class CommercialPropertyDetail extends BasePropertyDetail {}

CommercialPropertyDetail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sq_feet_area: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'no_of_bedrooms'
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
  tableName: 'clear_com_property_detail',
  timestamps: false
});

export default CommercialPropertyDetail;