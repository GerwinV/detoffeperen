<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <!-- TODO: Replace with actual image of person walking through tree rows -->
                <div class="absolute inset-0 flex items-center justify-center text-[rgb(var(--color-text)/0.2)]">
                    <Trees class="w-32 h-32" />
                </div>
            </template>
        </PageHero>

        <!-- Wie we zijn Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-6xl mx-auto">
                    <!-- Left Side - Text -->
                    <div class="w-full md:w-1/2">
                        <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                            Wie we zijn
                        </h2>
                        <div class="space-y-4 text-[rgb(var(--color-text))]">
                            <p class="leading-relaxed">
                                De Toffe Peren is ontstaan uit een simpele constatering: er zijn te weinig sterke, gezonde fruitbomen beschikbaar voor voedselbossen. Wij zijn twee beheerders van voedselbosprojecten die besloten dat we het zelf gingen doen. Niet wachten, maar actie ondernemen. Zo begonnen we met het enten van appels, peren en nashi-peren, en groeide onze kleine experimentkweek uit tot een volwaardige kwekerij.
                            </p>
                        </div>
                    </div>

                    <!-- Right Side - Image -->
                    <div class="w-full md:w-1/2 flex justify-center">
                        <div class="relative w-64 h-64 md:w-80 md:h-80">
                            <!-- TODO: Replace with actual circular image of person working with plants -->
                            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                                <User class="w-32 h-32 text-[rgb(var(--color-text)/0.3)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Onze samenwerking Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                        Onze samenwerking
                    </h2>
                    <div class="space-y-4 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            Onze kwekerij is een samenwerking van Voedselbos Peize en Voedselbos Weeldenis. Omdat we onze projecten op dezelfde manier beheren, lag samenwerken voor de hand. We volgden een entcursus, oefenden de eerste winter met het vermeerderen van bomen en besloten al snel dat dit groter moest worden opgepakt. Zo ontstond Toffe Peren: een plek waar we regeneratieve fruitbomen produceren voor voedselbossen en eetbare tuinen.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Onze waarden Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center max-w-6xl mx-auto">
                    <!-- Right Side - Text -->
                    <div class="w-full md:w-1/2">
                        <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                            Onze waarden
                        </h2>
                        <div class="space-y-4 text-[rgb(var(--color-text))]">
                            <p class="leading-relaxed">
                                Wat ons drijft is helder: we kweken op een manier die de grond en het ecosysteem versterkt. Geen kunstmest, geen chemische bestrijdingsmiddelen. Alles gebeurt zo natuurlijk mogelijk, met aandacht voor bodemleven, biodiversiteit en de lange termijn. Onze bomen worden groot, sterk en oud. Ze zijn niet bedoeld voor een klein stadstuintje, maar voor projecten waar ze decennia meegaan en echt impact hebben.
                            </p>
                        </div>
                    </div>

                    <!-- Left Side - Image -->
                    <div class="w-full md:w-1/2 flex justify-center">
                        <div class="relative w-64 h-64 md:w-80 md:h-80">
                            <!-- TODO: Replace with actual circular image of person planting -->
                            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center overflow-hidden">
                                <Sprout class="w-32 h-32 text-[rgb(var(--color-text)/0.3)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Waarom wij dit doen Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                        Waarom wij dit doen
                    </h2>
                    <div class="space-y-4 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            We willen de voedselbosgemeenschap helpen. Er is schaarste aan geschikte bomen, en wij willen dat er keuzes zijn: gezonde, robuuste bomen die bijdragen aan regeneratieve landbouw en voedselproductie. Bij Toffe Peren combineer je vakmanschap, passie en een praktische aanpak. Onze bomen zijn een investering in een eetbaar, levendig landschap.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { Trees, User, Sprout } from 'lucide-vue-next'
</script>
