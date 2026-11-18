import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import CustomerProfilePage from "../pages/CustomerProfilePage.vue";
import MyTicketsPage from "../pages/MyTicketsPage.vue";
import TransactionHistoryPage from "../pages/TransactionHistoryPage.vue";
import AccountSettingsPage from "../pages/AccountSettingsPage.vue";


const routes = [
    {
        path: "/",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterPage
    },
    {
        path: "/profile",
        name: "CustomerProfile",
        component: CustomerProfilePage
    },
    {
        path: "/tickets",
        name: "MyTickets",
        component: MyTicketsPage
    },
    {
    path: "/transactions",
    name: "TransactionHistory",
    component: TransactionHistoryPage
    },
    {
    path: "/settings",
    name: "AccountSettings",
    component: AccountSettingsPage
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
