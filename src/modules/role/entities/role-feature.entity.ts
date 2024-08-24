import { IntIdEntity } from 'src/common/base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Feature } from './feature.entity';

@Entity('RoleFeatures')
export class RoleFeature extends IntIdEntity {
  @Column()
  roleId: string;

  @Column()
  featureId: string;

  @ManyToOne(() => Role, (role) => role.roleFeatures)
  role: Role;

  @ManyToOne(() => Feature, (feature) => feature.roleFeatures)
  feature: Feature;
}
