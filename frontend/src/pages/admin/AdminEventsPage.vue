<script setup>
import { computed, ref } from "vue";
import AdminDialog from "../../components/admin/AdminDialog.vue";
import AdminPage from "../../components/admin/AdminPage.vue";
import { bookings, events, tickets, formatDate, nextId } from "./adminData";

const search = ref("");
const status = ref("All");
const dialog = ref("");
const selected = ref(null);
const form = ref({});
const error = ref("");
const filteredEvents = computed(() => {
	const query = search.value.trim().toLowerCase();
	return events.value.filter((event) => (status.value === "All" || event.status === status.value) && `${event.id} ${event.name} ${event.venue}`.toLowerCase().includes(query));
});

function openForm(event = null) {
	selected.value = event;
	form.value = event ? { ...event } : { name: "", date: "", time: "", venue: "", status: "Draft" };
	error.value = "";
	dialog.value = event ? "edit" : "add";
}

function saveEvent() {
	const name = form.value.name.trim();
	const venue = form.value.venue.trim();
	if (!name || !venue) {
		error.value = "Enter an event name and venue.";
		return;
	}
	if (selected.value) Object.assign(selected.value, form.value, { name, venue });
	else events.value.push({ ...form.value, name, venue, id: nextId(events.value, "EVT-") });
	dialog.value = "";
}

function openDelete(event) {
	selected.value = event;
	error.value = "";
	dialog.value = "delete";
}

function deleteEvent() {
	if (tickets.value.some((ticket) => ticket.eventId === selected.value.id) || bookings.value.some((booking) => booking.eventId === selected.value.id)) {
		error.value = "This event has linked tickets or bookings and cannot be deleted.";
		return;
	}
	events.value.splice(events.value.indexOf(selected.value), 1);
	dialog.value = "";
}
</script>

<template>
	<AdminPage>
			<div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
				<div><div class="admin-eyebrow mb-2">Administration / Events</div><h1 class="fw-bold mb-1">Events</h1><p class="admin-muted mb-0">Create and manage your event listings.</p></div>
				<button type="button" class="btn btn-primary" @click="openForm()"><i class="bi bi-plus-lg me-2"></i>Add event</button>
			</div>
			<div class="admin-panel">
				<div class="admin-panel-heading">
					<div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3"><div><h2 class="h5 fw-bold mb-1">Event listings</h2><p class="admin-muted small mb-0">{{ filteredEvents.length }} {{ filteredEvents.length === 1 ? 'event' : 'events' }} shown</p></div></div>
					<div class="d-flex flex-wrap gap-2"><input v-model="search" class="form-control admin-search" type="search" placeholder="Search events, ID or venue" aria-label="Search events"><select v-model="status" class="form-select w-auto" aria-label="Filter events by status"><option>All</option><option>Published</option><option>Draft</option></select></div>
				</div>
				<div class="table-responsive">
					<table class="table admin-table">
						<thead><tr><th>Event</th><th>Date & time</th><th>Venue</th><th>Status</th><th>Actions</th></tr></thead>
						<tbody><tr v-for="event in filteredEvents" :key="event.id">
							<td><div class="fw-semibold">{{ event.name }}</div><div class="admin-muted small">{{ event.id }}</div></td><td>{{ formatDate(event.date) }} · {{ event.time }}</td><td>{{ event.venue }}</td><td><span :class="['admin-badge', event.status.toLowerCase()]">{{ event.status }}</span></td>
							<td><div class="admin-actions"><button class="btn btn-sm btn-outline-secondary" type="button" @click="selected = event; dialog = 'view'">View</button><button class="btn btn-sm btn-outline-primary" type="button" @click="openForm(event)">Edit</button><button class="btn btn-sm btn-outline-danger" type="button" @click="openDelete(event)">Delete</button></div></td>
						</tr></tbody>
					</table>
				</div>
				<div v-if="!filteredEvents.length" class="admin-empty">No events match your search.</div>
			</div>
		<AdminDialog v-if="dialog === 'add' || dialog === 'edit'" :title="dialog === 'add' ? 'Add event' : 'Edit event'" @close="dialog = ''">
			<form @submit.prevent="saveEvent">
				<div class="admin-dialog-body">
					<div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
					<div class="mb-3"><label for="event-name" class="form-label">Event name</label><input id="event-name" v-model="form.name" class="form-control" required maxlength="100"></div>
					<div class="row g-3 mb-3"><div class="col-sm-6"><label for="event-date" class="form-label">Date</label><input id="event-date" v-model="form.date" class="form-control" type="date" required></div><div class="col-sm-6"><label for="event-time" class="form-label">Time</label><input id="event-time" v-model="form.time" class="form-control" type="time" required></div></div>
					<div class="mb-3"><label for="event-venue" class="form-label">Venue</label><input id="event-venue" v-model="form.venue" class="form-control" required maxlength="100"></div>
					<div><label for="event-status" class="form-label">Status</label><select id="event-status" v-model="form.status" class="form-select"><option>Draft</option><option>Published</option></select></div>
				</div>
				<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Cancel</button><button type="submit" class="btn btn-primary">Save event</button></div>
			</form>
		</AdminDialog>
		<AdminDialog v-if="dialog === 'view'" title="Event details" @close="dialog = ''">
			<div class="admin-dialog-body"><dl class="admin-detail-list"><dt>Event ID</dt><dd>{{ selected.id }}</dd><dt>Name</dt><dd>{{ selected.name }}</dd><dt>Date & time</dt><dd>{{ formatDate(selected.date) }} · {{ selected.time }}</dd><dt>Venue</dt><dd>{{ selected.venue }}</dd><dt>Status</dt><dd>{{ selected.status }}</dd></dl></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Close</button><button type="button" class="btn btn-primary" @click="openForm(selected)">Edit event</button></div>
		</AdminDialog>
		<AdminDialog v-if="dialog === 'delete'" title="Delete event?" @close="dialog = ''">
			<div class="admin-dialog-body"><p>Delete <strong>{{ selected.name }}</strong> from the listings?</p><div v-if="error" class="alert alert-danger mb-0" role="alert">{{ error }}</div></div>
			<div class="admin-dialog-footer"><button type="button" class="btn btn-outline-secondary" @click="dialog = ''">Cancel</button><button type="button" class="btn btn-danger" @click="deleteEvent">Delete event</button></div>
		</AdminDialog>
	</AdminPage>
</template>
