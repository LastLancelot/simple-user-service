import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/application/entities/core.entity';
import { Boss } from 'src/boss/boss.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('regular')
export class Regular extends CoreEntity {
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  public user: User;
  @Column({
    name: 'user_id',
    nullable: true,
  })
  user_id: number;

  @ManyToOne(() => Boss, (boss) => boss.subordinates, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'boss_id' })
  boss: Boss;
  @ApiProperty()
  @Column({ name: 'boss_id', nullable: false })
  public boss_id: number;
}
