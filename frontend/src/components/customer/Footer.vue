<template>
	<footer class="bg-dark text-light py-5 mt-auto">
		<div class="container">
			<div class="row g-4">
				<!-- Brand Information -->
				<div class="col-md-5">
					<h4 class="fw-bold mb-3">Event.</h4>

					<p class="text-secondary mb-0">Discover unforgettable events and experience something extraordinary with our exclusive ticketing and VIP packages.</p>
				</div>

				<!-- Quick Links -->
				<div class="col-md-3">
					<h5 class="fw-bold mb-3">Quick Links</h5>

					<ul class="list-unstyled">
						<li class="mb-2">
							<router-link :to="{ name: 'Home' }" class="text-secondary text-decoration-none"> Home </router-link>
						</li>

						<li class="mb-2">
							<router-link :to="{ name: 'EventCatalog' }" class="text-secondary text-decoration-none"> Events </router-link>
						</li>

						<li class="mb-2">
							<router-link :to="{ name: 'Login' }" class="text-secondary text-decoration-none"> Login </router-link>
						</li>

						<li class="mb-2">
							<router-link :to="{ name: 'Register' }" class="text-secondary text-decoration-none"> Register </router-link>
						</li>
					</ul>
				</div>

				<!-- Contact / Socials -->
				<div class="col-md-4">
					<h5 class="fw-bold mb-3">Connect With Us</h5>

					<p class="text-secondary">Have questions? Get in touch with our team.</p>

					<div class="d-flex gap-3 fs-4">
						<a href="#" class="text-light" aria-label="Facebook">
							<i class="bi bi-facebook"></i>
						</a>

						<a href="#" class="text-light" aria-label="Instagram">
							<i class="bi bi-instagram"></i>
						</a>

						<a href="#" class="text-light" aria-label="Twitter">
							<i class="bi bi-twitter-x"></i>
						</a>
					</div>
				</div>
			</div>

			<hr class="border-secondary my-4" />

			<!-- Copyright -->
			<div class="text-center">
				<p class="text-secondary mb-0">&copy; {{ new Date().getFullYear() }} Event. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>
