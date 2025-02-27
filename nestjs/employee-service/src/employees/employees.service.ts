import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    public greeting(): String{
        const message: String = 'Hello from Employee';
        return message;
    }

}
