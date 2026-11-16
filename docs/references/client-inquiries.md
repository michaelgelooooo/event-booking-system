# Event Booking System — MVP Consultation Answers

## 1. MVP Goal and Scope

**Answer:**

The most important thing customers should be able to do in Version 1 of the application is successfully book and receive a ticket for an event.

The primary goal of the MVP is to provide a functional end-to-end event booking process, allowing customers to select an event, complete their booking, and receive confirmation or an electronic ticket.

## 2. Event Discovery and Details

**Answer:**

The application should have the following features to help customers discover and choose events:

- **Featured Events Section:** A section on the homepage highlighting selected or upcoming events.
- **Events Catalog Page:** A dedicated page where customers can browse the available events.
- **Hero Section with a Call to Action (CTA):** A prominent button or link on the homepage to encourage users to explore events or start booking.
- **Event Details Page:** A page displaying essential information about an event, such as its description, date, time, venue, artists, and available ticket options.

These features will allow customers to discover events easily and make informed decisions before booking.

## 3. Standard Booking Flow

**Answer:**

After selecting an event, customers should be able to complete the following steps:

1. **Select the Event Schedule:** Choose the preferred event date and time, if multiple schedules are available.
2. **Choose the Ticket or Access Type:** Select a ticket category, such as General Admission, Premium, or VIP.
3. **Select Seats:** Choose from the available seats, if applicable to the selected ticket type.
4. **Choose a Payment Method:** Select a payment method and complete the payment process.
5. **Receive Booking Confirmation and Ticket:** Once the booking is successfully completed, the system should generate an electronic ticket containing the relevant booking and event details.

The booking flow should have a clear completion point, with the customer receiving confirmation and a ticket after the booking is successfully processed.

## 4. Accounts and Customer Profile

**Answer:**

Managing personal profile information should be included in the MVP. Customers should be able to view and update their profile details.

Viewing transaction history or previous bookings would be a useful additional feature. However, it should be prioritized after the core booking process and profile management features are implemented, depending on the available development time.

## 5. VIP Guide and Special Packages

**Answer:**

For the side project, the minimum requirement is to provide an informational section where customers can view the available VIP packages and understand their benefits.

Allowing customers to book or purchase VIP packages directly through the application would be an additional feature that could improve the overall experience, provided there is sufficient development time.

## 6. Payments and Tickets

**Answer:**

Ticket issuance should be included in the MVP because receiving a ticket is the expected outcome of a successful event booking.

For payments, the team has two possible approaches:

- **Simulated Payment:** Implement a mock payment process that demonstrates the booking workflow without processing actual transactions.
- **Demo Payment Integration:** Integrate a payment service or test environment intended for development and demonstration purposes, subject to the provider's availability and configuration requirements.

For the MVP, simulated payments may be sufficient to demonstrate the complete booking flow. An actual payment integration can be considered an enhancement if time and resources permit.

## 7. Who Maintains Events and Bookings?

**Answer:**

The application should include a dedicated admin dashboard for managing the system's resources.

The following basic CRUD (Create, Read, Update, and Delete) operations should be included in the MVP:

- **Event Management:** Create, view, update, and delete event information.
- **Ticket Management:** Manage ticket types, ticket information, and availability.
- **Booking Management:** View and manage customer bookings.

Venue Management, Seat Management, and VIP Package Management may be treated as optional features for the MVP. Their information can initially use predefined or hard-coded values where appropriate.

Payment processing may also be simulated or integrated with a test payment service rather than a live payment provider.

## 8. Final MVP Check

Based on the proposed requirements, the following features should form the core scope of the MVP:

- [ ] Customers can discover events and view their details.
- [ ] Customers can select ticket types and seats where applicable.
- [ ] Customers can complete the agreed booking and payment process.
- [ ] Customers receive a booking confirmation and electronic ticket.
- [ ] Customers can view and update their personal profile information.
- [ ] Customers can view VIP packages and their benefits.
- [ ] Admins can perform basic CRUD operations for events, tickets, and bookings.
- [ ] Payment processing can be simulated or performed through a test environment.
- [ ] Venue, seat, and VIP package management can use predefined data or be deferred.
- [ ] Transaction history and other nonessential enhancements can be considered for a later version.

**Note:** These are the group's proposed MVP requirements based on the consultation responses. Any item that has not been explicitly approved by the client should remain marked as _Proposed_ or _Open_ until confirmed.

---

## Summary of Proposed MVP Scope

| Feature                      | Proposed Priority  |
| ---------------------------- | ------------------ |
| Event discovery and details  | MVP                |
| Standard event booking       | MVP                |
| Ticket issuance              | MVP                |
| Customer profile management  | MVP                |
| VIP package information      | MVP                |
| Admin event management       | MVP                |
| Admin ticket management      | MVP                |
| Admin booking management     | MVP                |
| Simulated or test payment    | MVP approach       |
| Transaction history          | Additional         |
| VIP package booking          | Additional         |
| Venue and seat management    | Optional           |
| Advanced payment integration | Future enhancement |
