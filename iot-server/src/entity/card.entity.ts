import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import Access from './access.entity';
import User from './user.entity';

@Entity()
export default class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: string;

    @OneToMany(_ => Access, access => access.card)
    accesses: Access[];

    @ManyToOne(_ => User, user => user.cards)
    cardOwner: User;
}
