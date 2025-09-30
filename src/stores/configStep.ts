import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStep = defineStore("configStep", () => {
    const currentStep = ref(0);
    const setStep = (step: number) => (currentStep.value = step);

    return { currentStep, setStep };
});
