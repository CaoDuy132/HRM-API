import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { AppEnvironmentService } from '../app-environment/app-environment.service';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { UserAccessService } from '../user-access/user-access.service';
import { EmployeeService } from '../employee/employee.service';
import { StoreService } from '../store/store.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../user/entities/user-role.entity';
import { RoleFeature } from '../role/entities/role-feature.entity';
import { AppEnvironment } from '../app-environment/entities/app-environment.entity';
import { ConfigService } from '@nestjs/config';
import { Employee } from '../employee/entities/employee.entity';
import { UserAccess } from '../user-access/entities/user-access.entity';
import { Store } from '../store/entities/store.entity';
import { IpConfigurationService } from '../ip-configuration/ip-configuration.service';
import { IpConfiguration } from '../ip-configuration/entities/ip-configuration.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        AppEnvironmentService,
        ApiConfigService,
        UserAccessService,
        EmployeeService,
        StoreService,
        JwtService,
        ConfigService,
        IpConfigurationService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RoleFeature),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AppEnvironment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserAccess),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Store),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(IpConfiguration),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
