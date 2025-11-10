<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <NuxtImg
                    src="/images/wie-header.jpg"
                    alt="Over ons"
                    class="absolute inset-0 w-full h-full object-cover"
                />
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
                            <div class="absolute inset-0 overflow-hidden shadow-lg" style="border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;">
                                <NuxtImg
                                    src="/images/jw.jpeg"
                                    alt="Team member"
                                    class="w-full h-full object-cover"
                                    style="object-position: center 30%;"
                                />
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
                            <div class="absolute inset-0 overflow-hidden shadow-lg" style="border-radius: 45% 55% 48% 52% / 58% 44% 56% 42%;">
                                <NuxtImg
                                    src="/images/gv.jpg"
                                    alt="Team member"
                                    class="w-full h-full object-cover"
                                    style="object-position: center 25%;"
                                />
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
</script>
