<script setup>
import { computed, ref } from "vue";

const events = [
    {
        id: "moira-live",
        title: "Moira: Where It All Started",
        category: "Live Music",
        date: "December 5, 2026",
        venue: "SM Mall of Asia Arena, Pasay",
        price: 3800,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Concert crowd enjoying a live performance",
        badge: "Selling fast"
    },
    {
        id: "wanderland",
        title: "Wanderland Music & Arts Festival",
        category: "Festival",
        date: "January 16, 2027",
        venue: "Filinvest City Event Grounds, Alabang",
        price: 3200,
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Outdoor music festival with colorful stage lighting",
        badge: "Just announced"
    },
    {
        id: "manila-food-week",
        title: "Manila Food Week",
        category: "Food & Culture",
        date: "December 5, 2026",
        venue: "The Fifth at Rockwell, Makati",
        price: 950,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Celebration dinner in a warmly lit venue",
        badge: "New"
    },
    {
        id: "indie-film-night",
        title: "Indie Film Night: Stories After Dark",
        category: "Arts",
        date: "January 8, 2027",
        venue: "Ayala Museum, Makati",
        price: 700,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Rows of seats in a cinema",
        badge: "Limited seats"
    },
    {
        id: "city-run",
        title: "Aquaman",
        category: "Sports",
        date: "December 12, 2026",
        venue: "Ayala Vermosa Sports Hub",
        price: 1200,
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Runners lining up for a city race",
        badge: "Registration open"
    },
    {
        id: "summer-sounds",
        title: "Summer Sounds: Rooftop Sessions",
        category: "Live Music",
        date: "December 19, 2026",
        venue: "The Nest, BGC, Taguig",
        price: 1500,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "DJ performing beneath concert lights",
        badge: "New"
    }
];

const categories = ["All events", "Live Music", "Festival", "Food & Culture", "Arts", "Sports"];
const selectedCategory = ref("All events");
const searchQuery = ref("");

const filteredEvents = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    return events.filter((event) => {
        const matchesCategory = selectedCategory.value === "All events" || event.category === selectedCategory.value;
        const matchesSearch = !query || `${event.title} ${event.venue} ${event.category}`.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
});

const formatPrice = (price) => new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
}).format(price);
</script>

<template>
    <main class="catalog-page">
        <section class="catalog-banner">
            <div class="container catalog-banner-inner">
                <div>
                    <p class="eyebrow text-white-50 mb-2">MAKE THE MOST OF YOUR DAY</p>
                    <h1>Find an event<br>to get excited about.</h1>
                    <p class="mb-0">Discover the shows, gatherings, and experiences happening near you.</p>
                </div>
                <div class="catalog-banner-mark"><i class="bi bi-ticket-perforated"></i></div>
            </div>
        </section>

        <section class="container catalog-content">
            <div class="catalog-toolbar">
                <div>
                    <p class="eyebrow text-primary mb-2">THE LINEUP</p>
                    <h2 class="fw-bold mb-0">Upcoming events <span class="result-count">{{ filteredEvents.length }}</span></h2>
                </div>
                <label class="catalog-search">
                    <i class="bi bi-search"></i>
                    <input v-model="searchQuery" type="search" placeholder="Search events or venues" aria-label="Search events or venues">
                </label>
            </div>

            <div class="category-list" aria-label="Filter by event category">
                <button
                    v-for="category in categories"
                    :key="category"
                    type="button"
                    class="category-button"
                    :class="{ active: selectedCategory === category }"
                    :aria-pressed="selectedCategory === category"
                    @click="selectedCategory = category"
                >
                    {{ category }}
                </button>
            </div>

            <div v-if="filteredEvents.length" class="row g-4">
                <div v-for="event in filteredEvents" :key="event.id" class="col-md-6 col-xl-4">
                    <article class="catalog-card h-100">
                        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="catalog-image-link">
                            <img :src="event.image" :alt="event.imageAlt" class="catalog-image">
                            <span class="catalog-badge">{{ event.badge }}</span>
                        </router-link>
                        <div class="catalog-card-body">
                            <p class="eyebrow text-primary mb-2">{{ event.category }}</p>
                            <h3 class="h5 fw-bold mb-3">
                                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="text-decoration-none text-dark">
                                    {{ event.title }}
                                </router-link>
                            </h3>
                            <p class="catalog-meta"><i class="bi bi-calendar3"></i>{{ event.date }}</p>
                            <p class="catalog-meta"><i class="bi bi-geo-alt"></i>{{ event.venue }}</p>
                            <div class="catalog-card-footer">
                                <span class="price-label">Tickets from <strong>{{ formatPrice(event.price) }}</strong></span>
                                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="btn btn-primary btn-sm">View event</router-link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div v-else class="empty-state">
                <i class="bi bi-calendar2-x"></i>
                <h3 class="h5 fw-bold mt-3">No events found</h3>
                <p class="mb-0">Try another search or choose a different category.</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.catalog-page {
    min-height: 70vh;
    padding-bottom: 5rem;
    color: #17213a;
    background: #fbfbfd;
}

.catalog-banner {
    overflow: hidden;
    color: #fff;
    background: linear-gradient(112deg, #20264d, #454b8d 70%, #7356a0);
}

.catalog-banner-inner {
    min-height: 255px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.eyebrow {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
}

.catalog-banner h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2.1rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1.04;
}

.catalog-banner p:last-child {
    color: rgba(255, 255, 255, 0.76);
}

.catalog-banner-mark {
    display: grid;
    place-items: center;
    width: 145px;
    height: 145px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    color: #ffce9d;
    font-size: 4.2rem;
    transform: rotate(-12deg);
}

.catalog-content {
    padding-top: 3.5rem;
}

.catalog-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.catalog-toolbar h2 {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    letter-spacing: -0.04em;
}

.result-count {
    display: inline-grid;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 0.35rem;
    border-radius: 50%;
    background: #eeeffa;
    color: #424a98;
    font-size: 0.8rem;
    vertical-align: 0.18rem;
}

.catalog-search {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    width: min(100%, 310px);
    padding: 0.72rem 0.9rem;
    border: 1px solid #e4e6ed;
    border-radius: 0.65rem;
    background: #fff;
    color: #83899b;
}

.catalog-search input {
    width: 100%;
    border: 0;
    outline: 0;
    color: #202747;
    background: transparent;
    font: inherit;
    font-size: 0.88rem;
}

.category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 2rem;
}

.category-button {
    padding: 0.55rem 0.95rem;
    border: 1px solid #e6e8ef;
    border-radius: 2rem;
    background: #fff;
    color: #555e75;
    font-size: 0.84rem;
    transition: all 150ms ease;
}

.category-button:hover,
.category-button.active {
    border-color: #363d7d;
    background: #363d7d;
    color: #fff;
}

.catalog-card {
    overflow: hidden;
    border: 1px solid #eceef3;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 12px 32px rgba(27, 35, 69, 0.05);
    transition: transform 180ms ease, box-shadow 180ms ease;
}

.catalog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 38px rgba(27, 35, 69, 0.11);
}

.catalog-image-link {
    position: relative;
    display: block;
    overflow: hidden;
}

.catalog-image {
    display: block;
    width: 100%;
    height: 225px;
    object-fit: cover;
    transition: transform 250ms ease;
}

.catalog-card:hover .catalog-image {
    transform: scale(1.035);
}

.catalog-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.4rem 0.7rem;
    border-radius: 2rem;
    background: #fff;
    color: #292e60;
    font-size: 0.72rem;
    font-weight: 700;
}

.catalog-card-body {
    padding: 1.25rem;
}

.catalog-meta {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 0.55rem;
    color: #687087;
    font-size: 0.86rem;
}

.catalog-meta i {
    color: #555db3;
}

.catalog-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    border-top: 1px solid #eef0f4;
    margin-top: 1rem;
    padding-top: 1rem;
}

.price-label {
    color: #687087;
    font-size: 0.78rem;
}

.price-label strong {
    display: block;
    margin-top: 0.1rem;
    color: #202747;
    font-size: 1.05rem;
}

.empty-state {
    padding: 4rem 1rem;
    border: 1px dashed #dfe2eb;
    border-radius: 1rem;
    color: #70778a;
    text-align: center;
}

.empty-state i {
    color: #555db3;
    font-size: 2rem;
}

@media (max-width: 575.98px) {
    .catalog-banner-mark {
        display: none;
    }

    .catalog-toolbar {
        align-items: stretch;
        flex-direction: column;
    }
}
</style>