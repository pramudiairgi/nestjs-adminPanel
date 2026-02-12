import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../enum/role.enum";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/[A-Z]/, {
        message: "Password minimal ada 1 huruf kapital"
    })
    password: string

    @IsOptional()
    @IsEnum(Role)
    role: Role
}