import { Injectable } from '@nestjs/common';
import { CreateIpConfigurationDto } from './dto/create-ip-configuration.dto';
import { UpdateIpConfigurationDto } from './dto/update-ip-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IpConfiguration } from './entities/ip-configuration.entity';
import { Repository } from 'typeorm';
import { IS_ACTIVE_COMMON } from 'src/common/enum';
import { CheckIpConfigResponseDto } from './dto';

@Injectable()
export class IpConfigurationService {
  constructor(
    @InjectRepository(IpConfiguration)
    private readonly IpConfigurationRepo: Repository<IpConfiguration>,
  ) {}
  create(CreateIpConfigurationDto: CreateIpConfigurationDto) {
    return `This action adds a new ipConfiguration; ${CreateIpConfigurationDto}`;
  }

  findAll() {
    return `This action returns all ipConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipConfiguration`;
  }

  update(id: number, UpdateIpConfigurationDto: UpdateIpConfigurationDto) {
    return `This action updates a #${id} ipConfiguration ${UpdateIpConfigurationDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipConfiguration`;
  }

  async checkValidIp(ip: string): Promise<CheckIpConfigResponseDto> {
    const ipQuery = await this.IpConfigurationRepo.findOne({
      where: {
        ip,
        deleted: false,
        status: IS_ACTIVE_COMMON.TRUE,
      },
    });
    return new CheckIpConfigResponseDto({
      ipValid: !!ipQuery,
      ip,
    });
  }
}
