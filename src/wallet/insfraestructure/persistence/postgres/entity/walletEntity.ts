import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Unique } from 'typeorm';

@Entity('wallets')
@Unique(['user', 'address'])
export class WalletEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id', type: 'varchar', nullable: false })
    user!: string;

    @Column({ type: 'varchar', nullable: true })
    tag!: string | null;

    @Column({ type: 'varchar', nullable: false })
    chain!: string;

    @Column({ type: 'varchar', nullable: false })
    address!: string;
}