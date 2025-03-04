"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatcherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dispatcher_entity_1 = require("./entity/dispatcher.entity");
const typeorm_2 = require("typeorm");
const kafkajs_1 = require("kafkajs");
const ioredis_1 = require("ioredis");
let DispatcherService = class DispatcherService {
    constructor(dispatcherRepository) {
        this.dispatcherRepository = dispatcherRepository;
        this.redis = new ioredis_1.Redis({ host: '3.0.159.213', port: 6379 });
        this.Kafka = new kafkajs_1.Kafka({ brokers: ['3.0.159.213:9092'] });
        this.producer = this.Kafka.producer();
        this.consumer = this.Kafka.consumer({ groupId: 'thilan-dispatcher-service' });
        this.inventoryServiceUrl = 'http://localhost:3001/products';
        this.customerServiceUrl = 'http://localhost:3002/customers';
        this.dispatcherServiceUrl = 'http://localhost:3003/dispatchers';
    }
    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumeConfirmedOrder();
    }
    async createDispatch(createDispatcherDto) {
        const dispatcher = this.dispatcherRepository.create(createDispatcherDto);
        return this.dispatcherRepository.save(dispatcher);
    }
    async consumeConfirmedOrder() {
        await this.consumer.subscribe({ topic: 'thilan.order.confirmed', fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log('---------------New order arrived dispatcher-------------------');
                const { city } = JSON.parse(message.value?.toString() || '{}');
                const dispatcher = await this.dispatcherRepository.findOne({ where: { city } });
                console.log(dispatcher);
            },
        });
    }
    async getVehicleByCity(city) {
        return await this.dispatcherRepository.find({ where: { city } });
    }
};
exports.DispatcherService = DispatcherService;
exports.DispatcherService = DispatcherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dispatcher_entity_1.Dispatcher)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DispatcherService);
//# sourceMappingURL=dispatcher.service.js.map