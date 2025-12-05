<template>
    <section class="relative h-[300px] md:h-[400px] overflow-hidden">
        <div class="flex flex-col md:flex-row h-full">
            <!-- Left Side - Image -->
            <div class="relative w-full md:w-3/5 h-1/2 md:h-full">
                <!-- Placeholder background image -->
                <div class="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-background))] to-[rgb(var(--color-background)/0.8)]">
                    <slot name="image">
                        <!-- Default placeholder -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <NuxtImg src="/logo/logo.png" alt="de Toffe Peren" width="128" height="128" class="w-32 h-32 object-contain opacity-20" />
                        </div>
                    </slot>
                </div>
            </div>

            <!-- Right Side - Dark Green Panel -->
            <div class="w-full md:w-2/5 h-1/2 md:h-full bg-[rgb(var(--color-dark))] flex items-center justify-center p-8 md:p-12">
                <div class="text-center md:text-left max-w-lg">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide">
                        <slot name="title">
                            Kwekerij van<br />
                            ecologisch<br />
                            verantwoorde<br />
                            fruitbomen
                        </slot>
                    </h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>
