import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'
import postgres from 'postgres'

async function reset() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const client = postgres(connectionString)
  const db = drizzle(client)

  console.log('🗑️  Resetting database...')

  // Truncate all tables in correct order (respecting foreign keys)
  await db.execute(sql`
    TRUNCATE
      stock_movements,
      variety_stock,
      variety_features,
      varieties,
      category_prices,
      categories,
      features,
      rootstocks,
      sizes,
      sessions,
      magic_link_tokens,
      users
    CASCADE
  `)

  console.log('✅ Database reset complete!')
  process.exit(0)
}

reset().catch((err) => {
  console.error('❌ Reset failed:', err)
  process.exit(1)
})
