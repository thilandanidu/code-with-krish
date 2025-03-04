import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { createDispatcherDto } from './dto/create.dispatcher.dto';
import { DispatcherService } from './dispatcher.service';
import { Dispatcher } from './entity/dispatcher.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('dispatcher')
export class DispatcherController {
      constructor(private readonly dispatcherService: DispatcherService) {}
    
    @Post('/dispatch-locations')
    async createCustomer(
      @Body() createDispatcherDto: createDispatcherDto,
    ): Promise<createDispatcherDto> {
      return this.dispatcherService.createDispatch(createDispatcherDto);
    }

    @Get('/dispatch-locations/:city')
    async getVehicleByCity(@Param('city') city: string): Promise<DispatcherService[]> {
    return this.dispatcherService.getVehicleByCity(city);

  }
}









