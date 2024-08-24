import { IntIdEntity } from 'src/common/base';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoleFeature } from './role-feature.entity';

@Entity('Features')
export class Feature extends IntIdEntity {
  @Column()
  name: string;

  @OneToMany(() => RoleFeature, (roleFeature) => roleFeature.feature)
  roleFeatures: RoleFeature[];
}
