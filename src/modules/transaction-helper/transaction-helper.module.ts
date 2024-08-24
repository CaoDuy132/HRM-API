import { Module } from '@nestjs/common';
import ormConfig from '../../../ormconfig';
import { TransactionHelper } from './transaction-helper';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await ormConfig.initialize();
        return ormConfig;
      },
    },
    TransactionHelper,
  ],
  exports: [TransactionHelper],
})
export class TransactionHelperModule {}
