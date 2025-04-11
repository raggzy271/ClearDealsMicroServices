import { Response } from 'express';

export function successResponse(res: Response, message: string, data: unknown = null, code: number = 200) {
  res.status(code).json({
    success: true,
    message,
    ...(data ? { data } : {})
  });
}

export function errorResponse(res: Response, message: string, error: unknown = null, code: number = 500) {
  res.status(code).json({
    success: false,
    message,
    ...(error ? { error } : {})
  });
}