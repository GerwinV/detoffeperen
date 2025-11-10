<template>
    <div>
        <!-- Split Hero Section -->
        <section class="relative h-[300px] md:h-[400px] overflow-hidden">
            <div class="flex flex-col md:flex-row h-full">
                <!-- Left Side - Image -->
                <div class="relative w-full md:w-3/5 h-1/2 md:h-full">
                    <!-- Hero background image -->
                    <NuxtImg
                        src="/images/kwekerij.jpg"
                        alt="Kwekerij de Toffe Peren"
                        class="absolute inset-0 w-full h-full object-cover"
                    />

                    <!-- Circular Logo Badge - Positioned to overlap -->
                    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:bottom-1/2 md:right-0 md:left-auto md:translate-y-1/2 md:translate-x-1/2 z-10">
                        <div class="bg-white rounded-full p-6 shadow-2xl w-40 h-40 md:w-60 md:h-60 flex items-center justify-center">
                            <img src="/logo/logo.png" alt="de Toffe Peren" class="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>

                <!-- Right Side - Dark Green Panel -->
                <div class="w-full md:w-2/5 h-1/2 md:h-full bg-[rgb(var(--color-dark))] flex items-center justify-center p-8 md:p-12">
                    <div class="text-center md:text-left max-w-lg">
                        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide">
                            Kwekerij van<br />
                            ecologisch<br />
                            verantwoorde<br />
                            fruitbomen
                        </h1>
                    </div>
                </div>
            </div>
        </section>

        <!-- Regeneratieve Fruitbomen Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-[rgb(var(--color-dark))] mb-8 uppercase tracking-wide">
                        Regeneratieve Fruitbomen
                    </h2>

                    <div class="space-y-6 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            Wij kweken sterke, gezonde en toekomstbestendige fruitbomen voor voedselbossen en eetbare tuinen. Bij ons draait het om de bodem — zoals appels, peren en nashi — die niet alleen de bodem voeden, maar ook de biodiversiteit versterken en een veerkrachtig ecosysteem opbouwen.
                        </p>
                        <p class="leading-relaxed">
                            Wij geloven in een nieuwe manier van kweek, waarbij bomen opgroeien in levende, gezonde grond en onderdeel zijn van een regeneratief geheel. Zo leveren we bomen die klaar zijn voor de toekomst en dragen bij aan een landschap vol smaak, oogst en leven.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Assortiment Section -->
        <section class="py-12 md:py-16">
            <div class="container">
                <h2 class="text-2xl md:text-3xl font-bold text-[rgb(var(--color-text))] mb-8 uppercase tracking-wide text-center">
                    Assortiment
                </h2>

                <!-- Three Category Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                    <!-- Appelbomen -->
                    <NuxtLink to="/shop/appelbomen" class="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <NuxtImg src="/images/appel-fruit.jpg" alt="Appelbomen" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        <div class="p-4 flex items-center justify-between">
                            <span class="font-semibold text-[rgb(var(--color-text))] group-hover:text-primary transition-colors">Appelbomen</span>
                            <ChevronRight class="w-5 h-5 text-[rgb(var(--color-text)/0.4)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </NuxtLink>

                    <!-- Nashiperen -->
                    <NuxtLink to="/shop/nashi-peren" class="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <NuxtImg src="/images/nashi-fruit.jpg" alt="Nashiperen" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        <div class="p-4 flex items-center justify-between">
                            <span class="font-semibold text-[rgb(var(--color-text))] group-hover:text-primary transition-colors">Nashiperen</span>
                            <ChevronRight class="w-5 h-5 text-[rgb(var(--color-text)/0.4)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </NuxtLink>

                    <!-- Perenbomen -->
                    <NuxtLink to="/shop/perenbomen" class="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-200">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <NuxtImg src="/images/peer-fruit.jpeg" alt="Perenbomen" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        <div class="p-4 flex items-center justify-between">
                            <span class="font-semibold text-[rgb(var(--color-text))] group-hover:text-primary transition-colors">Perenbomen</span>
                            <ChevronRight class="w-5 h-5 text-[rgb(var(--color-text)/0.4)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </NuxtLink>
                </div>

                <!-- Stock Message -->
                <div class="text-center">
                    <div class="inline-block bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg px-6 py-4 max-w-2xl shadow-sm">
                        <p class="text-sm text-[rgb(var(--color-text))]">
                            Dit jaar hebben we nog een beperkte voorraad, neem
                            <NuxtLink to="/contact" class="text-primary font-semibold hover:underline">contact</NuxtLink>
                            met ons op wanneer je interesse in een variëteit hebt. Zelf een fruitboom die je wilt laten vermeerderen? Ook dat kan bij ons.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
</script>
