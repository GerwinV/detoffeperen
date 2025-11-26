<template>
    <div class="min-h-screen bg-background py-12 md:py-20">
        <div class="container mx-auto px-4 max-w-4xl">
            <!-- Header sectie -->
            <div class="mb-8 md:mb-12">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
                    NAK Registratie Kosten
                </h1>
                <p class="text-lg text-text/80 leading-relaxed">
                    Als boomkwekerij van fruitbomen bent u verplicht zich te registreren bij NAK Tuinbouw.
                    Met deze calculator kunt u eenvoudig berekenen wat de jaarlijkse registratiekosten voor uw bedrijf zijn.
                </p>
            </div>

            <!-- Calculator component -->
            <NakCalculator />

            <!-- Informatie sectie -->
            <div class="mt-12 space-y-8">
                <!-- Wat is NAK Tuinbouw -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 md:p-8">
                    <h2 class="text-xl md:text-2xl font-serif font-bold text-text mb-4">
                        Wat is NAK Tuinbouw?
                    </h2>
                    <div class="space-y-4 text-text/80">
                        <p>
                            Naktuinbouw is de Nederlandse Algemene Kwaliteitsdienst Tuinbouw. Het is een zelfstandig bestuursorgaan (ZBO)
                            dat toezicht houdt op de kwaliteit van plantaardig teeltmateriaal in Nederland.
                        </p>
                        <p>
                            Voor producenten en handelaren van fruitbomen en andere boomkwekerijgewassen is registratie bij NAK Tuinbouw
                            verplicht op grond van Europese en nationale regelgeving.
                        </p>
                    </div>
                </div>

                <!-- Wat krijg je ervoor terug -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 md:p-8">
                    <h2 class="text-xl md:text-2xl font-serif font-bold text-text mb-4">
                        Wat krijg je voor deze kosten?
                    </h2>
                    <ul class="space-y-3 text-text/80">
                        <li class="flex items-start gap-3">
                            <span class="text-primary text-xl flex-shrink-0">✓</span>
                            <span><strong>Wettelijke registratie</strong> - Voldoe aan de wettelijke verplichting voor bedrijven die plantaardig materiaal produceren of verhandelen</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-primary text-xl flex-shrink-0">✓</span>
                            <span><strong>Plantenpaspoorten</strong> - Mogelijkheid om plantenpaspoorten uit te geven voor je producten</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-primary text-xl flex-shrink-0">✓</span>
                            <span><strong>Kwaliteitstoezicht</strong> - Administratieve controle en algemeen toezicht op je bedrijf</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-primary text-xl flex-shrink-0">✓</span>
                            <span><strong>Export mogelijkheden</strong> - Toegang tot keuringsdiensten voor export</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-primary text-xl flex-shrink-0">✓</span>
                            <span><strong>Vakkundige ondersteuning</strong> - Advies over regelgeving en kwaliteit</span>
                        </li>
                    </ul>
                </div>

                <!-- Hoe aanmelden -->
                <div class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 md:p-8">
                    <h2 class="text-xl md:text-2xl font-serif font-bold text-text mb-4">
                        Hoe meld je je aan?
                    </h2>
                    <div class="space-y-4 text-text/80">
                        <p>
                            Aanmelden bij NAK Tuinbouw kan op ieder moment in het jaar. De kosten worden naar rato berekend
                            vanaf de datum van registratie.
                        </p>
                        <p>
                            <strong>Aanmelden via:</strong><br>
                            📧 Email: <a href="mailto:keuringen@naktuinbouw.nl" class="text-primary hover:underline">keuringen@naktuinbouw.nl</a><br>
                            📞 Telefoon: <a href="tel:+31713326288" class="text-primary hover:underline">+31 (0)71 332 62 88</a>
                        </p>
                        <div class="mt-4 p-4 bg-[rgb(var(--color-accent)/0.1)] rounded border border-[rgb(var(--color-accent)/0.3)]">
                            <p class="text-sm">
                                <strong>Let op:</strong> In maart ontvang je een voorschotnota. De definitieve afrekening volgt
                                na het indienen van je areaalopgave (uiterlijk 1 juni voor boomkwekerijen).
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact -->
                <div class="bg-primary/5 rounded-lg border border-primary/20 p-6 md:p-8">
                    <h3 class="text-lg font-serif font-bold text-text mb-3">
                        Meer informatie nodig?
                    </h3>
                    <p class="text-text/80 mb-4">
                        Bekijk de volledige tarievenlijst op de website van NAK Tuinbouw of neem direct contact op
                        voor persoonlijk advies over je specifieke situatie.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a
                            href="https://www.naktuinbouw.nl/tarieven"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[rgb(var(--color-primary)/0.9)] transition-colors"
                        >
                            Officiële tarieven →
                        </a>
                        <a
                            href="https://www.naktuinbouw.nl/boomkwekerij"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
                        >
                            NAK Boomkwekerij →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// SEO Meta tags - NIET INDEXEERBAAR
useHead({
    title: 'NAK Registratie Kosten Calculator - De Toffe Peren',
    meta: [
        {
            name: 'description',
            content: 'Bereken de kosten voor NAK Tuinbouw registratie als boomkwekerij. Indicatieve calculator voor fruitbomen en boomkwekerijgewassen.'
        },
        {
            name: 'robots',
            content: 'noindex, nofollow'
        }
    ]
})

// Prevent indexing
useServerSeoMeta({
    robots: 'noindex, nofollow'
})
</script>

<style scoped>
.container {
    max-width: 1024px;
}
</style>
