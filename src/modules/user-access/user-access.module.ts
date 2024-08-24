import { Module } from '@nestjs/common';
import { UserAccessService } from './user-access.service';
import { UserAccessController } from './user-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccess } from './entities/user-access.entity';

@Module({
  controllers: [UserAccessController],
  providers: [UserAccessService],
  imports: [TypeOrmModule.forFeature([UserAccess])],
  exports: [UserAccessService],
})
export class UserAccessModule {}
