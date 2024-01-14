import { Module } from '@nestjs/common';
import { TypeOrmRepository, DatabaseModule } from '@app/common';
import { AccountEntity } from './AccountEntity';
import { AccountEntityRepository } from './AccountEntityRepository';
import { ActivityEntity } from './ActivityEntity';
import { ActivityEntityRepository } from './ActivityEntityRepository';

@Module({
  imports: [DatabaseModule.forFeature([AccountEntity, ActivityEntity])],
  providers: [
    {
      provide: TypeOrmRepository<AccountEntity>,
      useClass: AccountEntityRepository,
    },
    {
      provide: TypeOrmRepository<ActivityEntity>,
      useClass: ActivityEntityRepository,
    },
  ],
  exports: [
    TypeOrmRepository<AccountEntity>,
    TypeOrmRepository<ActivityEntity>,
  ],
})
export class AccountEntityRepositoryModule {}
