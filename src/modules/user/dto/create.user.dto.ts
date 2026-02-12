import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../interface/user.interface";


export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(5)
    username: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'Format email tidak valid'})
    email: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password minimal 8 karakter'})
    password: string

    @IsEnum(UserRole)
    role: UserRole
}