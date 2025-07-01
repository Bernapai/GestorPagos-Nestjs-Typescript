import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user-integration/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginUserDto) {
    const { name, password } = loginDto;
    const user = await this.usersService.findByName(name);
    const isPasswordValid = await bcrypt.compare(password, user?.password || '');

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }



  async register({ name, password, email }: RegisterUserDto) {
    const existingUser = await this.usersService.findByName(name);

    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

  }


}
