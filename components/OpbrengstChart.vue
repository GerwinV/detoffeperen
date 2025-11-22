<template>
    <div class="opbrengst-chart bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-4 md:p-6 mb-6">
        <!-- Header met toggle knop -->
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg md:text-xl font-semibold text-text">Opbrengsten Over Tijd</h3>
            <button
                @click="expanded = !expanded"
                class="md:hidden px-3 py-1 text-sm bg-primary text-white rounded hover:bg-[rgb(var(--color-primary)/0.9)]"
            >
                {{ expanded ? 'Verberg' : 'Toon' }} grafiek
            </button>
        </div>

        <!-- Chart container (hidden on mobile when not expanded) -->
        <div :class="['chart-container', { 'hidden md:block': !expanded }]">
            <!-- Canvas -->
            <div class="relative h-64 md:h-80 lg:h-96 mb-4">
                <canvas ref="chartCanvas"></canvas>
            </div>

            <!-- Controls -->
            <div class="border-t border-[rgb(var(--color-text)/0.1)] pt-4">
                <!-- Reset & Select All buttons -->
                <div class="flex gap-2 mb-3">
                    <button
                        @click="resetToTop8"
                        class="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-[rgb(var(--color-primary)/0.9)] transition-colors"
                    >
                        Reset naar top 8
                    </button>
                    <button
                        @click="toggleAll"
                        class="px-3 py-1 text-sm bg-secondary text-white rounded hover:bg-[rgb(var(--color-secondary)/0.9)] transition-colors"
                    >
                        {{ allSelected ? 'Deselecteer alles' : 'Selecteer alles' }}
                    </button>
                </div>

                <!-- Variety checkboxes (scrollable) -->
                <div class="max-h-48 overflow-y-auto border border-[rgb(var(--color-text)/0.1)] rounded p-3 bg-[rgb(var(--color-background)/0.3)]">
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <label
                            v-for="(variety, index) in varieties"
                            :key="variety.naam"
                            class="flex items-center gap-2 cursor-pointer hover:bg-[rgb(var(--color-background)/0.5)] p-1 rounded transition-colors"
                        >
                            <input
                                type="checkbox"
                                :checked="selectedVarieties.includes(variety.naam)"
                                @change="toggleVariety(variety.naam)"
                                class="w-4 h-4 accent-primary cursor-pointer"
                            >
                            <span class="flex items-center gap-1.5 text-sm">
                                <span
                                    class="w-3 h-3 rounded-full flex-shrink-0"
                                    :style="{ backgroundColor: colors[index] }"
                                ></span>
                                <span class="truncate text-text">{{ variety.naam }}</span>
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Info text -->
                <p class="text-xs text-[rgb(var(--color-text)/0.6)] mt-2">
                    Klik op een lijn in de grafiek om deze te highlighten. Klik nogmaals om te resetten.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, shallowRef } from 'vue'
import { Chart, registerables } from 'chart.js'

// Register Chart.js components
Chart.register(...registerables)

const props = defineProps({
    varieties: {
        type: Array,
        required: true
    },
    jaren: {
        type: Array,
        required: true
    },
    fruitType: {
        type: String,
        required: true
    }
})

// State
const chartCanvas = ref(null)
const chart = shallowRef(null)
const selectedVarieties = ref([])
const highlightedVariety = ref(null)
const expanded = ref(false)

// Computed
const allSelected = computed(() =>
    selectedVarieties.value.length === props.varieties.length
)

// Color palette (40 distinct colors)
const colors = [
    '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D', '#16A34A',
    '#059669', '#0D9488', '#0891B2', '#0284C7', '#2563EB', '#4F46E5',
    '#7C3AED', '#9333EA', '#C026D3', '#DB2777', '#E11D48', '#F97316',
    '#FB923C', '#FCD34D', '#BEF264', '#86EFAC', '#6EE7B7', '#5EEAD4',
    '#67E8F9', '#7DD3FC', '#93C5FD', '#A5B4FC', '#C4B5FD', '#D8B4FE',
    '#F0ABFC', '#FBCFE8', '#FCA5A5', '#FDBA74', '#FDE047', '#A3E635',
    '#4ADE80', '#34D399', '#2DD4BF', '#22D3EE'
]

// Initialize with top 8
const resetToTop8 = () => {
    selectedVarieties.value = props.varieties.slice(0, 8).map(v => v.naam)
    highlightedVariety.value = null
    updateChart()
}

// Toggle all varieties
const toggleAll = () => {
    if (allSelected.value) {
        selectedVarieties.value = []
    } else {
        selectedVarieties.value = props.varieties.map(v => v.naam)
    }
    highlightedVariety.value = null
    updateChart()
}

// Toggle individual variety
const toggleVariety = (naam) => {
    const index = selectedVarieties.value.indexOf(naam)
    if (index > -1) {
        selectedVarieties.value.splice(index, 1)
    } else {
        selectedVarieties.value.push(naam)
    }
    updateChart()
}

// Create chart datasets
const createDatasets = () => {
    return props.varieties
        .filter(v => selectedVarieties.value.includes(v.naam))
        .map((variety) => {
            const varietyIndex = props.varieties.findIndex(v => v.naam === variety.naam)
            const isHighlighted = highlightedVariety.value === variety.naam
            const isOtherHighlighted = highlightedVariety.value && highlightedVariety.value !== variety.naam

            const baseColor = colors[varietyIndex]
            const fadedColor = baseColor + '40' // Add alpha for 25% opacity

            return {
                label: variety.naam,
                data: [...variety.data], // Clone array to avoid reference issues
                borderColor: isOtherHighlighted ? fadedColor : baseColor,
                backgroundColor: isOtherHighlighted ? fadedColor : baseColor,
                pointBackgroundColor: isOtherHighlighted ? fadedColor : baseColor,
                pointBorderColor: isOtherHighlighted ? fadedColor : baseColor,
                borderWidth: isHighlighted ? 3 : 2,
                pointRadius: isHighlighted ? 5 : 3,
                pointHoverRadius: 6,
                tension: 0.3,
                spanGaps: false // Don't connect missing data points
            }
        })
}

// Update chart data
const updateChart = () => {
    if (!chart.value) return

    // Update datasets
    chart.value.data.datasets = createDatasets()

    // Use 'none' animation mode for instant updates
    chart.value.update('none')
}

// Initialize chart
const initChart = () => {
    if (!chartCanvas.value) return

    const ctx = chartCanvas.value.getContext('2d')

    chart.value = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.jaren,
            datasets: createDatasets()
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false // We use custom checkboxes instead
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || ''
                            const value = context.parsed.y
                            return value !== null ? `${label}: ${value} kg` : `${label}: geen data`
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Jaar',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Opbrengst (kg)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const datasetIndex = elements[0].datasetIndex
                    const varietyName = chart.value.data.datasets[datasetIndex].label

                    // Toggle highlight
                    if (highlightedVariety.value === varietyName) {
                        highlightedVariety.value = null
                    } else {
                        highlightedVariety.value = varietyName
                    }

                    updateChart()
                }
            }
        }
    })
}

// Lifecycle
onMounted(async () => {
    resetToTop8()
    await nextTick()
    initChart()
})
</script>

<style scoped>
.opbrengst-chart {
    transition: all 0.3s ease;
}

.chart-container canvas {
    max-height: 100%;
}

/* Custom scrollbar for variety list */
.max-h-48::-webkit-scrollbar {
    width: 8px;
}

.max-h-48::-webkit-scrollbar-track {
    background: rgb(var(--color-background) / 0.3);
    border-radius: 4px;
}

.max-h-48::-webkit-scrollbar-thumb {
    background: rgb(var(--color-primary) / 0.5);
    border-radius: 4px;
}

.max-h-48::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--color-primary) / 0.7);
}
</style>
