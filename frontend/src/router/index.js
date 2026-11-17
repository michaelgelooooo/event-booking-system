
import { createRouter, createWebHistory } from "vue-router";

// Layouts
import CustomerLayout from "../layouts/CustomerLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

// Customer Pages
import HomePage from "../pages/customer/HomePage.vue";
import EventCatalogPage from "../pages/customer/EventCatalogPage.vue";
import EventDetailsPage from "../pages/customer/EventDetailsPage.vue";
import CustomerProfilePage from "../pages/customer/CustomerProfilePage.vue";
import LoginPage from "../pages/customer/LoginPage.vue";
import RegisterPage from "../pages/customer/RegisterPage.vue";
import CheckoutPage from "../pages/customer/CheckoutPage.vue";
import BookingConfirmationPage from "../pages/customer/BookingConfirmationPage.vue";
import TicketView from "../pages/customer/TicketView.vue";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.vue";
import AdminEventsPage from "../pages/admin/AdminEventsPage.vue";
import AdminTicketsPage from "../pages/admin/AdminTicketsPage.vue";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage.vue";

const routes = [
    {
        path: "/",
        component: CustomerLayout,
        children: [
            {
                path: "",
                name: "Home",
                component: HomePage
            },
            {
                path: "events",
                name: "EventCatalog",
                component: EventCatalogPage
            },
            {
                path: "events/:eventId",
                name: "EventDetails",
                component: EventDetailsPage
            },
            {
                path: "profile",
                name: "CustomerProfile",
                component: CustomerProfilePage
            },
            {
                path: "login",
                name: "Login",
                component: LoginPage
            },
            {
                path: "register",
                name: "Register",
                component: RegisterPage
            },
            {
                path: "checkout",
                name: "Checkout",
                component: CheckoutPage
            },
            {
                path: "booking-confirmation",
                name: "BookingConfirmation",
                component: BookingConfirmationPage
            },
            {
                path:"tickets",
                name: "TicketView",
                component: TicketView
            }
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "",
                name: "AdminDashboard",
                component: AdminDashboardPage
            },
            {
                path: "events",
                name: "AdminEvents",
                component: AdminEventsPage
            },
            {
                path: "tickets",
                name: "AdminTickets",
                component: AdminTicketsPage
            },
            {
                path: "bookings",
                name: "AdminBookings",
                component: AdminBookingsPage
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
