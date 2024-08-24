import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { ErrorCode } from 'src/common/error-code';
import { BadRequestException } from 'src/common/exceptions';
import { In, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { DELETE_TYPE } from 'src/common/enum';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return `This action adds a new employee ${createEmployeeDto}`;
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee ${updateEmployeeDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
  updateEmployee(id: number, employeeModel) {
    const updateEmployeeEntity = omit(employeeModel, 'id');
    return this.employeeRepo.update(id, updateEmployeeEntity);
  }

  async findOneBy(whereClause = {}, otherOptions = {}) {
    return this.employeeRepo.findOne({
      where: {
        ...whereClause,
        deleted: Boolean(DELETE_TYPE.AVAILABLE),
      },
      ...otherOptions,
    });
  }

  async getEmployeeIdByUserId(userId) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        deleted: false,
      },
      relations: {
        employee: true,
      },
    });

    if (!user) {
      throw new Error(`User with id = ${userId} not existed`);
    }

    return user.employeeId;
  }

  async getListEmployeeByIds(ids: number[]) {
    return await this.employeeRepo.find({
      where: {
        id: In(ids),
      },
      select: ['id', 'fullName'],
    });
  }
}
