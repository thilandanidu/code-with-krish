import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit{

  private readonly Kafka = new Kafka ({brokers: ['3.0.159.213:9092']})
  private readonly consumer = this.Kafka.consumer({groupId: 'thilan-notification-service'});


    async onModuleInit() {
        await this.consumerOrderCreated();
    }

    async consumerOrderCreated(){
        await this.consumer.subscribe({topic: 'thilan.order.notification'});
        await this.consumer.run({
          eachMessage: async ({message}) => {
            const eventData = JSON.parse(
              message.value.toString(),
            );
            console.log('Order Confirmed Event Received:', eventData);

        }
        });
    
    }
      
}
