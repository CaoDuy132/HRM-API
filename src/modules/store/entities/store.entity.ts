import { IntIdEntity } from 'src/common/base';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('Stores')
export class Store extends IntIdEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  idNhanh: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'int' })
  district: number;

  @Column({ type: 'int' })
  city: number;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'boolean' })
  deleted: boolean;

  @Column({ type: 'varchar', length: 255 })
  shortName: string;

  @Column({ type: 'int' })
  companyId: number;

  @Column({ type: 'int' })
  areaId: number;

  @Column({ type: 'int' })
  storeType: number;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'varchar', length: 255 })
  siteCode: string;

  @Column({ type: 'varchar', length: 255 })
  externalStoreName: string;

  @Column({ type: 'varchar', length: 255 })
  shipCode: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;
}
