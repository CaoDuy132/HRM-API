import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { AppEnvironmentService } from '../app-environment/app-environment.service';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { UserAccessService } from '../user-access/user-access.service';
import { EmployeeService } from '../employee/employee.service';
import { StoreService } from '../store/store.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { RoleFeature } from '../role/entities/role-feature.entity';
import { AppEnvironment } from '../app-environment/entities/app-environment.entity';
import { UserRole } from '../user/entities/user-role.entity';
import { ConfigModule } from '@nestjs/config';
import { Employee } from '../employee/entities/employee.entity';
import { UserAccess } from '../user-access/entities/user-access.entity';
import { Store } from '../store/entities/store.entity';
import { IpConfigurationService } from '../ip-configuration/ip-configuration.service';
import { IpConfiguration } from '../ip-configuration/entities/ip-configuration.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        AuthService,
        UserService,
        AppEnvironmentService,
        ApiConfigService,
        UserAccessService,
        EmployeeService,
        StoreService,
        JwtService,
        IpConfigurationService,
        {
          provide: getRepositoryToken(User),
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
