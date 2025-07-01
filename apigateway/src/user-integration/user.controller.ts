import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from '../../../Microservices/user-service/src/user/dto/createUser.dto';
import { UpdateUserDto } from '../../../Microservices/user-service/src/user/dto/updateUser.dto';
import { User } from '../../../Microservices/user-service/src/user/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Buscar usuario por nombre' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<User | null> {
    return this.usersService.findByName(name);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.update(Number(id), dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(Number(id));
  }
}
