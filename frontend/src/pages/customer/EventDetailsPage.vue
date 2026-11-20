<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const events = [
    {
        id: "moira-live",
        title: "Moira: Where It All Started",
        category: "LIVE MUSIC",
        date: "December 5, 2026",
        venue: "SM Mall of Asia Arena, Pasay",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Concert crowd enjoying a live performance under stage lights",
        description: "An intimate celebration of the songs and stories that started it all. Sing along with Moira for one special night, with heartfelt favorites, new arrangements, and a few surprises made just for the crowd.",
        schedule: [
            { id: "dec-5-6pm", label: "December 5, 2026 · 6:00 PM", availableSeats: 8 },
            { id: "dec-5-8pm", label: "December 5, 2026 · 8:30 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "Upper Box", price: 1800, description: "A great view of the full show." },
            { id: "premium", name: "Premium", area: "Lower Box", price: 4500, description: "Closer seats and a dedicated entrance." },
            { id: "vip", name: "VIP", area: "VIP Floor", price: 9500, description: "The closest view and a little extra." }
        ],
        vipBenefits: ["Priority event entry", "Exclusive event merchandise", "VIP lounge access", "A commemorative photo card"]
    },
    {
        id: "wanderland",
        title: "Wanderland Music & Arts Festival",
        category: "FESTIVAL",
        date: "January 16, 2027",
        venue: "Filinvest City Event Grounds, Alabang",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Outdoor music festival filled with colorful stage lighting",
        description: "A full day of live music, art installations, and new discoveries. Wanderland brings homegrown talent and international artists together for an open-air festival experience.",
        schedule: [
            { id: "jan-16-12pm", label: "January 16, 2027 · Gates open 12:00 PM", availableSeats: 8 },
            { id: "jan-16-3pm", label: "January 16, 2027 · Gates open 3:00 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "Festival Grounds", price: 3200, description: "Full-day access to the festival grounds." },
            { id: "premium", name: "Premium", area: "Premium Viewing", price: 5900, description: "Dedicated viewing area and express entry." },
            { id: "vip", name: "VIP", area: "VIP Garden", price: 10500, description: "A relaxed festival home base with premium perks." }
        ],
        vipBenefits: ["VIP viewing area", "Air-conditioned lounge access", "Express festival entry", "Complimentary welcome drink"]
    },
    {
        id: "manila-food-week",
        title: "Manila Food Week",
        category: "FOOD & CULTURE",
        date: "December 5, 2026",
        venue: "The Fifth at Rockwell, Makati",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Guests gathering at a warmly lit food and culture event",
        description: "Meet the makers and flavors shaping Manila's food scene. Enjoy chef-led tastings, local favorites, and conversations with the people behind the dishes.",
        schedule: [
            { id: "dec-5-11am", label: "December 5, 2026 · 11:00 AM", availableSeats: 8 },
            { id: "dec-5-5pm", label: "December 5, 2026 · 5:00 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "Tasting Hall", price: 950, description: "Entry to the event and tasting hall." },
            { id: "premium", name: "Premium", area: "Chef's Table", price: 2400, description: "A reserved tasting experience with a chef." },
            { id: "vip", name: "VIP", area: "VIP Dining Room", price: 4800, description: "An elevated tasting journey with extra access." }
        ],
        vipBenefits: ["Curated tasting menu", "Meet-the-chef session", "Reserved VIP dining area", "Take-home local food box"]
    },
    {
        id: "indie-film-night",
        title: "Indie Film Night: Stories After Dark",
        category: "ARTS",
        date: "January 8, 2027",
        venue: "Ayala Museum, Makati",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Cinema seats ready for an independent film screening",
        description: "Spend an evening with independent filmmakers and fresh Filipino stories. Your ticket includes the screening and a post-film conversation with the creative team.",
        schedule: [
            { id: "jan-8-6pm", label: "January 8, 2027 · 6:00 PM", availableSeats: 8 },
            { id: "jan-8-8pm", label: "January 8, 2027 · 8:30 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "Standard", price: 700, description: "Admission to the film screening." },
            { id: "premium", name: "Premium", area: "Premium Row", price: 1200, description: "A reserved seat and priority entry." },
            { id: "vip", name: "VIP", area: "Director's Circle", price: 2200, description: "Reserved front seating and special access." }
        ],
        vipBenefits: ["Reserved front-row seat", "Post-film reception access", "Meet the filmmakers", "Limited-edition film poster"]
    },
    {
        id: "city-run",
        title: "Aquaman",
        category: "SPORTS",
        date: "December 12, 2026",
        venue: "Ayala Vermosa Sports Hub",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Runners getting ready for a city race",
        description: "Join swimmers from across the community for Aquaman’s exciting pool swimming races! Experience the thrill of competition, test your speed and endurance, and celebrate the spirit of sportsmanship. Every race celebrates determination, sportsmanship, and the passion for swimming, creating memorable moments with every lap.",
        schedule: [
            { id: "dec-12-5pm", label: "December 12, 2026 · Warm-up 5:00 PM", availableSeats: 8 },
            { id: "dec-12-7pm", label: "December 12, 2026 · Warm-up 7:00 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "10K Entry", price: 1200, description: "Race entry and participant bib." },
            { id: "premium", name: "Premium", area: "Race Pack Plus", price: 2200, description: "Race entry, premium shirt, and express pickup." },
            { id: "vip", name: "VIP", area: "VIP Race Pack", price: 3900, description: "Premium race pack and a relaxed finish-line experience." }
        ],
        vipBenefits: ["VIP race pack and shirt", "Dedicated race pack pickup", "VIP warm-up zone", "Finish-line recovery lounge"]
    },
    {
        id: "summer-sounds",
        title: "Summer Sounds: Rooftop Sessions",
        category: "LIVE MUSIC",
        date: "December 19, 2026",
        venue: "The Nest, BGC, Taguig",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=90",
        imageAlt: "Live DJ performing at a rooftop music event",
        description: "Close out the year above the city with a rooftop evening of live sets, sunset views, and good company. Come for the music, stay for the skyline.",
        schedule: [
            { id: "dec-19-5pm", label: "December 19, 2026 · Doors open 5:00 PM", availableSeats: 8 },
            { id: "dec-19-8pm", label: "December 19, 2026 · Doors open 8:00 PM", availableSeats: 8 }
        ],
        tickets: [
            { id: "general", name: "General Admission", area: "Rooftop Deck", price: 1500, description: "Entry to the rooftop sessions." },
            { id: "premium", name: "Premium", area: "Front Deck", price: 2800, description: "Front-deck access and a welcome drink." },
            { id: "vip", name: "VIP", area: "Sky Lounge", price: 5200, description: "A private lounge with the best skyline views." }
        ],
        vipBenefits: ["Private Sky Lounge access", "Welcome cocktail", "Dedicated host and entry", "Reserved skyline seating"]
    }
];

const route = useRoute();
const router = useRouter();
const event = computed(() => events.find((item) => item.id === route.params.eventId) ?? events[0]);
const selectedSchedule = ref(event.value.schedule[0].id);
const selectedTicket = ref(event.value.tickets[0].id);
const quantity = ref(1);
const selectedSeats = ref([]);
const seatOptions = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];

const activeSchedule = computed(() => event.value.schedule.find((item) => item.id === selectedSchedule.value) ?? event.value.schedule[0]);
const activeTicket = computed(() => event.value.tickets.find((item) => item.id === selectedTicket.value) ?? event.value.tickets[0]);
const subtotal = computed(() => activeTicket.value.price * quantity.value);
const serviceFee = computed(() => Math.round(subtotal.value * 0.03));
const total = computed(() => subtotal.value + serviceFee.value);
const needsSeatSelection = computed(() => activeTicket.value.id !== "general");
const seatsAreValid = computed(() => !needsSeatSelection.value || selectedSeats.value.length === quantity.value);

watch(() => route.params.eventId, () => {
    selectedSchedule.value = event.value.schedule[0].id;
    selectedTicket.value = event.value.tickets[0].id;
    quantity.value = 1;
    selectedSeats.value = [];
});

watch(quantity, (newQuantity) => {
    selectedSeats.value = selectedSeats.value.slice(0, newQuantity);
});

watch(selectedTicket, () => {
    selectedSeats.value = [];
});

watch(selectedSchedule, () => {
    selectedSeats.value = [];
});

const formatPrice = (price) => new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
}).format(price);

const toggleSeat = (seat) => {
    if (selectedSeats.value.includes(seat)) {
        selectedSeats.value = selectedSeats.value.filter((selectedSeat) => selectedSeat !== seat);
    } else if (selectedSeats.value.length < quantity.value) {
        selectedSeats.value = [...selectedSeats.value, seat];
    }
};

const continueToCheckout = () => {
    router.push({
        name: "Checkout",
        query: {
            eventId: event.value.id,
            event: event.value.title,
            schedule: activeSchedule.value.label,
            ticket: activeTicket.value.name,
            quantity: String(quantity.value),
            seats: selectedSeats.value.join(","),
            total: String(total.value)
        }
    });
};
</script>

<template>
    <main class="details-page">
        <section class="details-hero" :style="{ backgroundImage: `linear-gradient(90deg, rgba(20, 25, 55, .94) 0%, rgba(26, 31, 65, .76) 48%, rgba(26, 31, 65, .18) 100%), url('${event.image}')` }">
            <div class="container details-hero-content">
                <router-link :to="{ name: 'EventCatalog' }" class="back-link"><i class="bi bi-arrow-left me-2"></i>All events</router-link>
                <p class="eyebrow text-white-50 mb-3">{{ event.category }}</p>
                <h1>{{ event.title }}</h1>
                <div class="details-hero-meta">
                    <span><i class="bi bi-calendar3"></i>{{ event.date }}</span>
                    <span><i class="bi bi-geo-alt"></i>{{ event.venue }}</span>
                </div>
            </div>
        </section>

        <section class="container details-layout">
            <div class="details-main">
                <article class="details-section">
                    <p class="eyebrow text-primary mb-2">THE EXPERIENCE</p>
                    <h2>About this event</h2>
                    <p class="description-copy">{{ event.description }}</p>
                </article>

                <article class="details-section schedule-section">
                    <p class="eyebrow text-primary mb-2">PLAN YOUR VISIT</p>
                    <h2>Choose a schedule</h2>
                    <div class="schedule-options">
                        <label v-for="schedule in event.schedule" :key="schedule.id" class="schedule-option" :class="{ selected: selectedSchedule === schedule.id }">
                            <input v-model="selectedSchedule" type="radio" :value="schedule.id" name="event-schedule">
                            <span class="schedule-icon"><i class="bi bi-calendar-event"></i></span>
                            <span class="schedule-text">
                                <strong>{{ schedule.label }}</strong>
                                <small>{{ schedule.availableSeats }} spots available</small>
                            </span>
                            <i class="bi bi-check-circle-fill schedule-check"></i>
                        </label>
                    </div>
                </article>

                <article class="details-section">
                    <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
                        <div>
                            <p class="eyebrow text-primary mb-2">PICK YOUR EXPERIENCE</p>
                            <h2 class="mb-0">Select a ticket</h2>
                        </div>
                        <span class="price-note">Prices per person · PHP</span>
                    </div>
                    <div class="ticket-options">
                        <label v-for="ticket in event.tickets" :key="ticket.id" class="ticket-option" :class="{ selected: selectedTicket === ticket.id }">
                            <input v-model="selectedTicket" type="radio" :value="ticket.id" name="event-ticket">
                            <span class="ticket-radio"></span>
                            <span class="ticket-info">
                                <strong>{{ ticket.name }}</strong>
                                <small>{{ ticket.area }} · {{ ticket.description }}</small>
                            </span>
                            <strong class="ticket-price">{{ formatPrice(ticket.price) }}</strong>
                        </label>
                    </div>
                </article>

                <article v-if="activeTicket.id === 'vip'" id="vip-packages" class="vip-card">
                    <div class="vip-card-heading">
                        <span class="vip-icon"><i class="bi bi-stars"></i></span>
                        <div>
                            <p class="eyebrow mb-1">GO ALL OUT</p>
                            <h2 class="h4 fw-bold mb-0">Your VIP package</h2>
                        </div>
                    </div>
                    <p class="vip-description">More than a ticket — enjoy extra comfort and thoughtful perks throughout the event.</p>
                    <ul class="vip-benefits">
                        <li v-for="benefit in event.vipBenefits" :key="benefit"><i class="bi bi-check-circle-fill"></i>{{ benefit }}</li>
                    </ul>
                </article>
            </div>

            <aside class="booking-card">
                <div class="booking-card-heading">
                    <p class="eyebrow text-primary mb-2">MAKE IT YOURS</p>
                    <h2 class="h4 fw-bold mb-0">Your tickets</h2>
                </div>
                <div class="booking-event">
                    <img :src="event.image" :alt="event.imageAlt">
                    <div>
                        <strong>{{ event.title }}</strong>
                        <span>{{ activeSchedule.label }}</span>
                    </div>
                </div>

                <label for="ticket-quantity" class="form-label fw-semibold small mb-2">Number of tickets</label>
                <select id="ticket-quantity" v-model.number="quantity" class="form-select mb-4" aria-label="Number of tickets">
                    <option v-for="count in 4" :key="count" :value="count">{{ count }} {{ count === 1 ? "ticket" : "tickets" }}</option>
                </select>

                <div v-if="needsSeatSelection" class="seat-picker">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <label class="form-label fw-semibold small mb-0">Choose your seats</label>
                        <span class="seat-count">{{ selectedSeats.length }} / {{ quantity }}</span>
                    </div>
                    <div class="seat-stage">STAGE</div>
                    <div class="seat-grid">
                        <button
                            v-for="seat in seatOptions"
                            :key="seat"
                            type="button"
                            class="seat-button"
                            :class="{ selected: selectedSeats.includes(seat) }"
                            :aria-pressed="selectedSeats.includes(seat)"
                            :aria-label="`Seat ${seat}${selectedSeats.includes(seat) ? ', selected' : ''}`"
                            @click="toggleSeat(seat)"
                        >
                            {{ seat }}
                        </button>
                    </div>
                    <p class="seat-help mb-0">Pick {{ quantity }} seat{{ quantity === 1 ? "" : "s" }}. General Admission is unassigned seating.</p>
                </div>

                <div class="price-breakdown">
                    <div><span>{{ activeTicket.name }} × {{ quantity }}</span><strong>{{ formatPrice(subtotal) }}</strong></div>
                    <div><span>Estimated service fee</span><strong>{{ formatPrice(serviceFee) }}</strong></div>
                    <div class="total-row"><span>Total</span><strong>{{ formatPrice(total) }}</strong></div>
                </div>
                <button type="button" class="btn btn-primary w-100 checkout-button" :disabled="!seatsAreValid" @click="continueToCheckout">
                    Continue to checkout <i class="bi bi-arrow-right ms-2"></i>
                </button>
                <p v-if="needsSeatSelection && !seatsAreValid" class="seat-validation mb-0">Select {{ quantity }} seat{{ quantity === 1 ? "" : "s" }} to continue.</p>
                <p class="secure-note"><i class="bi bi-shield-check me-1"></i>Secure checkout · No payment yet</p>
            </aside>
        </section>
    </main>
</template>

<style scoped>
.details-page {
    color: #17213a;
    background: #fbfbfd;
    min-height: 70vh;
    padding-bottom: 5rem;
}

.details-hero {
    min-height: 400px;
    display: flex;
    align-items: center;
    background-position: center 42%;
    background-size: cover;
    color: #fff;
}

.details-hero-content {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
}

.back-link {
    display: inline-block;
    margin-bottom: 2.3rem;
    color: rgba(255, 255, 255, 0.83);
    font-size: 0.88rem;
    text-decoration: none;
}

.back-link:hover {
    color: #fff;
}

.eyebrow {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
}

.details-hero h1 {
    max-width: 780px;
    margin-bottom: 1.2rem;
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1.03;
}

.details-hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem 1.5rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.92rem;
}

.details-hero-meta span {
    display: flex;
    gap: 0.55rem;
    align-items: center;
}

.details-hero-meta i {
    color: #ffc98f;
}

.details-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 370px;
    align-items: start;
    gap: 2rem;
    padding-top: 2.5rem;
}

.details-main {
    min-width: 0;
}

.details-section {
    padding: 1.8rem 0;
    border-bottom: 1px solid #e9ebf1;
}

.details-section h2 {
    margin-bottom: 0.8rem;
    font-size: 1.55rem;
    font-weight: 750;
    letter-spacing: -0.035em;
}

.description-copy {
    max-width: 760px;
    margin: 0;
    color: #646d82;
    font-size: 0.98rem;
    line-height: 1.8;
}

.schedule-options,
.ticket-options {
    display: grid;
    gap: 0.7rem;
}

.schedule-option {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    border: 1px solid #e5e7ee;
    border-radius: 0.75rem;
    background: #fff;
    cursor: pointer;
    transition: border-color 150ms ease, background 150ms ease;
}

.schedule-option.selected,
.ticket-option.selected {
    border-color: #4a5097;
    background: #f7f7ff;
}

.schedule-option input,
.ticket-option input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.schedule-icon,
.vip-icon {
    display: grid;
    place-items: center;
    flex: 0 0 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.65rem;
    background: #eeeffa;
    color: #4b5298;
    font-size: 1.05rem;
}

.schedule-text,
.ticket-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.25rem;
}

.schedule-text strong,
.ticket-info strong {
    color: #252b48;
    font-size: 0.91rem;
}

.schedule-text small,
.ticket-info small {
    color: #757c8e;
    font-size: 0.78rem;
}

.schedule-check {
    color: #4a5097;
    opacity: 0;
}

.schedule-option.selected .schedule-check {
    opacity: 1;
}

.price-note {
    color: #7d8394;
    font-size: 0.78rem;
}

.ticket-option {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    border: 1px solid #e5e7ee;
    border-radius: 0.75rem;
    background: #fff;
    cursor: pointer;
    transition: border-color 150ms ease, background 150ms ease;
}

.ticket-radio {
    flex: 0 0 1.05rem;
    width: 1.05rem;
    height: 1.05rem;
    border: 1.5px solid #b7bdcd;
    border-radius: 50%;
    background: #fff;
}

.ticket-option.selected .ticket-radio {
    border: 5px solid #4a5097;
}

.ticket-price {
    color: #292f58;
    font-size: 0.92rem;
    white-space: nowrap;
}

.vip-card {
    margin-top: 1.5rem;
    padding: 1.4rem;
    border: 1px solid #ead8b8;
    border-radius: 1rem;
    background: linear-gradient(130deg, #fffaf0, #fff 75%);
}

.vip-card-heading {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.vip-icon {
    flex-basis: 2.8rem;
    width: 2.8rem;
    height: 2.8rem;
    background: #fff0d6;
    color: #9c6a22;
}

.vip-card .eyebrow {
    color: #a17431;
}

.vip-description {
    margin: 1rem 0;
    color: #6f6b61;
    font-size: 0.88rem;
    line-height: 1.65;
}

.vip-benefits {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem 1rem;
    padding: 0;
    margin: 0;
    list-style: none;
}

.vip-benefits li {
    display: flex;
    gap: 0.5rem;
    color: #55576a;
    font-size: 0.8rem;
}

.vip-benefits i {
    color: #a17431;
}

.booking-card {
    position: sticky;
    top: 1.5rem;
    padding: 1.35rem;
    border: 1px solid #e7e9ef;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 14px 36px rgba(27, 35, 69, 0.08);
}

.booking-card-heading {
    margin-bottom: 1.15rem;
}

.booking-event {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.3rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eef0f4;
}

.booking-event img {
    width: 62px;
    height: 62px;
    flex: 0 0 62px;
    border-radius: 0.65rem;
    object-fit: cover;
}

.booking-event div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.booking-event strong {
    color: #282e4c;
    font-size: 0.82rem;
    line-height: 1.35;
}

.booking-event span {
    color: #767d90;
    font-size: 0.72rem;
    line-height: 1.4;
}

.seat-picker {
    padding: 0.9rem;
    margin-bottom: 1rem;
    border: 1px solid #e9ebf1;
    border-radius: 0.75rem;
    background: #fcfcfe;
}

.seat-count {
    color: #525a88;
    font-size: 0.75rem;
    font-weight: 700;
}

.seat-stage {
    margin: 0.7rem 0;
    padding: 0.3rem;
    border-radius: 0.3rem;
    background: #e9eaf4;
    color: #757b9c;
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-align: center;
}

.seat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.45rem;
}

.seat-button {
    padding: 0.38rem 0.15rem;
    border: 1px solid #dfe2eb;
    border-radius: 0.4rem;
    background: #fff;
    color: #5e6578;
    font-size: 0.68rem;
    transition: all 120ms ease;
}

.seat-button:hover,
.seat-button.selected {
    border-color: #424990;
    background: #424990;
    color: #fff;
}

.seat-help {
    margin-top: 0.65rem;
    color: #858b9a;
    font-size: 0.68rem;
    line-height: 1.5;
}

.price-breakdown {
    display: grid;
    gap: 0.8rem;
    padding: 1rem 0;
    border-top: 1px solid #eef0f4;
}

.price-breakdown div {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
    color: #70778a;
    font-size: 0.8rem;
}

.price-breakdown strong {
    color: #313750;
    white-space: nowrap;
}

.price-breakdown .total-row {
    align-items: center;
    padding-top: 0.85rem;
    border-top: 1px solid #eef0f4;
    color: #252b48;
    font-size: 0.95rem;
    font-weight: 700;
}

.price-breakdown .total-row strong {
    color: #252b48;
    font-size: 1.25rem;
}

.checkout-button {
    padding: 0.8rem;
    border: 0;
    border-radius: 0.65rem;
    background: #363d7d;
    font-weight: 700;
}

.checkout-button:hover:not(:disabled) {
    background: #292f68;
}

.checkout-button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
}

.seat-validation {
    margin-top: 0.55rem;
    color: #b54747;
    font-size: 0.72rem;
    text-align: center;
}

.secure-note {
    margin: 0.8rem 0 0;
    color: #7d8393;
    font-size: 0.7rem;
    text-align: center;
}

@media (max-width: 991.98px) {
    .details-layout {
        grid-template-columns: minmax(0, 1fr) 330px;
        gap: 1.2rem;
    }
}

@media (max-width: 767.98px) {
    .details-hero {
        min-height: 360px;
    }

    .details-layout {
        grid-template-columns: 1fr;
        padding-top: 1.5rem;
    }

    .booking-card {
        position: static;
        grid-row: 1;
    }
}

@media (max-width: 575.98px) {
    .vip-benefits {
        grid-template-columns: 1fr;
    }

    .ticket-option {
        gap: 0.6rem;
        padding: 0.8rem;
    }

    .ticket-info small {
        line-height: 1.45;
    }

    .ticket-price {
        font-size: 0.8rem;
    }
}
</style>