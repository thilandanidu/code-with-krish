import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(customerData: CreateCustomerDto) {
 
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: customerData.email },
    });
    if (existingCustomer) {
      throw new BadRequestException('Email already registered');
    }

    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    return customer;
  }

  fetchAll() {
    return this.customerRepository.find();
  }
}