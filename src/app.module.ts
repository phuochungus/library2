import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Book } from './entity/Book';
import { Admin } from './entity/Admin';
import { Author } from './entity/Author';
import { BorrowReceiptDetail } from './entity/Borrow_Receipt_Detail';
import { BorrowReceipt } from './entity/Borrow_Receipt';
import { FineReceipt } from './entity/Fine_Receipt';
import { Genre } from './entity/Genre';
import { Publisher } from './entity/Publisher';
import { ReturnReceipt } from './entity/Return_Receipt';
import { ReturnReceiptDetail } from './entity/Return_Receipt_Detail';
import { Setting } from './entity/Setting';
import { Tier } from './entity/Tier';
import { User } from './entity/User';
import { UserToBook } from './entity/UserToBook';
import { GRN } from './entity/GRN';
import { GRNDetail } from './entity/GRN_Detail';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
