import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

abstract class IntIdEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

abstract class UUIDIdentifiableEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

abstract class BigintIdEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
}

export { BaseEntity, BigintIdEntity, IntIdEntity, UUIDIdentifiableEntity };
