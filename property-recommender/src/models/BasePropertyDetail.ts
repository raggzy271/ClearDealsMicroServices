import { Model } from 'sequelize';

abstract class BasePropertyDetail extends Model {
  public id!: number;
  public property_id!: number;
  public no_of_bedrooms!: string | null;
  public no_of_bathrooms!: string | null;
  public offer_price!: number | null;
  public offer_price_unit!: string | null;
  public expected_rent!: number | null;
  public expected_rent_unit!: string | null;
}

export default BasePropertyDetail;