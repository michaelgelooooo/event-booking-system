<script setup>
import Navbar from "../components/customer/Navbar.vue";
import Footer from "../components/customer/Footer.vue";
</script>

<template>
	<Navbar />

	<main>
		<RouterView />
	</main>

	<Footer />
</template>
