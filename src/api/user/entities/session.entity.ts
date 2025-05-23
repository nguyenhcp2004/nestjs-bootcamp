import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { AbstractEntity } from 'src/database/entities/abstract.entity'

@Entity('session')
export class SessionEntity extends AbstractEntity {
  constructor(data?: Partial<SessionEntity>) {
    super()
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_session_id'
  })
  id!: string

  @Column({
    name: 'hash',
    type: 'varchar',
    length: 255
  })
  hash!: string

  @Column({
    name: 'user_id',
    type: 'uuid'
  })
  userId: string

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_session_user'
  })
  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: UserEntity
}
