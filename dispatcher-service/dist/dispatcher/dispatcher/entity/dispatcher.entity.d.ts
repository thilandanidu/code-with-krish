import { OrderItem } from './order-item.entity';
export declare class Dispatcher {
    id: number;
    vehicle_number: number;
    city: String;
    createdAt: Date;
    status: string;
    items: OrderItem[];
}
