<script setup>
import { computed } from "vue";
import AdminPage from "../../components/admin/AdminPage.vue";
import { bookings, events, tickets, eventName, formatDate, formatMoney } from "./adminData";

const confirmed = computed(() => bookings.value.filter((booking) => booking.status === "Confirmed"));
const stats = computed(() => [
	{ label: "Total events", value: events.value.length, icon: "bi-calendar-event", note: `${events.value.filter((event) => event.status === "Published").length} published` },
	{ label: "Ticket types", value: tickets.value.length, icon: "bi-ticket-perforated", note: "Across all events" },
	{ label: "Bookings", value: bookings.value.length, icon: "bi-journal-check", note: `${confirmed.value.length} confirmed` },
	{ label: "Confirmed revenue", value: formatMoney(confirmed.value.reduce((sum, booking) => sum + booking.total, 0)), icon: "bi-wallet2", note: "Confirmed bookings" },
]);
const recentBookings = computed(() => [...bookings.value].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4));
</script>

<template>
	<AdminPage>
			<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
				<div><div class="admin-eyebrow mb-2">Administration / Overview</div><h1 class="fw-bold mb-1">Dashboard</h1><p class="admin-muted mb-0">A quick look at your events and bookings.</p></div>
				<RouterLink :to="{ name: 'AdminEvents' }" class="btn btn-primary"><i class="bi bi-calendar-plus me-2"></i>Manage events</RouterLink>
			</div>
			<div class="row g-3 mb-4">
				<div v-for="stat in stats" :key="stat.label" class="col-6 col-xl-3">
					<div class="admin-panel admin-stat">
						<div class="d-flex justify-content-between align-items-start gap-2 mb-3"><span class="admin-muted small fw-semibold">{{ stat.label }}</span><span class="admin-stat-icon"><i :class="['bi', stat.icon]"></i></span></div>
						<div class="admin-stat-value">{{ stat.value }}</div><div class="admin-muted small mt-1">{{ stat.note }}</div>
					</div>
				</div>
			</div>
			<div class="admin-panel">
				<div class="admin-panel-heading d-flex justify-content-between align-items-center gap-3"><div><h2 class="h5 fw-bold mb-1">Recent bookings</h2><p class="admin-muted small mb-0">The latest activity from your customers.</p></div><RouterLink :to="{ name: 'AdminBookings' }" class="small fw-semibold text-nowrap">View all <i class="bi bi-arrow-right"></i></RouterLink></div>
				<div class="table-responsive">
					<table class="table admin-table">
						<thead><tr><th>Booking</th><th>Customer</th><th>Event</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
						<tbody><tr v-for="booking in recentBookings" :key="booking.id"><td class="fw-semibold">{{ booking.id }}</td><td>{{ booking.customer }}</td><td>{{ eventName(booking.eventId) }}</td><td>{{ formatDate(booking.date) }}</td><td>{{ formatMoney(booking.total) }}</td><td><span :class="['admin-badge', booking.status.toLowerCase()]">{{ booking.status }}</span></td></tr></tbody>
					</table>
				</div>
				<div v-if="!recentBookings.length" class="admin-empty">No bookings yet.</div>
			</div>
	</AdminPage>
</template>
