<template>
    <div>
        <!-- Page Header -->
        <section class="bg-white py-8 md:py-12 border-b border-[rgb(var(--color-text)/0.1)]">
            <div class="container">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-text mb-4 uppercase tracking-wide">
                        Kwekersrecht Overzicht
                    </h1>
                    <p class="text-[rgb(var(--color-text)/0.7)]">
                        Status van kwekersrecht voor onze fruitboomvariëteiten
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
                    </ul>
                    <p class="mt-4 text-xs">
                        Laatst bijgewerkt: November 2025. Dit overzicht is bedoeld als richtlijn.
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
    title: 'Kwekersrecht Overzicht - Toffe Peren',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

const beschermd = [
    { naam: 'Ambro', type: 'Appel', vervalt: '10-04-2026', rechthebbende: 'NL Rassenregister' },
    { naam: 'Topaz', type: 'Appel', vervalt: '31-12-2028', rechthebbende: 'Institute of Experimental Botany CZ' },
    { naam: 'Santana', type: 'Appel', vervalt: '29-05-2028', rechthebbende: 'Fresh Forward Holding B.V.' },
    { naam: 'Rubinola', type: 'Appel', vervalt: '31-12-2030', rechthebbende: 'Institute of Experimental Botany CZ' },
    { naam: 'Red Topaz', type: 'Appel', vervalt: '31-12-2036', rechthebbende: 'Malus Bunda GmbH' },
]

const vrijeAppels = [
    { naam: 'Alkmene', oorsprong: 'Duitsland, 1930', opmerking: 'Oud ras, publiek domein' },
    { naam: 'Bramleys Seedling', oorsprong: 'Engeland, 1809', opmerking: 'Zeer oud ras, publiek domein' },
    { naam: 'Ecolette', oorsprong: 'Nederland, 1995', opmerking: 'Kwekersrecht vervallen maart 2025' },
    { naam: 'Elise', oorsprong: 'Nederland, 1990', opmerking: 'Kwekersrecht verstreken okt 2020' },
    { naam: 'Lemoen', oorsprong: 'Nederland, 1885', opmerking: 'Oud Nederlands ras' },
    { naam: 'Princess Noble', oorsprong: 'Nederland, 1708', opmerking: 'Zeer oud ras' },
    { naam: 'Rode Boskoop', oorsprong: 'Nederland, 1923', opmerking: 'Oud ras, publiek domein' },
]

const vrijePeren = [
    { naam: 'Beurré Bachelier', oorsprong: 'Frankrijk, 1845', opmerking: 'Oud ras' },
    { naam: 'Colmar Épineux', oorsprong: 'België, 1758', opmerking: 'Zeer oud ras' },
    { naam: 'Comtesse de Paris', oorsprong: 'Frankrijk, 1882', opmerking: 'Oud ras' },
    { naam: 'Concorde', oorsprong: 'Engeland, 1977', opmerking: 'NL kwekersrecht vervallen 2019' },
    { naam: 'Josefine de Malines', oorsprong: 'België, 1830', opmerking: 'Oud ras' },
    { naam: 'Juttepeer', oorsprong: 'Nederland', opmerking: 'Zeer oud Nederlands ras' },
    { naam: 'Legipont', oorsprong: 'België, ~1800', opmerking: 'Oud ras' },
    { naam: 'Packhams Triumph', oorsprong: 'Australië, 1896', opmerking: 'Oud ras' },
    { naam: 'Rode Williams', oorsprong: 'Mutatie, 1938', opmerking: 'Oud genoeg' },
    { naam: 'Seigneur d\'Esperen', oorsprong: 'België, 1827', opmerking: 'Oud ras' },
    { naam: 'Triomphe de Vienne', oorsprong: 'Frankrijk', opmerking: 'Oud ras' },
    { naam: 'Williams', oorsprong: 'Engeland, ~1770', opmerking: 'Zeer oud ras' },
]

const vrijeNashis = [
    { naam: 'Chojuro', oorsprong: 'Japan', opmerking: 'Oud Japans ras' },
    { naam: 'Hosui', oorsprong: 'Japan, 1972', opmerking: '>50 jaar oud' },
    { naam: 'Kosui', oorsprong: 'Japan, 1959', opmerking: '>60 jaar oud' },
    { naam: 'Kumoi', oorsprong: 'Japan', opmerking: 'Oud Japans ras' },
    { naam: 'Nijisseiki', oorsprong: 'Japan, 1898', opmerking: '>125 jaar oud' },
    { naam: 'Nitaka', oorsprong: 'Japan', opmerking: 'Oud Japans ras' },
    { naam: 'Shinko', oorsprong: 'Japan', opmerking: 'Oud Japans ras' },
    { naam: 'Shinseiki', oorsprong: 'Japan, 1945', opmerking: '>75 jaar oud' },
    { naam: 'Tama', oorsprong: 'Japan', opmerking: 'Oud Japans ras' },
    { naam: 'Tsu-Li', oorsprong: 'China', opmerking: 'Oud Chinees heirloom ras' },
]
</script>
