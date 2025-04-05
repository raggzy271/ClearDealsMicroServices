interface PropertyFilterParams {
    state?: string;
    city?: string;
    location?: string;
    property_type?: string;
    no_of_bedrooms?: string;
    min_budget?: string;
    max_budget?: string;
    for_property: 'Rent' | 'Sell';
    sort?: 'new' | 'old';
    property_category: 'residential' | 'commercial';
    sq_feet_area?: string;
}

export default PropertyFilterParams;