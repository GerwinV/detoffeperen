<template>
    <div>
        <!-- Page Header -->
        <section class="bg-white py-8 md:py-12 border-b border-[rgb(var(--color-text)/0.1)]">
            <div class="container">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-text mb-4 uppercase tracking-wide">
                        Kwekersrecht Selectie 2026
                    </h1>
                    <p class="text-[rgb(var(--color-text)/0.7)]">
                        Status van kwekersrecht voor de fruitboomvariëteiten in onze Selectie 2026
                    </p>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="py-12 md:py-16">
            <div class="container max-w-5xl">

                <!-- Legenda -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4">Legenda</h2>
                    <div class="flex flex-wrap gap-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Vrij
                        </span>
                        <span class="text-sm text-[rgb(var(--color-text)/0.7)]">Geen actief kwekersrecht</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Beschermd
                        </span>
                        <span class="text-sm text-[rgb(var(--color-text)/0.7)]">Licentie vereist</span>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Onzeker
                        </span>
                        <span class="text-sm text-[rgb(var(--color-text)/0.7)]">Verificatie nodig</span>
                    </div>
                </div>

                <!-- Beschermde variëteiten -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4 flex items-center">
                        <span class="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                        Beschermde Variëteiten
                    </h2>
                    <p class="text-sm text-[rgb(var(--color-text)/0.6)] mb-4">
                        Deze variëteiten hebben actief kwekersrecht en mogen niet zonder licentie worden vermeerderd of verkocht.
                    </p>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
                                    <th class="text-left py-3 px-2 font-semibold text-text">Variëteit</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Type</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Vervalt</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Rechthebbende</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in beschermd" :key="item.naam" class="border-b border-[rgb(var(--color-text)/0.05)]">
                                    <td class="py-3 px-2 font-medium text-text">{{ item.naam }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)]">{{ item.type }}</td>
                                    <td class="py-3 px-2">
                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                            {{ item.vervalt }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)] text-xs">{{ item.rechthebbende }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Onzekere variëteiten -->
                <div v-if="onzeker.length > 0" class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4 flex items-center">
                        <span class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                        Onzekere Status
                    </h2>
                    <p class="text-sm text-[rgb(var(--color-text)/0.6)] mb-4">
                        Voor deze variëteiten is de status niet geheel duidelijk. Verificatie via CPVO database aanbevolen.
                    </p>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
                                    <th class="text-left py-3 px-2 font-semibold text-text">Variëteit</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Type</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Opmerkingen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in onzeker" :key="item.naam" class="border-b border-[rgb(var(--color-text)/0.05)]">
                                    <td class="py-3 px-2 font-medium text-text">{{ item.naam }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)]">{{ item.type }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)] text-xs">{{ item.opmerking }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Vrije Appels -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4 flex items-center">
                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Vrije Appelvariëteiten
                    </h2>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
                                    <th class="text-left py-3 px-2 font-semibold text-text">Variëteit</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Oorsprong</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Opmerkingen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in vrijeAppels" :key="item.naam" class="border-b border-[rgb(var(--color-text)/0.05)]">
                                    <td class="py-3 px-2 font-medium text-text">{{ item.naam }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)]">{{ item.oorsprong }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)] text-xs">{{ item.opmerking }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Vrije Peren -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4 flex items-center">
                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Vrije Perenvariëteiten
                    </h2>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
                                    <th class="text-left py-3 px-2 font-semibold text-text">Variëteit</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Oorsprong</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Opmerkingen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in vrijePeren" :key="item.naam" class="border-b border-[rgb(var(--color-text)/0.05)]">
                                    <td class="py-3 px-2 font-medium text-text">{{ item.naam }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)]">{{ item.oorsprong }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)] text-xs">{{ item.opmerking }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Vrije Nashi's -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4 flex items-center">
                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Vrije Nashi-variëteiten
                    </h2>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
                                    <th class="text-left py-3 px-2 font-semibold text-text">Variëteit</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Oorsprong</th>
                                    <th class="text-left py-3 px-2 font-semibold text-text">Opmerkingen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in vrijeNashis" :key="item.naam" class="border-b border-[rgb(var(--color-text)/0.05)]">
                                    <td class="py-3 px-2 font-medium text-text">{{ item.naam }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)]">{{ item.oorsprong }}</td>
                                    <td class="py-3 px-2 text-[rgb(var(--color-text)/0.7)] text-xs">{{ item.opmerking }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Bronnen -->
                <div class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-6 text-sm text-[rgb(var(--color-text)/0.6)]">
                    <h3 class="font-semibold text-text mb-2">Bronnen</h3>
                    <ul class="list-disc list-inside space-y-1">
                        <li>CPVO Variety Finder (online.plantvarieties.eu)</li>
                        <li>Nederlands Rassenregister (raadvoorplantenrassen.nl)</li>
                        <li>Orange Pippin (pomologische database)</li>
                        <li>Wikipedia NL/EN/DE</li>
                    </ul>
                    <p class="mt-4 text-xs">
                        Laatst bijgewerkt: November 2025. Dit overzicht is bedoeld als richtlijn voor de Selectie 2026.
                        Controleer altijd de officiële databases voor definitieve informatie.
                    </p>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// Prevent search engine indexing
useHead({
    title: 'Kwekersrecht Selectie 2026 - Toffe Peren',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

const beschermd = [
    { naam: 'Topaz', type: 'Appel', vervalt: '31-12-2028', rechthebbende: 'Institute of Experimental Botany CZ (EU CPVO)' },
    { naam: 'Red Topaz', type: 'Appel', vervalt: '31-12-2036', rechthebbende: 'Malus Bunda GmbH (EU CPVO)' },
    { naam: 'Santana', type: 'Appel', vervalt: '29-05-2028', rechthebbende: 'Fresh Forward Holding B.V. (NL)' },
    { naam: 'Ambro', type: 'Appel', vervalt: '10-04-2026', rechthebbende: 'NL Rassenregister' },
    { naam: 'Rubinola', type: 'Appel', vervalt: '31-12-2030', rechthebbende: 'Institute of Experimental Botany CZ (EU CPVO)' },
    { naam: 'Carmen', type: 'Peer', vervalt: '31-12-2036', rechthebbende: 'CREA-OFA (EU17843)' },
]

const onzeker: { naam: string; type: string; opmerking: string }[] = []

const vrijeAppels = [
    { naam: 'Alkmene (Cevaal)', oorsprong: 'Duitsland, 1930', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Ecolette', oorsprong: 'Nederland, 1995', opmerking: 'Kwekersrecht vervallen maart 2025' },
    { naam: 'Elise', oorsprong: 'Nederland, 1990', opmerking: 'Kwekersrecht verstreken 12-10-2020' },
    { naam: 'Grauwe Renet', oorsprong: 'Nederland, zeer oud', opmerking: 'Oud Nederlands ras, publiek domein' },
    { naam: 'Honingzoet', oorsprong: 'Nederland, ~1750', opmerking: 'Zeer oud ras, publiek domein' },
    { naam: 'Luntersche Pippeling', oorsprong: 'Nederland (Lunteren), ~1885-1896', opmerking: 'Oud lokaal ras, publiek domein' },
    { naam: 'Lemoen', oorsprong: 'Nederland, 1885', opmerking: 'Oud Nederlands ras, publiek domein' },
    { naam: 'Discovery', oorsprong: 'Engeland, 1949/1962', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Prima', oorsprong: 'USA, 1958', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Rode Wijnappel / Dragonderappel', oorsprong: 'Nederland, oud', opmerking: 'Oud Nederlands ras, publiek domein' },
    { naam: 'Aroma', oorsprong: 'Zweden, 1973', opmerking: 'PBR vervallen ~2003, publiek domein' },
    { naam: 'Keuleman', oorsprong: 'Duitsland/België, oud', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Harry Masters Jersey', oorsprong: 'Engeland, ~1900', opmerking: 'Oud ciderras, publiek domein' },
    { naam: 'Beauty of Bath', oorsprong: 'Engeland, 1864', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Rubens (Civni)', oorsprong: 'Italië, 1985', opmerking: 'Geen EU CPVO PBR gevonden, alleen FRU' },
    { naam: 'Julka', oorsprong: 'Zwitserland (Lubera)', opmerking: 'Geen EU CPVO PBR gevonden, alleen FRU' },
]

const vrijePeren = [
    { naam: 'Concorde', oorsprong: 'Engeland, 1977', opmerking: 'NL kwekersrecht vervallen 11-12-2019' },
    { naam: 'Beurré Hardy', oorsprong: 'Frankrijk, 1820/1830', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Beurré Bachelier', oorsprong: 'Frankrijk, 1845', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Juttepeer', oorsprong: 'Nederland, zeer oud', opmerking: 'Oud Nederlands ras, publiek domein' },
    { naam: 'Seigneur d\'Esperen', oorsprong: 'België, 1827', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Comtesse de Paris', oorsprong: 'Frankrijk, 1882', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Triomphe de Vienne', oorsprong: 'Frankrijk, oud', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Rode Williams', oorsprong: 'Mutatie, 1938', opmerking: 'Oud genoeg, publiek domein' },
    { naam: 'Yellow Hufcap', oorsprong: 'Engeland, ~1600-1700', opmerking: 'Perry peer, zeer oud ras' },
    { naam: 'Louise Bonne de Jersey', oorsprong: 'Frankrijk, ~1780', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Winterriet', oorsprong: 'Nederland, 14e eeuw', opmerking: 'Vermeld 1488, zeer oud stoofperenras' },
    { naam: 'Blakeney Red', oorsprong: 'Engeland, ~1600', opmerking: 'Perry peer, zeer oud ras' },
    { naam: 'Zwijndrechtse Wijnpeer', oorsprong: 'Nederland (Zuid-Holland), oud', opmerking: 'Oud Nederlands ras, publiek domein' },
    { naam: 'Zure Brederode', oorsprong: 'Nederland, ~1800', opmerking: 'Oud stoofperenras, publiek domein' },
    { naam: 'Doyenné de Comice', oorsprong: 'Frankrijk, 1849', opmerking: 'Oud ras, publiek domein' },
]

const vrijeNashis = [
    { naam: 'Shinseiki', oorsprong: 'Japan, 1945', opmerking: '>75 jaar oud, publiek domein' },
    { naam: 'Niitaka', oorsprong: 'Japan, 1915-1927', opmerking: '>95 jaar oud, publiek domein' },
    { naam: 'Shinko', oorsprong: 'Japan, oud', opmerking: 'Oud Japans ras, publiek domein' },
    { naam: 'Nijisseiki', oorsprong: 'Japan, 1898', opmerking: '>125 jaar oud, publiek domein' },
    { naam: 'Chojuro', oorsprong: 'Japan, oud', opmerking: 'Oud Japans ras, publiek domein' },
    { naam: 'Kosui', oorsprong: 'Japan, 1959', opmerking: '>60 jaar oud, publiek domein' },
    { naam: 'Seuri', oorsprong: 'China, oud', opmerking: 'Oud Chinees ras, publiek domein' },
    { naam: 'Tsu Li', oorsprong: 'China, oud', opmerking: 'Oud Chinees heirloom ras' },
    { naam: 'Hayatama', oorsprong: 'Japan, 1969', opmerking: '>55 jaar oud, publiek domein' },
    { naam: 'Hosui', oorsprong: 'Japan, 1972', opmerking: '>50 jaar oud, publiek domein' },
    { naam: 'Shinsui', oorsprong: 'Japan, 1965-1967', opmerking: '>55 jaar oud, publiek domein' },
    { naam: 'Ichiban Nashi', oorsprong: 'Japan, oud', opmerking: 'Oud Japans ras, publiek domein' },
    { naam: 'Hakko', oorsprong: 'Japan, oud', opmerking: 'Oud Japans ras, publiek domein' },
    { naam: 'Kil Tsu', oorsprong: 'China/Korea, oud', opmerking: 'Oud ras, publiek domein' },
]
</script>
