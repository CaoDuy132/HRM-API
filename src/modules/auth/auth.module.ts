import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateHelper } from 'src/common/helpers';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { AppEnvironmentModule } from '../app-environment/app-environment.module';
import { AppEnvironment } from '../app-environment/entities/app-environment.entity';
import { EmployeeModule } from '../employee/employee.module';
import { Employee } from '../employee/entities/employee.entity';
import { IpConfigurationModule } from '../ip-configuration/ip-configuration.module';
import { Store } from '../store/entities/store.entity';
import { StoreModule } from '../store/store.module';
import { UserAccess } from '../user-access/entities/user-access.entity';
import { UserAccessModule } from '../user-access/user-access.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IpConfiguration } from '../ip-configuration/entities/ip-configuration.entity';
import { UserTokenModule } from '../user-token/user-token.module';
import { UserToken } from '../user-token/entities/user-token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      IpConfiguration,
      AppEnvironment,
      UserAccess,
      Employee,
      Store,
      UserToken,
    ]),
    UserModule,
    EmployeeModule,
    IpConfigurationModule,
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        global: true,
        secret: configService.jwt.jwt_token,
        signOptions: {
          algorithm: 'HS256',
          expiresIn: '2d',
        },
        verifyOptions: {
          algorithms: ['HS256'],
          secret: configService.jwt.jwt_token,
        },
      }),
      // global: true,
      inject: [ApiConfigService],
    }),
    DateHelper,
    AppEnvironmentModule,
    UserAccessModule,
    EmployeeModule,
    StoreModule,
    UserTokenModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
