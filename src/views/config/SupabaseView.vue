<template>
    <div
        class="w-screen h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden"
    >
        <!-- Main content container -->
        <div
            class="bg-white shadow-2xl rounded-3xl p-12 max-w-lg w-full mx-6 text-center border border-gray-100"
        >
            <!-- Video -->

            <!-- Title -->
            <h1 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Connect to Supabase
            </h1>

            <!-- Subtitle -->
            <p class="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                Let's connect to your pre-configured supabase instance. Please enter your
                credentials bellow. You can find the necessary information on how to find the
                credentials on GitHub.
            </p>

            <!-- Input fields -->
            <v-form @submit.prevent="submit">
                <div class="space-y-5 py-5">
                    <v-text-field
                        v-model="url.value.value"
                        label="Instance URL"
                        outlined
                        dense
                        hide-details
                        class="py-5"
                        aria-required="true"
                        :error-messages="url.errorMessage.value"
                    />
                    <v-text-field
                        v-model="serviceKey.value.value"
                        label="Instance Service Key"
                        outlined
                        dense
                        hide-details
                        aria-required="true"
                        :error-messages="serviceKey.errorMessage.value"
                    />
                </div>
                <!-- Action button -->
                <div class="mt-10">
                    <v-btn
                        size="x-large"
                        color="primary"
                        variant="elevated"
                        type="submit"
                        :loading="isConnectLoading"
                        rounded="xl"
                        class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                        Connect
                    </v-btn>
                </div>
            </v-form>
        </div>
    </div>

    <v-dialog v-model="showContinueModal" width="auto">
        <v-card prepend-icon="mdi-update" :text="modalText" title="Your attention is needed">
            <!-- Before you say anything, I know this is trash but we have a big timing constraint -->
            <template v-slot:actions>
                <v-btn
                    @click="showContinueModal = false"
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    v-if="!hasOldData"
                >
                    Ok
                </v-btn>
                <v-btn
                    @click="handleSaveAndReset"
                    size="x-large"
                    color="danger"
                    variant="elevated"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    :loading="saveResetLoading"
                    v-if="hasOldData"
                >
                    SAVE & RESET
                </v-btn>
                <v-btn
                    @click="handleContinue"
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    v-if="hasOldData"
                >
                    Continue with current data
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import SupabaseService from "@/code/services/SupabaseService";
import { useConfigStep } from "@/stores/configStep";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

const showContinueModal = ref(false);
const hasOldData = ref(false);
const modalText = ref("");
const isConnectLoading = ref(false);
const saveResetLoading = ref(false);

const emit = defineEmits(["stepswitch"]);
const { handleSubmit } = useForm({
    validationSchema: {
        url(value: string | undefined) {
            return !!value || "Url is required";
        },
        serviceKey(value: string | undefined) {
            return !!value || "Service Key is required";
        }
    }
});
const submit = handleSubmit(async () => {
    await connectService();
});

const connectService = async () => {
    //validate the form first

    isConnectLoading.value = true;
    console.log("Connecting with:", url.value, serviceKey.value);
    const isOk = await SupabaseService.setSupabaseConnection(
        url.value.value as string,
        serviceKey.value.value as string
    );
    if (!isOk) {
        //show error message
        isConnectLoading.value = false;
        showContinueModal.value = true;
        modalText.value = "Looks like one of the value you entered is invalid please check them.";
        return;
    }

    //check if supabase has some old data or not
    if (await SupabaseService.checkAlreadyConfigured()) {
        modalText.value =
            "Looks like you already have some data in your supabase, would you like to save (download) and reset it before continuing ?";
        hasOldData.value = true;
        showContinueModal.value = true;
        isConnectLoading.value = false;

        return;
    }
    handleContinue();
    isConnectLoading.value = false;
};

const url = useField("url");
const serviceKey = useField("serviceKey");

async function handleSaveAndReset() {
    saveResetLoading.value = true;
    if (!(await SupabaseService.handleSaveAndReset())) {
        modalText.value = "Looks like something went wrong, refresh the page and try again.";
        return;
    }
    const { setStep } = useConfigStep();
    setStep(1); //all good go to next page
    emit("stepswitch");
}

const handleContinue = () => {
    const { setStep } = useConfigStep();
    setStep(1); //all good go to next page
    emit("stepswitch");
};
</script>
