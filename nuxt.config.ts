// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/image", "@vee-validate/nuxt"],

    css: ["~/assets/css/main.css"],

    googleFonts: {
        families: {
            Inter: [400, 500, 600, 700],
            Playfair: {
                wght: [400, 700],
                ital: [400],
            },
        },
        display: "swap",
        preload: true,
    },

    image: {
        quality: 80,
        format: ["webp"],
        domains: ["localhost", "supabase.co"],
    },

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL || "",
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
            siteUrl: process.env.SITE_URL || "http://localhost:3000",
        },
    },

    app: {
        head: {
            title: "Toffe Peren - Fruitbomen",
            htmlAttrs: {
                lang: "nl",
            },
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "description", content: "Toffe Peren - Specialist in voedselbos bomen." },
                { name: "format-detection", content: "telephone=no" },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },

    nitro: {
        compressPublicAssets: true,
    },

    experimental: {
        payloadExtraction: false,
    },
});
