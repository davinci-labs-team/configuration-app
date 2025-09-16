<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
async function handleLetsGo() {
    loading.value = true;

    // Simulate loading/navigation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically navigate to your main app
    alert("Todo");

    loading.value = false;
}
</script>

<template>
    <p>test</p>
    <div
        class="w-screen h-screen bg-white flex items-center justify-center relative overflow-hidden"
    >
        <!-- Main content container -->
        <div
            class="bg-white shadow-2xl rounded-3xl p-16 max-w-lg w-full mx-6 text-center border border-gray-100"
        >
            <!-- Welcome heading -->
            <h1 class="text-6xl font-black text-gray-900 mb-6 tracking-tight">Welcome</h1>

            <!-- Subtitle text -->
            <p class="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
                Configure your application with ease and precision. Let's get started on your
                journey.
            </p>

            <!-- Let's go button -->
            <div>
                <v-btn
                    @click="handleLetsGo"
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    rounded="xl"
                    class="px-16 text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                    :loading="loading"
                >
                    Let's Go
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.hover-lift {
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.pulse-glow {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }
    50% {
        box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
    }
    100% {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }
}
</style>
