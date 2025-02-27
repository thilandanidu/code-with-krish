import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entity/customer.entity';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'cosmos',
      entities: [Customer],
      synchronize: true, // ONLY ON DEV
    }),
  ],
})
export class AppModule {}
