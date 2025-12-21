import { pgTable, serial, varchar, text, integer, timestamp, boolean, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { categories } from './categories'
import { varietyFeatures } from './features'
import { varietyStock } from './stock'

export const varieties = pgTable('varieties', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 150 }).notNull(),
  latinName: varchar('latin_name', { length: 200 }),
  slug: varchar('slug', { length: 150 }).notNull(),
  description: text('description'),
  fullDescription: text('full_description'),
  harvestTime: varchar('harvest_time', { length: 100 }),
  blossomTime: varchar('blossom_time', { length: 100 }),
  origin: varchar('origin', { length: 200 }),
  fruitColor: varchar('fruit_color', { length: 300 }),
  taste: text('taste'),
  pollination: varchar('pollination', { length: 200 }),
  isActive: boolean('is_active').default(true),
  published: boolean('published').default(true),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
}, (table) => ({
  categorySlugIdx: uniqueIndex('category_slug_idx').on(table.categoryId, table.slug)
}))

export const varietiesRelations = relations(varieties, ({ one, many }) => ({
  category: one(categories, {
    fields: [varieties.categoryId],
    references: [categories.id]
  }),
  features: many(varietyFeatures),
  stock: many(varietyStock)
}))
