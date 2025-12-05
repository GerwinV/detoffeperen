import { pgTable, serial, integer, boolean, timestamp, varchar, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { varieties } from './varieties'
import { rootstocks } from './rootstocks'
import { sizes } from './sizes'
import { users } from './auth'

// Stock is tracked per variety + rootstock + size combination
export const varietyStock = pgTable('variety_stock', {
  id: serial('id').primaryKey(),
  varietyId: integer('variety_id').notNull().references(() => varieties.id, { onDelete: 'cascade' }),
  rootstockId: integer('rootstock_id').notNull().references(() => rootstocks.id, { onDelete: 'cascade' }),
  sizeId: integer('size_id').notNull().references(() => sizes.id, { onDelete: 'cascade' }),
  stockQuantity: integer('stock_quantity').default(0),
  lowStockThreshold: integer('low_stock_threshold').default(3),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
}, (table) => ({
  varietyStockIdx: uniqueIndex('variety_stock_idx').on(table.varietyId, table.rootstockId, table.sizeId)
}))

export const stockMovements = pgTable('stock_movements', {
  id: serial('id').primaryKey(),
  varietyStockId: integer('variety_stock_id').notNull().references(() => varietyStock.id, { onDelete: 'cascade' }),
  quantityChange: integer('quantity_change').notNull(),
  movementType: varchar('movement_type', { length: 50 }).notNull(), // 'initial', 'sale', 'restock', 'adjustment', 'return'
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow()
})

export const varietyStockRelations = relations(varietyStock, ({ one, many }) => ({
  variety: one(varieties, {
    fields: [varietyStock.varietyId],
    references: [varieties.id]
  }),
  rootstock: one(rootstocks, {
    fields: [varietyStock.rootstockId],
    references: [rootstocks.id]
  }),
  size: one(sizes, {
    fields: [varietyStock.sizeId],
    references: [sizes.id]
  }),
  movements: many(stockMovements)
}))

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  varietyStock: one(varietyStock, {
    fields: [stockMovements.varietyStockId],
    references: [varietyStock.id]
  }),
  createdByUser: one(users, {
    fields: [stockMovements.createdBy],
    references: [users.id]
  })
}))

// Helper type for availability status
export type AvailabilityStatus = 'available' | 'low_stock' | 'out_of_stock' | 'unavailable'

export function getAvailabilityStatus(
  stockQuantity: number,
  lowStockThreshold: number,
  isAvailable: boolean
): AvailabilityStatus {
  if (!isAvailable) return 'unavailable'
  if (stockQuantity <= 0) return 'out_of_stock'
  if (stockQuantity <= lowStockThreshold) return 'low_stock'
  return 'available'
}
