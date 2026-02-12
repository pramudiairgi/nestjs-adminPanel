import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../interface/user.interface";

@Entity()
export class Users{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true
    })
    username: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        select: false,
        length: 255
    })
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADMIN
    })
    role: UserRole

    @CreateDateColumn()
    readonly createAt: Date

    @UpdateDateColumn()
    readonly updateAt: Date
}
