import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(user: RegisterUserDto) {
    return this.authService.register(user);
  }
}
