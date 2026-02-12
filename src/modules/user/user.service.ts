import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private UserRepository: Repository<Users>
    ) {}

    async create(dto: CreateUserDto): Promise<Users>{
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds)
        const userToSave = {
            ...dto,
            password: hashedPassword
        }
        return await this.UserRepository.save(userToSave)
    }

    async findAll(): Promise<Users[]> {
        return await this.UserRepository.find()
    }

    async findOne(id:string): Promise<Users | null> {
        return await this.UserRepository.findOne({ where: { id }})
    }

    async update(user: IUser, updateUserDto: UpdateUserDto): Promise<Users> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
        }
        
        Object.assign(user, updateUserDto)
        return await this.UserRepository.save(user)
    }

    async delete(userData: IUser): Promise<void> {
        await this.UserRepository.delete(userData.id)
    }
    
    
}
