import { IntIdEntity } from 'src/common/base';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('Employees')
export class Employee extends IntIdEntity {
  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  phoneNo: string;

  @Column({ type: 'timestamp' })
  birthDay: Date;

  @Column({ type: 'int' })
  jobTitleId: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  mobile: string;

  @Column({ type: 'int' })
  storeId: number;

  @Column({ type: 'text' })
  listStoreId: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'boolean' })
  deleted: boolean;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'int' })
  areaId: number;

  @Column({ type: 'int' })
  regionId: number;

  @Column({ type: 'int' })
  departmentId: number;

  @Column({ type: 'double precision', precision: 20, scale: 10, default: 0 })
  personalAllowance: number;

  @Column({ type: 'double precision', precision: 20, scale: 10, default: 0 })
  selfAllowance: number;

  @Column({ type: 'int', default: 0 })
  dependent: number;

  @Column({ type: 'timestamp', nullable: true })
  commencementDate: Date;

  @Column({ type: 'boolean', default: false })
  isPayPersonalIncomeTax: boolean;

  @Column({ type: 'int' })
  departmentUnit: number;

  @Column({ type: 'double precision', precision: 20, scale: 10, default: 0 })
  transportationAllowanceAmount: number;
  @OneToOne(() => User, (user) => user.employee)
  users: User[];
}
