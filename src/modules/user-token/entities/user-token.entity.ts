import { IntIdEntity } from 'src/common/base';
import { DELETE_TYPE, USER_TOKEN_DELETED_BY_ACTION } from 'src/common/enum';
import { Column, Entity } from 'typeorm';

@Entity('UserTokens')
export class UserToken extends IntIdEntity {
  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'text' })
  permissions: string;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'datetime' })
  expiredAt: Date;

  @Column({ type: 'datetime', nullable: true })
  revokedAt: Date;

  @Column({ type: 'varchar' })
  userAgent: string;

  @Column({ type: 'int', default: 0 })
  updatedBy: number;

  @Column({ type: 'boolean', default: DELETE_TYPE.AVAILABLE })
  deleted: boolean;

  @Column({
    type: 'int',
    default: USER_TOKEN_DELETED_BY_ACTION.TOKEN_IS_ACTIVE,
  })
  deletedByAction: number;
}
