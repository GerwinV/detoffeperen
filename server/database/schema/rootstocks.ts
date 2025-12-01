import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { varietyStock } from './stock'

export const rootstocks = pgTable('rootstocks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow()
})

export const rootstocksRelations = relations(rootstocks, ({ many }) => ({
  varietyStock: many(varietyStock)
}))
