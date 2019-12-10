import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Card from './card.entity';

@Entity()
export default class Access {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: new Date(),
    })
    accessTime: Date;

    @ManyToOne(_ => Card, card => card.accesses)
    card: Card;
}
