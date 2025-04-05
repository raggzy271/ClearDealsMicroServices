import { Response } from 'express';

export function successResponse(res: Response, message: string, data: any = null, statusCode: number = 200) {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function errorResponse(res: Response, message: string, error: any = null, statusCode: number = 500) {
  res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error
  });
}