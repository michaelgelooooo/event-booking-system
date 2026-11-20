
<script setup>
import { ref, computed } from "vue";

// Sample transaction records
const transactions = ref([
    {
        id: "BL-2026-001",
        event: "Taylor Swift - The Eras Tour",
        date: "November 10, 2026",
        amount: 12500,
        paymentMethod: "GCash",
        status: "Completed"
    },
    {
        id: "BL-2026-002",
        event: "BINI - Grand BINIverse",
        date: "November 12, 2026",
        amount: 4500,
        paymentMethod: "Maya",
        status: "Completed"
    },
    {
        id: "BL-2026-003",
        event: "Concert Experience 2026",
        date: "November 15, 2026",
        amount: 3500,
        paymentMethod: "Credit Card",
        status: "Pending"
    },
    {
        id: "BL-2026-004",
        event: "Music Festival 2026",
        date: "November 17, 2026",
        amount: 2800,
        paymentMethod: "GCash",
        status: "Failed"
    }
]);

// Search input
const searchQuery = ref("");

// Status filter
const selectedStatus = ref("All");

// Filter transactions
const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => {

        const matchesSearch =
            transaction.event.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesStatus =
            selectedStatus.value === "All" ||
            transaction.status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    });
});

// Format amount
const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP"
    }).format(amount);
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

                <router-link
                    to="/transactions"
                    class="sidebar-link active"
                >
                    Transaction History
                </router-link>

                <p class="sidebar-heading">ACCOUNT</p>

                <a href="/settings" class="sidebar-link">
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

            <header class="dashboard-header">
                <div>
                    <h1>Transaction History</h1>
                    <p>View and track your concert ticket payments.</p>
                </div>
            </header>

            <!-- Summary -->
            <section class="transaction-summary">

                <div class="summary-card">
                    <p>Total Transactions</p>
                    <h2>{{ transactions.length }}</h2>
                </div>

                <div class="summary-card">
                    <p>Completed Payments</p>
                    <h2>
                        {{
                            transactions.filter(t => t.status === "Completed").length
                        }}
                    </h2>
                </div>

                <div class="summary-card">
                    <p>Total Completed Amount</p>
                    <h2>
                        {{
                            formatAmount(
                                transactions
                                    .filter(t => t.status === "Completed")
                                    .reduce((total, t) => total + t.amount, 0)
                            )
                        }}
                    </h2>
                </div>

            </section>

            <!-- Transaction Table -->
            <section class="transaction-section">

                <div class="section-heading">
                    <h2>Recent Transactions</h2>
                </div>

                <!-- Search and Filter -->
                <div class="transaction-controls">

                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search transactions..."
                        class="transaction-search"
                    >

                    <select
                        v-model="selectedStatus"
                        class="transaction-filter"
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>

                </div>

                <!-- Table -->
                <div class="transaction-table-wrapper">

                    <table class="transaction-table">

                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr
                                v-for="transaction in filteredTransactions"
                                :key="transaction.id"
                            >
                                <td>{{ transaction.id }}</td>

                                <td>{{ transaction.event }}</td>

                                <td>{{ transaction.date }}</td>

                                <td>{{ transaction.paymentMethod }}</td>

                                <td>
                                    {{ formatAmount(transaction.amount) }}
                                </td>

                                <td>
                                    <span
                                        class="transaction-status"
                                        :class="transaction.status.toLowerCase()"
                                    >
                                        {{ transaction.status }}
                                    </span>
                                </td>
                            </tr>

                            <tr v-if="filteredTransactions.length === 0">
                                <td colspan="6" class="no-transactions">
                                    No transactions found.
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>

        </main>

    </div>
</template>
