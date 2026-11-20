<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Extract data from URL query with fallbacks
const orderRef = computed(() => route.query.orderRef || 'ORD-99310A')
const name = computed(() => route.query.name || 'Eric Pena')
const email = computed(() => route.query.email || 'eric@example.com')
const total = computed(() => route.query.total || '29,500')

// Generate a formatted current date for the receipt
const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})

const handlePrint = () => {
    window.print()
}

const goBack = () => {
    router.push('/')
}
</script>

<template>
    <main class="container-fluid py-5 bg-light min-vh-100 d-flex flex-column align-items-center">
        
        <!-- Action Buttons (Hidden when printing) -->
        <div class="no-print w-100 d-flex justify-content-between mb-4" style="max-width: 600px;">
            <button @click="goBack" class="btn btn-link text-dark text-decoration-none px-0">
                &larr; Back to Home
            </button>
            <button @click="handlePrint" class="btn btn-outline-dark rounded-2 py-1 px-3">
                <i class="bi bi-printer me-2"></i>Print Receipt
            </button>
        </div>

        <!-- Receipt Card -->
        <div class="receipt-card bg-white p-4 p-md-5 w-100 shadow-sm" style="max-width: 600px;">
            
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
                <div>
                    <h2 class="fw-bold mb-0">RECEIPT</h2>
                    <p class="text-muted mb-0 mt-1">Moira: Tour 2026</p>
                </div>
                <div class="text-end">
                    <h5 class="fw-bold mb-1">G4Tickets PH</h5>
                    <p class="text-muted small mb-0">MOA Arena, Pasay City<br>Metro Manila, Philippines</p>
                </div>
            </div>

            <!-- Meta Information -->
            <div class="row mb-5 g-4">
                <div class="col-sm-6">
                    <p class="text-muted small fw-bold text-uppercase mb-1">Billed To</p>
                    <h6 class="fw-bold mb-1">{{ name }}</h6>
                    <p class="text-muted small mb-0">{{ email }}</p>
                </div>
                <div class="col-sm-6 text-sm-end">
                    <p class="text-muted small fw-bold text-uppercase mb-1">Order Details</p>
                    <p class="mb-1"><span class="text-muted me-2">Ref:</span> <span class="fw-bold">#{{ orderRef }}</span></p>
                    <p class="mb-0"><span class="text-muted me-2">Date:</span> <span>{{ currentDate }}</span></p>
                </div>
            </div>

            <!-- Itemized Table -->
            <div class="table-responsive mb-4">
                <table class="table mb-0">
                    <thead class="text-muted small text-uppercase bg-light">
                        <tr>
                            <th scope="col" class="py-2 px-3 border-0 rounded-start">Description</th>
                            <th scope="col" class="py-2 px-3 border-0 text-center">Qty</th>
                            <th scope="col" class="py-2 px-3 border-0 text-end rounded-end">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-3 px-3 border-bottom">
                                <span class="fw-bold d-block">Royal VIP Pass</span>
                                <span class="text-muted small">Lower Box A</span>
                            </td>
                            <td class="py-3 px-3 border-bottom text-center align-middle">2</td>
                            <td class="py-3 px-3 border-bottom text-end align-middle">₱29,000</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-3 border-bottom">
                                <span class="fw-bold d-block">Service Fee</span>
                                <span class="text-muted small">Processing and handling</span>
                            </td>
                            <td class="py-3 px-3 border-bottom text-center align-middle">1</td>
                            <td class="py-3 px-3 border-bottom text-end align-middle">₱500</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Totals -->
            <div class="row justify-content-end">
                <div class="col-sm-6 col-md-5">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Subtotal</span>
                        <span>₱29,500</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span class="text-muted">Tax (12% VAT inc.)</span>
                        <span>₱0</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-uppercase">Total Paid</span>
                        <span class="fw-bold fs-5">₱{{ total }}</span>
                    </div>
                </div>
            </div>

            <!-- Footer Message -->
            <div class="text-center mt-5 pt-4 border-top">
                <p class="text-muted small mb-0">Thank you for your purchase!</p>
                <p class="text-muted small mb-0">If you have any questions, please contact support@g4.ph</p>
            </div>

        </div>
    </main>
</template>

<style scoped>
.receipt-card {
    border-top: 6px solid #212529;
    border-radius: 0.5rem;
}

/* Print specific styles */
@media print {
    .bg-light {
        background-color: #ffffff !important;
    }
    .no-print {
        display: none !important;
    }
    .receipt-card {
        box-shadow: none !important;
        border: none !important;
        border-top: 4px solid #000 !important;
        padding: 0 !important;
        max-width: 100% !important;
    }
}
</style>