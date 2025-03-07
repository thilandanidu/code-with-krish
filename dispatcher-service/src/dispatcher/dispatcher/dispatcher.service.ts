import {
    BadRequestException,
    Injectable,
    NotFoundException,
    OnModuleInit,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher.entity';
import { Repository } from 'typeorm';
import { createDispatcherDto } from './dto/create.dispatcher.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';


@Injectable()
export class DispatcherService implements OnModuleInit {
    private readonly redis = new Redis({host: '3.0.159.213', port: 6379});
    private readonly Kafka = new Kafka ({brokers: ['3.0.159.213:9092']})
    private readonly producer = this.Kafka.producer();
    private readonly consumer = this.Kafka.consumer({groupId: 'thilan-dispatcher-service'});
  
    private readonly inventoryServiceUrl = 'http://localhost:3001/products';
    private readonly customerServiceUrl = 'http://localhost:3002/customers';
    private readonly dispatcherServiceUrl = 'http://localhost:3003/dispatchers';

    constructor(
        @InjectRepository(Dispatcher)
        private readonly dispatcherRepository: Repository<Dispatcher>,
      ) {}
    
      async onModuleInit(){
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumeConfirmedOrder(); 
      }

      async createDispatch(createDispatcherDto: createDispatcherDto): Promise<Dispatcher> {
        const dispatcher = this.dispatcherRepository.create(createDispatcherDto);
        return this.dispatcherRepository.save(dispatcher);
      }


        async consumeConfirmedOrder() {
            await this.consumer.subscribe({ topic: 'thilan.order.confirmed', fromBeginning: true });
            await this.consumer.run({
              eachMessage: async ({ message }) => {
                console.log(
        
                  '---------------New order arrived dispatcher-------------------',
        
                );
                const { city } = JSON.parse(message.value?.toString() || '{}');
                const dispatcher = await this.dispatcherRepository.findOne({ where: { city } })
             console.log(dispatcher)
              },
            });
        
          }

          async getVehicleByCity(city: string): Promise<Dispatcher[]> {
            const dispathers = await this.dispatcherRepository.find({ where: { city } });
            if (!dispathers || dispathers.length === 0) {
            // throw new NotFoundException(`Dispatcher with city: ${city} is not have any records`);
            }
            return dispathers;
          }



           //aquire lock
        // for(const item of items){
        //     const lockKey = `thilan:product:${item.productId}:lock`;
        //     const lock = await this.redis.set(lockKey, 'locked', 'EX', 3600*24, 'NX'); //NX means set if not exists
        //     if(!lock){
        //       throw new BadRequestException(
        //         `Product ID ${item.productId} is locked by another process, please try again later `
        //       );
        //   }
        // }




}


  
  
   