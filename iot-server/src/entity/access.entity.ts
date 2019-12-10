import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Card from './card.entity';

@Entity()
export default class Access {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    accessTime: Date;

    @ManyToOne(_ => Card, card => card.accesses)
    card: Card;
}
