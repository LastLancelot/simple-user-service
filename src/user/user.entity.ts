import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/application/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { Role } from './enums/role.enum';

@Entity()
export class User extends CoreEntity {
  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public username: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  public firstname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  public lastname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public password: string;

  @ApiProperty()
  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    name: 'role',
  })
  public role: Role;
  @ApiProperty({ name: 'boss_id', type: 'integer' })
  null;
}
