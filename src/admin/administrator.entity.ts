import { CoreEntity } from 'src/application/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('administrator')
export class Administrator extends CoreEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @Column({ name: 'user_id' })
  public user_id: number;
}
