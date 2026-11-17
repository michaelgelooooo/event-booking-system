<script setup>
    import { computed, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()

    // Extract booking details from URL query, fallback to defaults if accessed directly
    const status = computed(() => route.query.status || 'success')
    const name = computed(() => route.query.name || 'Eric')
    const email = computed(() => route.query.email || 'eric@example.com')
    const total = computed(() => route.query.total || '29,500')
    const orderRef = computed(() => route.query.orderRef || 'ORD-99310A')

    const isSuccess = computed(() => status.value === 'success')

    // Navigation handlers passing the order reference forward
    const handleViewReceipt = () => {
        router.push({ 
        path: '/receipt', 
        query: { 
            orderRef: orderRef.value,
            name: name.value,
            email: email.value,
            total: total.value
        } 
    })
    }

    const handleAccessTickets = () => {
        router.push({ 
        path: '/tickets', 
        query: { 
            name: name.value 
        } 
    })
    }

    const handleRetry = () => {
        router.push('/checkout')
    }
</script>

<template>
    <main class="container-fluid p-4 d-flex justify-content-center align-items-center" style="min-height: 80vh;">
        
        <!-- Main Card Container -->
        <div class="confirmation-card p-5 text-center shadow-sm rounded-3 w-100" style="max-width: 700px;">
            
            <!-- SUCCESS STATE -->
            <div v-if="isSuccess">
                <!-- Success Icon -->
                <div class="icon-circle success-bg mx-auto mb-4 d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h1 class="fw-bold mb-3 fs-2">Booking Confirmed!</h1>
                
                <p class="text-secondary mb-1">
                    Thank you, {{ name }}. Your payment of <strong>₱{{ total }}</strong> was successful.
                </p>
                <p class="text-secondary mb-3">
                    We've sent a receipt to <strong>{{ email }}</strong>.
                </p>
                <p class="text-muted small mb-5">
                    Order Reference: #{{ orderRef }}
                </p>

                <!-- Actions -->
                <div class="d-flex justify-content-center gap-3 flex-wrap">
                    <button @click="handleViewReceipt" class="btn btn-outline-secondary px-4 py-2 fw-medium rounded-2">
                        View Receipt
                    </button>
                    <button @click="handleAccessTickets" class="btn btn-dark px-4 py-2 fw-medium rounded-2">
                        Access Electronic Tickets &rarr;
                    </button>
                </div>
            </div>

            <!-- FAILED STATE -->
            <div v-else>
                <!-- Error Icon -->
                <div class="icon-circle error-bg mx-auto mb-4 d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>

                <h1 class="fw-bold mb-3 fs-2">Payment Failed</h1>
                
                <p class="text-secondary mb-3">
                    We're sorry, {{ name }}. Your payment of <strong>₱{{ total }}</strong> could not be processed.
                </p>
                <p class="text-secondary mb-4">
                    No charges were made to your account. Please check your payment details and try again.
                </p>

                <!-- Actions -->
                <div class="d-flex justify-content-center">
                    <button @click="handleRetry" class="btn btn-dark px-5 py-2 fw-medium rounded-2">
                        Try Payment Again
                    </button>
                </div>
            </div>

        </div>
    </main>
</template>

<style scoped>
    .confirmation-card {
    background-color: #fafaff;
    border: 1px solid #eef0f8;
    }

    .icon-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .success-bg {
        background-color: #d1fada;
    }

    .error-bg {
        background-color: #ffe5e5;
    }

    .btn-dark {
        background-color: #212529;
        border: none;
    }
    .btn-dark:hover {
        background-color: #343a40;
    }

    .btn-outline-secondary {
        border-color: #dee2e6;
        color: #495057;
        background-color: #ffffff;
    }
    .btn-outline-secondary:hover {
        background-color: #f8f9fa;
        color: #212529;
    }
</style>