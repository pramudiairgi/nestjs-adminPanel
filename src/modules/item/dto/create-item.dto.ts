import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty() 
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsInt()
    @Min(0, {message: 'Stock minimal adalah 0'})
    stock: number

    @IsUUID()
    @IsNotEmpty()
    categoryId: string
}
