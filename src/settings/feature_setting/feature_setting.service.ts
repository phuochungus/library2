import {
  BadGatewayException,
  HttpException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from '../entities/setting.entity';
import { IdGenerator } from '../../id_generator/id_generator.service';
import { Repository } from 'typeorm';
import { ModuleRef } from '@nestjs/core';
import { SettingDispathService } from '../setting_dispath_service/setting_dispath_service.service';

export abstract class FeatureSetting implements OnModuleInit {
  constructor(
    @InjectRepository(Setting) protected settingRepository: Repository<Setting>,
    protected idGenerator: IdGenerator,
    protected moduleRef: ModuleRef,
  ) {}

  abstract defaultName: string;
  abstract defaultFeatureDescription: string;
  abstract defaultValue: number;

  private value: number;
  public id: string;

  async onModuleInit() {
    await this.getOrCreate();
    await this.injectIntoManager();
  }
  private async injectIntoManager() {
    const manager = this.moduleRef.get(SettingDispathService);
    manager.settings.push(this);
  }

  protected async getOrCreate(): Promise<void> {
    let setting = await this.settingRepository.findOne({
      where: {
        name: this.defaultName,
      },
    });
    if (!setting) {
      setting = this.settingRepository.create({
        id: this.idGenerator.generate(),
        name: this.defaultName,
        featureDescription: this.defaultFeatureDescription,
        value: this.defaultValue,
      });
      await this.settingRepository.insert(setting);
    }
    this.value = setting.value;
    this.id = setting.id;
  }

  public getValue(): any {
    return this.value;
  }

  public async setValue(value: number): Promise<void> {
    if (value == this.value) return;
    try {
      const result = await this.settingRepository.update(
        { name: this.defaultName },
        { value },
      );
      // console.log('set value: ' + value);
      if (!result.affected)
        throw new BadGatewayException(
          `${this.defaultName} not found in settings table`,
        );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new BadGatewayException();
    }
  }
}
