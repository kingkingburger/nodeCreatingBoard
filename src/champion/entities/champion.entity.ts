import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Champion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  champNumber: number;
  @Column({ unique: true })
  name: string;
  @Column()
  worst1Name: string;
  @Column()
  worst2Name: string;
  @Column()
  worst3Name: string;
  @Column()
  worst1Rate: string;
  @Column()
  worst2Rate: string;
  @Column()
  worst3Rate: string;
  @Column()
  great1Name: string;
  @Column()
  great2Name: string;
  @Column()
  great3Name: string;
  @Column()
  great1Rate: string;
  @Column()
  great2Rate: string;
  @Column()
  great3Rate: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;
}
