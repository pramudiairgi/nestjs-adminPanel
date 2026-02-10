import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotAcceptableException, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create.admin.dto';
import { IAdmin } from './interface/admin.interface';
import { FindOneParams } from './dto/find-one.params';
import { UpdateAdminDto } from './dto/update.admin.dto';

@Controller('admin')
export class AdminController {
    // Dependency Injection: Memasukan service ke controller
    constructor(private readonly adminService: AdminService) {}

    @Get()
    findAll(): IAdmin[] {
        return this.adminService.findAll()
    }

    @Get("/:id")
    findOne(@Param() params:FindOneParams): IAdmin {
        return this.findOneOrFail(params.id)
    }

    @Post()
    create(@Body() createAdminDto: CreateAdminDto): IAdmin {
        return this.adminService.create(createAdminDto)
    }

    @Put("/:id")
    update(@Param() params: FindOneParams, @Body() updateAdminDto: UpdateAdminDto): IAdmin {
        const admin = this.findOneOrFail.apply(params.id)
        return this.adminService.update(admin, updateAdminDto)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param() params: FindOneParams): void {
        const admin = this.findOneOrFail.apply(params.id)
        return this.adminService.delete(admin)
    }

    private findOneOrFail(id: string): IAdmin {
        const admin = this.adminService.findOne(id)
        if (!admin){
            throw new NotAcceptableException()
        }
        return admin
    }
}
