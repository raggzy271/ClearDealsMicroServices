export const adminUserRoles = ['Super Admin', 'Data Operator', 'Relationship Manager'] as const;
export type AdminUserRole = typeof adminUserRoles[number];

// Base interface
export interface AdminUserType {
    id: number;
    full_name: string;
    email: string;
    username: string;
    contact_no: string;
    city: string;
    privilege: string | null;
    status: '0' | '1';
    role: AdminUserRole;
}

// Create Input - all fields required except id
export type AdminUserCreateInput = Omit<AdminUserType, 'id'>

// Update Input - all fields optional except id (which is omitted)
export type AdminUserUpdateInput = Partial<Omit<AdminUserType, 'id' | 'username'>>;

