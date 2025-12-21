import { db } from '../../../database'
import { orders } from '../../../database/schema'
import { eq, sql, gte, and } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfYear = new Date(now.getFullYear(), 0, 1)

  // Total orders by status
  const statusCounts = await db
    .select({
      status: orders.status,
      count: sql<number>`count(*)::int`
    })
    .from(orders)
    .groupBy(orders.status)

  const totalOrders = statusCounts.reduce((sum, s) => sum + s.count, 0)
  const pendingOrders = statusCounts.find(s => s.status === 'pending')?.count || 0
  const completedOrders = statusCounts.find(s => s.status === 'completed')?.count || 0
  const cancelledOrders = statusCounts.find(s => s.status === 'cancelled')?.count || 0

  // Revenue from completed orders - today
  const [revenueToday] = await db
    .select({
      total: sql<string>`COALESCE(SUM(total_amount), 0)::text`
    })
    .from(orders)
    .where(and(
      eq(orders.status, 'completed'),
      gte(orders.completedAt, startOfToday)
    ))

  // Revenue from completed orders - this month
  const [revenueMonth] = await db
    .select({
      total: sql<string>`COALESCE(SUM(total_amount), 0)::text`
    })
    .from(orders)
    .where(and(
      eq(orders.status, 'completed'),
      gte(orders.completedAt, startOfMonth)
    ))

  // Revenue from completed orders - this year
  const [revenueYear] = await db
    .select({
      total: sql<string>`COALESCE(SUM(total_amount), 0)::text`
    })
    .from(orders)
    .where(and(
      eq(orders.status, 'completed'),
      gte(orders.completedAt, startOfYear)
    ))

  // Orders created today
  const [ordersToday] = await db
    .select({
      count: sql<number>`count(*)::int`
    })
    .from(orders)
    .where(gte(orders.createdAt, startOfToday))

  // Completed orders today
  const [completedToday] = await db
    .select({
      count: sql<number>`count(*)::int`
    })
    .from(orders)
    .where(and(
      eq(orders.status, 'completed'),
      gte(orders.completedAt, startOfToday)
    ))

  // Revenue by payment type (completed orders this month)
  const revenueByPaymentType = await db
    .select({
      paymentType: orders.paymentType,
      total: sql<string>`COALESCE(SUM(total_amount), 0)::text`,
      count: sql<number>`count(*)::int`
    })
    .from(orders)
    .where(and(
      eq(orders.status, 'completed'),
      gte(orders.completedAt, startOfMonth)
    ))
    .groupBy(orders.paymentType)

  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    ordersToday: ordersToday.count,
    completedToday: completedToday.count,
    revenueToday: revenueToday.total,
    revenueMonth: revenueMonth.total,
    revenueYear: revenueYear.total,
    revenueByPaymentType
  }
})
