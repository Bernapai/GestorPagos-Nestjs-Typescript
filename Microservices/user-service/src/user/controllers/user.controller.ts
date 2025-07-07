import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '../services/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'create-user' })
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get-user' })
  async findOne(@Payload() id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-user' })
  async update(
    @Payload() payload: { id: number; dto: UpdateUserDto },
  ): Promise<User> {
    return this.usersService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: 'find-user-by-name' })
  async findByName(@Payload() name: string): Promise<User | null> {
    return this.usersService.findByName(name);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async remove(@Payload() id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
