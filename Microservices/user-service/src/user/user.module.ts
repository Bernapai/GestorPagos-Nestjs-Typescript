import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule], // Asegúrate de que este módulo exista y esté configurado correctamente
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule { }
