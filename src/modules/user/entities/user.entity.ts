import { IntIdEntity } from 'src/common/base';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('Users')
export class User extends IntIdEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'int' })
  employeeId: number;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @Column({ type: 'int' })
  isActive: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginDate: Date;

  @Column({ type: 'int', default: 0 })
  failedLoginCount: number;

  @Column({ type: 'timestamp' })
  passwordModifyDate: Date;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'int', default: 0 })
  actionMode: number;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @ManyToOne(() => Employee, (employee) => employee.users)
  employee: Employee;
}
