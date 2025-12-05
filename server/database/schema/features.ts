import { pgTable, serial, varchar, integer, primaryKey, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { varieties } from './varieties'

export const features = pgTable('features', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
})

export const varietyFeatures = pgTable('variety_features', {
  varietyId: integer('variety_id').notNull().references(() => varieties.id, { onDelete: 'cascade' }),
  featureId: integer('feature_id').notNull().references(() => features.id, { onDelete: 'cascade' })
}, (table) => ({
  pk: primaryKey({ columns: [table.varietyId, table.featureId] })
}))

export const featuresRelations = relations(features, ({ many }) => ({
  varieties: many(varietyFeatures)
}))

export const varietyFeaturesRelations = relations(varietyFeatures, ({ one }) => ({
  variety: one(varieties, {
    fields: [varietyFeatures.varietyId],
    references: [varieties.id]
  }),
  feature: one(features, {
    fields: [varietyFeatures.featureId],
    references: [features.id]
  })
}))
