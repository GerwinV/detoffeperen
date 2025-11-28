<template>
    <div>
        <!-- Split Hero Section -->
        <section class="relative h-[300px] md:h-[400px] overflow-hidden">
            <div class="flex flex-col md:flex-row h-full">
                <!-- Left Side - Image -->
                <div class="relative w-full md:w-3/5 h-1/2 md:h-full">
                    <!-- Hero background image -->
                    <NuxtImg src="/images/kwekerij.jpg" alt="Kwekerij Toffe Peren" class="absolute inset-0 w-full h-full object-cover" />
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

            <!-- Logo - Centered within image section based on content width -->
            <div class="absolute top-0 left-0 right-0 bottom-1/2 md:bottom-0 flex items-center z-10 pointer-events-none">
                <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
                    <div class="w-full md:w-3/5 flex justify-center">
                        <img src="/logo/logo.png" alt="Toffe Peren" class="w-48 md:w-64 h-auto object-contain drop-shadow-xl pointer-events-auto" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Regeneratieve Fruitbomen Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-[rgb(var(--color-dark))] mb-8 uppercase tracking-wide">
                        Toffe peren
                    </h2>

                    <div class="space-y-6 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            Bij Toffe Peren kweken we bomen die meer doen dan fruit dragen. Onze bomen helpen de bodem herstellen, vergroten de biodiversiteit en bouwen mee aan een veerkrachtig ecosysteem. We werken zonder kunstmest of bestrijdingsmiddelen, volgens de natuurlijke ritmes van het seizoen en de boom. We selecteren met aandacht productieve en robuuste rassen die het goed doen in extensieve systemen: ideaal voor voedselbossen en eetbare tuinen.
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
                    <div class="inline-block bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg px-6 py-4 max-w-5xl shadow-sm">
                        <p class="text-sm text-[rgb(var(--color-text))]">
                            Dit jaar hebben we nog een beperkte voorraad, neem
                            <NuxtLink to="/contact" class="text-primary font-semibold hover:underline">contact</NuxtLink>
                            met ons op wanneer je interesse in een variëteit hebt. Zelf een fruitboom die je wilt laten vermeerderen? Ook dat kan bij ons.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-[rgb(var(--color-dark))] mb-8 uppercase tracking-wide">
                        Regeneratieve kwekerij
                    </h2>

                    <div class="space-y-6 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            We kweken fruitbomen die echt passen bij voedselbosprojecten: bomen die uitgroeien tot volwassen exemplaren, geënt op onderstammen die vitaliteit, groei en weerbaarheid ondersteunen. Voor nu ligt onze focus op appels, peren en nashi-peren, maar we blijven kijken naar andere soorten die passen bij een regeneratieve aanpak.
                        </p>
                        <p class="leading-relaxed">
                            Onze werkwijze is praktisch én doordacht. Van het enten tot het uitplanten werken we met methoden die de boom vanaf het begin een sterke structuur, gezonde wortels en een weerbare groei meegeven. Zo leveren we bomen die niet alleen klaar zijn om geplant te worden, maar ook om zich jarenlang te ontwikkelen in extensieve systemen.
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
