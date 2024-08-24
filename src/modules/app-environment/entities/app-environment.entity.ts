import { DELETE_TYPE } from 'src/common/enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('AppEnvironments')
export class AppEnvironment {
  @PrimaryColumn({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  value: string;

  @Column({ type: 'boolean', default: DELETE_TYPE.AVAILABLE })
  deleted: boolean;
}
