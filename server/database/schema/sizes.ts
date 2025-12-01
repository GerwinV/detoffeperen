import { pgTable, serial, varchar, decimal, integer, boolean, timestamp } from 'drizzle-orm/pg-core'

export const sizes = pgTable('sizes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(), // e.g., "30-60 cm"
  minHeight: integer('min_height').notNull(), // in cm
  maxHeight: integer('max_height').notNull(), // in cm
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // e.g., 15.00
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

// Relations are defined in stock.ts to avoid circular imports
