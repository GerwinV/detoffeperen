<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <NuxtImg src="/images/wie-header.jpg" alt="Over ons" class="absolute inset-0 w-full h-full object-cover" />
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
                                Kwekerij Toffe Peren ontstond uit iets simpels: we zagen dat er te weinig sterke, gezonde fruitbomen beschikbaar zijn voor voedselbossen, én we hadden zelf verrassend veel plezier in het enten van fruitbomen. Dus dachten we: dan gaan we het gewoon zelf doen! We begonnen met het enten van appels, peren en nashi’s, en zo stonden we zomaar aan het begin van onze eigen kwekerij.
                            </p>
                        </div>
                    </div>

                    <!-- Right Side - Image -->
                    <div class="w-full md:w-1/2 flex justify-center">
                        <div class="relative w-64 h-64 md:w-80 md:h-80">
                            <div class="absolute inset-0 overflow-hidden shadow-lg" style="border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;">
                                <NuxtImg src="/images/jw.jpeg" alt="Team member" class="w-full h-full object-cover" style="object-position: center 30%;" />
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
                            Onze kwekerij is een samenwerking van Voedselbos Peize en Voedselbos Weeldenis. Omdat we onze projecten op dezelfde manier beheren - regeneratief, praktisch en met veel liefde voor de bodem - was samenwerken een logische stap. We volgden met plezier een entcursus, oefenden de eerste winter met het vermeerderen van bomen en besloten al snel dat dit groter moest worden opgepakt. Zo ontstond het idee voor Toffe Peren: een plek waar we regeneratieve fruitbomen produceren voor voedselbossen en eetbare tuinen.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Onze aanpak Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center max-w-6xl mx-auto">
                    <!-- Right Side - Text -->
                    <div class="w-full md:w-1/2">
                        <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                            Onze aanpak
                        </h2>
                        <div class="space-y-4 text-[rgb(var(--color-text))]">
                            <p class="leading-relaxed">
                                We kweken zo dat we niet alleen bomen produceren, maar tegelijkertijd de bodem én het omliggende ecosysteem versterken. We zetten in op een gezonde, levende bodem door organisch materiaal toe te voegen, grondbewerking te minimaliseren en zoveel mogelijk leven aan te trekken. Een gezonde bodem levert gezonde, sterke planten. Daarom werken we zonder kunstmest of bestrijdingsmiddelen. Door in te zetten op biodiversiteit organiseren we automatisch plaagbestrijding: vogels eten het overschot aan rupsen, lieveheersbeestjes eten luizen, wormen verteren blad, enzovoort. We gebruiken principes uit permacultuur en voedselbosbouw om onze kwekerij te runnen.
                            </p>
                        </div>
                    </div>

                    <!-- Left Side - Image -->
                    <div class="w-full md:w-1/2 flex justify-center">
                        <div class="relative w-64 h-64 md:w-80 md:h-80">
                            <div class="absolute inset-0 overflow-hidden shadow-lg" style="border-radius: 45% 55% 48% 52% / 58% 44% 56% 42%;">
                                <NuxtImg src="/images/gv.jpg" alt="Team member" class="w-full h-full object-cover" style="object-position: center 25%;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Onze bomen Section -->
        <section class="py-12 md:py-16 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase tracking-wide">
                        Onze bomen
                    </h2>
                    <div class="space-y-4 text-[rgb(var(--color-text))]">
                        <p class="leading-relaxed">
                            We kiezen bewust voor sterkere, diepwortelende onderstammen die passen bij voedselbossen, agroforestry en eetbare tuinen. Deze bomen groeien langzamer op de korte termijn, maar juist krachtiger en duurzamer op de lange termijn. Ze leven langer, dragen stabieler en zijn minder onderhoudsintensief dan de ‘snelle’ bomen die je vaak in tuincentra vindt, die vaak op zwakke of matig groeiende onderstammen worden geënt.
                            Bij de selectie van onze soorten letten we op zelfredzaamheid, resistentie, smaak, productiviteit en geschiktheid voor het noordelijke klimaat en zandgronden. Onze bomen zijn bedoeld om tientallen jaren mee te gaan en vrucht te dragen.
                        </p>
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
                            De transitie naar natuurinclusieve voedselproductie groeit, maar goed plantmateriaal is schaars. Met onze bomen en struiken voor regeneratieve systemen helpen we die transitie versnellen. We willen dat er keuzes zijn: gezonde, robuuste bomen die ecologie-versterkende voedselproductie mogelijk maken. Door ze regeneratief te kweken en te leveren aan regeneratieve projecten, versterken we een beweging die natuur en voedselproductie combineert en de mens daarin een nuttige plek geeft. Toffe Peren levert bomen die een levendig, eetbaar en toekomstbestendig landschap helpen bouwen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
</script>
