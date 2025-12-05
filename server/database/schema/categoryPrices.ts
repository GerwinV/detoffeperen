import { pgTable, serial, integer, decimal, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { categories } from './categories'
import { sizes } from './sizes'

export const categoryPrices = pgTable('category_prices', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  sizeId: integer('size_id').notNull().references(() => sizes.id, { onDelete: 'cascade' }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
}, (table) => ({
  categoryPriceIdx: uniqueIndex('category_price_idx').on(table.categoryId, table.sizeId)
}))

export const categoryPricesRelations = relations(categoryPrices, ({ one }) => ({
  category: one(categories, {
    fields: [categoryPrices.categoryId],
    references: [categories.id]
  }),
  size: one(sizes, {
    fields: [categoryPrices.sizeId],
    references: [sizes.id]
  })
}))
