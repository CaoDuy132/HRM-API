import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/mysql.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import configuration from './config/configuration';
import { LoggerModule } from './common/loggers/logger.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { UserModule } from './modules/user/user.module';
import { IpConfigurationModule } from './modules/ip-configuration/ip-configuration.module';
import { AppEnvironmentModule } from './modules/app-environment/app-environment.module';
import { RoleModule } from './modules/role/role.module';
import { SharedModule } from './shared/shared.module';
import { UserAccessModule } from './modules/user-access/user-access.module';
import { StoreModule } from './modules/store/store.module';
import { UserTokenModule } from './modules/user-token/user-token.module';
import { AuthGuard } from './common/guards';
import { GoogleCloudModule } from './modules/google-cloud/google-cloud.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    LoggerModule,
    DatabaseModule,
    EmployeeModule,
    UserModule,
    IpConfigurationModule,
    AppEnvironmentModule,
    RoleModule,
    SharedModule,
    UserAccessModule,
    StoreModule,
    UserTokenModule,
    AuthModule,
    GoogleCloudModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
