<script setup>
import AdminSidebar from "../components/admin/AdminSidebar.vue";
</script>

<template>
	<div class="d-flex min-vh-100">
		<AdminSidebar />

		<main class="flex-grow-1">
			<RouterView />
		</main>
	</div>
</template>
