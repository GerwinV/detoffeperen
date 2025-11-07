<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <!-- TODO: Replace with actual contact image -->
                <div class="absolute inset-0 flex items-center justify-center text-[rgb(var(--color-text)/0.2)]">
                    <Mail class="w-32 h-32" />
                </div>
            </template>
        </PageHero>

        <!-- Contact Content -->
        <section class="py-16 md:py-24 bg-white">
            <div class="container">
                <div class="max-w-2xl mx-auto">
                    <!-- Contact Form -->
                    <!-- <div>
                        <h2 class="text-2xl font-bold font-playfair mb-6">Stuur Ons Een Bericht</h2>
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <BaseInput v-model="form.firstName" label="Voornaam" placeholder="Jan" required :error="errors.firstName" />
                                <BaseInput v-model="form.lastName" label="Achternaam" placeholder="de Vries" required :error="errors.lastName" />
                            </div>

                            <BaseInput v-model="form.email" type="email" label="E-mailadres" placeholder="jan@voorbeeld.nl" required :error="errors.email" />

                            <BaseInput v-model="form.phone" type="tel" label="Telefoonnummer" placeholder="+31 6 12345678" :error="errors.phone" />

                            <BaseInput v-model="form.subject" label="Onderwerp" placeholder="Vraag over appelbomen" required :error="errors.subject" />

                            <BaseInput v-model="form.message" label="Bericht" placeholder="Uw bericht..." textarea :rows="6" required :error="errors.message" />

                            <BaseButton type="submit" :loading="submitting" block>
                                Verstuur Bericht
                            </BaseButton>
                        </form>
                    </div> -->

                    <!-- Contact Information -->
                    <div>
                        <h2 class="text-2xl font-bold font-playfair mb-6 text-text">Contactgegevens</h2>

                        <div class="space-y-6">
                            <!-- Address -->
                            <!-- <BaseCard>
                                <div class="p-6">
                                    <div class="flex items-start">
                                        <MapPin class="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <h3 class="font-semibold mb-2">Bezoekadres</h3>
                                            <p class="text-gray-600">
                                                Boomgaardlaan 123<br />
                                                5678 AB Fruitstad<br />
                                                Nederland
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BaseCard> -->

                            <!-- Phone -->
                            <!-- <BaseCard>
                                <div class="p-6">
                                    <div class="flex items-start">
                                        <Phone class="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <h3 class="font-semibold mb-2">Telefoon</h3>
                                            <p class="text-gray-600">
                                                <a href="tel:+31612345678" class="hover:text-primary">
                                                    +31 6 12345678
                                                </a>
                                            </p>
                                            <p class="text-sm text-gray-500 mt-1">
                                                Ma-Vr: 09:00 - 17:00<br />
                                                Za: 09:00 - 14:00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BaseCard> -->

                            <!-- Email -->
                            <BaseCard class="bg-[rgb(var(--color-background))] border border-[rgb(var(--color-text)/0.1)] shadow-md">
                                <div class="p-6">
                                    <div class="flex items-start">
                                        <Mail class="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                                        <div>
                                            <h3 class="font-semibold mb-2 text-[rgb(var(--color-text))]">E-mail</h3>
                                            <p class="text-[rgb(var(--color-text))]">
                                                <a href="mailto:info@detoffeperen.nl" class="hover:text-primary transition-colors">
                                                    info@detoffeperen.nl
                                                </a>
                                            </p>
                                            <p class="text-sm text-[rgb(var(--color-text)/0.7)] mt-1">
                                                Wij proberen binnen 24 uur te reageren.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BaseCard>

                            <!-- Opening Hours -->
                            <!-- <BaseCard>
                <div class="p-6">
                  <div class="flex items-start">
                    <Clock class="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 class="font-semibold mb-2">Openingstijden Kwekerij</h3>
                      <div class="text-gray-600 space-y-1">
                        <div class="flex justify-between">
                          <span>Maandag - Vrijdag:</span>
                          <span>09:00 - 17:00</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Zaterdag:</span>
                          <span>09:00 - 14:00</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Zondag:</span>
                          <span>Gesloten</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BaseCard> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <!-- <section class="py-16 md:py-24 bg-gray-50">
            <div class="container">
                <h2 class="text-2xl font-bold font-playfair text-center mb-8">Vind Ons</h2>
                <div class="aspect-w-16 aspect-h-9 md:aspect-h-6">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.8531593649876!2d5.470599!3d51.816804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDQ5JzAwLjUiTiA1wrAyOCcxNC4yIkU!5e0!3m2!1sen!2snl!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full h-[400px] rounded-lg shadow-lg"></iframe>
                </div>
            </div>
        </section> -->

        <!-- FAQ Section -->
        <section class="py-16 md:py-24 bg-white">
            <div class="container max-w-3xl">
                <h2 class="text-2xl font-bold font-playfair text-center mb-8 text-text">Veelgestelde Vragen</h2>
                <div class="space-y-4">
                    <BaseCard v-for="(faq, index) in faqs" :key="index">
                        <button @click="toggleFaq(index)" class="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <div class="flex justify-between items-center">
                                <h3 class="font-semibold text-text">{{ faq.question }}</h3>
                                <ChevronDown :class="[
                                    'h-5 w-5 text-[rgb(var(--color-text)/0.5)] transition-transform duration-200',
                                    activeFaq === index && 'transform rotate-180'
                                ]" />
                            </div>
                            <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96" leave-active-class="transition-all duration-200" leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                                <p v-if="activeFaq === index" class="text-text mt-4">
                                    {{ faq.answer }}
                                </p>
                            </Transition>
                        </button>
                    </BaseCard>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-vue-next'

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
})

const errors = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
})

const submitting = ref(false)
const activeFaq = ref<number | null>(null)

const faqs = [
    {
        question: 'Kan ik de kwekerij bezoeken?',
        answer: 'Neem daarvoor contact met ons op via ons emailadres.'
    },
    {
        question: 'Leveren jullie door heel Nederland?',
        answer: 'Op dit moment is afhalen alleen mogelijk.'
    },
    {
        question: 'Wanneer is de beste tijd om fruitbomen te planten?',
        answer: 'De beste tijd om fruitbomen te planten is in het najaar (november-januari) of vroege voorjaar (maart-april). In deze periodes kunnen de bomen goed wortelen voordat het groeiseizoen begint.'
    }
]

const toggleFaq = (index: number) => {
    activeFaq.value = activeFaq.value === index ? null : index
}

const handleSubmit = async () => {
    // Reset errors
    Object.keys(errors.value).forEach(key => {
        errors.value[key as keyof typeof errors.value] = ''
    })

    // Basic validation
    if (!form.value.firstName) errors.value.firstName = 'Voornaam is verplicht'
    if (!form.value.lastName) errors.value.lastName = 'Achternaam is verplicht'
    if (!form.value.email) errors.value.email = 'E-mailadres is verplicht'
    if (!form.value.subject) errors.value.subject = 'Onderwerp is verplicht'
    if (!form.value.message) errors.value.message = 'Bericht is verplicht'

    // Check if there are errors
    if (Object.values(errors.value).some(error => error)) {
        return
    }

    submitting.value = true

    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    submitting.value = false

    // Reset form
    Object.keys(form.value).forEach(key => {
        form.value[key as keyof typeof form.value] = ''
    })

    alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.')
}
</script>
