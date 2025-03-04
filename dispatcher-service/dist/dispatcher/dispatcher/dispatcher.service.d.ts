import { OnModuleInit } from '@nestjs/common';
import { Dispatcher } from './entity/dispatcher.entity';
import { Repository } from 'typeorm';
import { createDispatcherDto } from './dto/create.dispatcher.dto';
export declare class DispatcherService implements OnModuleInit {
    private readonly dispatcherRepository;
    private readonly redis;
    private readonly Kafka;
    private readonly producer;
    private readonly consumer;
    private readonly inventoryServiceUrl;
    private readonly customerServiceUrl;
    private readonly dispatcherServiceUrl;
    constructor(dispatcherRepository: Repository<Dispatcher>);
    onModuleInit(): Promise<void>;
    createDispatch(createDispatcherDto: createDispatcherDto): Promise<Dispatcher>;
    consumeConfirmedOrder(): Promise<void>;
    getVehicleByCity(city: string): Promise<Dispatcher[]>;
}
