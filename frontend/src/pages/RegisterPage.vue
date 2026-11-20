
<script setup>
import { ref } from "vue";

const registerForm = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
});

const errorMessage = ref("");
const successMessage = ref("");

const registerAccount = () => {
    errorMessage.value = "";
    successMessage.value = "";

    if (registerForm.value.password.length < 8) {
        errorMessage.value = "Password must be at least 8 characters.";
        return;
    }

    if (registerForm.value.password !== registerForm.value.confirmPassword) {
        errorMessage.value = "Passwords do not match.";
        return;
    }

    successMessage.value = "Registration form completed successfully!";

    registerForm.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    };
};
</script>

<template>
    <div class="register-page">

        <!-- Branding Section -->
        <div class="register-branding">
            <div class="branding-content">
                <h1>BRANDLIVE <span>[TICKETS]</span></h1>
                <h2>Your Next Favorite Experience Starts Here.</h2>
                <p>
                    Discover live events, book your tickets, and create
                    unforgettable memories with BRANDLIVE.
                </p>
            </div>
        </div>

        <!-- Registration Form -->
        <div class="register-form-section">
            <div class="register-form">

                <div class="register-heading">
                    <h2>Create an Account</h2>
                    <p>Sign up to start discovering amazing events.</p>
                </div>

                <form @submit.prevent="registerAccount">

                    <div class="register-name-fields">
                        <div class="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                v-model="registerForm.firstName"
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                v-model="registerForm.lastName"
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            v-model="registerForm.email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            v-model="registerForm.phone"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            v-model="registerForm.password"
                            placeholder="Create a password"
                            minlength="8"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            v-model="registerForm.confirmPassword"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <p v-if="errorMessage" class="register-error">
                        {{ errorMessage }}
                    </p>

                    <p v-if="successMessage" class="register-success">
                        {{ successMessage }}
                    </p>

                    <button type="submit" class="register-button">
                        Create Account
                    </button>

                </form>

                <p class="register-login-text">
                    Already have an account?
                    <router-link to="/login">Login</router-link>
                </p>

            </div>
        </div>

    </div>
</template>
