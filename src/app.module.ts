import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { IdGeneratorModule } from './id_generator/id_generator.module';
import { AdminsModule } from './admins/admins.module';
import {
  Admin,
  Author,
  Book,
  BorrowReceipt,
  BorrowReceiptDetail,
  FineReceipt,
  GRN,
  GRNDetail,
  Genre,
  Publisher,
  ReturnReceipt,
  ReturnReceiptDetail,
  Setting,
  Tier,
  User,
  UserToBook,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      logging: true,
      maxQueryExecutionTime: 1000,
      synchronize: true,
      entities: [
        Admin,
        Author,
        Book,
        BorrowReceiptDetail,
        BorrowReceipt,
        FineReceipt,
        Genre,
        Publisher,
        ReturnReceipt,
        ReturnReceiptDetail,
        Setting,
        Tier,
        User,
        UserToBook,
        GRN,
        GRNDetail,
      ],
      url: process.env.DATABASE_URL,
    }),
    BooksModule,
    PublishersModule,
    IdGeneratorModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
