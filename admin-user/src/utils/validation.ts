import { ERROR_MESSAGES } from '../constants/error.constants';
import { AdminUserCreateInput, adminUserRoles, AdminUserUpdateInput } from '../types/adminUserTypes';

type ValidationResult = {
    isValid: boolean;
    message?: string;
}

export const validateCreateInput = (input: AdminUserCreateInput): ValidationResult => {
    // Fields
    if (!(input.full_name && input.email && input.username && input.contact_no && input.city && input.status && input.role)) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.MISSING_REQUIRED_FIELDS };
    }
    // Username
    if (!/^[a-zA-Z0-9_]+$/.test(input.username)) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.USERNAME };
    }
    if (input.username.length < 4 || input.username.length > 20) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.USERNAME_LENGTH };
    }
    // Fields are common to both create & update
    return validateUpdateInput(input);
};

export const validateUpdateInput = (input: AdminUserUpdateInput) => {
    // Email
    if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.EMAIL };
    }
    // Status
    if (input.status && !['0', '1'].includes(input.status)) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.STATUS };
    }
    // Role
    if (input.role && !adminUserRoles.includes(input.role)) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.ROLE };
    }
    // Contact number
    if (input.contact_no && !/^(\+91|91)?\s*(\d{10})$/.test(input.contact_no.replace(/\s+/g, ''))) {
        return { isValid: false, message: ERROR_MESSAGES.VALIDATION.CONTACT_NO };
    }
    return { isValid: true };
}