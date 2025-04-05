import { Model } from 'sequelize';

abstract class BaseProperty extends Model {
  public id!: number;
  public form_no!: string | null;
  public property_name!: string;
  public property_type!: string;
  public for_property!: string;
  public State!: string;
  public city!: string;
  public location!: string;
  public status!: '0' | '1';
  public display_order!: number;
  public url!: string;
  public hit!: number | null;
}

export default BaseProperty;