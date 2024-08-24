import { BaseEntity } from 'src/common/base';
import { UserRole } from 'src/modules/user/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleFeature } from './role-feature.entity';

@Entity('Roles')
export class Role extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RoleFeature, (roleFeature) => roleFeature.role)
  roleFeatures: RoleFeature[];
}
