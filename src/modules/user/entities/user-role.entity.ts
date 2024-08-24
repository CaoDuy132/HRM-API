import { IntIdEntity } from 'src/common/base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity('UserRoles')
export class UserRole extends IntIdEntity {
  @Column({ type: 'int' })
  userId: number;
  @Column({ type: 'varchar' })
  roleId: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}
