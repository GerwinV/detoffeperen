# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "de Toffe Peren" - a Nuxt 3 application for a regenerative fruit tree nursery specializing in apple trees, pear trees, and Asian pears (nashi). The site is built with Vue 3, TypeScript, Tailwind CSS, and integrates with Supabase for backend services.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Preview production build locally
npm run preview
```

## Architecture

### Data Management

The application uses a **database-driven approach** with PostgreSQL and Drizzle ORM:

**Database Layer:**
- PostgreSQL database with Drizzle ORM (`server/database/`)
- Schema defined in `server/database/schema.ts`
- Migrations via `drizzle-kit push`
- Seed script at `server/database/seed.ts` (uses data from `composables/useTreeData.js`)

**Data Flow:**
- Admin changes (via `/admin/*` pages) write to the database
- Public site fetches from database via `composables/useTreeDataFromDB.ts`
- Fallback to static data (`composables/useTreeData.js`) if API fails

**Public APIs (`server/api/public/`):**
- `categories.get.ts` - List all categories
- `varieties.get.ts` - List all varieties with features/rootstocks
- `availability.get.ts` - Stock status per variety/rootstock

**Admin APIs (`server/api/admin/`):**
- Full CRUD for categories, varieties, rootstocks, sizes
- Stock management and pricing
- Protected routes (requires authentication)

**Key Tables:**
- `categories` - Tree categories (appelbomen, perenbomen, nashi-peren)
- `varieties` - Individual tree varieties
- `rootstocks` - Rootstock types available
- `sizes` - Size tiers (30-60cm, 60-100cm, etc.)
- `categoryPrices` - Pricing per category/size combination
- `varietyStock` - Stock levels per variety/rootstock/size
- `stockMovements` - Stock change audit log

**Database Commands:**
```bash
# Push schema changes to database
npx drizzle-kit push

# Seed database with initial data
npx tsx server/database/seed.ts

# Reset database (truncate all tables)
npx tsx server/database/reset.ts
```

### Routing Structure

**Public Pages:**
- `/` - Homepage with hero section and category overview
- `/shop` - Shop overview
- `/shop/[category].vue` - Dynamic category pages (appelbomen, perenbomen, nashi-peren)
- `/favorites` - User's saved favorite varieties
- `/contact` - Contact page

**Admin Pages (`/admin/*`):**
- `/admin` - Dashboard overview
- `/admin/categories` - Manage categories
- `/admin/varieties` - Manage varieties (add/edit/toggle active)
- `/admin/rootstocks` - Manage rootstocks
- `/admin/sizes` - Manage size tiers
- `/admin/pricing` - Category-based pricing management
- `/admin/stock` - Stock management per variety/rootstock/size

### Component Architecture

**Layout Components:**
- `layouts/default.vue` - Main layout with AppHeader, main content slot, and AppFooter
- `app.vue` - Root component that wraps NuxtLayout and NuxtPage

**Base Components** (reusable UI elements):
- `BaseButton.vue` - Styled button component
- `BaseCard.vue` - Card container component
- `BaseInput.vue` - Form input component
- `BaseModal.vue` - Modal dialog component

**Feature Components:**
- `AppHeader.vue` - Site navigation
- `AppFooter.vue` - Site footer with SocialMediaIcons
- `CategoryGrid.vue` - Grid display for tree categories
- `VarietyModal.vue` - Modal for displaying variety details
- `PriceTable.vue` - Category pricing display
- `icons/PearIcon.vue` - Custom pear icon SVG

**Key Composables:**
- `useTreeDataFromDB.ts` - Fetches tree data from database API (primary)
- `useTreeData.js` - Static tree data (fallback, also used for seeding)
- `useSearch.ts` - Search functionality across varieties
- `useFavorites.ts` - Local storage-based favorites management

### Styling System

**Tailwind Configuration:**
- Custom color system using CSS variables (defined in `assets/css/main.css`)
- Colors: primary, secondary, accent, success, background, text
- Typography: Space Mono (sans/body), Playfair Display (serif/headings)
- Custom animations: fade-in, slide-up

**Color Variables:** All colors use `rgb(var(--color-name) / <alpha-value>)` pattern for opacity support

### Configuration

**Environment Variables (.env):**
- `DATABASE_URL` - PostgreSQL connection string (required)
- `SITE_URL` - Site URL (defaults to http://localhost:3000)
- `SUPABASE_URL` - Supabase project URL (optional, for auth)
- `SUPABASE_ANON_KEY` - Supabase anonymous key (optional)
- `MOLLIE_API_KEY` - Payment integration (future)
- `MOLLIE_WEBHOOK_URL` - Payment webhooks (future)

**Nuxt Modules:**
- `@nuxtjs/tailwindcss` - Tailwind CSS integration
- `@pinia/nuxt` - State management (configured but not actively used)
- `@nuxtjs/google-fonts` - Google Fonts loader
- `@nuxt/image` - Image optimization
- `@vee-validate/nuxt` - Form validation with Zod schemas

## Key Patterns

### Adding New Tree Varieties

**Via Admin UI (recommended):**
1. Go to `/admin/varieties`
2. Click "Add Variety" and fill in the form
3. Assign rootstocks and features
4. Set stock levels via `/admin/stock`

**Via Seed Script (for bulk data):**
1. Edit `composables/useTreeData.js` to add variety data
2. Run `npx tsx server/database/seed.ts` to sync to database
3. The seed script is idempotent (safe to run multiple times)

### Page Structure

Pages follow a consistent pattern:
- Template section with Tailwind utility classes
- Script setup using TypeScript
- Import composables and components as needed
- Use `rgb(var(--color-name))` for custom colors

### Responsive Design

- Mobile-first approach with Tailwind breakpoints (md:, lg:)
- Use `flex flex-col md:flex-row` pattern for responsive layouts
- Container classes for max-width content areas

## Deployment

The project includes a `Procfile` for deployment, likely targeting platforms like Heroku or similar Node.js hosting services. Production build creates a `.output` directory with a server entrypoint at `.output/server/index.mjs`.
