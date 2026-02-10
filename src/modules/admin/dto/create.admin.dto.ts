import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { AdminRole } from "../interface/admin.interface";


export class CreateAdminDto{
    @IsNotEmpty()
    @MinLength(5)
    username: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'Format email tidak valid'})
    email: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password minimal 8 karakter'})
    password: string

    @IsEnum(AdminRole)
    role: AdminRole
}