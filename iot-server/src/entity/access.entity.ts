import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Access {
    @PrimaryGeneratedColumn()
    id: number;
}
