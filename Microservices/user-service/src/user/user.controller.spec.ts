import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    isActive: true,
  };

  const mockUsers: User[] = [mockUser];

  const mockUsersService = {
    create: jest.fn((dto) => Promise.resolve({ ...mockUser, ...dto })),
    findAll: jest.fn(() => Promise.resolve(mockUsers)),
    findOne: jest.fn(() => Promise.resolve(mockUser)),
    update: jest.fn((id, dto) => Promise.resolve({ ...mockUser, ...dto })),
    remove: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      await expect(controller.create(dto)).resolves.toEqual(
        expect.objectContaining(dto),
      );
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll()).resolves.toEqual(mockUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = 1;
      await expect(controller.findOne(id)).resolves.toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const dto: UpdateUserDto = { name: 'Updated User' };
      await expect(controller.update({ id, dto })).resolves.toEqual(
        expect.objectContaining(dto),
      );
      expect(mockUsersService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 1;
      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(mockUsersService.remove).toHaveBeenCalledWith(id);
    });
  });
});
