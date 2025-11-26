<template>
    <div class="nak-calculator bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-6 md:p-8">
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-text mb-6">
            NAK Registratie Kosten Calculator
        </h2>

        <p class="text-text/80 mb-8">
            Bereken de kosten voor NAK Tuinbouw registratie als boomkwekerij. Alle tarieven zijn gebaseerd op de officiële tarievenlijst 2025.
        </p>

        <!-- Formulier -->
        <form @submit.prevent class="space-y-6">
            <!-- Bedrijfstype -->
            <div>
                <label for="bedrijfstype" class="block text-sm font-semibold text-text mb-2">
                    Bedrijfstype
                    <span class="text-primary">*</span>
                </label>
                <select
                    id="bedrijfstype"
                    v-model="bedrijfstype"
                    class="w-full px-4 py-3 border border-[rgb(var(--color-text)/0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                >
                    <option value="">-- Selecteer bedrijfstype --</option>
                    <option value="productiebedrijf">Productiebedrijf</option>
                    <option value="handelsbedrijf">Handelsbedrijf</option>
                    <option value="detailBewerking">Detail/Bewerking/Overig</option>
                </select>
                <p class="text-xs text-text/60 mt-1">
                    Productiebedrijf: u produceert en verhandelt plant-/teeltmateriaal
                </p>
            </div>

            <!-- Gewasgroep -->
            <div>
                <label for="gewasgroep" class="block text-sm font-semibold text-text mb-2">
                    Gewasgroep
                    <span class="text-primary">*</span>
                </label>
                <select
                    id="gewasgroep"
                    v-model="gewasgroep"
                    class="w-full px-4 py-3 border border-[rgb(var(--color-text)/0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                >
                    <option value="">-- Selecteer gewasgroep --</option>
                    <option value="fruitProf">Fruitgewassen (professionele markt)</option>
                    <option value="boomkwekerij">Boomkwekerij algemeen / Vaste planten</option>
                </select>
                <p class="text-xs text-text/60 mt-1">
                    Professionele markt: verkoop aan bedrijven/professionals. Amateurmarkt: verkoop aan particulieren.
                </p>
            </div>

            <!-- Areaal -->
            <div>
                <label for="areaal" class="block text-sm font-semibold text-text mb-2">
                    Areaal (in are)
                    <span class="text-primary">*</span>
                </label>
                <input
                    id="areaal"
                    v-model.number="areaal"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Bijvoorbeeld: 20"
                    class="w-full px-4 py-3 border border-[rgb(var(--color-text)/0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                />
                <p class="text-xs text-text/60 mt-1">
                    1 hectare = 100 are. Bijvoorbeeld: 0,2 hectare = 20 are.
                </p>
            </div>

            <!-- Omzet (alleen voor handelsbedrijf) -->
            <div v-if="bedrijfstype === 'handelsbedrijf'">
                <label for="omzet" class="block text-sm font-semibold text-text mb-2">
                    Jaaromzet (€)
                    <span class="text-primary">*</span>
                </label>
                <input
                    id="omzet"
                    v-model.number="omzet"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Bijvoorbeeld: 75000"
                    class="w-full px-4 py-3 border border-[rgb(var(--color-text)/0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                />
                <p class="text-xs text-text/60 mt-1">
                    Voor handelsbedrijven bepaalt de omzet de basisbijdrage.
                </p>
            </div>

            <!-- Schaalvoordelen info -->
            <div v-if="gewasgroep" class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-4 border border-[rgb(var(--color-text)/0.1)]">
                <h4 class="text-sm font-semibold text-text mb-2">💡 Schaalvoordelen</h4>
                <ul class="text-xs text-text/70 space-y-1">
                    <li v-for="(schaal, index) in schaalvoordelen" :key="index">
                        {{ schaal }}
                    </li>
                </ul>
            </div>
        </form>

        <!-- Resultaten -->
        <div v-if="isFormValid" class="mt-8 pt-8 border-t border-[rgb(var(--color-text)/0.1)]">
            <h3 class="text-xl font-serif font-bold text-text mb-4">
                Berekende Kosten
            </h3>

            <div class="space-y-3">
                <!-- Basisbijdrage -->
                <div class="flex justify-between items-center">
                    <span class="text-text/80">Basisbijdrage ({{ getBedrijfstypeLabel() }})</span>
                    <span class="font-semibold text-text">€{{ formatBedrag(resultaat.basisbijdrage) }}</span>
                </div>

                <!-- Areaalbijdrage -->
                <div class="flex justify-between items-center">
                    <div>
                        <span class="text-text/80">Areaalbijdrage</span>
                        <p class="text-xs text-text/60">
                            {{ areaal }} are × €{{ resultaat.areaaltarief.toFixed(2) }}/are
                        </p>
                        <p class="text-xs text-primary font-medium">
                            {{ resultaat.areaalschaal }}
                        </p>
                    </div>
                    <span class="font-semibold text-text">€{{ formatBedrag(resultaat.areaalbijdrage) }}</span>
                </div>

                <!-- Subtotaal -->
                <div class="flex justify-between items-center pt-3 border-t border-[rgb(var(--color-text)/0.1)]">
                    <span class="text-text/80">Subtotaal (excl. BTW)</span>
                    <span class="font-semibold text-text">€{{ formatBedrag(resultaat.subtotaal) }}</span>
                </div>

                <!-- BTW -->
                <div class="flex justify-between items-center">
                    <span class="text-text/80">BTW (21%)</span>
                    <span class="font-semibold text-text">€{{ formatBedrag(resultaat.btw) }}</span>
                </div>

                <!-- Totaal -->
                <div class="flex justify-between items-center pt-3 border-t-2 border-primary">
                    <span class="text-lg font-bold text-text">Totaal per jaar</span>
                    <span class="text-2xl font-bold text-primary">€{{ formatBedrag(resultaat.totaal) }}</span>
                </div>
            </div>

            <!-- Extra info -->
            <div class="mt-6 bg-[rgb(var(--color-accent)/0.1)] rounded-lg p-4 border border-[rgb(var(--color-accent)/0.3)]">
                <p class="text-sm text-text/80">
                    ℹ️ Dit is een indicatieve berekening. Extra kosten kunnen bijkomen voor inspectiebezoeken (€70 per bezoek + €127,80 per uur).
                    Voorschotnota wordt verstuurd in maart.
                </p>
            </div>
        </div>

        <!-- Disclaimer -->
        <div class="mt-8 pt-8 border-t border-[rgb(var(--color-text)/0.1)]">
            <p class="text-xs text-text/60">
                Tarieven zijn gebaseerd op de officiële
                <a href="https://www.naktuinbouw.nl/tarieven" target="_blank" rel="noopener" class="text-primary hover:underline">
                    NAK Tuinbouw Tarievenlijst 2025
                </a>.
                Deze calculator is een hulpmiddel en kan geen rechten worden ontleend aan de berekende bedragen.
                Neem contact op met NAK Tuinbouw voor exacte kosten.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNakTarieven } from '~/composables/useNakTarieven'

const { berekenTotaleKosten, getSchaalvoordelen } = useNakTarieven()

// Form state
const bedrijfstype = ref('')
const gewasgroep = ref('')
const areaal = ref(null)
const omzet = ref(0)

// Check of formulier volledig is ingevuld
const isFormValid = computed(() => {
    if (!bedrijfstype.value || !gewasgroep.value || !areaal.value) return false
    if (bedrijfstype.value === 'handelsbedrijf' && !omzet.value) return false
    return true
})

// Bereken resultaat
const resultaat = computed(() => {
    if (!isFormValid.value) return null

    return berekenTotaleKosten(
        bedrijfstype.value,
        gewasgroep.value,
        areaal.value,
        omzet.value
    )
})

// Schaalvoordelen voor geselecteerde gewasgroep
const schaalvoordelen = computed(() => {
    if (!gewasgroep.value) return []
    return getSchaalvoordelen(gewasgroep.value)
})

// Helper functies
const formatBedrag = (bedrag) => {
    return bedrag.toFixed(2).replace('.', ',')
}

const getBedrijfstypeLabel = () => {
    const labels = {
        productiebedrijf: 'Productiebedrijf',
        handelsbedrijf: 'Handelsbedrijf',
        detailBewerking: 'Detail/Bewerking'
    }
    return labels[bedrijfstype.value] || ''
}
</script>

<style scoped>
.nak-calculator {
    transition: all 0.3s ease;
}

/* Custom select styling */
select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    appearance: none;
}

/* Input focus effects */
input:focus,
select:focus {
    box-shadow: 0 0 0 3px rgb(var(--color-primary) / 0.1);
}
</style>
