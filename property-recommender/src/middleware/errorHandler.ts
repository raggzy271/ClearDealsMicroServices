import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  errorResponse(res, 'Something went wrong!', err);
}