import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleFeature } from '../role/entities/role-feature.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleCloudModule } from '../google-cloud/google-cloud.module';
import { AppEnvironmentModule } from '../app-environment/app-environment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, RoleFeature]),
    GoogleCloudModule,
    AppEnvironmentModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
