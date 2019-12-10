import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export default class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: string;
}
