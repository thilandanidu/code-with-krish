import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrderDto } from 'src/orders/dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from 'src/orders/dto/update-order.dto';
import { OrderItem } from 'src/orders/entity/order-item.entity';
import { Order } from 'src/orders/entity/order.entity';
import { async } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem> )
    {}

    async create(createOrderDto: createOrderDto): Promise<Order>{
     const{customerId, items } = createOrderDto;
     
     const order = this.orderRepository.create({
        customerId,
        status: 'PENDING'
     });
     const saveOrder = await this.orderRepository.save(order);
  
      const orderItems = items.map((item) =>
        this.orderItemRepository.create({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          order: saveOrder,
        }),
    );

    await this.orderItemRepository.save(orderItems);

    return this.orderRepository.findOne({
        where: { id: saveOrder.id },
        relations: ['items'],
    });
  }  


    fetch(id: any) {
        return this.orderRepository.findOne({
          where: { id: id },
          relations: ['items'],
        });
    }


    async fetchAll(){
        return await this.orderRepository.find({
            relations: ['items']
        });
    }

    async updateOrderStatus(id: number, updateOrderStatus: UpdateOrderStatus) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`order with id: ${id} is not found`);
        }

        if (
            order.status === OrderStatus.DELIVERED ||
            order.status === OrderStatus.CANCELLED
        ) {
            throw new BadRequestException(
                `Order status cannot be changed when its deliverd or cancelled `
            );
        }

        order.status=updateOrderStatus.status;

        return await this.orderRepository.save(order);

    }

 
}

