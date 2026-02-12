import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotAcceptableException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { IUser } from './interface/user.interface';
import { FindOneParams } from './dto/find-one.params';
import { UpdateUserDto } from './dto/update.user.dto';
import { Users } from './entities/user.entity';

@Controller('user')
export class UserController {
    // Dependency Injection: Memasukan service ke controller
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<Users[]> {
        return this.userService.findAll()
    }

    @Get("/:id")
    async findOne(@Param() params:FindOneParams): Promise<Users> {
        return await this.findOneOrFail(params.id)
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return await this.userService.create(createUserDto)
    }

    @Put("/:id")
    async update(@Param() params: FindOneParams, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        const user = await this.findOneOrFail(params.id)
        return await this.userService.update(user, updateUserDto)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param() params: FindOneParams): Promise<void> {
        const user = await this.findOneOrFail(params.id)
        return await this.userService.delete(user)
    }

    private async findOneOrFail(id: string): Promise<Users> {
        const user = await this.userService.findOne(id)
        if (!user){
            throw new NotAcceptableException()
        }
        return user
    }
}
