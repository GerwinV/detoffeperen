<template>
    <div>
        <!-- Hero Section -->
        <PageHero>
            <template #image>
                <NuxtImg src="/images/contact.jpg" alt="Contact" class="absolute inset-0 w-full h-full object-cover" />
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
                        <h2 class="text-2xl md:text-3xl font-bold text-text mb-6 uppercase tracking-wide">Contactgegevens</h2>

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
                                                <a href="mailto:info@kwekerijtoffeperen.nl" class="hover:text-primary transition-colors">
                                                    info@kwekerijtoffeperen.nl
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
                <h2 class="text-2xl md:text-3xl font-bold text-text text-center mb-8 uppercase tracking-wide">Veelgestelde Vragen</h2>
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
        answer: 'Ja, een bezoek is mogelijk, maar alleen op afspraak. Neem daarvoor contact op via ons e-mailadres. Tijdens een bezoek kun je zien hoe we onze bomen kweken, vragen stellen over ons regeneratieve systeem en advies krijgen over de soorten die het beste bij jouw project passen.'
    },
    {
        question: 'Leveren jullie door heel Nederland?',
        answer: 'Voor grotere bestellingen is levering mogelijk in Groningen, Drenthe en Friesland. Afhalen kan (op afspraak) in Eelde of Peize. Omdat onze bomen met de hand worden gerooid en zorgvuldig worden voorbereid, is vooraf bestellen noodzakelijk. Zo garanderen we dat de bomen gezond en stressvrij worden geleverd.'
    },
    {
        question: 'Wanneer is de beste tijd om fruitbomen te planten?',
        answer: 'De beste tijd is in het najaar (november–januari) of vroege voorjaar (maart–april). Zolang hiet niet vriest kun je bomen aanplanten. In deze periodes zijn de bomen in rust en kunnen ze goed wortelen voordat het groeiseizoen begint. Wortelgoed, zoals bij Toffe Peren, profiteert extra van de herfstperiode omdat de grond dan nog warm is, en de bomen zich dan nog vóór de winter in de nieuwe grond kunnen inwortelen.'
    },
    {
        question: 'Wat is wortelgoed en waarom leveren jullie bomen zo?',
        answer: 'Onze bomen worden als wortelgoed geleverd, dat betekent zonder aarde tijdens hun winterrust. Dit heeft verschillende voordelen: De boom is in rust en kan stressvrij worden verplant. Wortels blijven actief en kunnen snel beginnen met inwortelen op de nieuwe plek. We beschermen zo de gezonde grond van onze kwekerij en behouden het bodemleven. Bij reguliere kwekerijen worden bomen vaak in pot of met kluit verkocht, wat handig kan zijn voor de korte termijn, maar minder duurzaam en minder regeneratief is.'
    },
    {
        question: 'Waarom zijn jullie bomen anders dan in het tuincentrum?',
        answer: 'Onze bomen zijn speciaal geselecteerd voor voedselbossen, agroforestry en eetbare tuinen. Ze zijn geënt op sterke onderstammen, groeien op een levende bodem zonder kunstmest of chemische middelen, en zijn bedoeld om tientallen jaren mee te gaan. Eenmaal goed gevestigd leveren ze gezonde, robuuste bomen die langdurig fruit geven, minder verzorging nodig hebben en tegelijkertijd het ecosysteem versterken.'
    },
    {
        question: 'Welke soorten bieden jullie aan?',
        answer: 'We richten ons momenteel op appels, peren en nashi-peren. Alle bomen zijn geselecteerd op robuustheid, zelfredzaamheid, resistentie tegen ziekten, smaak en geschiktheid voor het noordelijke klimaat en zandgrond. Zo zijn ze ideaal voor voedselbossen en eetbare tuinen die weinig onderhoud nodig hebben. In de toekomst willen we onze selectie gaan uitbreiden en ook kleinfruit (zoals bessen) gaan leveren.'
    },
    {
        question: 'Hoe groot worden de bomen en hoe snel dragen ze vrucht?',
        answer: 'Omdat we op sterke onderstammen enten, groeien onze bomen krachtig en gezond. Ze dragen meestal iets later vrucht dan tuincentrum-bomen op zwakkere onderstammen, maar leven veel langer en zijn minder onderhoudsintensief. Dit maakt ze geschikt voor projecten die tientallen jaren meegaan. De uiteindelijke grootte van de bomen hangt natuurlijk af van de omstandigheden op jouw perceel. Onze fruitbomen worden stevige, productieve bomen die perfect passen in een voedselbos of eetbare tuin. Peren groeien tot ongeveer 2,5–5 m hoog, nashi tot 3,5–5 m, en appels op M7 of M11 tot 2,5–4 m. Zo ontstaat een mooie variatie in hoogte en breedte, wat zorgt voor een gevarieerd en productief groen landschap.'
    },
    {
        question: 'Hoe onderhoudsarm zijn de bomen?',
        answer: 'Onze bomen zijn geselecteerd op zelfredzaamheid en robuustheid. Dat betekent dat ze minder bemesting, water en verzorging nodig hebben dan veel tuincentrum-bomen. In een goed ontworpen voedselbos of eetbare tuin kunnen ze vaak grotendeels op eigen kracht groeien, terwijl ze vrucht dragen en het bodemleven versterken. De eerste twee jaar is het belangrijk om ze regelmatig water te geven tijdens droge periodes: zorg dat de grond rond de wortels diep vochtig blijft, ongeveer 1–2 keer per week bij langere droogte, zodat het jonge wortelstelsel zich goed kan ontwikkelen. Het helpt als je een flinke laag mulch (bijvoorbeeld houtsnippers) in de boomspiegel aanbrengt Zodra de bomen stevig verankerd zijn, zal water geven minder belangrijk worden.'
    },
    {
        question: 'Bieden jullie advies of begeleiding bij aanplant, ontwerp en onderhoud?',
        answer: 'Ja! Wij kunnen praktisch advies geven over planten, afstanden, combinaties van soorten en bodemvoorbereiding. Zo help je jouw bomen meteen goed wortelen en bijdragen aan een gezond ecosysteem. We bieden geen fysieke plantservice, maar we begeleiden je graag stap voor stap met kennis en tips, zodat de bomen maximaal kunnen groeien en fruit dragen. Ook kunnen we een beplantingsplan of voedselbos ontwerp maken.'
    },
    {
        question: 'Hebben jullie ook advies voor kleine tuinen?',
        answer: 'Zeker! Onze bomen zijn vooral geschikt voor voedselbossen, agroforestry en grote eetbare tuinen. Maar we hebben ook bomen die minder groot worden. Voor een stadstuin raden we meestal compactere fruitrassen of kleinere onderstammen aan. Neem contact op voor persoonlijk advies.'
    },
    {
        question: 'Wat is regeneratief kweken en waarom is dat belangrijk?',
        answer: 'Bij Toffe Peren kweken we met de natuur mee: levende bodem, biodiversiteit, sterke wortels en minimale grondverstoring. Dit maakt onze bomen zelfredzaam, robuust en veerkrachtig. In tegenstelling tot conventionele kwekerijen die vaak kunstmest, bestrijdingsmiddelen en intensieve verzorging gebruiken, zorgen wij dat onze bomen een bijdrage leveren aan een gezond ecosysteem vanaf het eerste moment. Wij streven erna om het ecosystem te herstellen: de grond die we gebruiken laten we beter en gezonder achter dan hoe we haar aantroffen.'
    },
    {
        question: 'Moet ik de bomen meteen planten na levering?',
        answer: 'Het is het beste om de bomen zo snel mogelijk te planten. Lukt dat niet direct, dan kun je ze tijdelijk inkuilen. Graaf een gat en plaats de wortels erin, gooi de grond er weer goed op, zodat ze volledig bedekt zijn met aarde en niet uitdrogen. Onze bomen zijn wortelgoed, wat betekent dat de wortels actief blijven en snel inwortelen zodra ze de grond in gaan. Zorg ervoor dat de wortels niet worden blootgesteld aan wind, vorst of uitdroging, want dat kan leiden tot gedeeltelijk afsterven en de boom verzwakken.'
    },
    {
        question: 'Hoe diep en hoe breed moet ik het plantgat maken?',
        answer: 'Graaf een plantgat dat ongeveer twee keer zo breed is als de wortels van de boom en zo diep dat de wortels net ruimte hebben om recht te groeien. Zo kan de boom zich goed ontwikkelen en snel wortelen. Zorg dat de wortels niet te diep of te krap zitten, en werk de aarde voorzichtig aan rondom de wortels zodat er geen luchtzakken ontstaan.'
    },
    {
        question: 'Zijn de bomen al aangepast aan lokale omstandigheden in Noord-Nederland?',
        answer: 'Ja! Onze bomen worden in onze kwekerij op zandgrond in Noord-Nederland opgekweekt en geselecteerd op robustheid, klimaatresistentie en zelfredzaamheid. Dat betekent dat ze goed geworteld zijn voor het lokale klimaat en minder gevoelig voor stress door kou, droogte of natte periodes.'
    },
    {
        question: 'Hoe groot is het risico dat de bomen het eerste jaar niet aanslaan?',
        answer: 'Het risico is laag, maar nooit helemaal nul. Onze bomen zijn geënt op sterke onderstammen, opgekweekt op levende bodem en geleverd als wortelgoed in rust. Als je ze op de juiste manier plant, water geeft bij droogte en de wortels beschermt, is de kans dat ze aanslaan erg groot. In een goed voorbereide bodem en bij goede nazorg groeien ze meestal direct stevig door.'
    },
    {
        question: 'Waarom heten jullie Toffe Peren?',
        answer: 'Waarom Toffe Peren? Omdat onze bomen net zo tof zijn als wij, de twee toffe peren die ze kweken. Omdat peren vaak onderschat worden en wij zelf dol zijn op (nashi)peren. En eerlijk gezegd: het klinkt toch ook gewoon leuker dan Regeneratieve Fruitbomen B.V.'
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
