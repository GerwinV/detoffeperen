<template>
    <div>
        <!-- Page Header -->
        <section class="bg-white py-8 md:py-12 border-b border-[rgb(var(--color-text)/0.1)]">
            <div class="container">
                <div class="max-w-6xl mx-auto text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-text mb-4 uppercase tracking-wide">
                        Opbrengst Analyse Fruitbomen
                    </h1>
                    <p class="text-[rgb(var(--color-text)/0.7)] mb-2">
                        Data-analyse van 12 jaar oogstgegevens (2013-2024)
                    </p>
                    <p class="text-sm text-[rgb(var(--color-text)/0.6)]">
                        Bron: fruitpluktuin.nl/fruit/Overige/opbrengst-boomgaard
                    </p>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="py-12 md:py-16">
            <div class="container max-w-6xl">

                <!-- Introductie -->
                <div class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-6 mb-8 text-sm">
                    <h3 class="font-semibold text-text mb-3">Over deze analyse</h3>
                    <p class="text-[rgb(var(--color-text)/0.7)] mb-2">
                        Deze analyse is gebaseerd op 12 jaar oogstgegevens (2013-2024) van een Nederlandse boomgaard.
                        De ranking houdt rekening met gemiddelde opbrengst, piekopbrengst, en consistentie over de jaren.
                    </p>
                    <p class="text-[rgb(var(--color-text)/0.6)] text-xs">
                        Let op: Oudere bomen hebben vaak hogere opbrengsten dan jonge bomen.
                        Veel appelbomen vertonen 'om-en-om' gedrag (alternatieve jaren met hoge/lage opbrengst).
                    </p>
                </div>

                <!-- APPELS -->
                <!-- Appels Grafiek -->
                <OpbrengstChart
                    :varieties="appelsData"
                    :jaren="jaren"
                    fruit-type="appels"
                />

                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-2xl font-bold text-text mb-6 flex items-center">
                        <span class="mr-3">🍎</span>
                        Alle Appelvariëteiten (39 stuks)
                    </h2>

                    <div class="space-y-6">
                        <div v-for="(appel, index) in topAppels" :key="appel.naam" class="border-b border-[rgb(var(--color-text)/0.1)] pb-4 last:border-0">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl font-bold text-primary">{{ index + 1 }}</span>
                                        <div>
                                            <h3 class="text-lg font-semibold text-text">{{ appel.naam }}</h3>
                                            <p class="text-sm text-[rgb(var(--color-text)/0.6)]">Geplant: {{ appel.plantjaar }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-text">{{ appel.piek }} kg</div>
                                    <div class="text-xs text-[rgb(var(--color-text)/0.6)]">piekopbrengst</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-4 gap-4 mt-3 text-sm">
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Gemiddeld/jaar</div>
                                    <div class="font-semibold text-text">{{ appel.gemiddeld }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Totaal opbrengst</div>
                                    <div class="font-semibold text-text">{{ appel.totaal }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Productieve jaren</div>
                                    <div class="font-semibold text-text">{{ appel.jaren }} van 12</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Eerste opbrengst</div>
                                    <div class="font-semibold text-text">{{ appel.eersteNa }}</div>
                                </div>
                            </div>
                            <p class="text-xs text-[rgb(var(--color-text)/0.7)] mt-2 italic">{{ appel.opmerking }}</p>
                        </div>
                    </div>
                </div>

                <!-- PEREN -->
                <!-- Peren Grafiek -->
                <OpbrengstChart
                    :varieties="perenData"
                    :jaren="jaren"
                    fruit-type="peren"
                />

                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-2xl font-bold text-text mb-6 flex items-center">
                        <span class="mr-3">🍐</span>
                        Alle Perenvariëteiten (28 stuks)
                    </h2>

                    <div class="space-y-6">
                        <div v-for="(peer, index) in topPeren" :key="peer.naam" class="border-b border-[rgb(var(--color-text)/0.1)] pb-4 last:border-0">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl font-bold text-primary">{{ index + 1 }}</span>
                                        <div>
                                            <h3 class="text-lg font-semibold text-text">{{ peer.naam }}</h3>
                                            <p class="text-sm text-[rgb(var(--color-text)/0.6)]">Geplant: {{ peer.plantjaar }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-text">{{ peer.piek }} kg</div>
                                    <div class="text-xs text-[rgb(var(--color-text)/0.6)]">piekopbrengst</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-4 gap-4 mt-3 text-sm">
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Gemiddeld/jaar</div>
                                    <div class="font-semibold text-text">{{ peer.gemiddeld }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Totaal opbrengst</div>
                                    <div class="font-semibold text-text">{{ peer.totaal }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Productieve jaren</div>
                                    <div class="font-semibold text-text">{{ peer.jaren }} van 12</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Eerste opbrengst</div>
                                    <div class="font-semibold text-text">{{ peer.eersteNa }}</div>
                                </div>
                            </div>
                            <p class="text-xs text-[rgb(var(--color-text)/0.7)] mt-2 italic">{{ peer.opmerking }}</p>
                        </div>
                    </div>
                </div>

                <!-- PRUIMEN -->
                <!-- Pruimen Grafiek -->
                <OpbrengstChart
                    :varieties="pruimenData"
                    :jaren="jaren"
                    fruit-type="pruimen"
                />

                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-2xl font-bold text-text mb-6 flex items-center">
                        <span class="mr-3">🫐</span>
                        Alle Pruimenvariëteiten (23 stuks)
                    </h2>

                    <div class="space-y-6">
                        <div v-for="(pruim, index) in topPruimen" :key="pruim.naam" class="border-b border-[rgb(var(--color-text)/0.1)] pb-4 last:border-0">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl font-bold text-primary">{{ index + 1 }}</span>
                                        <div>
                                            <h3 class="text-lg font-semibold text-text">{{ pruim.naam }}</h3>
                                            <p class="text-sm text-[rgb(var(--color-text)/0.6)]">Geplant: {{ pruim.plantjaar }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-text">{{ pruim.piek }} kg</div>
                                    <div class="text-xs text-[rgb(var(--color-text)/0.6)]">piekopbrengst</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-4 gap-4 mt-3 text-sm">
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Gemiddeld/jaar</div>
                                    <div class="font-semibold text-text">{{ pruim.gemiddeld }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Totaal opbrengst</div>
                                    <div class="font-semibold text-text">{{ pruim.totaal }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Productieve jaren</div>
                                    <div class="font-semibold text-text">{{ pruim.jaren }} van 12</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Eerste opbrengst</div>
                                    <div class="font-semibold text-text">{{ pruim.eersteNa }}</div>
                                </div>
                            </div>
                            <p class="text-xs text-[rgb(var(--color-text)/0.7)] mt-2 italic">{{ pruim.opmerking }}</p>
                        </div>
                    </div>
                </div>

                <!-- KERSEN -->
                <!-- Kersen Grafiek -->
                <OpbrengstChart
                    :varieties="kersenData"
                    :jaren="jaren"
                    fruit-type="kersen"
                />

                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-2xl font-bold text-text mb-6 flex items-center">
                        <span class="mr-3">🍒</span>
                        Alle Kersenvariëteiten (11 stuks)
                    </h2>

                    <div class="space-y-6">
                        <div v-for="(kers, index) in topKersen" :key="kers.naam" class="border-b border-[rgb(var(--color-text)/0.1)] pb-4 last:border-0">
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <span class="text-2xl font-bold text-primary">{{ index + 1 }}</span>
                                        <div>
                                            <h3 class="text-lg font-semibold text-text">{{ kers.naam }}</h3>
                                            <p class="text-sm text-[rgb(var(--color-text)/0.6)]">Geplant: {{ kers.plantjaar }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-text">{{ kers.piek }} kg</div>
                                    <div class="text-xs text-[rgb(var(--color-text)/0.6)]">piekopbrengst</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-4 gap-4 mt-3 text-sm">
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Gemiddeld/jaar</div>
                                    <div class="font-semibold text-text">{{ kers.gemiddeld }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Totaal opbrengst</div>
                                    <div class="font-semibold text-text">{{ kers.totaal }} kg</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Productieve jaren</div>
                                    <div class="font-semibold text-text">{{ kers.jaren }} van 12</div>
                                </div>
                                <div>
                                    <div class="text-[rgb(var(--color-text)/0.6)]">Eerste opbrengst</div>
                                    <div class="font-semibold text-text">{{ kers.eersteNa }}</div>
                                </div>
                            </div>
                            <p class="text-xs text-[rgb(var(--color-text)/0.7)] mt-2 italic">{{ kers.opmerking }}</p>
                        </div>
                    </div>
                </div>

                <!-- Key Insights -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 mb-8">
                    <h2 class="text-xl font-bold text-text mb-4">Belangrijkste Inzichten</h2>
                    <div class="space-y-3 text-sm text-[rgb(var(--color-text)/0.7)]">
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Appels (39 variëteiten):</strong> Goudreinette (71 kg/jaar) en Dubbele Bellefleur (66.5 kg/jaar) zijn absolute kampioenen. Zoete Kroon (54.2 kg/jaar) en Bramley's Seedling (43.4 kg/jaar) volgen. Veel variëteiten hebben beperkte data (1-2 jaren).</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Peren (28 variëteiten):</strong> Saint Remy is absolute winnaar met 53.8 kg/jaar over 9 productieve jaren. Winterrietpeer (24.8 kg/jaar), Gieser Wildeman (24.4 kg/jaar) en Winterbergamot (24.0 kg/jaar) presteren uitstekend. Kleipeer heeft meeste productieve jaren (11 van 12).</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Pruimen (23 variëteiten):</strong> Reine Victoria gemiddeld 33.8 kg/jaar over 9 jaren - zeer betrouwbaar! Reine Claude Verte had spectaculaire piek van 89 kg in 2022 (gemiddeld 23.9 kg/jaar). Mirabelle de Nancy (16.9 kg/jaar) en Opal (16.3 kg/jaar) presteren goed.</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Kersen (11 variëteiten):</strong> Zoete Morel gemiddeld 15.6 kg/jaar over 9 jaren, maar prestaties dalen (mogelijke veroudering). Hedelfinger (12.5 kg/jaar) en Bigarreau Noir (9.1 kg/jaar) zijn betrouwbaarder. LET OP: Early Rivers heeft data inconsistentie (produceerde voor plantjaar).</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Eerste opbrengst:</strong> Variëteiten verschillen sterk - van 1 jaar (Winterbergamot, Zigeunerin) tot 9 jaar (Reine Claude Verte, Bezi van Schonauwen). Gemiddeld 3-6 jaar voor moderne rassen.</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Data kwaliteit:</strong> Veel variëteiten (vooral geplant in 2013) hebben beperkte data (1-3 productieve jaren). Oudere bomen hebben vaak meer volledige datasets. Data voor bomen geplant vóór 2013 mist eerste opbrengstjaren.</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-primary font-bold">•</span>
                            <p><strong>Alternatief gedrag:</strong> Veel appel- en perenvariëteiten tonen duidelijk om-en-om gedrag met afwisselend hoge en lage opbrengstjaren. Dit is normaal voor pitfruit.</p>
                        </div>
                    </div>
                </div>

                <!-- Disclaimer -->
                <div class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-6 text-sm text-[rgb(var(--color-text)/0.6)]">
                    <h3 class="font-semibold text-text mb-2">Disclaimer</h3>
                    <p class="mb-2">
                        Deze analyse is gebaseerd op data van één specifieke boomgaard in Nederland.
                        Opbrengsten zijn sterk afhankelijk van lokale omstandigheden zoals:
                    </p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                        <li>Grondsoort en bodemvruchtbaarheid</li>
                        <li>Microklimaat en weersomstandigheden</li>
                        <li>Onderstam keuze</li>
                        <li>Verzorging en snoei</li>
                        <li>Bestuiving (aanwezigheid bestuivers)</li>
                    </ul>
                    <p class="mt-3 text-xs">
                        Bron: fruitpluktuin.nl - Data verzameld over periode 2013-2024
                    </p>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import OpbrengstChart from '~/components/OpbrengstChart.vue'

// Get chart data
const { jaren, appelsData, perenData, pruimenData, kersenData } = useOpbrengstChartData()

// Prevent search engine indexing
useHead({
    title: 'Opbrengst Analyse Fruitbomen - Toffe Peren',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

// Gedetailleerde analyse gebaseerd op 12 jaar data (2013-2024)
// Ranking: EERST op gemiddelde opbrengst, DAARNA op aantal productieve jaren
// Let op: Data begint pas in 2013, dus voor oudere bomen weten we niet wanneer de eerste opbrengst was
// ALLE variëteiten opgenomen (niet alleen top performers)

const topAppels = [
    { naam: 'Goudreinette', plantjaar: '1991', piek: 220, gemiddeld: 71.0, totaal: 639.4, jaren: 9, eersteNa: 'Produceerde al in 2013', opmerking: 'Absolute kampioen. Spectaculaire pieken, alternatief gedrag.' },
    { naam: 'Dubbele Bellefleur', plantjaar: '2008', piek: 207.5, gemiddeld: 66.5, totaal: 532, jaren: 8, eersteNa: '6 jaar', opmerking: 'Uitzonderlijk! Spectaculaire piek van 207.5 kg in 2022.' },
    { naam: 'Zoete Kroon', plantjaar: '2008', piek: 164, gemiddeld: 54.2, totaal: 325, jaren: 6, eersteNa: '5 jaar', opmerking: 'Zeer hoge opbrengsten. Duidelijk alternatief gedrag.' },
    { naam: 'Bramley\'s Seedling', plantjaar: '2000', piek: 132, gemiddeld: 43.4, totaal: 304, jaren: 7, eersteNa: 'Produceerde al in 2014', opmerking: 'Uitstekende kookappel, zeer betrouwbaar.' },
    { naam: 'Glorie van Holland', plantjaar: '2008', piek: 91, gemiddeld: 41.9, totaal: 293.3, jaren: 7, eersteNa: '6 jaar', opmerking: 'Solide gemiddelde, betrouwbare producent.' },
    { naam: 'Winterbanana', plantjaar: '2008', piek: 115, gemiddeld: 31.0, totaal: 247.6, jaren: 8, eersteNa: '5 jaar', opmerking: 'Zeer consistente producent over 8 jaren.' },
    { naam: 'Princess Noble', plantjaar: '2008', piek: 62, gemiddeld: 24.8, totaal: 247.9, jaren: 10, eersteNa: 'Produceerde al in 2012', opmerking: 'Meeste productieve jaren (10 van 12), zeer betrouwbaar.' },
    { naam: 'Alkmene', plantjaar: '2010', piek: 47, gemiddeld: 23.2, totaal: 162.3, jaren: 7, eersteNa: '2 jaar', opmerking: 'Vroeg productief (na 2 jaar), goede vroege appel.' },
    { naam: 'James Grieve', plantjaar: '2008', piek: 43.5, gemiddeld: 18.4, totaal: 128.8, jaren: 7, eersteNa: '5 jaar', opmerking: 'Betrouwbare opbrengsten, goede vroege appel.' },
    { naam: 'Gronigerkroon', plantjaar: '1995', piek: 35, gemiddeld: 15.5, totaal: 92.9, jaren: 6, eersteNa: 'Produceerde al in 2013', opmerking: 'Oudere boom met goede opbrengsten.' },
    { naam: 'Rode Jonathan', plantjaar: '2010', piek: 31.9, gemiddeld: 15.2, totaal: 106.2, jaren: 7, eersteNa: '2 jaar', opmerking: 'Vroeg productief, betrouwbare opbrengsten.' },
    { naam: 'Gravensteiner', plantjaar: '1995', piek: 29, gemiddeld: 12.9, totaal: 103.5, jaren: 8, eersteNa: 'Produceerde al in 2013', opmerking: 'Klassieke zomerappel met goede productiviteit.' },
    { naam: 'Eisdener Klumpke', plantjaar: '2013', piek: 11, gemiddeld: 11.0, totaal: 11, jaren: 1, eersteNa: '6 jaar', opmerking: 'Beperkte data (1 jaar), maar veelbelovend.' },
    { naam: 'Lunterse Pippeling', plantjaar: '1995', piek: 23.6, gemiddeld: 10.5, totaal: 63, jaren: 6, eersteNa: 'Produceerde al in 2013', opmerking: 'Oudere boom met regelmatige opbrengsten.' },
    { naam: 'Jos Musch', plantjaar: '2013', piek: 19, gemiddeld: 10.1, totaal: 20.2, jaren: 2, eersteNa: '4 jaar', opmerking: 'Beperkte data (2 jaren), maar goede gemiddeldes.' },
    { naam: 'Ontario', plantjaar: '2013', piek: 18, gemiddeld: 10.0, totaal: 20, jaren: 2, eersteNa: '6 jaar', opmerking: 'Winterappel, beperkte data (2 jaren).' },
    { naam: 'Kaiser Alexander', plantjaar: '2013', piek: 21.7, gemiddeld: 9.4, totaal: 46.9, jaren: 5, eersteNa: '4 jaar', opmerking: 'Grote winterappel met goede opbrengsten.' },
    { naam: 'Reinette Descardre', plantjaar: '2008', piek: 14.6, gemiddeld: 8.0, totaal: 39.8, jaren: 5, eersteNa: 'Produceerde al in 2012', opmerking: 'Regelmatige maar bescheiden opbrengsten.' },
    { naam: 'Ananas Reinette', plantjaar: '2013', piek: 9, gemiddeld: 5.0, totaal: 10, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data, klassieke winterappel.' },
    { naam: 'Court-Pendu', plantjaar: '2013', piek: 5, gemiddeld: 5.0, totaal: 5, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Rode dijkmanszoet', plantjaar: '2013', piek: 8, gemiddeld: 4.5, totaal: 9, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Lemoenappel', plantjaar: '2013', piek: 7, gemiddeld: 4.5, totaal: 9, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Golden permain', plantjaar: '2013', piek: 4, gemiddeld: 4.0, totaal: 4, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Zuccalmaglio Renette', plantjaar: '2013', piek: 6, gemiddeld: 3.7, totaal: 18.6, jaren: 5, eersteNa: '4 jaar', opmerking: 'Bescheiden maar regelmatige opbrengsten.' },
    { naam: 'Zoete ermgaard', plantjaar: '2013', piek: 5.5, gemiddeld: 3.1, totaal: 22, jaren: 7, eersteNa: '1 jaar', opmerking: 'Zeer vroeg productief (1 jaar), kleine opbrengsten.' },
    { naam: 'Drensche Bellefleur', plantjaar: '2013', piek: 4, gemiddeld: 3.0, totaal: 6, jaren: 2, eersteNa: '5 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Veendammer glorie', plantjaar: '2013', piek: 3, gemiddeld: 3.0, totaal: 3, jaren: 1, eersteNa: '7 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Yellow Transparant', plantjaar: '2013', piek: 5.1, gemiddeld: 2.9, totaal: 11.5, jaren: 4, eersteNa: '1 jaar', opmerking: 'Zeer vroeg productief, kleine opbrengsten.' },
    { naam: 'Beauty of Bath', plantjaar: '2013', piek: 2.5, gemiddeld: 2.5, totaal: 2.5, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Citroenappel', plantjaar: '2013', piek: 3, gemiddeld: 2.5, totaal: 5, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Zoete oranje', plantjaar: '2013', piek: 2.4, gemiddeld: 2.4, totaal: 2.4, jaren: 1, eersteNa: '4 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Zigeunerin', plantjaar: '2013', piek: 3.1, gemiddeld: 2.3, totaal: 4.6, jaren: 2, eersteNa: '1 jaar', opmerking: 'Zeer vroeg productief, kleine opbrengsten.' },
    { naam: 'Dantziger Kantapfel', plantjaar: '2013', piek: 2.7, gemiddeld: 1.7, totaal: 6.7, jaren: 4, eersteNa: '4 jaar', opmerking: 'Kleine maar regelmatige opbrengsten.' },
    { naam: 'Lombarts Calville', plantjaar: '2013', piek: 2.5, gemiddeld: 1.6, totaal: 3.1, jaren: 2, eersteNa: '1 jaar', opmerking: 'Zeer vroeg productief, zeer kleine opbrengsten.' },
    { naam: 'Notaris Appel', plantjaar: '2003', piek: 2.4, gemiddeld: 1.4, totaal: 4.1, jaren: 3, eersteNa: 'Produceerde al in 2012', opmerking: 'Zeer kleine opbrengsten.' },
    { naam: 'Jacob Fisher', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '8 jaar', opmerking: 'Zeer beperkte data, zeer kleine opbrengst.' },
    { naam: 'Benoni', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data, zeer kleine opbrengst.' },
    { naam: 'Bloemeezoet', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '7 jaar', opmerking: 'Zeer beperkte data, zeer kleine opbrengst.' },
    { naam: 'Rode Boskoop', plantjaar: '2013', piek: 0.8, gemiddeld: 0.8, totaal: 0.8, jaren: 1, eersteNa: '3 jaar', opmerking: 'Zeer beperkte data, minimale opbrengst.' }
]

const topPeren = [
    { naam: 'Saint Remy', plantjaar: '2011', piek: 126.5, gemiddeld: 53.8, totaal: 484, jaren: 9, eersteNa: '1 jaar', opmerking: 'Absolute kampioen! Zeer consistente hoge opbrengsten (78-126 kg), vroeg productief.' },
    { naam: 'Winterrietpeer', plantjaar: '2008', piek: 83, gemiddeld: 24.8, totaal: 173.7, jaren: 7, eersteNa: 'Produceerde al in 2012', opmerking: 'Stoofpeer met uitstekende piek van 83 kg, zeer goede opbrengsten.' },
    { naam: 'Gieser Wildeman', plantjaar: '1995', piek: 50, gemiddeld: 24.4, totaal: 170.9, jaren: 7, eersteNa: 'Produceerde al in 2013', opmerking: 'Stoofpeer, uitstekend 2013-2016 (33-50 kg) maar productie stopte.' },
    { naam: 'Winterbergamot', plantjaar: '2013', piek: 46, gemiddeld: 24.0, totaal: 144, jaren: 6, eersteNa: '1 jaar', opmerking: 'Zeer vroeg productief (al na 1 jaar!), piek van 46 kg.' },
    { naam: 'Noordholl. suikerpeer', plantjaar: '1995', piek: 41.5, gemiddeld: 18.9, totaal: 151.2, jaren: 8, eersteNa: 'Produceerde al in 2013', opmerking: 'Stoofpeer met goede opbrengsten, alternatief gedrag.' },
    { naam: 'Kleipeer', plantjaar: '2008', piek: 61, gemiddeld: 17.3, totaal: 190.4, jaren: 11, eersteNa: 'Produceerde al in 2013', opmerking: 'Zeer betrouwbare stoofpeer, meeste productieve jaren (11 van 12)!' },
    { naam: 'Clappé\'s Favourite', plantjaar: '2008', piek: 41.5, gemiddeld: 16.9, totaal: 134.9, jaren: 8, eersteNa: '6 jaar', opmerking: 'Zeer consistente handpeer met weinig uitval.' },
    { naam: 'Conference', plantjaar: '1996', piek: 22.2, gemiddeld: 12.2, totaal: 109.7, jaren: 9, eersteNa: 'Produceerde al in 2013', opmerking: 'Klassieke handpeer, betrouwbare opbrengsten.' },
    { naam: 'Doyenne du Comice', plantjaar: '1991', piek: 23.6, gemiddeld: 12.1, totaal: 109.2, jaren: 9, eersteNa: 'Produceerde al in 2013', opmerking: 'Edele handpeer met goede productiviteit.' },
    { naam: 'Triomphe de Vienne', plantjaar: '2013', piek: 18, gemiddeld: 11.6, totaal: 81.3, jaren: 7, eersteNa: '3 jaar', opmerking: 'Goede opbrengsten, vroeg productief (3 jaar).' },
    { naam: 'Super Trevoux', plantjaar: '1995', piek: 27, gemiddeld: 11.0, totaal: 65.7, jaren: 6, eersteNa: 'Produceerde al in 2017', opmerking: 'Goede winterpeer met regelmatige opbrengsten.' },
    { naam: 'Soldat Laboureur', plantjaar: '2013', piek: 34, gemiddeld: 11.0, totaal: 55, jaren: 5, eersteNa: 'Produceerde al in 2012', opmerking: 'Goede opbrengsten, vroeg productief.' },
    { naam: 'Kruidenierspeer', plantjaar: '2010', piek: 16, gemiddeld: 9.4, totaal: 28.2, jaren: 3, eersteNa: '2 jaar', opmerking: 'Zeer vroeg productief (2 jaar), beperkte data.' },
    { naam: 'Ponspeer', plantjaar: '2013', piek: 4.5, gemiddeld: 4.5, totaal: 4.5, jaren: 1, eersteNa: '9 jaar', opmerking: 'Zeer beperkte data (1 jaar), laat productief.' },
    { naam: 'Dirkjespeer', plantjaar: '2013', piek: 6, gemiddeld: 3.8, totaal: 7.5, jaren: 2, eersteNa: '4 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Williams Bon Chrétien', plantjaar: '2013', piek: 6, gemiddeld: 3.7, totaal: 22.1, jaren: 6, eersteNa: '3 jaar', opmerking: 'Bescheiden maar regelmatige opbrengsten.' },
    { naam: 'Beurré Alexandre Lucas', plantjaar: '2013', piek: 3.6, gemiddeld: 3.6, totaal: 3.6, jaren: 1, eersteNa: '4 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Juttepeer', plantjaar: '2008', piek: 3, gemiddeld: 3.0, totaal: 3, jaren: 1, eersteNa: 'Produceerde in 2022', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Charneux', plantjaar: '2013', piek: 3, gemiddeld: 3.0, totaal: 6, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Nashipeer Tama', plantjaar: '2013', piek: 4.5, gemiddeld: 2.7, totaal: 13.5, jaren: 5, eersteNa: '3 jaar', opmerking: 'Aziatische peer, bescheiden opbrengsten.' },
    { naam: 'Comtesse de Paris', plantjaar: '1996', piek: 2.5, gemiddeld: 2.5, totaal: 2.5, jaren: 1, eersteNa: 'Produceerde in 2017', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Oranje peer', plantjaar: '2013', piek: 3.6, gemiddeld: 2.4, totaal: 9.6, jaren: 4, eersteNa: '4 jaar', opmerking: 'Kleine maar regelmatige opbrengsten.' },
    { naam: 'Rode Williams', plantjaar: '2013', piek: 3, gemiddeld: 2.3, totaal: 4.5, jaren: 2, eersteNa: '4 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Bueerde Merrode', plantjaar: '2013', piek: 2.1, gemiddeld: 2.1, totaal: 2.1, jaren: 1, eersteNa: '4 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Nashipeer Kosui', plantjaar: '2013', piek: 1.8, gemiddeld: 1.7, totaal: 3.3, jaren: 2, eersteNa: '3 jaar', opmerking: 'Aziatische peer, zeer kleine opbrengsten.' },
    { naam: 'Bloedpeer', plantjaar: '2003', piek: 1.5, gemiddeld: 1.5, totaal: 1.5, jaren: 1, eersteNa: 'Produceerde in 2022', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Bezi van Schonauwen', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '9 jaar', opmerking: 'Zeer beperkte data, zeer laat productief.' },
    { naam: 'Bonne Louise d\'Avranches', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '5 jaar', opmerking: 'Zeer beperkte data (1 jaar).' }
]

const topPruimen = [
    { naam: 'Reine Victoria', plantjaar: '2003', piek: 60, gemiddeld: 33.8, totaal: 304.3, jaren: 9, eersteNa: 'Produceerde al in 2013', opmerking: 'Absolute topper, zeer consistent met 9 productieve jaren!' },
    { naam: 'Reine Claude Verte', plantjaar: '2008', piek: 89, gemiddeld: 23.9, totaal: 95.6, jaren: 4, eersteNa: '9 jaar', opmerking: 'Spectaculaire piek van 89 kg in 2022! Variabel maar zeer hoog potentieel.' },
    { naam: 'Mirabelle de Nancy', plantjaar: '2002', piek: 60.3, gemiddeld: 16.9, totaal: 101.4, jaren: 6, eersteNa: 'Produceerde al in 2014', opmerking: 'Kleine gele pruim, uitstekende piek, goed voor verwerking.' },
    { naam: 'Opal', plantjaar: '1993', piek: 31.5, gemiddeld: 16.3, totaal: 97.8, jaren: 6, eersteNa: 'Produceerde al in 2013', opmerking: 'Oudere boom (30+ jaar) met wisselende maar regelmatige opbrengsten.' },
    { naam: 'Reine Claude Morros', plantjaar: '2009', piek: 35.5, gemiddeld: 15.5, totaal: 77.5, jaren: 5, eersteNa: '8 jaar', opmerking: 'Goede opbrengsten, piek van 35.5 kg in 2022.' },
    { naam: 'Hauszwetsche kwetch', plantjaar: '1998', piek: 15, gemiddeld: 6.0, totaal: 23.9, jaren: 4, eersteNa: 'Produceerde al in 2013', opmerking: 'Oudere boom met afnemende productie.' },
    { naam: 'Rode Abrikozepruim', plantjaar: '2013', piek: 9.4, gemiddeld: 5.2, totaal: 15.7, jaren: 3, eersteNa: '3 jaar', opmerking: 'Vroeg productief (3 jaar), beperkte data.' },
    { naam: 'Valor', plantjaar: '2013', piek: 8.3, gemiddeld: 4.3, totaal: 21.4, jaren: 5, eersteNa: '3 jaar', opmerking: 'Vroeg productief, regelmatige kleine opbrengsten.' },
    { naam: 'Aprimira', plantjaar: '2013', piek: 3.5, gemiddeld: 3.5, totaal: 3.5, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Dubbele boerenwitte', plantjaar: '2013', piek: 5.5, gemiddeld: 3.2, totaal: 6.3, jaren: 2, eersteNa: '6 jaar', opmerking: 'Beperkte data (2 jaren).' },
    { naam: 'Anne Spath', plantjaar: '2013', piek: 3.5, gemiddeld: 3.1, totaal: 9.4, jaren: 3, eersteNa: '6 jaar', opmerking: 'Kleine maar regelmatige opbrengsten.' },
    { naam: 'Excalibur', plantjaar: '2013', piek: 3, gemiddeld: 3.0, totaal: 3, jaren: 1, eersteNa: '8 jaar', opmerking: 'Zeer beperkte data, laat productief.' },
    { naam: 'Reine claude van Schouwen', plantjaar: '2013', piek: 4.5, gemiddeld: 2.7, totaal: 10.9, jaren: 4, eersteNa: '6 jaar', opmerking: 'Kleine maar regelmatige opbrengsten.' },
    { naam: 'Jefferson', plantjaar: '2013', piek: 4, gemiddeld: 2.2, totaal: 6.7, jaren: 3, eersteNa: '4 jaar', opmerking: 'Bescheiden opbrengsten.' },
    { naam: 'The Czar', plantjaar: '2013', piek: 3.5, gemiddeld: 2.1, totaal: 6.2, jaren: 3, eersteNa: '4 jaar', opmerking: 'Vroege pruim met bescheiden opbrengsten.' },
    { naam: 'Claude d\'altan', plantjaar: '2013', piek: 2, gemiddeld: 2.0, totaal: 2, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Bleue de Belgique', plantjaar: '2013', piek: 3.5, gemiddeld: 2.0, totaal: 6.0, jaren: 3, eersteNa: '3 jaar', opmerking: 'Vroeg productief, kleine opbrengsten.' },
    { naam: 'Belspruim', plantjaar: '2013', piek: 2.8, gemiddeld: 1.8, totaal: 8.9, jaren: 5, eersteNa: '3 jaar', opmerking: 'Vroeg productief, zeer kleine opbrengsten.' },
    { naam: 'Ontario', plantjaar: '2013', piek: 1.3, gemiddeld: 1.3, totaal: 1.3, jaren: 1, eersteNa: '3 jaar', opmerking: 'Zeer beperkte data (1 jaar).' },
    { naam: 'Reine Claude d\'Althan', plantjaar: '2013', piek: 1, gemiddeld: 1.0, totaal: 1, jaren: 1, eersteNa: '8 jaar', opmerking: 'Zeer beperkte data, zeer laat productief.' },
    { naam: 'Monsieur Halif', plantjaar: '2013', piek: 0.9, gemiddeld: 0.9, totaal: 0.9, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data, minimale opbrengst.' },
    { naam: 'Voyageur', plantjaar: '2013', piek: 0.5, gemiddeld: 0.5, totaal: 0.5, jaren: 1, eersteNa: '4 jaar', opmerking: 'Zeer beperkte data, minimale opbrengst.' },
    { naam: 'Early Laxton', plantjaar: '2013', piek: 0.2, gemiddeld: 0.2, totaal: 0.2, jaren: 1, eersteNa: '6 jaar', opmerking: 'Zeer beperkte data, minimale opbrengst.' }
]

const topKersen = [
    { naam: 'Zoete Morel', plantjaar: '1999', piek: 38, gemiddeld: 15.6, totaal: 140.1, jaren: 9, eersteNa: 'Produceerde al in 2013', opmerking: 'Uitstekende vroege opbrengsten (38 kg, 23 kg) maar daalt later. Mogelijke veroudering.' },
    { naam: 'Hedelfinger', plantjaar: '2008', piek: 25.9, gemiddeld: 12.5, totaal: 49.8, jaren: 4, eersteNa: '8 jaar', opmerking: 'Zeer goede opbrengsten, consistent in productieve jaren.' },
    { naam: 'Bigarreau Noir', plantjaar: '2011', piek: 16.7, gemiddeld: 9.1, totaal: 36.2, jaren: 4, eersteNa: '6 jaar', opmerking: 'Goede zwarte kers met consistente opbrengsten (8-16.7 kg).' },
    { naam: 'Bigarreau Napoleon', plantjaar: '2008', piek: 14.5, gemiddeld: 8.5, totaal: 33.8, jaren: 4, eersteNa: 'Produceerde al in 2016', opmerking: 'Goede opbrengsten in 2016-2017 (14-14.5 kg).' },
    { naam: 'Udense Spaanse', plantjaar: '2000', piek: 24.3, gemiddeld: 7.6, totaal: 37.9, jaren: 5, eersteNa: 'Produceerde al in 2013', opmerking: 'Uitzonderlijke piek van 24.3 kg in 2019. Variabel maar met hoog potentieel.' },
    { naam: 'Mierlose zwarte', plantjaar: '1995', piek: 17, gemiddeld: 7.2, totaal: 43.3, jaren: 6, eersteNa: 'Produceerde al in 2013', opmerking: 'Oudere boom met goede vroege opbrengsten, afnemend.' },
    { naam: 'Early Rivers', plantjaar: '2020', piek: 11, gemiddeld: 6.8, totaal: 34.1, jaren: 5, eersteNa: 'DATA FOUT - produceerde voor plantjaar', opmerking: 'WAARSCHUWING: Plantjaar 2020 maar produceerde al in 2011! Data inconsistentie.' },
    { naam: 'Kordia', plantjaar: '2013', piek: 11.8, gemiddeld: 4.5, totaal: 27.2, jaren: 6, eersteNa: '3 jaar', opmerking: 'Vroeg productief (3 jaar), regelmatige kleine opbrengsten.' },
    { naam: 'Corum', plantjaar: '2009', piek: 6.5, gemiddeld: 2.5, totaal: 12.6, jaren: 5, eersteNa: '8 jaar', opmerking: 'Laat productief, kleine opbrengsten.' },
    { naam: 'Sylvia', plantjaar: '1995', piek: 0.4, gemiddeld: 0.4, totaal: 0.4, jaren: 1, eersteNa: 'Produceerde in 2017', opmerking: 'Zeer beperkte data, minimale opbrengst.' },
    { naam: 'Regina', plantjaar: '2015', piek: 0.4, gemiddeld: 0.3, totaal: 0.6, jaren: 2, eersteNa: '2 jaar', opmerking: 'Zeer vroeg productief (2 jaar), maar minimale opbrengsten.' }
]
</script>
