import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Card from './card.entity';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(_ => Card, card => card.cardOwner)
    cards: Card[];
}
