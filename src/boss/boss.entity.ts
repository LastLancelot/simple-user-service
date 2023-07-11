import { CoreEntity } from 'src/application/entities/core.entity';
import { Regular } from 'src/regular/regular-user.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('boss')
export class Boss extends CoreEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column({
    name: 'user_id',
    nullable: true,
  })
  user_id: number;

  @OneToMany(() => Regular, (subordinate) => subordinate.boss, {
    nullable: true,
    eager: false,
  })
  subordinates: Regular[];
}
