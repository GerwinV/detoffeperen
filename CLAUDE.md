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

The application uses a **static data approach** for tree varieties:
- All tree data (categories, varieties, rootstocks, descriptions) is defined in `composables/useTreeData.js`
- Three main categories: `appelbomen`, `perenbomen`, `nashi-peren`
- Each variety has: name, slug, rootstocks array, harvestTime (optional), and description
- No Pinia stores or API calls - data is imported directly via the composable

### Routing Structure

- `/` - Homepage with hero section and category overview
- `/shop/index.vue` - Shop overview (if exists)
- `/shop/[category].vue` - Dynamic category pages (appelbomen, perenbomen, nashi-peren)
- `/contact.vue` - Contact page

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
- `icons/PearIcon.vue` - Custom pear icon SVG

### Styling System

**Tailwind Configuration:**
- Custom color system using CSS variables (defined in `assets/css/main.css`)
- Colors: primary, secondary, accent, success, background, text
- Typography: Space Mono (sans/body), Playfair Display (serif/headings)
- Custom animations: fade-in, slide-up

**Color Variables:** All colors use `rgb(var(--color-name) / <alpha-value>)` pattern for opacity support

### Configuration

**Environment Variables (.env):**
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SITE_URL` - Site URL (defaults to http://localhost:3000)
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

1. Edit `composables/useTreeData.js`
2. Add variety object to appropriate category's `varieties` array
3. Include: name, slug (kebab-case), rootstocks array, optional harvestTime, description
4. Slug must be unique within the category

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
