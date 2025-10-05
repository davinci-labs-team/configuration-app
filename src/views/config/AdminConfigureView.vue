<template>
    <div
        class="w-screen h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden"
    >
        <!-- Main content container -->
        <div
            class="bg-white shadow-2xl rounded-3xl p-12 max-w-lg w-full mx-6 text-center border border-gray-100"
        >
            <!-- Title -->
            <h1 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">Create Admin User</h1>

            <!-- Subtitle -->
            <p class="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                Set up your administrator account by entering your email and choosing a secure
                password.
            </p>

            <!-- Form -->
            <v-form @submit.prevent="submit">
                <div class="space-y-5 py-5">
                    <v-text-field
                        v-model="email.value.value"
                        label="Email Address"
                        type="email"
                        outlined
                        dense
                        hide-details="auto"
                        class="py-3"
                        aria-required="true"
                        :error-messages="email.errorMessage.value"
                        prepend-inner-icon="mdi-email-outline"
                    />

                    <v-text-field
                        v-model="password.value.value"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        outlined
                        dense
                        hide-details="auto"
                        class="py-3"
                        aria-required="true"
                        :error-messages="password.errorMessage.value"
                        prepend-inner-icon="mdi-lock-outline"
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                    />

                    <v-text-field
                        v-model="confirmPassword.value.value"
                        label="Confirm Password"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        outlined
                        dense
                        hide-details="auto"
                        class="py-3"
                        aria-required="true"
                        :error-messages="confirmPassword.errorMessage.value"
                        prepend-inner-icon="mdi-lock-check-outline"
                        :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    />
                </div>

                <!-- Action button -->
                <div class="mt-10">
                    <v-btn
                        size="x-large"
                        color="primary"
                        variant="elevated"
                        type="submit"
                        :loading="isLoading"
                        rounded="xl"
                        class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                        Create Admin
                    </v-btn>
                </div>
            </v-form>
        </div>
    </div>

    <!-- Success/Error Dialog -->
    <v-dialog v-model="showDialog" width="auto">
        <v-card :prepend-icon="dialogIcon" :text="dialogText" :title="dialogTitle">
            <template v-slot:actions>
                <v-btn
                    @click="showDialog = false"
                    size="x-large"
                    color="primary"
                    variant="elevated"
                    rounded="xl"
                    class="px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                    Ok
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import SupabaseService from "@/code/services/SupabaseService";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const showDialog = ref(false);
const dialogTitle = ref("");
const dialogText = ref("");
const dialogIcon = ref("");

const emit = defineEmits(["userCreated"]);

const { handleSubmit, resetForm } = useForm({
    validationSchema: {
        email(value: string | undefined) {
            if (!value) return "Email is required";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return "Please enter a valid email address";
            return true;
        },
        password(value: string | undefined) {
            if (!value) return "Password is required";
            if (value.length < 8) return "Password must be at least 8 characters";

            return true;
        },
        confirmPassword(value: string | undefined) {
            if (!value) return "Please confirm your password";
            if (value !== password.value.value) return "Passwords do not match";
            return true;
        }
    }
});

const submit = handleSubmit(async (values) => {
    isLoading.value = true;

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const userCreated = await SupabaseService.createAdminUser(values.email, values.password);
        // Your admin creation logic here
        dialogIcon.value = "mdi-check-circle";

        if (!userCreated) {
            dialogTitle.value = "Error !";
            dialogText.value =
                "The admin user could not have been created, please check again later";

            showDialog.value = true;
            isLoading.value = false;

            return;
        }
        dialogTitle.value = "Success!";
        dialogText.value = "Admin user has been created successfully.";
        dialogIcon.value = "mdi-check-circle";
        showDialog.value = true;

        // Reset form after success
        resetForm();

        // Emit event to parent component
        emit("userCreated");
    } catch (error: unknown) {
        console.error(error);

        dialogTitle.value = "Error";
        dialogText.value = "Something went wrong. Please try again.";
        dialogIcon.value = "mdi-alert-circle";
        showDialog.value = true;
    } finally {
        isLoading.value = false;
    }
});

const email = useField("email");
const password = useField("password");
const confirmPassword = useField("confirmPassword");
</script>
