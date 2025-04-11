import { Request, Response, NextFunction } from 'express';
import { validateCreateInput, validateUpdateInput } from '../utils/validation';
import { errorResponse } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/error.constants';

export const validateAdminUserCreate = (req: Request, res: Response, next: NextFunction) => {
    const validation = validateCreateInput(req.body);
    if (!validation.isValid) {
        errorResponse(res, validation.message || ERROR_MESSAGES.VALIDATION.BAD_REQUEST, null, ERROR_CODES.BAD_REQUEST);
        return;
    }
    next();
};

export const validateAdminUserUpdate = (req: Request, res: Response, next: NextFunction) => {
    const validation = validateUpdateInput(req.body);
    if (!validation.isValid) {
        errorResponse(res, validation.message || ERROR_MESSAGES.VALIDATION.BAD_REQUEST, null, ERROR_CODES.BAD_REQUEST);
        return;
    }
    next();
};