import { generatePropertyUrl } from '../utils/urlUtils';
import { PropertyFilterParams, PropertyResult } from '../types';
import { Op, Order } from 'sequelize';
import { CommercialProperty, CommercialPropertyDetail, ResidentialProperty, ResidentialPropertyDetail } from '../models';

export async function getProperties(filters: PropertyFilterParams): Promise<PropertyResult[]> {
  if (!filters.for_property) {
    throw new Error('for_property type ("Rent" or "Sell") is required');
  }
  if (!filters.property_category) {
    throw new Error('property_category is required');
  }
  if (!['residential', 'commercial'].includes(filters.property_category)) {
    throw new Error('Invalid property_category');
  }

  const PropertyModel = filters.property_category === 'commercial'
    ? CommercialProperty
    : ResidentialProperty;
  const PropertyDetailModel = filters.property_category === 'commercial'
    ? CommercialPropertyDetail
    : ResidentialPropertyDetail;

  // Build the where clause
  const whereClause: any = {
    status: '1',
    ...(filters.state && { State: filters.state }),
    ...(filters.city && { city: filters.city }),
    ...(filters.location && { location: { [Op.like]: `%${filters.location}%` } }),
    ...(filters.property_type && { property_type: filters.property_type }),
    ...(filters.for_property && { for_property: filters.for_property })
  };

  const priceConditions: any[] = [];

  if (filters.min_budget || filters.max_budget) {
    const minParts = filters.min_budget?.split(' ') || [];
    const maxParts = filters.max_budget?.split(' ') || [];

    const minValue = parseFloat(minParts[0]) || 0;
    const minUnit = minParts[1];
    const maxValue = parseFloat(maxParts[0]) || Infinity;
    const maxUnit = maxParts[1];

    var priceColumn: string, priceUnitColumn: string;
    if (filters.for_property === 'Rent') {
      priceColumn = 'expected_rent';
      priceUnitColumn = 'expected_rent_unit';
    }
    else {
      priceColumn = 'offer_price';
      priceUnitColumn = 'offer_price_unit';
    }

    // Helper function to create price conditions
    const createPriceCondition = (value: number, unit: string, operator: any) => {
      const conditions: any = {};
      conditions[priceColumn] = { [operator]: value };
      conditions[priceUnitColumn] = unit;
      return conditions;
    };

    // Handle all possible unit combinations
    if (minUnit && maxUnit) {
      if (minUnit === maxUnit) {
        // Same units (e.g., Thousand-Thousand)
        const conditions: any = {};
        conditions[priceColumn] = { [Op.between]: [minValue, maxValue] };
        conditions[priceUnitColumn] = minUnit;
        priceConditions.push(conditions);
      } else {
        // Different units (e.g., Thousand-Lacs)
        priceConditions.push(
          createPriceCondition(minValue, minUnit, Op.gte),
          createPriceCondition(maxValue, maxUnit, Op.lte)
        );
      }
    } else if (minUnit) {
      // Only min price specified
      priceConditions.push(createPriceCondition(minValue, minUnit, Op.gte));
    } else if (maxUnit) {
      // Only max price specified
      priceConditions.push(createPriceCondition(maxValue, maxUnit, Op.lte));
    }
  }

  const whereDetailClause: any = {
    ...(filters.sq_feet_area && { no_of_bedrooms: filters.sq_feet_area }),
    ...(priceConditions.length > 0 && { [Op.or]: priceConditions })
  };

  // Build the include clause with potential bedroom filter
  const includeClause: any = {
    model: PropertyDetailModel,
    as: 'propertyDetail',
    attributes: ['no_of_bedrooms', 'no_of_bathrooms', 'offer_price', 'offer_price_unit', 'expected_rent', 'expected_rent_unit'],
    where: whereDetailClause
  };

  // Set sort order
  const sortOrder: Order = filters.sort === 'new' ? [['id', 'DESC']] : [['id', 'ASC']];

  // Execute the query
  const properties = await PropertyModel.findAll({
    where: whereClause,
    include: [includeClause],
    order: sortOrder,
    logging: console.log // Log the generated SQL for debugging
  });

  // Transform and calculate relevance
  const results: PropertyResult[] = properties.map(prop => {
    const propertyData = prop.get({ plain: true });

    // Ensure all required fields have values
    const result: PropertyResult = {
      id: propertyData.id,
      property_name: propertyData.property_name || '',
      property_type: propertyData.property_type || '',
      for_property: propertyData.for_property || '',
      state: propertyData.State || '',
      city: propertyData.city || '',
      location: propertyData.location || '',
      sq_feet_area: propertyData.propertyDetail?.no_of_bedrooms || '',
      no_of_bathrooms: propertyData.propertyDetail?.no_of_bathrooms || '',
      price: [propertyData.propertyDetail?.[priceColumn] || '', propertyData.propertyDetail?.[priceUnitColumn] || ''].join(' '),
      property_url: generatePropertyUrl(propertyData.id, propertyData.property_name, filters.property_category),
      property_category: filters.property_category!
    };

    return result;
  });

  return results;
}