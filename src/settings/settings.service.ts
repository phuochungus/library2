import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Setting } from '../entities';
import { Client } from 'pg';
import { SettingDispathService } from './setting_dispath_service/setting_dispath_service.service';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
    private dataSource: DataSource,
    private pgClient: Client,
    private settingDispathService: SettingDispathService,
  ) {}

  private channel = 'test';

  async onModuleInit() {
    await this.createNotify();
    await this.pgClient.connect();
    await this.pgClient.query(`LISTEN ${this.channel}`);
    this.pgClient.on('notification', (notification) => {
      console.log('Received notification on channel', notification.channel);
      console.log('Notification payload:', notification.payload);
      const payload = JSON.parse(notification.payload!);
      this.settingDispathService.dispatch(payload.id, payload.value);
    });
  }

  private async createNotify() {
    if (this.dataSource.driver.options.type == 'postgres') {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();

      try {
        await queryRunner.query(`
        CREATE OR REPLACE FUNCTION notify_change() RETURNS TRIGGER AS $$
        DECLARE
        json TEXT :='{';
        BEGIN
        json := json || '"id": "' || NEW.id || '",';

        IF (OLD.name IS DISTINCT FROM NEW.name) THEN 
          json := json || '"name": "' || NEW.name || '",';
        END IF;
        IF (OLD.value IS DISTINCT FROM NEW.value) THEN 
          json := json || '"value": ' || NEW.value || ',';
        END IF;

        json := substring(json, 1, length(json) - 1);
        json := json || '}';

        PERFORM pg_notify('${this.channel}', json);
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE TRIGGER settings_notifier 
        AFTER UPDATE ON setting
        FOR EACH ROW
        WHEN (OLD.value IS DISTINCT FROM NEW.value)
        EXECUTE FUNCTION notify_change();
        `);
      } catch (error) {
        console.error(error);
      } finally {
        await queryRunner.release();
      }
    }
  }

  getSettingValueByName(name: string) {
    return this.settingDispathService.getSettingByName(name)?.getValue();
  }

  async setSettingByName(name: string, value: number) {
    const setting = this.settingDispathService.getSettingByName(name);
    if (!setting) throw new NotFoundException('Setting name not found');
    return await setting.setValue(value);
  }
}
