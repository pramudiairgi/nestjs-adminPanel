import { Category } from "src/modules/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column('text')
    description: string

    @Column({
        default: 0
    })
    stock: number

    @ManyToOne(() => Category, (category) => category.items)
    category: Category

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
