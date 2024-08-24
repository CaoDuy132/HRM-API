import { Module } from '@nestjs/common';
import { AppEnvironmentService } from './app-environment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEnvironment } from './entities/app-environment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppEnvironment])],
  controllers: [],
  providers: [AppEnvironmentService],
  exports: [AppEnvironmentService],
})
export class AppEnvironmentModule {}
