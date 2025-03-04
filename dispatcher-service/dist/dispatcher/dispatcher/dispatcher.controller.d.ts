import { createDispatcherDto } from './dto/create.dispatcher.dto';
import { DispatcherService } from './dispatcher.service';
export declare class DispatcherController {
    private readonly dispatcherService;
    constructor(dispatcherService: DispatcherService);
    createCustomer(createDispatcherDto: createDispatcherDto): Promise<createDispatcherDto>;
    getVehicleByCity(city: string): Promise<DispatcherService[]>;
}
