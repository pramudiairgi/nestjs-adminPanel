export class IAdmin {
    id: string
    username: string
    email: string
    password: string
    role: AdminRole
}

export enum AdminRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin'
}