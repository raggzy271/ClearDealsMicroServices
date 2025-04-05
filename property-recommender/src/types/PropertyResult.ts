interface PropertyResult {
  id: number;
  property_name: string;
  property_type: string;
  for_property: string;
  state: string;
  city: string;
  location: string;
  no_of_bedrooms?: string;
  no_of_bathrooms?: string;
  price?: string;
  main_image?: string;
  property_url: string;
  property_category: 'residential' | 'commercial';
  sq_feet_area?: string;
}

export default PropertyResult;