import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import Access from './access.entity';

@Entity()
export default class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: string;

    @OneToMany(_ => Access, access => access.card)
    accesses: Access[];
}
