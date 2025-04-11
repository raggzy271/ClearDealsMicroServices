export const ERROR_MESSAGES = {
    USER: {
        EXISTS: 'Username already taken',
        NOT_FOUND: 'User not found',
        INVALID_CREDENTIALS: 'Invalid credentials'
    },
    VALIDATION: {
        EMAIL: 'Invalid email format',
        STATUS: 'Status must be either "0" or "1"',
        ROLE: 'Invalid Role',
        CONTACT_NO: 'Invalid contact number format',
        BAD_REQUEST: 'You\'ve sent invalid data for admin user.',
        MISSING_REQUIRED_FIELDS: 'Missing required fields',
        USERNAME: 'Username can only contain letters, numbers and underscores',
        USERNAME_LENGTH: 'Username must be between 4 and 20 characters'
    }
};

export const ERROR_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};