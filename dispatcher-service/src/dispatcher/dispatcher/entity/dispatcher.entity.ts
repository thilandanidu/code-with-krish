import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { OrderItem } from './order-item.entity';
  
  @Entity()
  export class Dispatcher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    vehicle_number: number;
    @Column()
    city: String;
    @CreateDateColumn()
    createdAt: Date;
    @Column({ default: 'PENDING' })
    status: string;
  
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    items: OrderItem[];
  }
  