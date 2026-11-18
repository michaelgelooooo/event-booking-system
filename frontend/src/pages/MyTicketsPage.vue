
<script setup>
import { ref } from "vue";

// Sample purchased tickets
const tickets = ref([
    {
        id: 1,
        artist: "Taylor Swift",
        event: "The Eras Tour",
        date: "December 15, 2026",
        time: "7:00 PM",
        venue: "Philippine Arena",
        location: "Bulacan, Philippines",
        ticketType: "VIP",
        seat: "VIP - A12",
        bookingId: "BL-2026-001",
        status: "Confirmed"
    },
    {
        id: 2,
        artist: "BINI",
        event: "Grand BINIverse",
        date: "December 20, 2026",
        time: "6:00 PM",
        venue: "SM Mall of Asia Arena",
        location: "Pasay City, Philippines",
        ticketType: "Regular",
        seat: "Section 105 - B12",
        bookingId: "BL-2026-002",
        status: "Confirmed"
    }
]);

// Selected ticket for viewing
const selectedTicket = ref(null);

const viewTicket = (ticket) => {
    selectedTicket.value = ticket;
};

const closeTicket = () => {
    selectedTicket.value = null;
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

                <router-link to="/tickets" class="sidebar-link active">
                    My Tickets
                </router-link>

                <a href="#" class="sidebar-link">
                    Transaction History
                </a>

                <p class="sidebar-heading">ACCOUNT</p>

                <a href="#" class="sidebar-link">
                    Settings
                </a>

                <router-link to="/" class="sidebar-link logout-link">
                    Logout
                </router-link>

            </nav>

            <div class="sidebar-footer">
                © 2026 BRANDLIVE TICKETS
            </div>

        </aside>

        <!-- Main Content -->
        <main class="dashboard-main">

            <!-- Page Header -->
            <header class="dashboard-header">
                <div>
                    <h1>My Tickets</h1>
                    <p>View and manage your purchased concert tickets.</p>
                </div>
            </header>

            <!-- Ticket Summary -->
            <section class="ticket-summary">
                <div>
                    <h2>{{ tickets.length }}</h2>
                    <p>Total Purchased Tickets</p>
                </div>
            </section>

            <!-- Tickets Section -->
            <section class="tickets-section">

                <div class="section-heading">
                    <h2>Your Bookings</h2>
                </div>

                <div v-if="tickets.length > 0" class="tickets-grid">

                    <div
                        v-for="ticket in tickets"
                        :key="ticket.id"
                        class="ticket-card"
                    >

                        <div class="ticket-card-header">
                            <span class="ticket-category">
                                {{ ticket.ticketType }}
                            </span>

                            <span class="ticket-status">
                                {{ ticket.status }}
                            </span>
                        </div>

                        <div class="ticket-card-body">

                            <h3>{{ ticket.artist }}</h3>
                            <p class="ticket-event">
                                {{ ticket.event }}
                            </p>

                            <div class="ticket-info">
                                <div>
                                    <label>DATE</label>
                                    <p>{{ ticket.date }}</p>
                                </div>

                                <div>
                                    <label>TIME</label>
                                    <p>{{ ticket.time }}</p>
                                </div>

                                <div>
                                    <label>VENUE</label>
                                    <p>{{ ticket.venue }}</p>
                                </div>

                                <div>
                                    <label>SEAT</label>
                                    <p>{{ ticket.seat }}</p>
                                </div>
                            </div>

                        </div>

                        <div class="ticket-card-footer">
                            <span>{{ ticket.bookingId }}</span>

                            <button
                                class="view-ticket-button"
                                @click="viewTicket(ticket)"
                            >
                                View Ticket
                            </button>
                        </div>

                    </div>

                </div>

                <div v-else class="empty-tickets">
                    <h3>No tickets yet</h3>
                    <p>Your purchased concert tickets will appear here.</p>
                </div>

            </section>

        </main>

        <!-- View Ticket Modal -->
        <div
            v-if="selectedTicket"
            class="modal-overlay"
            @click.self="closeTicket"
        >

            <div class="edit-modal ticket-modal">

                <div class="modal-header">
                    <h2>Ticket Details</h2>

                    <button
                        class="close-button"
                        @click="closeTicket"
                    >
                        &times;
                    </button>
                </div>

                <div class="ticket-modal-content">

                    <h3>{{ selectedTicket.artist }}</h3>
                    <p>{{ selectedTicket.event }}</p>

                    <div class="ticket-modal-details">
                        <div>
                            <label>Booking ID</label>
                            <p>{{ selectedTicket.bookingId }}</p>
                        </div>

                        <div>
                            <label>Concert Date</label>
                            <p>{{ selectedTicket.date }}</p>
                        </div>

                        <div>
                            <label>Time</label>
                            <p>{{ selectedTicket.time }}</p>
                        </div>

                        <div>
                            <label>Venue</label>
                            <p>{{ selectedTicket.venue }}</p>
                        </div>

                        <div>
                            <label>Ticket Type</label>
                            <p>{{ selectedTicket.ticketType }}</p>
                        </div>

                        <div>
                            <label>Seat Number</label>
                            <p>{{ selectedTicket.seat }}</p>
                        </div>
                    </div>

                    <span class="ticket-status">
                        {{ selectedTicket.status }}
                    </span>

                </div>

                <div class="modal-actions">
                    <button
                        class="cancel-button"
                        @click="closeTicket"
                    >
                        Close
                    </button>
                </div>

            </div>

        </div>

    </div>
</template>
