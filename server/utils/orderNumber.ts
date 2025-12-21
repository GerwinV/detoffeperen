import { db } from '../database'
import { orders } from '../database/schema'
import { like, desc } from 'drizzle-orm'

/**
 * Generate the next sequential order number
 * Format: ORD-YYYY-NNNN (e.g., ORD-2025-0001)
 */
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `ORD-${year}-`

  // Find the highest order number for this year
  const [lastOrder] = await db
    .select({ orderNumber: orders.orderNumber })
    .from(orders)
    .where(like(orders.orderNumber, `${prefix}%`))
    .orderBy(desc(orders.orderNumber))
    .limit(1)

  let nextNumber = 1
  if (lastOrder?.orderNumber) {
    // Extract the number part and increment
    const numberPart = lastOrder.orderNumber.replace(prefix, '')
    nextNumber = parseInt(numberPart, 10) + 1
  }

  // Pad to 4 digits
  return `${prefix}${nextNumber.toString().padStart(4, '0')}`
}
