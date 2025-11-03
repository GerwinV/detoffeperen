<template>
    <footer class="bg-text text-white">
        <div class="container py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Company Info -->
                <div class="md:col-span-1">
                    <div class="flex items-center space-x-3 mb-4">
                        <PearIcon class="h-8 w-8 text-accent" />
                        <span class="text-xl font-bold font-playfair">Toffe Peren</span>
                    </div>
                    <p class="text-gray-300 text-sm">
                        Kwekerij voor fruitbomen zeer geschikt voor voedselbossen.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Snelle links</h3>
                    <ul class="space-y-2 text-gray-300">
                        <li>
                            <NuxtLink to="/" class="hover:text-accent transition-colors">Home</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/shop" class="hover:text-accent transition-colors">Assortiment</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact" class="hover:text-accent transition-colors">Contact</NuxtLink>
                        </li>
                    </ul>
                </div>


                <!-- Contact Info -->
                <div>
                    <h3 class="font-semibold text-lg mb-4">Contact</h3>
                    <ul class="space-y-3 text-gray-300">
                        <!-- <li class="flex items-start">
                            <MapPin class="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            <span class="text-sm">
                                Boomgaardlaan 123<br />
                                5678 AB Fruitstad<br />
                                Nederland
                            </span>
                        </li>
                        <li class="flex items-center">
                            <Phone class="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                            <a href="tel:+31612345678" class="hover:text-accent transition-colors">
                                +31 6 12345678
                            </a>
                        </li> -->
                        <li class="flex items-center">
                            <Mail class="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                            <a href="mailto:info@detoffeperen.nl" class="hover:text-accent transition-colors">
                                info@detoffeperen.nl
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="mt-12 pt-8 border-t border-gray-700">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p class="text-sm text-gray-400">
                        © {{ currentYear }} Toffe Peren. Alle rechten voorbehouden.
                    </p>
                    <!-- Privacy and terms links - uncomment when pages are created -->
                    <!-- <div class="flex space-x-6 text-sm text-gray-400">
            <NuxtLink to="/privacy" class="hover:text-accent transition-colors">
              Privacybeleid
            </NuxtLink>
            <NuxtLink to="/algemene-voorwaarden" class="hover:text-accent transition-colors">
              Algemene Voorwaarden
            </NuxtLink>
          </div> -->
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { MapPin, Phone, Mail } from 'lucide-vue-next'
import PearIcon from '~/components/icons/PearIcon.vue'

const currentYear = new Date().getFullYear()
</script>
