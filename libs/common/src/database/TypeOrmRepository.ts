import { BaseEntity } from '@app/common/database/BaseEntity';
import {
  EntityManager,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class TypeOrmRepository<T extends BaseEntity<T>> {
  protected constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  get queryBuilder(): SelectQueryBuilder<T> {
    return this.entityRepository.createQueryBuilder();
  }

  async createEntity(entity: T): Promise<T> {
    // TODO: repository, entityManager save 다른가?
    return this.entityManager.save(entity);
  }

  async findOneEntity(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      throw new NotFoundException('Entity not found.');
    }

    return entity;
  }

  async findOneAndUpdateEntity(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      throw new NotFoundException('Entity not found.');
    }

    return this.findOneEntity(where);
  }

  async findEntities(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDeleteEntity(where: FindOptionsWhere<T>): Promise<void> {
    await this.entityRepository.delete(where);
  }
}
