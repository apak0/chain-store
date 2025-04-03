import { InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
  password: text('password').notNull(),
  username: text('name').notNull(),
  email: text('email').unique().notNull(),
  character: text('character'),
})

export type UserWithPassword = InferSelectModel<typeof user>

export type User = Omit<UserWithPassword, 'password'>
