<template>
    <div
        class="w-screen h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden"
    >
        <!-- Main content container -->
        <div
            class="bg-white shadow-2xl rounded-3xl p-12 max-w-4xl w-full mx-6 text-center border border-gray-100"
        >
            <!-- Title -->
            <h1 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">Deploying</h1>

            <!-- Subtitle -->
            <p class="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                Follow the deployment guide present in the GitHub repository to deploy your
                application.
            </p>

            <!-- Action button -->
            <div class="mt-10">
                <v-btn
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    @click="handleContinue"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                    Continue
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["continue"]);

const handleContinue = () => {
    emit("continue");
};
</script>
