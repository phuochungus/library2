import {
  BadGatewayException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BasicRepository } from '../abstracts';
import { Tier, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import * as moment from 'moment';
import { IdGenerator } from '../id_generator/id_generator.service';

export abstract class UserRepository extends BasicRepository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  abstract remove(identifier: any): Promise<void>;
  abstract update(
    identifier: any,
    updateDto: UpdateUserDto,
  ): Promise<User | null>;

  abstract findOneByEmail(email: string): Promise<User | null>;
}
@Injectable()
export class StandardUserRepository implements UserRepository {
  constructor(
    @InjectRepository(Tier)
    private tiersRespository: Repository<Tier>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private IdGenerator: IdGenerator,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const createdUser = this.userRepository.create(createDto);
      await queryRunner.connect();
      await queryRunner.startTransaction('READ COMMITTED');
      const [hashedPassword, defaultTier, defaultValidTime] = await Promise.all(
        [
          hash(createdUser.password, 10),
          this.getDefaultTier(),
          this.getDefaultValidTime(),
        ],
      );

      if (!defaultTier)
        throw new BadGatewayException(
          'Default tier is not defined or not found in database',
        );
      createdUser.id = this.IdGenerator.generate();
      createdUser.password = hashedPassword;
      createdUser.tier = defaultTier;
      createdUser.validUntil = moment().add(defaultValidTime, 'days').toDate();
      await this.userRepository.insert(createdUser);
      await queryRunner.commitTransaction();
      return createdUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code == '23505')
        throw new ConflictException('Email already taken!');
      if (!(error instanceof HttpException)) console.error(error);
      throw new BadGatewayException();
    } finally {
      await queryRunner.release();
    }
  }

  private async getDefaultTier() {
    return await this.tiersRespository.findOne({ where: { id: 1 } });
  }

  private async getDefaultValidTime() {
    return 180;
  }

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User | null> {
    try {
      const result = await this.userRepository.update({ id }, updateDto);
      if (result.affected == 0) return null;
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.error;
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete({ id });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
