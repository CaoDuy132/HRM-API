import { IntIdEntity } from 'src/common/base';
import { DELETE_TYPE, IS_ACTIVE_COMMON } from 'src/common/enum';
import { Entity, Column } from 'typeorm';

@Entity('UserAccesses')
export class UserAccess extends IntIdEntity {
  @Column({ type: 'int', nullable: true })
  jobTitleId: number;

  @Column({ type: 'int', nullable: true })
  employeeId: number;

  @Column({ type: 'int', nullable: true })
  storeId: number;

  @Column({ type: 'varchar', nullable: true })
  ip: string;

  @Column({ type: 'boolean', default: () => DELETE_TYPE.AVAILABLE })
  deleted: boolean;

  @Column({ type: 'boolean', default: () => '0' })
  expireOne: boolean;

  @Column({ type: 'int', default: () => IS_ACTIVE_COMMON.TRUE })
  status: IS_ACTIVE_COMMON;
}
