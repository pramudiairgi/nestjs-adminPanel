import { Injectable } from '@nestjs/common';
import { IAdmin } from './interface/admin.interface';
import { CreateAdminDto } from './dto/create.admin.dto';
import { randomUUID } from 'crypto';
import { UpdateAdminDto } from './dto/update.admin.dto';

@Injectable()
export class AdminService {
    // membuat database sementara
    private admins: IAdmin[] = []

    create(dto: CreateAdminDto){
        const newAdmin: IAdmin = {
            id: randomUUID(),
            ...dto
        }
        this.admins.push(newAdmin)
        return newAdmin
    }

    findAll(): IAdmin[] {
        return this.admins
    }

    findOne(id:string): IAdmin | undefined {
        return this.admins.find(item => item.id === id)
    }

    update(admin: IAdmin, updateAdminDto: UpdateAdminDto): IAdmin {
        Object.assign(admin, updateAdminDto)
        return admin
    }

    delete(id: string): void {
        this.admins = this.admins.filter(item => item.id === id)
    }
    
    
}
