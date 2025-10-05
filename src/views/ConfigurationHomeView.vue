<template>
    <div v-if="step === 0">
        <SupabaseView @stepswitch="handleStepChange(1)"></SupabaseView>
    </div>
    <div v-if="step === 1">
        <AdminConfigureView @user-created="handleStepChange(2)"> </AdminConfigureView>
    </div>
    <div v-if="step === 2">
        <BotView @continue="handleStepChange(3)" />
    </div>
    <div v-if="step === 3">
        <DeploymentView @continue="handleStepChange(4)" />
    </div>
    <div v-if="step === 4">
        <EndView />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import AdminConfigureView from "./config/AdminConfigureView.vue";
import SupabaseView from "./config/SupabaseView.vue";
import BotView from "./config/BotView.vue";
import DeploymentView from "./config/DeploymentView.vue";
import EndView from "./config/EndView.vue";
const step = ref(0);
function handleStepChange(current: number) {
    step.value = current;
}
</script>
