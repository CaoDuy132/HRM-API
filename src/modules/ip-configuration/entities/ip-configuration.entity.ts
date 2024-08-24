import { DELETE_TYPE, IS_ACTIVE_COMMON } from 'src/common/enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('IpConfigurations')
export class IpConfiguration {
  @PrimaryColumn({ type: 'varchar', default: '' })
  ip: string;

  @Column({ type: 'boolean', default: DELETE_TYPE.AVAILABLE })
  deleted: boolean;

  @Column({ type: 'tinyint', default: IS_ACTIVE_COMMON.TRUE })
  status: IS_ACTIVE_COMMON;
}
