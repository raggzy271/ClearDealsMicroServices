import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { PropertyFilterParams } from '../types';
import { getProperties } from '../services/propertyService';

export async function listProperties(req: Request, res: Response) {
  try {
    const filters: PropertyFilterParams = {
      state: req.query.state as string | undefined,
      city: req.query.city as string | undefined,
      location: req.query.location as string | undefined,
      property_type: req.query.property_type as string | undefined,
      no_of_bedrooms: req.query.no_of_bedrooms as string | undefined,
      min_budget: req.query.min_budget as string | undefined,
      max_budget: req.query.max_budget as string | undefined,
      for_property: req.query.for_property as 'Rent' | 'Sell',
      sort: req.query.sort as 'new' | 'old' | undefined,
      property_category: req.query.property_category as 'residential' | 'commercial',
      sq_feet_area: req.query.sq_feet_area as string | undefined,
    };

    const properties = await getProperties(filters);
    successResponse(res, 'Properties retrieved successfully', properties);
  } catch (error) {
    errorResponse(res, 'Failed to retrieve properties', error);
  }
}