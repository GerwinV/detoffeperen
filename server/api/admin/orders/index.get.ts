import { db } from '../../../database'
import { orders, users } from '../../../database/schema'
import { eq, desc, like, or, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const status = query.status as string | undefined
  const paymentType = query.paymentType as string | undefined
  const search = query.search as string | undefined

  // Build where conditions
  const conditions = []

  if (status && status !== 'all') {
    conditions.push(eq(orders.status, status as 'pending' | 'completed' | 'cancelled'))
  }

  if (paymentType && paymentType !== 'all') {
    conditions.push(eq(orders.paymentType, paymentType as 'cash' | 'invoice'))
  }

  if (search) {
    conditions.push(
      or(
        like(orders.customerName, `%${search}%`),
        like(orders.customerEmail, `%${search}%`),
        like(orders.orderNumber, `%${search}%`)
      )
    )
  }

  // Get orders with creator info
  const orderList = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      customerName: orders.customerName,
      customerEmail: orders.customerEmail,
      customerPhone: orders.customerPhone,
      status: orders.status,
      paymentType: orders.paymentType,
      subtotal: orders.subtotal,
      discount: orders.discount,
      totalAmount: orders.totalAmount,
      totalItems: orders.totalItems,
      notes: orders.notes,
      completedAt: orders.completedAt,
      cancelledAt: orders.cancelledAt,
      createdAt: orders.createdAt,
      createdBy: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(orders)
    .leftJoin(users, eq(orders.createdBy, users.id))
    .where(conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined)
    .orderBy(desc(orders.createdAt))

  return {
    orders: orderList
  }
})
