<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-primary navbar-dark">
		<div class="container">
			<!-- Brand -->
			<router-link :to="{ name: 'Home' }" class="navbar-brand fw-bold fs-4"> Event. </router-link>

			<!-- Mobile Toggle -->
			<button class="navbar-toggler" type="button" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen" aria-controls="navbarContent" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<!-- Navigation Links -->
			<div id="navbarContent" class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
				<ul class="navbar-nav mx-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link :to="{ name: 'Home' }" class="nav-link" @click="isMenuOpen = false"> Home </router-link>
					</li>

					<li class="nav-item">
						<router-link :to="{ name: 'EventCatalog' }" class="nav-link" @click="isMenuOpen = false"> Events </router-link>
					</li>

					<li class="nav-item">
						<a href="#vip-packages" class="nav-link" @click="isMenuOpen = false"> VIP Packages </a>
					</li>
				</ul>

				<!-- Account Links -->
				<div class="d-flex flex-column flex-lg-row gap-2">
					<router-link :to="{ name: 'Login' }" class="btn btn-outline-light" @click="isMenuOpen = false">
						<i class="bi bi-person me-1"></i>
						Login
					</router-link>

					<router-link :to="{ name: 'Register' }" class="btn btn-light text-primary" @click="isMenuOpen = false"> Register </router-link>
				</div>
			</div>
		</div>
	</nav>
</template>
