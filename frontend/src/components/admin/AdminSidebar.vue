<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);

const navigationLinks = [
	{
		name: "AdminDashboard",
		label: "Dashboard",
		icon: "bi-grid",
	},
	{
		name: "AdminEvents",
		label: "Events",
		icon: "bi-calendar-event",
	},
	{
		name: "AdminTickets",
		label: "Tickets",
		icon: "bi-ticket-perforated",
	},
	{
		name: "AdminBookings",
		label: "Bookings",
		icon: "bi-journal-check",
	},
];
</script>

<template>
	<!-- Mobile Toggle -->
	<button class="btn btn-dark d-lg-none position-fixed top-0 start-0 m-3 z-3" type="button" @click="isSidebarOpen = !isSidebarOpen" aria-label="Toggle admin sidebar">
		<i class="bi bi-list fs-4"></i>
	</button>

	<!-- Mobile Backdrop -->
	<div v-if="isSidebarOpen" class="sidebar-backdrop d-lg-none" @click="isSidebarOpen = false"></div>

	<!-- Sidebar -->
	<aside class="admin-sidebar bg-dark text-light d-flex flex-column" :class="{ 'sidebar-open': isSidebarOpen }">
		<!-- Brand -->
		<div class="p-4 border-bottom border-secondary">
			<router-link :to="{ name: 'AdminDashboard' }" class="text-decoration-none text-white" @click="isSidebarOpen = false">
				<h4 class="fw-bold mb-1">Event.</h4>
				<small class="text-secondary">Administration</small>
			</router-link>
		</div>

		<!-- Navigation -->
		<nav class="p-3 flex-grow-1">
			<small class="text-secondary text-uppercase fw-bold px-3"> Main Menu </small>

			<ul class="nav nav-pills flex-column gap-2 mt-3">
				<li v-for="link in navigationLinks" :key="link.name" class="nav-item">
					<router-link :to="{ name: link.name }" class="nav-link text-light" active-class="active" @click="isSidebarOpen = false">
						<i :class="['bi', link.icon, 'me-3']"></i>
						{{ link.label }}
					</router-link>
				</li>
			</ul>
		</nav>

		<!-- Bottom Section -->
		<div class="p-3 border-top border-secondary">
			<router-link :to="{ name: 'Home' }" class="nav-link text-secondary mb-2" @click="isSidebarOpen = false">
				<i class="bi bi-box-arrow-up-right me-3"></i>
				View Website
			</router-link>

			<button type="button" class="btn btn-outline-light w-100">
				<i class="bi bi-box-arrow-left me-2"></i>
				Logout
			</button>
		</div>
	</aside>
</template>

<style scoped>
.admin-sidebar {
	width: 260px;
	min-width: 260px;
	min-height: 100vh;
}

.admin-sidebar .nav-link {
	padding: 12px 16px;
	border-radius: 6px;
	transition: background-color 0.2s ease;
}

.admin-sidebar .nav-link:hover:not(.active) {
	background-color: rgba(255, 255, 255, 0.1);
}

.admin-sidebar .nav-link.active {
	background-color: var(--bs-primary);
	color: white !important;
}

.sidebar-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1040;
}

@media (max-width: 991.98px) {
	.admin-sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1050;
		transform: translateX(-100%);
		transition: transform 0.25s ease;
		overflow-y: auto;
	}

	.admin-sidebar.sidebar-open {
		transform: translateX(0);
	}
}
</style>
