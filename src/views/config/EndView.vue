<template>
    <div
        class="w-screen h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden"
    >
        <!-- Main content container -->
        <div
            class="bg-white shadow-2xl rounded-3xl p-12 max-w-2xl w-full mx-6 text-center border border-gray-100"
        >
            <!-- Success Icon -->
            <div class="mb-8">
                <v-icon
                    icon="mdi-check-circle"
                    size="80"
                    color="success"
                    class="animate-bounce"
                ></v-icon>
            </div>

            <!-- Title -->
            <h1 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">Setup Complete!</h1>

            <!-- Subtitle -->
            <p class="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                Congratulations! You've successfully completed all the setup steps.
            </p>

            <!-- Steps Recap -->
            <div class="text-left mb-10 bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
                    What You've Accomplished
                </h2>

                <div class="space-y-4">
                    <div class="flex items-start gap-4">
                        <v-icon
                            icon="mdi-check-circle"
                            color="success"
                            size="24"
                            class="flex-shrink-0 mt-1"
                        ></v-icon>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Connected to Supabase</h3>
                            <p class="text-gray-600">
                                Your database instance is configured and ready
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <v-icon
                            icon="mdi-check-circle"
                            color="success"
                            size="24"
                            class="flex-shrink-0 mt-1"
                        ></v-icon>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Admin User Created</h3>
                            <p class="text-gray-600">Your administrator account is set up</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <v-icon
                            icon="mdi-check-circle"
                            color="success"
                            size="24"
                            class="flex-shrink-0 mt-1"
                        ></v-icon>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Discord Configured</h3>
                            <p class="text-gray-600">Discord integration is complete</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <v-icon
                            icon="mdi-check-circle"
                            color="success"
                            size="24"
                            class="flex-shrink-0 mt-1"
                        ></v-icon>
                        <div>
                            <h3 class="font-bold text-gray-900 text-lg">Deployment Ready</h3>
                            <p class="text-gray-600">Your application is deployed and live</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action button -->
            <div class="mt-10">
                <v-btn
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    @click="handleFinish"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                    Get Started
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["finish"]);

const handleFinish = () => {
    emit("finish");
};
</script>

<style scoped>
@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 1s ease-in-out 2;
}
</style>
