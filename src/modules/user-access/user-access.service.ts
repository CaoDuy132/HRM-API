import { Injectable } from '@nestjs/common';
import { CreateUserAccessDto } from './dto/create-user-access.dto';
import { UpdateUserAccessDto } from './dto/update-user-access.dto';
import { Repository } from 'typeorm';
import { UserAccess } from './entities/user-access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IS_ACTIVE_COMMON } from 'src/common/enum';

@Injectable()
export class UserAccessService {
  constructor(
    @InjectRepository(UserAccess)
    private readonly userAccessRepo: Repository<UserAccess>,
  ) {}
  create(createUserAccessDto: CreateUserAccessDto) {
    return `This action adds a new userAccess ${createUserAccessDto}`;
  }

  findAll() {
    return `This action returns all userAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAccess`;
  }

  update(id: number, updateUserAccessDto: UpdateUserAccessDto) {
    return `This action updates a #${id} userAccess ${updateUserAccessDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccess`;
  }

  checkAccessByUserInfor(
    jobTitleId: number,
    employeeId: number,
    storeId: number,
  ) {
    return this.userAccessRepo.findOne({
      where: [
        {
          jobTitleId,
        },
        {
          employeeId,
        },
        {
          storeId,
          deleted: true,
          status: IS_ACTIVE_COMMON.TRUE,
        },
      ],
    });
  }
}
