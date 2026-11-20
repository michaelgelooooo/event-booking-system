<script setup>
import { computed, ref } from "vue";
import AdminDialog from "../../components/admin/AdminDialog.vue";
import AdminPage from "../../components/admin/AdminPage.vue";
import { bookings, eventName, formatDate, formatMoney, ticketName } from "./adminData";

const search = ref("");
const status = ref("All");
const dialog = ref("");
const selected = ref(null);
const nextStatus = ref("");
const filteredBookings = computed(() => {
	const query = search.value.trim().toLowerCase();
	return bookings.value.filter((booking) => (status.value === "All" || booking.status === status.value) && `${booking.id} ${booking.customer} ${booking.email} ${eventName(booking.eventId)}`.toLowerCase().includes(query));
});

function openStatusChange(booking, value) {
	selected.value = booking;
	nextStatus.value = value;
	dialog.value = "status";
}

function updateStatus() {
	selected.value.status = nextStatus.value;
	dialog.value = "";
}
</script>

<template>
	<AdminPage>
			<div class="mb-4"><div class="admin-eyebrow mb-2">Administration / Bookings</div><h1 class="fw-bold mb-1">Bookings</h1><p class="admin-muted mb-0">Review customer bookings and their status.</p></div>
			<div class="admin-panel">
				<div class="admin-panel-heading">
					<h2 class="h5 fw-bold mb-1">All bookings</h2><p class="admin-muted small mb-3">{{ filteredBookings.length }} {{ filteredBookings.length === 1 ? 'booking' : 'bookings' }} shown</p>
					<div class="d-flex flex-wrap gap-2"><input v-model="search" class="form-control admin-search" type="search" placeholder="Search bookings or customers" aria-label="Search bookings"><select v-model="status" class="form-select w-auto" aria-label="Filter bookings by status"><option>All</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option></select></div>
				</div>
				<div class="table-responsive"><table class="table admin-table">
					<thead><tr><th>Booking</th><th>Customer</th><th>Event</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
					<tbody><tr v-for="booking in filteredBookings" :key="booking.id">
						<td><div class="fw-semibold">{{ booking.id }}</div><div class="admin-muted small">{{ formatDate(booking.date) }}</div></td><td><div class="fw-semibold">{{ booking.customer }}</div><div class="admin-muted small">{{ booking.email }}</div></td><td>{{ eventName(booking.eventId) }}</td><td>{{ formatMoney(booking.total) }}</td><td><span :class="['admin-badge', booking.status.toLowerCase()]">{{ booking.status }}</span></td>
						<td><div class="admin-actions"><button type="button" class="btn btn-sm btn-outline-secondary" @click="selected = booking; dialog = 'view'">View details</button><button v-if="booking.status === 'Pending'" type="button" class="btn btn-sm btn-outline-primary" @click="openStatusChange(booking, 'Confirmed')">Confirm</button><button v-if="booking.status !== 'Cancelled'" type="button" class="btn btn-sm btn-outline-danger" @click="openStatusChange(booking, 'Cancelled')">Cancel</button></div></td>
					</tr></tbody>
				</table></div>
				<div v-if="!filteredBookings.length" class="admin-empty">No bookings match your search.</div>
			</div>
		<AdminDialog v-if="dialog === 'view'" title="Booking details" @close="dialog = ''">
			<div class="admin-dialog-body"><dl class="admin-detail-list"><dt>Booking ID</dt><dd>{{ selected.id }}</dd><dt>Customer</dt><dd>{{ selected.customer }}</dd><dt>Email</dt><dd>{{ selected.email }}</dd><dt>Event</dt><dd>{{ eventName(selected.eventId) }}</dd><dt>Ticket type</dt><dd>{{ ticketName(selected.ticketId) }}</dd><dt>Quantity</dt><dd>{{ selected.quantity }}</dd><dt>Total</dt><dd>{{ formatMoney(selected.total) }}</dd><dt>Booked on</dt><dd>{{ formatDate(selected.date) }}</dd><dt>Status</dt><dd><span :class="['admin-badge', selected.status.toLowerCase()]">{{ selected.status }}</span></dd></dl></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Close</button><button v-if="selected.status === 'Pending'" type="button" class="btn btn-primary" @click="openStatusChange(selected, 'Confirmed')">Confirm booking</button><button v-if="selected.status !== 'Cancelled'" type="button" class="btn btn-outline-danger" @click="openStatusChange(selected, 'Cancelled')">Cancel booking</button></div>
		</AdminDialog>
		<AdminDialog v-if="dialog === 'status'" :title="nextStatus === 'Confirmed' ? 'Confirm booking?' : 'Cancel booking?'" @close="dialog = ''">
			<div class="admin-dialog-body"><p class="mb-0">{{ nextStatus === 'Confirmed' ? 'Confirm' : 'Cancel' }} booking <strong>{{ selected.id }}</strong> for {{ selected.customer }}?</p></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Keep current status</button><button type="button" :class="['btn', nextStatus === 'Confirmed' ? 'btn-primary' : 'btn-danger']" @click="updateStatus">{{ nextStatus === 'Confirmed' ? 'Confirm booking' : 'Cancel booking' }}</button></div>
		</AdminDialog>
	</AdminPage>
</template>
