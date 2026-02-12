export class IUser {
    id: string
    username: string
    email: string
    password: string
    role: UserRole
}

export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin'
}