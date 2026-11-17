<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Pull the name from the router query, fallback to the image's default if not present
const attendeeName = computed(() => route.query.name || 'Eric Pena')
</script>

<template>
    <!-- Background wrapper simulating the dark app background -->
    <main class="ticket-page-wrapper container-fluid py-5 d-flex justify-content-center align-items-center">
        
        <div class="ticket-container w-100">
            <router-link to="/" class="btn btn-link text-white text-decoration-none home-btn">
            &larr; Back to Home
        </router-link>
            <!-- TICKET HEADER (Purple Section) -->
            <div class="ticket-header text-center text-white">
                <span class="badge rounded-pill vip-badge mb-3 px-3 py-1 fw-semibold">VIP PASS</span>
                <h2 class="fw-bold mb-1">Moira: Tour 2026</h2>
                <p class="mb-0 ticket-subtitle opacity-75">Oct 4, 2026 &bull; MOA Arena</p>
            </div>

            <!-- TICKET BODY TOP (QR Code) -->
            <div class="ticket-body-top text-center">
                <div class="qr-placeholder mx-auto">
                    [QR CODE]
                </div>
            </div>

            <!-- TICKET DIVIDER (Perforated Line & Cutouts) -->
            <div class="ticket-divider">
                <div class="dashed-line"></div>
            </div>

            <!-- TICKET BODY BOTTOM (Details & Itinerary) -->
            <div class="ticket-body-bottom">
                
                <!-- Seat Details Grid -->
                <div class="row g-3 mb-4">
                    <div class="col-6">
                        <div class="detail-label">Section</div>
                        <div class="detail-value">Floor</div>
                    </div>
                    <div class="col-6">
                        <div class="detail-label">Row</div>
                        <div class="detail-value">A</div>
                    </div>
                    <div class="col-6">
                        <div class="detail-label">Seat</div>
                        <div class="detail-value">12</div>
                    </div>
                    <div class="col-6">
                        <div class="detail-label">Attendee</div>
                        <div class="detail-value">{{ attendeeName }}</div>
                    </div>
                </div>

                <!-- Itinerary -->
                <div class="mb-4">
                    <h6 class="fw-bold mb-3 fs-6">Itinerary:</h6>
                    <ul class="list-unstyled itinerary-list mb-0">
                        <li class="mb-2"><span class="fw-bold text-dark">3:00 PM:</span> VIP Check-in Gate 4</li>
                        <li class="mb-2"><span class="fw-bold text-dark">4:00 PM:</span> Soundcheck Entry</li>
                        <li><span class="fw-bold text-dark">5:00 PM:</span> Photo Session</li>
                    </ul>
                </div>

                <!-- Action Button -->
                <button class="btn btn-apple-wallet w-100 fw-semibold py-2 rounded-3">
                    Add to Apple Wallet
                </button>
                
            </div>
            
        </div>
        
    </main>
</template>

<style scoped>
/* Page Background */
.ticket-page-wrapper {
    background-color: #2b2d3d; /* Dark background from image */
    min-height: 100vh;
}

/* Main Ticket Constraints */
.ticket-container {
    max-width: 420px;
    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}

/* Header */
.ticket-header {
    background-color: #7b4ecb;
    border-radius: 20px 20px 0 0;
    padding: 2.5rem 1.5rem;
}
.vip-badge {
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 0.7rem;
    letter-spacing: 0.5px;
}
.ticket-subtitle {
    font-size: 0.9rem;
}

/* Body Top (QR) */
.ticket-body-top {
    background-color: #ffffff;
    padding: 2.5rem 1.5rem 1.5rem;
}
.qr-placeholder {
    width: 180px;
    height: 180px;
    border: 4px solid #212529;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #6c757d;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

/* Divider & Cutouts trick */
.ticket-divider {
    position: relative;
    background-color: #ffffff;
    height: 40px;
    width: 100%;
}
/* Side cutouts matching the outer dark background */
.ticket-divider::before, 
.ticket-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 32px;
    height: 32px;
    background-color: #2b2d3d; 
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 1;
}
.ticket-divider::before {
    left: -16px;
}
.ticket-divider::after {
    right: -16px;
}
/* The perforated line */
.dashed-line {
    position: absolute;
    top: 50%;
    left: 24px;
    right: 24px;
    border-top: 2px dashed #e2e4e8;
    transform: translateY(-50%);
}

/* Body Bottom (Details) */
.ticket-body-bottom {
    background-color: #ffffff;
    border-radius: 0 0 20px 20px;
    padding: 1rem 2rem 2.5rem;
}
.detail-label {
    font-size: 0.75rem;
    color: #878a99;
    margin-bottom: 0.2rem;
}
.detail-value {
    font-weight: 700;
    font-size: 1.05rem;
    color: #212529;
}
.itinerary-list {
    font-size: 0.9rem;
    color: #6c757d;
}

/* Apple Wallet Button */
.btn-apple-wallet {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    color: #212529;
    transition: all 0.2s;
}
.btn-apple-wallet:hover {
    background-color: #f8f9fa;
    border-color: #adb5bd;
}
</style>