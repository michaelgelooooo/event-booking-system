
<script setup>
import { ref } from "vue";

const passwordForm = ref({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});

const passwordMessage = ref("");
const passwordMessageType = ref("");

const notifications = ref({
    emailUpdates: true,
    eventAnnouncements: true,
    bookingReminders: true
});

const preferencesMessage = ref("");

const changePassword = () => {
    passwordMessage.value = "";
    passwordMessageType.value = "";

    if (!passwordForm.value.currentPassword) {
        passwordMessage.value = "Please enter your current password.";
        passwordMessageType.value = "error";
        return;
    }

    if (passwordForm.value.newPassword.length < 8) {
        passwordMessage.value = "Your new password must be at least 8 characters.";
        passwordMessageType.value = "error";
        return;
    }

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        passwordMessage.value = "Your new passwords do not match.";
        passwordMessageType.value = "error";
        return;
    }

    passwordMessage.value =
        "Form validated! Connect a backend to actually update your password.";
    passwordMessageType.value = "success";

    passwordForm.value = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };
};

const savePreferences = () => {
    preferencesMessage.value = "Your preferences have been updated for this session.";
};
</script>

<template>
    <div class="customer-dashboard">

        <!-- Sidebar -->
        <aside class="dashboard-sidebar">
            <div class="sidebar-logo">
                BRANDLIVE <span>[TICKETS]</span>
            </div>

            <nav class="sidebar-navigation">
                <p class="sidebar-heading">MENU</p>

                <router-link to="/profile" class="sidebar-link">
                    My Profile
                </router-link>

                <router-link to="/tickets" class="sidebar-link">
                    My Tickets
                </router-link>

                <router-link to="/transactions" class="sidebar-link">
                    Transaction History
                </router-link>
                <p class="sidebar-heading">ACCOUNT</p>
                <router-link to="/settings" class="sidebar-link active">
                    Settings
                </router-link>

                <router-link to="/" class="sidebar-link">
                    Logout
                </router-link>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">

            <header class="dashboard-header">
                <div>
                    <h1>Account Settings</h1>
                    <p>Manage your account and preferences.</p>
                </div>
            </header>

            <!-- Account Information -->
            <section class="settings-section">
                <div class="section-heading">
                    <h2>Account Information</h2>
                    <p>Basic information associated with your account.</p>
                </div>

                <div class="settings-card">
                    <div class="settings-info-row">
                        <div>
                            <h3>Account Name</h3>
                            <p>Tinker Bell</p>
                        </div>
                    </div>

                    <div class="settings-info-row">
                        <div>
                            <h3>Email Address</h3>
                            <p>tinker.bell@mail.com</p>
                        </div>
                    </div>

                    <div class="settings-info-row">
                        <div>
                            <h3>Account Type</h3>
                            <p>Customer Account</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Change Password -->
            <section class="settings-section">
                <div class="section-heading">
                    <h2>Change Password</h2>
                    <p>Update your password to keep your account secure.</p>
                </div>

                <div class="settings-card">
                    <form @submit.prevent="changePassword">

                        <div class="settings-form-group">
                            <label for="currentPassword">Current Password</label>
                            <input
                                id="currentPassword"
                                type="password"
                                v-model="passwordForm.currentPassword"
                                placeholder="Enter current password"
                                required
                            >
                        </div>

                        <div class="settings-form-group">
                            <label for="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                v-model="passwordForm.newPassword"
                                placeholder="Enter new password"
                                minlength="8"
                                required
                            >
                            <small>Password must contain at least 8 characters.</small>
                        </div>

                        <div class="settings-form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                v-model="passwordForm.confirmPassword"
                                placeholder="Confirm new password"
                                required
                            >
                        </div>

                        <p
                            v-if="passwordMessage"
                            :class="['settings-message', passwordMessageType]"
                        >
                            {{ passwordMessage }}
                        </p>

                        <button type="submit" class="settings-button">
                            Update Password
                        </button>

                    </form>
                </div>
            </section>

            <!-- Notification Preferences -->
            <section class="settings-section">
                <div class="section-heading">
                    <h2>Notification Preferences</h2>
                    <p>Choose which updates you would like to receive.</p>
                </div>

                <div class="settings-card">

                    <div class="notification-option">
                        <div>
                            <h3>Email Updates</h3>
                            <p>Receive important updates through email.</p>
                        </div>

                        <input
                            type="checkbox"
                            v-model="notifications.emailUpdates"
                        >
                    </div>

                    <div class="notification-option">
                        <div>
                            <h3>Event Announcements</h3>
                            <p>Stay informed about upcoming concerts and events.</p>
                        </div>

                        <input
                            type="checkbox"
                            v-model="notifications.eventAnnouncements"
                        >
                    </div>

                    <div class="notification-option">
                        <div>
                            <h3>Booking Reminders</h3>
                            <p>Receive reminders about your ticket bookings.</p>
                        </div>

                        <input
                            type="checkbox"
                            v-model="notifications.bookingReminders"
                        >
                    </div>

                    <p v-if="preferencesMessage" class="settings-message success">
                        {{ preferencesMessage }}
                    </p>

                    <button
                        type="button"
                        class="settings-button"
                        @click="savePreferences"
                    >
                        Save Preferences
                    </button>

                </div>
            </section>

        </main>
    </div>
</template>
