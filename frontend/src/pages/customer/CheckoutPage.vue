<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

    // Form state
    const firstName = ref('Eric')
    const lastName = ref('Pena')
    const email = ref('eric@invalid')
    const cardNumber = ref('4123 1111 2222')
    const expiryDate = ref('13/26')
    const cvv = ref('...')
    const selectedPayment = ref('Credit Card')

    // UI States
    const isLoading = ref(false)
    const isSuccess = ref(false)

    const router = useRouter()

    // Error state (start empty)
    const errors = ref({
        general: '',
        email: '',
        cardNumber: '',
        expiryDate: ''
    })

    // Validation function
    const validateForm = () => {
        let isValid = true
        
        // Reset errors
        errors.value = { general: '', email: '', cardNumber: '', expiryDate: '' }

        // Check email
        if (!email.value.includes('@') || !email.value.includes('.')) {
            errors.value.email = 'Please enter a valid email address.'
            isValid = false
        }

        // Check card number (strip spaces and check length)
        const cleanCard = cardNumber.value.replace(/\s/g, '')
        if (cleanCard.length < 16) {
            errors.value.cardNumber = 'Card number is incomplete.'
            isValid = false
        }

        // Check expiry date (Simple MM/YY regex check)
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expiryRegex.test(expiryDate.value)) {
            errors.value.expiryDate = 'Invalid month.'
            isValid = false
        }

        return isValid
    }

    // Mock Submission Handler
    const handlePayment = async () => {
        isSuccess.value = false
        
        // 1. Run validation
        if (!validateForm()) {
            return // Stop if front-end validation fails
        }

        // 2. Simulate API Call
        isLoading.value = true
        
        // Fake a 1.5-second network request
        await new Promise(resolve => setTimeout(resolve, 1500))

        const isDeclined = cardNumber.value.endsWith('2222')

        router.push({
        path: '/booking-confirmation', 
        query: {
            status: isDeclined ? 'failed' : 'success',
            name: firstName.value,
            email: email.value,
            total: '29,500',
            orderRef: `ORD-${Math.floor(Math.random() * 90000) + 10000}A` // Generate fake ref
        }
    })

        isLoading.value = false
    }
</script>

<template>
    <main class="container-fluid p-4">
        <div class="row">
            <div class="col-12">
                <h1 class="fw-bold mb-3">Checkout</h1>

                <!-- Page Content -->
                 <!-- Success Alert -->
                    <div v-if="isSuccess" class="alert alert-success d-flex align-items-center mb-4 py-2 px-3 rounded-2" role="alert">
                        <i class="bi bi-check-circle-fill me-2 fs-6"></i>
                        <div>Payment successful! Redirecting to your tickets...</div>
                    </div>

                    <!-- Error Alert -->
                    <div v-if="errors.general" class="alert alert-error d-flex align-items-center mb-4 py-2 px-3 rounded-2" role="alert">
                        <i class="bi bi-exclamation-circle me-2 fs-6"></i>
                        <div>{{ errors.general }}</div>
                    </div>

                    <div class="row gx-5">
                        
                        <!-- Left Column: Form Details -->
                        <div class="col-lg-7">
                            <h5 class="fw-bold mb-4">Attendee Information</h5>
                            
                            <div class="row g-3 mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">First Name</label>
                                    <input type="text" class="form-control" v-model="firstName" :disabled="isLoading || isSuccess">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Last Name</label>
                                    <input type="text" class="form-control" v-model="lastName" :disabled="isLoading || isSuccess">
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label" :class="{ 'text-danger': errors.email }">Email Address</label>
                                <input type="email" class="form-control" :class="{ 'is-invalid-custom': errors.email }" v-model="email" :disabled="isLoading || isSuccess">
                                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
                            </div>

                            <hr class="my-4 text-black-50">

                            <h5 class="fw-bold mb-3">Payment Method</h5>
                            
                            <div class="d-flex gap-2 mb-4">
                                <button type="button" class="btn payment-toggle" :class="{ active: selectedPayment === 'Credit Card' }" @click="selectedPayment = 'Credit Card'" :disabled="isLoading || isSuccess">Credit Card</button>
                                <button type="button" class="btn payment-toggle" :class="{ active: selectedPayment === 'GCash' }" @click="selectedPayment = 'GCash'" :disabled="isLoading || isSuccess">GCash</button>
                                <button type="button" class="btn payment-toggle" :class="{ active: selectedPayment === 'Maya' }" @click="selectedPayment = 'Maya'" :disabled="isLoading || isSuccess">Maya</button>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" :class="{ 'text-danger': errors.cardNumber }">Card Number</label>
                                <input type="text" class="form-control" :class="{ 'is-invalid-custom': errors.cardNumber }" v-model="cardNumber" placeholder="0000 0000 0000 0000" :disabled="isLoading || isSuccess">
                                <div v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</div>
                            </div>

                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label class="form-label" :class="{ 'text-danger': errors.expiryDate }">Expiry Date</label>
                                    <input type="text" class="form-control" :class="{ 'is-invalid-custom': errors.expiryDate }" v-model="expiryDate" placeholder="MM/YY" :disabled="isLoading || isSuccess">
                                    <div v-if="errors.expiryDate" class="error-message">{{ errors.expiryDate }}</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">CVV</label>
                                    <input type="password" class="form-control" v-model="cvv" placeholder="•••" :disabled="isLoading || isSuccess">
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Order Summary -->
                        <div class="col-lg-5">
                            <div class="order-summary p-4">
                                <h5 class="fw-bold mb-4">Order Summary</h5>
                                
                                <div class="d-flex justify-content-between align-items-start mb-1">
                                    <span class="text-dark fs-6">2x Royal VIP Pass</span>
                                    <span class="fw-bold">₱29,000</span>
                                </div>
                                <div class="d-flex justify-content-between mb-3 summary-subtext">
                                    <span>Moira: Where It All Started</span>
                                    <span>Lower Box A</span>
                                </div>

                                <div class="d-flex justify-content-between mb-4">
                                    <span class="text-dark fs-6">Service Fee</span>
                                    <span class="fw-bold">₱500</span>
                                </div>

                                <hr class="text-black-50 mb-3">

                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <span class="fw-bold text-dark fs-6">Total</span>
                                    <span class="fw-bold fs-4">₱29,500</span>
                                </div>

                                <!-- Dynamic Submit Button -->
                                <button 
                                    @click="handlePayment" 
                                    class="btn btn-submit w-100 rounded-2 d-flex justify-content-center align-items-center gap-2"
                                    :disabled="isLoading || isSuccess">
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span>{{ isLoading ? 'Processing...' : (isSuccess ? 'Paid' : 'Pay Now') }}</span>
                                </button>
                            </div>
                        </div>

                    </div>

            </div>
        </div>
    </main>
</template>

<style scoped>
.alert-error {
    background-color: #fff5f5;
    border: 1px solid #ffdbdb;
    color: #d93025;
    font-size: 0.9rem;
}

.form-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.4rem;
}

/* Dynamic error classes conditionally bound in template */
.form-control.is-invalid-custom {
    border-color: #dc3545;
    background-color: #fff8f8;
    color: #212529;
}
.form-control.is-invalid-custom:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.error-message {
    color: #dc3545;
    font-size: 0.75rem;
    margin-top: 0.3rem;
}

.payment-toggle {
    padding: 0.4rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    color: #495057;
    border-radius: 0.375rem;
    transition: all 0.2s;
}
.payment-toggle.active {
    border-color: #212529;
    color: #212529;
}

.order-summary {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 0.5rem;
}

.summary-subtext {
    font-size: 0.8rem;
    color: #6c757d;
}

.btn-submit {
    background-color: #212529;
    color: #ffffff;
    font-weight: 500;
    padding: 0.75rem;
    border: none;
}
.btn-submit:hover {
    background-color: #343a40;
    color: #ffffff;
}

</style>