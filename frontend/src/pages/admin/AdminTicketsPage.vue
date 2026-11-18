<script setup>
import { computed, ref } from "vue";
import AdminDialog from "../../components/admin/AdminDialog.vue";
import AdminPage from "../../components/admin/AdminPage.vue";
import { bookings, events, tickets, eventName, formatMoney, nextId } from "./adminData";

const search = ref("");
const eventFilter = ref("All");
const dialog = ref("");
const selected = ref(null);
const form = ref({});
const error = ref("");
const hasBookings = computed(() => selected.value && bookings.value.some((booking) => booking.ticketId === selected.value.id));
const filteredTickets = computed(() => {
	const query = search.value.trim().toLowerCase();
	return tickets.value.filter((ticket) => (eventFilter.value === "All" || ticket.eventId === eventFilter.value) && `${ticket.id} ${ticket.type} ${eventName(ticket.eventId)}`.toLowerCase().includes(query));
});

function openForm(ticket = null) {
	selected.value = ticket;
	form.value = ticket ? { ...ticket } : { eventId: "", type: "", price: "", quantity: "" };
	error.value = "";
	dialog.value = ticket ? "edit" : "add";
}

function saveTicket() {
	const type = form.value.type.trim();
	if (!type) {
		error.value = "Enter a ticket type.";
		return;
	}
	if (!events.value.some((event) => event.id === form.value.eventId)) {
		error.value = "Select an existing event.";
		return;
	}
	const values = { ...form.value, type, price: Number(form.value.price), quantity: Number(form.value.quantity) };
	if (selected.value) Object.assign(selected.value, values);
	else tickets.value.push({ ...values, id: nextId(tickets.value, "TKT-") });
	dialog.value = "";
}

function openDelete(ticket) {
	selected.value = ticket;
	error.value = "";
	dialog.value = "delete";
}

function deleteTicket() {
	if (hasBookings.value) {
		error.value = "This ticket has linked bookings and cannot be deleted.";
		return;
	}
	tickets.value.splice(tickets.value.indexOf(selected.value), 1);
	dialog.value = "";
}
</script>

<template>
	<AdminPage>
			<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
				<div><div class="admin-eyebrow mb-2">Administration / Tickets</div><h1 class="fw-bold mb-1">Tickets</h1><p class="admin-muted mb-0">Manage ticket types, prices, and quantities.</p></div>
				<button type="button" class="btn btn-primary" @click="openForm()"><i class="bi bi-plus-lg me-2"></i>Add ticket</button>
			</div>
			<div class="admin-panel">
				<div class="admin-panel-heading">
					<h2 class="h5 fw-bold mb-1">Ticket types</h2><p class="admin-muted small mb-3">{{ filteredTickets.length }} {{ filteredTickets.length === 1 ? 'ticket' : 'tickets' }} shown</p>
					<div class="d-flex flex-wrap gap-2"><input v-model="search" class="form-control admin-search" type="search" placeholder="Search tickets or events" aria-label="Search tickets"><select v-model="eventFilter" class="form-select w-auto" aria-label="Filter tickets by event"><option value="All">All events</option><option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option></select></div>
				</div>
				<div class="table-responsive"><table class="table admin-table">
					<thead><tr><th>Ticket type</th><th>Event</th><th>Price</th><th>Quantity</th><th>Actions</th></tr></thead>
					<tbody><tr v-for="ticket in filteredTickets" :key="ticket.id"><td><div class="fw-semibold">{{ ticket.type }}</div><div class="admin-muted small">{{ ticket.id }}</div></td><td>{{ eventName(ticket.eventId) }}</td><td>{{ formatMoney(ticket.price) }}</td><td>{{ ticket.quantity.toLocaleString() }}</td><td><div class="admin-actions"><button type="button" class="btn btn-sm btn-outline-secondary" @click="selected = ticket; dialog = 'view'">View</button><button type="button" class="btn btn-sm btn-outline-primary" @click="openForm(ticket)">Edit</button><button type="button" class="btn btn-sm btn-outline-danger" @click="openDelete(ticket)">Delete</button></div></td></tr></tbody>
				</table></div>
				<div v-if="!filteredTickets.length" class="admin-empty">No tickets match your search.</div>
			</div>
		<AdminDialog v-if="dialog === 'add' || dialog === 'edit'" :title="dialog === 'add' ? 'Add ticket' : 'Edit ticket'" @close="dialog = ''">
			<form @submit.prevent="saveTicket">
				<div class="admin-dialog-body">
					<div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
					<div class="mb-3"><label for="ticket-event" class="form-label">Event</label><select id="ticket-event" v-model="form.eventId" class="form-select" :disabled="!!hasBookings" required><option disabled value="">Select an event</option><option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option></select><div v-if="hasBookings" class="form-text">The event cannot be changed while this ticket has bookings.</div><div v-if="!events.length" class="form-text">Add an event before creating a ticket.</div></div>
					<div class="mb-3"><label for="ticket-type" class="form-label">Ticket type</label><input id="ticket-type" v-model="form.type" class="form-control" placeholder="e.g. General Admission" required maxlength="100"></div>
					<div class="row g-3"><div class="col-sm-6"><label for="ticket-price" class="form-label">Price (PHP)</label><input id="ticket-price" v-model="form.price" class="form-control" type="number" min="0" step="0.01" required></div><div class="col-sm-6"><label for="ticket-quantity" class="form-label">Quantity</label><input id="ticket-quantity" v-model="form.quantity" class="form-control" type="number" min="0" step="1" required></div></div>
				</div>
				<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Cancel</button><button type="submit" class="btn btn-primary" :disabled="!events.length">Save ticket</button></div>
			</form>
		</AdminDialog>
		<AdminDialog v-if="dialog === 'view'" title="Ticket details" @close="dialog = ''">
			<div class="admin-dialog-body"><dl class="admin-detail-list"><dt>Ticket ID</dt><dd>{{ selected.id }}</dd><dt>Type</dt><dd>{{ selected.type }}</dd><dt>Event</dt><dd>{{ eventName(selected.eventId) }}</dd><dt>Price</dt><dd>{{ formatMoney(selected.price) }}</dd><dt>Quantity</dt><dd>{{ selected.quantity.toLocaleString() }}</dd></dl></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Close</button><button type="button" class="btn btn-primary" @click="openForm(selected)">Edit ticket</button></div>
		</AdminDialog>
		<AdminDialog v-if="dialog === 'delete'" title="Delete ticket?" @close="dialog = ''">
			<div class="admin-dialog-body"><p>Delete <strong>{{ selected.type }}</strong> for {{ eventName(selected.eventId) }}?</p><div v-if="error" class="alert alert-danger mb-0" role="alert">{{ error }}</div></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Cancel</button><button type="button" class="btn btn-danger" @click="deleteTicket">Delete ticket</button></div>
		</AdminDialog>
	</AdminPage>
</template>
