import ResidentialProperty from './ResidentialProperty';
import CommercialProperty from './CommercialProperty';
import ResidentialPropertyDetail from './ResidentialPropertyDetail';
import CommercialPropertyDetail from './CommercialPropertyDetail';
import { setupAssociations } from './associations';

setupAssociations();

export {
  ResidentialProperty,
  CommercialProperty,
  ResidentialPropertyDetail,
  CommercialPropertyDetail
};