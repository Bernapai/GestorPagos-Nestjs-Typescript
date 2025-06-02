import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'password',
  } as User;

  const mockRepository = {
    create: jest.fn().mockImplementation((dto: CreateUserDto) => dto),
    save: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn().mockResolvedValue([mockUser]),
    findOneBy: jest.fn(),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const dto: CreateUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      };
      mockRepository.create.mockReturnValue(dto);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });

    it('should throw error if user not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(
        'User with id 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const updateDto: UpdateUserDto = {
        name: 'Jane',
        email: 'jane@example.com',
      };
      mockRepository.findOneBy.mockResolvedValue({ ...mockUser, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ ...mockUser, ...updateDto });
    });
  });

  describe('remove', () => {
    it('should delete the user', async () => {
      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await service.findByEmail('john@example.com');
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'john@example.com',
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await service.findByUsername('John');
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ name: 'John' });
      expect(result).toEqual(mockUser);
    });
  });
});
