import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'uuid' })
    userId!: string;

    @Column({type: 'varchar', unique: true })
    token!: string;

    @Column({type: 'timestamp' }) 
    deletedAt!: Date;
}