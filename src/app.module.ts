import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
