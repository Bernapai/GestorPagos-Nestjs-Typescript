import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import { UsersService } from '../../../Microservices/user-service/src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(user: LoginUserDto) {
    const userFound = await this.userService.findByUsername(user.name);
    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: userFound.name, sub: userFound.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
