<template>
    <footer class="bg-[rgb(var(--color-footer))] text-white">
        <div class="container py-12">
            <!-- Main Footer Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <!-- TOFFE PEREN - Company Info (Column 1) -->
                <div>
                    <h3 class="font-bold text-lg mb-4 uppercase tracking-wide">{{ companyInfo.name }}</h3>
                    <p class="text-sm text-white/80 mb-2">{{ companyInfo.tagline }}</p>
                    <a :href="`mailto:${companyInfo.email}`" class="text-sm text-white/80 hover:text-white transition-colors">
                        {{ companyInfo.email }}
                    </a>
                </div>

                <!-- AFHALEN - Pickup Location -->
                <div>
                    <h3 class="font-bold text-lg mb-4 uppercase tracking-wide">Afhalen</h3>
                    <div class="text-sm text-white/80 space-y-1">
                        <p>Alleen op afspraak</p>
                        <p>Peize / Eelde (Drenthe)</p>
                        <!-- <p class="mt-2">Bel: <a href="tel:+31682743434" class="hover:text-white transition-colors">06 8274 3434</a></p> -->
                        <p class="mt-2">E-mail: <a :href="`mailto:${companyInfo.email}`" class="hover:text-white transition-colors">{{ companyInfo.email }}</a> </p>
                    </div>
                </div>

                <!-- SAMENWERKING - Partnership Info -->
                <div>
                    <h3 class="font-bold text-lg mb-4 uppercase tracking-wide">Samenwerking</h3>
                    <p class="text-sm text-white/80">
                        Wij zijn een samenwerking van
                        <a href="https://voedselbospeize.nl/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors underline">Voedselbos Peize</a>
                        en
                        <a href="https://weeldenis.nl/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors underline">Voedselbos Weeldenis</a>.
                    </p>
                </div>

                <!-- VOLG ONS - Social Media -->
                <div>
                    <h3 class="font-bold text-lg mb-4 uppercase tracking-wide">Volg ons</h3>
                    <SocialMediaIcons />
                </div>
            </div>

            <!-- Bottom Section with Logo and Copyright -->
            <div class="border-t border-white/20 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="flex items-center space-x-3">
                        <img src="/logo/Logo-Toffe-Peren_trans_wit.png" alt="Toffe Peren" class="h-12 w-auto object-contain" />
                    </div>
                    <p class="text-sm text-white/70">
                        copyright 2025 © kwekerij Toffe Peren
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import SocialMediaIcons from '~/components/SocialMediaIcons.vue'

// Company info to avoid duplication
const companyInfo = {
    name: 'Toffe Peren',
    tagline: 'regeneratieve kwekerij',
    email: 'info@voedselbospeize.nl'
}
</script>
