import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Setting } from '../entities';
import {
  BadGatewayException,
  HttpException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { IdGenerator } from '../id_generator/id_generator.service';

@Injectable()
export class FeatureSetting {
  constructor(
    @InjectRepository(Setting) protected settingRepository: Repository<Setting>,
    protected dataSource: DataSource,
    protected idGenerator: IdGenerator,
  ) {}

  getValue?(): Promise<number>;
  setValue?(value: number): Promise<void>;
  protected getOrCreate?(): Promise<void>;
}

@Injectable()
export class MinimumAgeSetting extends FeatureSetting implements OnModuleInit {
  protected setting: Setting;
  static settingName = 'minimun_age';

  async onModuleInit() {
    await this.getOrCreate();
  }

  protected async getOrCreate() {
    const setting = await this.settingRepository.findOne({
      where: {
        name: MinimumAgeSetting.settingName,
      },
    });
    if (!setting) {
      const createdSetting = this.settingRepository.create({
        id: this.idGenerator.generate(),
        name: MinimumAgeSetting.settingName,
        featureDescription: 'minimun age allowed to register an account',
        value: 14,
      });
      await this.settingRepository.insert(createdSetting);
      this.setting = createdSetting;
    }
  }

  async getValue(): Promise<number> {
    return this.setting.value;
  }
  async setValue(value: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.settingRepository.update(
        { name: MinimumAgeSetting.settingName },
        { value },
      );
      if (!result.affected)
        throw new BadGatewayException(
          `${MinimumAgeSetting.settingName} not found in settings table`,
        );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new BadGatewayException();
    } finally {
      await queryRunner.release();
    }
  }
}
