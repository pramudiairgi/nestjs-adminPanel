import { Controller, Get, Post, Body, Param, Delete, NotAcceptableException, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { FindOneParams } from './dto/find-one.params';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return await this.findOneOrFail(id)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param() params: FindOneParams, @Body() updateItemDto: UpdateItemDto) {
    const item = await this.findOneOrFail(params.id)
    return this.itemService.update(item, updateItemDto)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param() params: FindOneParams): Promise<void> {
    const item = await this.findOneOrFail(params.id)
    return await this.itemService.remove(item)
  }

  private async findOneOrFail(id: string): Promise<Item> {
            const item = await this.itemService.findOne(id)
            if (!item){
                throw new NotAcceptableException()
            }
            return item
        }
}
