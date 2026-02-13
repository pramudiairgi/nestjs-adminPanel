import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const category = await this.categoryRepository.findOneBy({id: createItemDto.categoryId})
    
    if (!category){
      throw new NotFoundException("Kategori tidak ditemukan, gagal menambahkan item")
    }

    const newItem = this.itemRepository.create({
      ...createItemDto,
      category: category
    })

    return await this.itemRepository.save(newItem)
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find()
  }

  async findOne(id: string): Promise<Item | null> {
    return await this.itemRepository.findOne({ where: { id } })
  }

  async update(item: Item, updateItemDto: UpdateItemDto): Promise<Item> {
    Object.assign(item, updateItemDto)
    return await this.itemRepository.save(item)
  }

  async remove(item: Item): Promise<void> {
    await this.itemRepository.delete(item.id)
  }
}
