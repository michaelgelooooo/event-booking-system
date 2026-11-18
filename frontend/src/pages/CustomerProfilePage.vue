<script setup>
import { ref } from "vue";

    const customer = ref ({
        firstName: "Tinker",
        lastName: "Bell",
        email: "tinker.bell@mail.com",
        phone: "+63 912 345 6789"
    });

    const showEditModal = ref(false);

    // Temporary Data
    const editCustomer = ref ({ ...customer.value });

    const openEditModal = () => {
        editCustomer.value = { ...customer.value };
        showEditModal.value = true;
    };

    const saveProfile = () => {
        customer.value = { ... editCustomer.value };
        showEditModal.value = false;
    };

    const cancelEdit = () => {
        showEditModal.value = false;
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

                <a href="#" class="sidebar-link active">
                    My Profile
                </a>

                <a href="/tickets" class="sidebar-link">
                    My Tickets
                </a>

                <a href="/transactions" class="sidebar-link">
                    Transaction History
                </a>

                <p class="sidebar-heading">ACCOUNT</p>

                <a href="/settings" class="sidebar-link">
                    Settings
                </a>

                <a href="/" class="sidebar-link logout-link">
                    Logout
                </a>
            </nav>

            <div class="sidebar-footer">
                © 2026 BRANDLIVE TICKETS
            </div>

        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">

            <!-- Header -->
            <header class="dashboard-header">
                <div>
                    <h1>My Profile</h1>
                    <p>Manage your personal information and account details.</p>
                </div>
            </header>

            <!-- Welcome Section -->
            <section class="welcome-section">
                <div>
                    <h2>Welcome back, Tinker!</h2>
                    <p>Here's an overview of your BRANDLIVE account.</p>
                </div>
            </section>

            <!-- Profile Card -->
            <section class="profile-section">

                <div class="section-heading">
                    <h2>Personal Information</h2>
                    <button class="edit-button" @click="openEditModal">
                        Edit Profile
                    </button>
                </div>

                <div class="profile-card">

                    <div class="profile-avatar">
                        T
                    </div>

                    <div class="profile-details">
                        <h3>{{ customer.firstName }} {{ customer.lastName }}</h3>
                        <p>{{ customer.email }}</p>
                        <span class="account-badge">Customer Account</span>
                    </div>

                </div>

                <!-- Personal Details -->
                <div class="details-grid">

                    <div class="detail-item">
                        <label>First Name</label>
                        <p>{{ customer.firstName }}</p>
                    </div>

                    <div class="detail-item">
                        <label>Last Name</label>
                        <p>{{ customer.lastName }}</p>
                    </div>

                    <div class="detail-item">
                        <label>Email Address</label>
                        <p>{{ customer.email }}</p>
                    </div>

                    <div class="detail-item">
                        <label>Phone Number</label>
                        <p>{{ customer.phone }}</p>
                    </div>

                </div>

            </section>

                <!-- EDIT PROFILE -->
                <div v-if="showEditModal" class="modal-overlay">

                    <div class="edit-modal">

                        <div class="modal-header">
                            <h2>Edit Profile</h2>

                            <button class="close-button" @click="cancelEdit">
                                &times;
                            </button>
                        </div>

                        <p class="modal-description">
                            Update your personal information below.
                        </p>

                        <form @submit.prevent="saveProfile">

                            <div class="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    v-model="editCustomer.firstName"
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    v-model="editCustomer.lastName"
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    v-model="editCustomer.email"
                                    required
                                >
                            </div>

                            <div class="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    v-model="editCustomer.phone"
                                    required
                                >
                            </div>

                            <div class="modal-actions">
                                <button
                                    type="button"
                                    class="cancel-button"
                                    @click="cancelEdit"
                                >
                                    Cancel
                                </button>

                                <button type="submit" class="save-button">
                                    Save Changes
                                </button>
                            </div>

                        </form>

                    </div>

                </div>
        </main>

    </div>
</template>
