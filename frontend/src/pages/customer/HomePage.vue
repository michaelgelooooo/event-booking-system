<script setup>
const featuredEvents = [
    {
        id: "moira-live",
        title: "Moira: Where It All Started",
        category: "LIVE MUSIC",
        date: "December 5, 2026",
        venue: "SM Mall of Asia Arena, Pasay",
        price: 1800,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Crowd enjoying a live concert beneath stage lights",
        badge: "Selling fast"
    },
    {
        id: "wanderland",
        title: "Wanderland Music & Arts Festival",
        category: "FESTIVAL",
        date: "January 16, 2027",
        venue: "Filinvest City Event Grounds, Alabang",
        price: 3200,
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Colorful lights filling an outdoor music festival",
        badge: "Just announced"
    },
    {
        id: "manila-food-week",
        title: "Manila Food Week",
        category: "FOOD & CULTURE",
        date: "December 5, 2026",
        venue: "The Fifth at Rockwell, Makati",
        price: 950,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
        imageAlt: "Guests gathered around a warmly lit event table",
        badge: "New"
    }
];

const formatPrice = (price) => new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
}).format(price);

</script>

<template>
    <div class="home-page">
        <section class="home-hero">
            <div class="container hero-content">
                <p class="eyebrow text-white-50 mb-3">MAKE ROOM FOR A GOOD TIME</p>
                <h1>Find your next<br><span>unforgettable</span> moment.</h1>
                <p class="hero-copy">Live music, new discoveries, and the people you love — your next great story starts here.</p>
                <div class="d-flex flex-wrap gap-3 align-items-center mt-4">
                    <router-link :to="{ name: 'EventCatalog' }" class="btn btn-light btn-lg hero-cta">
                        Explore events <i class="bi bi-arrow-up-right ms-2"></i>
                    </router-link>
                    <span class="hero-note"><i class="bi bi-check-circle me-2"></i>Easy, secure booking</span>
                </div>
                <div class="hero-stats">
                    <div><strong>120+</strong><span>events to explore</span></div>
                    <div><strong>25k+</strong><span>happy attendees</span></div>
                    <div><strong>One place</strong><span>for your next memory</span></div>
                </div>
            </div>
            <div class="hero-orbit hero-orbit-one"></div>
            <div class="hero-orbit hero-orbit-two"></div>
            <div class="hero-stamp"><i class="bi bi-stars"></i><span>GOOD TIMES<br>ARE CLOSER</span></div>
        </section>

        <section class="container py-5 py-lg-6">
            <div class="section-heading d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
                <div>
                    <p class="eyebrow text-primary mb-2">PICK YOUR PLANS</p>
                    <h2 class="fw-bold mb-0">Worth looking forward to</h2>
                </div>
                <router-link :to="{ name: 'EventCatalog' }" class="text-decoration-none fw-semibold">
                    See all events <i class="bi bi-arrow-right ms-1"></i>
                </router-link>
            </div>

            <div class="row g-4">
                <div v-for="event in featuredEvents" :key="event.id" class="col-md-6 col-xl-4">
                    <article class="event-card h-100">
                        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="event-image-link">
                            <img :src="event.image" :alt="event.imageAlt" class="event-image">
                            <span class="event-badge">{{ event.badge }}</span>
                        </router-link>
                        <div class="event-card-body">
                            <p class="eyebrow text-primary mb-2">{{ event.category }}</p>
                            <h3 class="h5 fw-bold mb-3">
                                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="text-decoration-none text-dark">
                                    {{ event.title }}
                                </router-link>
                            </h3>
                            <p class="event-meta"><i class="bi bi-calendar3"></i>{{ event.date }}</p>
                            <p class="event-meta"><i class="bi bi-geo-alt"></i>{{ event.venue }}</p>
                            <div class="event-card-footer">
                                <span>From <strong>{{ formatPrice(event.price) }}</strong></span>
                                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }" class="icon-link" :aria-label="`View ${event.title}`">
                                    <i class="bi bi-arrow-up-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="home-bottom">
            <div class="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                    <p class="eyebrow text-white-50 mb-2">YOUR NEXT PLAN IS OUT THERE</p>
                    <h2 class="fw-bold text-white mb-0">Make a date with something fun.</h2>
                </div>
                <router-link :to="{ name: 'EventCatalog' }" class="btn btn-light btn-lg">Browse all events <i class="bi bi-arrow-right ms-2"></i></router-link>
            </div>
        </section>
    </div>
</template>

<style scoped>
.home-page {
    color: #17213a;
}

.home-hero {
    min-height: 570px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: linear-gradient(112deg, #171d3d 3%, #30366f 58%, #8058a8 100%);
    color: #fff;
}

.hero-content {
    position: relative;
    z-index: 2;
    padding-top: 5rem;
    padding-bottom: 4rem;
}

.eyebrow {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
}

.home-hero h1 {
    max-width: 720px;
    font-size: clamp(2.8rem, 7vw, 5.2rem);
    line-height: 1.02;
    font-weight: 800;
    letter-spacing: -0.055em;
}

.home-hero h1 span {
    color: #ffc98f;
}

.hero-copy {
    max-width: 510px;
    margin: 1.35rem 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 1.08rem;
    line-height: 1.7;
}

.hero-cta {
    border: 0;
    color: #262b58;
    font-size: 0.98rem;
    font-weight: 700;
    padding: 0.85rem 1.35rem;
}

.hero-note {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
}

.hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 2.8rem;
    margin-top: 4rem;
}

.hero-stats div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.hero-stats strong {
    font-size: 1.15rem;
}

.hero-stats span {
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.82rem;
}

.hero-orbit {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 50%;
    pointer-events: none;
}

.hero-orbit-one {
    width: 590px;
    height: 590px;
    right: -80px;
    top: -25px;
}

.hero-orbit-two {
    width: 410px;
    height: 410px;
    right: 10px;
    top: 65px;
    background: radial-gradient(circle at 70% 40%, rgba(255, 196, 146, 0.22), rgba(138, 108, 187, 0.08) 58%, transparent 70%);
}

.hero-stamp {
    position: absolute;
    z-index: 1;
    right: 14%;
    top: 34%;
    width: 130px;
    height: 130px;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    color: #ffcf9c;
    text-align: center;
    transform: rotate(12deg);
}

.hero-stamp i {
    font-size: 1.35rem;
}

.hero-stamp span {
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    line-height: 1.5;
}

.section-heading h2 {
    font-size: clamp(1.7rem, 3vw, 2.25rem);
    letter-spacing: -0.04em;
}

.event-card {
    overflow: hidden;
    background: #fff;
    border: 1px solid #eceef3;
    border-radius: 1rem;
    box-shadow: 0 12px 32px rgba(27, 35, 69, 0.06);
    transition: transform 180ms ease, box-shadow 180ms ease;
}

.event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 38px rgba(27, 35, 69, 0.12);
}

.event-image-link {
    position: relative;
    display: block;
    overflow: hidden;
}

.event-image {
    display: block;
    width: 100%;
    height: 225px;
    object-fit: cover;
    transition: transform 250ms ease;
}

.event-card:hover .event-image {
    transform: scale(1.035);
}

.event-badge {
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

.event-card-body {
    padding: 1.25rem;
}

.event-meta {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    margin-bottom: 0.55rem;
    color: #687087;
    font-size: 0.86rem;
}

.event-meta i {
    color: #555db3;
}

.event-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eef0f4;
    margin-top: 1rem;
    padding-top: 1rem;
    color: #687087;
    font-size: 0.85rem;
}

.event-card-footer strong {
    color: #202747;
    font-size: 1rem;
}

.icon-link {
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: #f0f1fb;
    color: #393f82;
    text-decoration: none;
}

.home-bottom {
    padding: 3.5rem 0;
    background: linear-gradient(110deg, #252b5a, #514a91);
}

.home-bottom h2 {
    letter-spacing: -0.035em;
}

@media (max-width: 767.98px) {
    .home-hero {
        min-height: 540px;
    }

    .hero-content {
        padding-top: 4rem;
        padding-bottom: 3rem;
    }

    .hero-stats {
        gap: 1.2rem 2rem;
        margin-top: 3rem;
    }

    .hero-orbit-one {
        width: 410px;
        height: 410px;
        right: -220px;
        top: 65px;
    }

    .hero-orbit-two,
    .hero-stamp {
        display: none;
    }
}
</style>