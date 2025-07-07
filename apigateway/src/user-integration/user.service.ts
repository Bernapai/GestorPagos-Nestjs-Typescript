import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../../../Microservices/user-service/src/user/dto/createUser.dto';
import { UpdateUserDto } from '../../../Microservices/user-service/src/user/dto/updateUser.dto';
import { User } from '../../../Microservices/user-service/src/user/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return firstValueFrom(
      this.client.send({ cmd: 'create-user' }, createUserDto),
    );
  }

  async findAll(): Promise<User[]> {
    return firstValueFrom(this.client.send({ cmd: 'get-users' }, {}));
  }

  async findOne(id: number): Promise<User> {
    return firstValueFrom(this.client.send({ cmd: 'get-user' }, id));
  }

  async findByName(name: string): Promise<User | null> {
    return firstValueFrom(
      this.client.send({ cmd: 'find-user-by-name' }, name),
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return firstValueFrom(
      this.client.send({ cmd: 'update-user' }, { id, dto: updateUserDto }),
    );
  }

  async remove(id: number): Promise<void> {
    return firstValueFrom(this.client.send({ cmd: 'delete-user' }, id));
  }
}
