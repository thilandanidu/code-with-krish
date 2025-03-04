import { Module } from '@nestjs/common';
import { DispatcherModule } from './dispatcher/dispatcher/dispatcher.module';
import { DispatcherController } from './dispatcher/dispatcher/dispatcher.controller';
import { Dispatcher } from './entity/dispatcher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DispatcherModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'cosmos',
      entities: [Dispatcher],
      synchronize: true, //only on dev
    }),
  ],
})
export class AppModule {}
