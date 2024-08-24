import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {}
  create(createStoreDto: CreateStoreDto) {
    return createStoreDto;
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return updateStoreDto;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
  getStoreById(id: number, options = {}): Promise<Store> {
    const findOneStoreOptions = {
      where: {
        id,
      },
      ...options,
    };
    return this.storeRepo.findOne(findOneStoreOptions);
  }
}
