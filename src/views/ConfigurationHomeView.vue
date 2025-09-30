<template>
    <div v-if="currentStep === 0">
        <SupabaseView></SupabaseView>
    </div>
    <div v-if="currentStep === 1"></div>
</template>
<script setup lang="ts">
import { useConfigStep } from "@/stores/configStep";
import SupabaseView from "./config/SupabaseView.vue";
import { onMounted } from "vue";

const { currentStep, setStep } = useConfigStep();

onMounted(() => {
    setStep(0);
});
</script>
