import { Module } from '@nestjs/common';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [EmployeesModule],
  controllers: [ EmployeesController],
  providers: [ EmployeesService],
})
export class AppModule {}
