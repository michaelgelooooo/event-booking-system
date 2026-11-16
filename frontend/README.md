# Event Booking System
## Frontend Development Guide — Phase 2

## 1. Project Overview

The Event Booking System is a web application for discovering concerts and special events, selecting tickets, and completing bookings.

The goal of this phase is to build the frontend prototype based on the approved project requirements and wireframes.

**Current development scope:**
- Customer-facing pages for event browsing and booking.
- Ticket selection and simulated checkout.
- Booking confirmation and electronic ticket display.
- Customer profile management.
- Admin dashboard for managing events, tickets, and bookings.

**For this phase:** Use sample data and local state. Backend integration, real authentication, and actual payment processing are not required.

## 2. Project Setup

### Technologies
- Vue 3
- Vite
- Vue Router
- Bootstrap
- Bootswatch
- Bootstrap Icons

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 3. Folder Structure

Place your files in their corresponding folders.

```text
src/
├── assets/
│   └── style.css
├── components/
│   ├── admin/
│   └── customer/
├── layouts/
│   ├── AdminLayout.vue
│   └── CustomerLayout.vue
├── pages/
│   ├── admin/
│   └── customer/
├── router/
│   └── index.js
├── App.vue
└── main.js
```

You may create additional components inside the appropriate folders when needed.

### Available Routes

| Page | Route Name | URL |
|---|---|---|
| Home | `Home` | `/` |
| Event Catalog | `EventCatalog` | `/events` |
| Event Details | `EventDetails` | `/events/:eventId` |
| Login | `Login` | `/login` |
| Register | `Register` | `/register` |
| Checkout | `Checkout` | `/checkout` |
| Booking Confirmation | `BookingConfirmation` | `/booking-confirmation` |
| Customer Profile | `CustomerProfile` | `/profile` |
| Admin Dashboard | `AdminDashboard` | `/admin` |
| Admin Events | `AdminEvents` | `/admin/events` |
| Admin Tickets | `AdminTickets` | `/admin/tickets` |
| Admin Bookings | `AdminBookings` | `/admin/bookings` |

Use the existing route names when navigating between pages.

## 4. Member Assignments

### Michael — Project Setup & Integration
- Set up the Vue project and dependencies.
- Configure Vue Router and the folder structure.
- Create customer and admin layouts.
- Create shared Navbar, Footer, and Admin Sidebar.
- Integrate and review everyone's work.

### AJ — Customer Pages
- `HomePage.vue`
- `EventCatalogPage.vue`
- `EventDetailsPage.vue`

Responsible for the homepage, event listings, event details, schedules, ticket types, and VIP package presentation.

### Eric — Checkout
- `CheckoutPage.vue`
- `BookingConfirmationPage.vue`

Responsible for the booking summary, order total, simulated payment process, and booking confirmation with electronic ticket display.

### Lei — Customer Account & Confirmation
- `LoginPage.vue`
- `RegisterPage.vue`
- `CustomerProfilePage.vue`

Responsible for the login and registration interfaces, and customer profile management.

### Lo — Admin Pages
- `AdminDashboardPage.vue`
- `AdminEventsPage.vue`
- `AdminTicketsPage.vue`
- `AdminBookingsPage.vue`

Responsible for the admin dashboard and basic management interfaces for events, tickets, and bookings.

## 5. Development Guidelines

To keep the project consistent:

1. Use Vue 3 Composition API with `<script setup>`.
2. Use Bootstrap and Bootstrap Icons for styling.
3. Follow the existing folder structure and route names.
4. Use sample data for the frontend prototype.
5. Make pages responsive for desktop and mobile.
6. Coordinate with members handling related pages before changing shared data or navigation.
7. Avoid implementing features outside the agreed MVP scope.

**Important:** You are free to create additional components when necessary. The listed page assignments define what you are responsible for, not how you must structure every component.

---

**References**
- [Project README](../README.md)
- [Technical Specifications Document](../docs/TSD.md)
- [Figma Design](https://www.figma.com/design/8ie5MIdWwpy8YGVTMR8vkr/Untitled?node-id=0-1&t=M0hTFNo9l9c5H8tF-1)
- [Trello Task Board](https://trello.com/b/igLenvXn/batch-645-group-4)

