import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';

@ApiTags('Usuario')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    // Endpoint para autentificar o usuário no login
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }
}