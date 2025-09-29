<template>
    <div class="min-h-screen bg-white flex items-center justify-center p-4">
        <div class="max-w-md w-full text-center">
            <!-- Spinner -->
            <div class="flex justify-center mb-8">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    <div
                        class="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"
                    ></div>
                </div>
            </div>

            <!-- Title -->
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
                {{ title }}
            </h1>

            <!-- Description -->
            <p class="text-gray-600 text-lg">
                {{ description }}
            </p>

            <!-- Animated dots -->
            <div class="flex justify-center gap-2 mt-6">
                <div
                    class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style="animation-delay: 0ms"
                ></div>
                <div
                    class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style="animation-delay: 150ms"
                ></div>
                <div
                    class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style="animation-delay: 300ms"
                ></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps(["title", "description"]);
</script>
