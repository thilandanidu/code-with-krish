import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/order-item.entity';
import { Order } from './entity/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
