import CommercialProperty from './CommercialProperty';
import CommercialPropertyDetail from './CommercialPropertyDetail';
import ResidentialProperty from './ResidentialProperty';
import ResidentialPropertyDetail from './ResidentialPropertyDetail';

export const setupAssociations = () => {
  CommercialProperty.hasOne(CommercialPropertyDetail, {
    foreignKey: 'property_id',
    as: 'propertyDetail'
  });

  CommercialPropertyDetail.belongsTo(CommercialProperty, {
    foreignKey: 'property_id',
    as: 'property'
  });

  ResidentialProperty.hasOne(ResidentialPropertyDetail, {
    foreignKey: 'property_id',
    as: 'propertyDetail'
  });

  ResidentialPropertyDetail.belongsTo(ResidentialProperty, {
    foreignKey: 'property_id',
    as: 'property'
  });
};