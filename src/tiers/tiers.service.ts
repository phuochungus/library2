import {
  BadGatewayException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { Tier } from '../entities';
import { BasicRepository } from '../abstracts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export abstract class TierRepository extends BasicRepository<
  Tier,
  CreateTierDto,
  UpdateTierDto
> {
  abstract update(
    identifier: any,
    updateDto: UpdateTierDto,
  ): Promise<Tier | null>;

  abstract remove(identifier: any): Promise<void>;
}

@Injectable()
export class StandardTierRepository implements TierRepository {
  constructor(
    @InjectRepository(Tier)
    private tiersRespository: Repository<Tier>,
  ) {}

  async create(createDto: CreateTierDto): Promise<Tier> {
    try {
      const createdTier = this.tiersRespository.create(createDto);
      await this.tiersRespository.insert(createdTier);
      return createdTier;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }
  async findAll(): Promise<Tier[]> {
    try {
      return await this.tiersRespository.find();
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }
  async findOne(id: number): Promise<Tier | null> {
    try {
      return await this.tiersRespository.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }
  async update(id: number, updateDto: UpdateTierDto): Promise<Tier | null> {
    try {
      const result = await this.tiersRespository.update({ id }, updateDto);
      if (result.affected == 0) return null;
      return await this.tiersRespository.findOne({ where: { id } });
    } catch (error) {
      console.error;
      throw error;
    }
  }
  async remove(id: number): Promise<void> {
    try {
      const result = await this.tiersRespository.delete({ id });
      if (result.affected == 0) throw new NotFoundException();
    } catch (error) {
      if (!(error instanceof HttpException)) console.error(error);
      throw error;
    }
  }
}
