import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpConfiguration } from './entities/ip-configuration.entity';
import { IpConfigurationController } from './ip-configuration.controller';
import { IpConfigurationService } from './ip-configuration.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpConfiguration])],
  controllers: [IpConfigurationController],
  providers: [IpConfigurationService],
  exports: [IpConfigurationService],
})
export class IpConfigurationModule {}
