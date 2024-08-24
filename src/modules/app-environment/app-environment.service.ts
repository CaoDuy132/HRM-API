import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEnvironment } from './entities/app-environment.entity';
import { Repository } from 'typeorm';
import { isNumber, assign } from 'lodash';

@Injectable()
export class AppEnvironmentService {
  constructor(
    @InjectRepository(AppEnvironment)
    private readonly appEnvironment: Repository<AppEnvironment>,
  ) {}
  async getAllEnviroment(options = {}) {
    return this.appEnvironment.find(options).then((result) =>
      assign(
        {},
        ...result.map((envi) => ({
          [envi.name]: isNumber(envi.value) ? Number(envi.value) : envi.value,
        })),
      ),
    );
  }
}
