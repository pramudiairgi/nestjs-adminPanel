import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){ }

    @Post('register')
    async register (@Body() registerDto: RegisterDto){
        return await this.authService.registerUser(registerDto)
    }

    @Post('login')
    async login (@Body() loginDto: LoginDto){
        return await this.authService.loginUser(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get('getUser')
    async getUser(@Request() request): Promise<User | null>{
        return await this.authService.getUser(request.user.id)
    }
}
