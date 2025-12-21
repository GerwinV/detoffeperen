import { pgTable, serial, varchar, text, decimal, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './auth'
import { varieties } from './varieties'
import { rootstocks } from './rootstocks'
import { sizes } from './sizes'
import { varietyStock } from './stock'

// Order status enum
export const orderStatusEnum = pgEnum('order_status', ['pending', 'completed', 'cancelled'])

// Payment type enum
export const paymentTypeEnum = pgEnum('payment_type', ['cash', 'invoice'])

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 20 }).notNull().unique(),

  // Customer information
  customerName: varchar('customer_name', { length: 200 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }),
  customerPhone: varchar('customer_phone', { length: 50 }),

  // Order details
  status: orderStatusEnum('status').default('pending').notNull(),
  paymentType: paymentTypeEnum('payment_type').default('cash').notNull(),

  // Totals
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  totalItems: integer('total_items').notNull(),

  // Notes
  notes: text('notes'),

  // Audit
  createdBy: integer('created_by').references(() => users.id),
  completedAt: timestamp('completed_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),

  // References to stock item
  varietyStockId: integer('variety_stock_id').notNull().references(() => varietyStock.id),
  varietyId: integer('variety_id').notNull().references(() => varieties.id),
  rootstockId: integer('rootstock_id').notNull().references(() => rootstocks.id),
  sizeId: integer('size_id').notNull().references(() => sizes.id),

  // Snapshot of names at time of order (for historical accuracy)
  varietyName: varchar('variety_name', { length: 150 }).notNull(),
  rootstockName: varchar('rootstock_name', { length: 50 }).notNull(),
  sizeName: varchar('size_name', { length: 50 }).notNull(),

  // Pricing and quantity
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  lineTotal: decimal('line_total', { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp('created_at').defaultNow()
})

// Relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  items: many(orderItems),
  createdByUser: one(users, {
    fields: [orders.createdBy],
    references: [users.id]
  })
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id]
  }),
  varietyStock: one(varietyStock, {
    fields: [orderItems.varietyStockId],
    references: [varietyStock.id]
  }),
  variety: one(varieties, {
    fields: [orderItems.varietyId],
    references: [varieties.id]
  }),
  rootstock: one(rootstocks, {
    fields: [orderItems.rootstockId],
    references: [rootstocks.id]
  }),
  size: one(sizes, {
    fields: [orderItems.sizeId],
    references: [sizes.id]
  })
}))
