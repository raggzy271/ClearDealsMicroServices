import { ERROR_MESSAGES } from '../constants/error.constants';
import AdminUser from '../models/AdminUser';
import { AdminUserType, AdminUserCreateInput, AdminUserUpdateInput } from '../types/adminUserTypes';
import { formatContactNumber } from '../utils/format';

export const createAdminUser = async (payload: AdminUserCreateInput) => {
    // Check if username exists first
    const existingUser = await AdminUser.findOne({ where: { username: payload.username } });
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER.EXISTS);
    }
    // Format contact number before storing in DB
    const contact_no = formatContactNumber(payload.contact_no);
    // Store in DB
    await AdminUser.create({
        ...payload,
        contact_no,
        password: '',
    });
};

export const getAdminUserById = async (id: number): Promise<AdminUserType | null> => {
    const user = await AdminUser.findByPk(id);
    if (user) {
        return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            contact_no: user.contact_no,
            city: user.city,
            privilege: user.privilege,
            status: user.status,
            role: user.role
        };
    }
    return null;
};

export const getAllAdminUsers = async (): Promise<AdminUserType[]> => {
    const users = await AdminUser.findAll();
    return users.map(user => {
        let contact_no = user.contact_no || '';
        // Format contact number with space after country code
        if (contact_no.startsWith('+91') && contact_no.length > 3) {
            contact_no = `${contact_no.substring(0, 3)} ${contact_no.substring(3)}`;
        }
        return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            contact_no,
            city: user.city,
            privilege: user.privilege,
            status: user.status,
            role: user.role,
        };
    });
};

export const updateAdminUser = async (
    id: number,
    payload: AdminUserUpdateInput
) => {
    const user = await AdminUser.findByPk(id);
    if (!user) {
        return null;
    }

    let { contact_no } = payload
    const updatedUser = await user.update({
        ...payload,
        contact_no,
    });

    // Format contact number before storing in DB
    if (payload.contact_no) {
        const contact_no = formatContactNumber(payload.contact_no);
        return await user.update({
            ...payload,
            contact_no,
        });
    }
    return await user.update(payload);
};

export const deleteAdminUser = async (id: number): Promise<boolean> => {
    const deletedUserCount = await AdminUser.destroy({
        where: { id },
    });
    return !!deletedUserCount;
};