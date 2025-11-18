<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <NuxtImg src="/images/assortiment.jpeg" alt="Assortiment" class="absolute inset-0 w-full h-full object-cover" />
            </template>
        </PageHero>

        <!-- Ons Aanbod Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                        Onze bomen
                    </h2>
                    <div class="space-y-4 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            Bij kwekerij Toffe Peren vind je fruitbomen die speciaal geschikt zijn voor voedselbossen, agroforestry-systemen en eetbare tuinen. Momenteel richten we ons op appels, peren en nashi-peren, allemaal geënt op sterkere onderstammen en geselecteerd voor een robuuste groei, goede productie en lange levensduur. Deze bomen zijn ideaal voor projecten die tientallen jaren meegaan en een veerkrachtig ecosysteem opbouwen. Mis je soorten of heb je suggesties, neem dan contact op.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Assortiment Section -->
        <section class="py-12 md:py-16 bg-[rgb(var(--color-background))]">
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

        <!-- Bestellen Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                        Bestellen
                    </h2>

                    <div class="space-y-8 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            Je kunt ons aanbod bekijken via de website en een bestelling plaatsen door een mail te sturen met de gewenste soort, maat en aantallen. Wij nemen contact op om een afhaalmoment af te spreken. Omdat we onze bomen met de hand rooien en zorgvuldig voorbereiden, is vooraf bestellen aanbevolen.

                            TIP: tijdens het zoeken kun je favorieten aanmaken, en die lijst kun je vervolgens aan ons mailen.
                        </p>

                        <!-- WORTELGOED -->
                        <div>
                            <h3 class="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
                                Wortelgoed
                            </h3>
                            <p class="leading-relaxed mb-3">
                                Wij verkopen onze bomen als wortelgoed. Dat betekent dat ze zonder aarde worden geleverd, tijdens hun winterrust (november–maart). Dit heeft meerdere voordelen:
                            </p>
                            <ul class="list-disc list-inside space-y-2 ml-4">
                                <li>De boom is in rust en kan met zo min mogelijk stress worden verplant.</li>
                                <li>Wortels blijven actief en kunnen snel beginnen met inwortelen op de nieuwe plek.</li>
                                <li>We beschermen zo de gezonde grond van onze kwekerij (waar we zo hard voor werken) en houden het bodemleven zo intact mogelijk.</li>
                            </ul>
                        </div>

                        <!-- PRAKTISCH -->
                        <div>
                            <h3 class="text-xl font-bold text-primary mb-3 uppercase tracking-wide">
                                Praktisch
                            </h3>
                            <p class="leading-relaxed">
                                Afhalen kan alleen op afspraak, omdat onze kwekerij midden in het voedselbos ligt. Voor meerdere bomen is een ruime auto handig, en neem plastic zakken of potgrondzakken mee om de wortels te beschermen tegen uitdrogen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
</script>
