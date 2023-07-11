import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({
    type: 'time with time zone',
    name: 'created_at',
  })
  public creatAt: Date;

  @UpdateDateColumn({
    type: 'time with time zone',
    name: 'updated_at',
  })
  public updateAt: Date;
}
