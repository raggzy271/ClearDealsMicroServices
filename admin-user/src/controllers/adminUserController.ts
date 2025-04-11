import { Request, Response } from 'express';
import * as adminUserService from '../services/adminUserService';
import { AdminUserCreateInput, AdminUserUpdateInput } from '../types/adminUserTypes';
import { successResponse, errorResponse } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/error.constants';

export const createAdminUser = async (req: Request, res: Response) => {
    try {
        const payload: AdminUserCreateInput = req.body;
        await adminUserService.createAdminUser(payload);
        successResponse(res, 'Admin user was created successfully.', null, 201);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === ERROR_MESSAGES.USER.EXISTS) {
            errorResponse(res, error.message, null, ERROR_CODES.BAD_REQUEST);
        }
        else {
            errorResponse(res, 'Failed to create admin user', error);
        }
    }
};

export const getAdminUsers = async (req: Request, res: Response) => {
    try {
        const users = await adminUserService.getAllAdminUsers();
        successResponse(res, 'Admin users retrieved successfully.', users);
    } catch (error: unknown) {
        errorResponse(res, 'Failed to retrieve admin users', error);
    }
};

export const getAdminUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await adminUserService.getAdminUserById(id);
        if (user) {
            successResponse(res, 'Admin user retrieved successfully.', user);
            return;
        }
        errorResponse(res, ERROR_MESSAGES.USER.NOT_FOUND, null, ERROR_CODES.NOT_FOUND);
    } catch (error: unknown) {
        errorResponse(res, 'Failed to retrieve admin user', error);
    }
};

export const updateAdminUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const payload: AdminUserUpdateInput = req.body;
        const user = await adminUserService.updateAdminUser(id, payload);
        if (user) {
            successResponse(res, 'Admin user updated successfully.');
            return;
        }
        errorResponse(res, ERROR_MESSAGES.USER.NOT_FOUND, null, ERROR_CODES.NOT_FOUND);
    } catch (error: unknown) {
        errorResponse(res, 'Failed to update admin user', error);
    }
};

export const deleteAdminUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await adminUserService.deleteAdminUser(id);
        if (success) {
            successResponse(res, 'Admin user deleted successfully.');
            return;
        }
        errorResponse(res, ERROR_MESSAGES.USER.NOT_FOUND, null, ERROR_CODES.NOT_FOUND);
    } catch (error: unknown) {
        errorResponse(res, 'Failed to delete admin user', error);
    }
};