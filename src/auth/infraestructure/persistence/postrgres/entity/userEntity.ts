import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'varchar' })
    password!: string;
}