# Event Booking System — Requirements Reference

**Document status:** Working draft for Phase 1  
**Version:** 0.2  
**Purpose:** Shared reference for the Technical Specifications Document (TSD), Entity Relationship Diagram (ERD), wireframes, and typography guide.

> **How to read this document**
>
> - **Confirmed** means stated in the project brief or the client's answers.
> - **Proposed** means a practical suggestion for keeping the MVP simple; it still needs team agreement.
> - **Open** means the available information does not establish a decision.
>
> This document consolidates what is currently known. It does not silently treat assumptions as client requirements.

---

## 1. Project overview

### 1.1 Project purpose

**Confirmed:** The project is an Event Booking System focused on concerts and special events. Customers should be able to discover events, book event tickets, and receive an electronic ticket.

### 1.2 Main MVP goal

**Confirmed:** The most important outcome for version 1 is that a customer can successfully place an order for an event ticket.

The MVP should prioritize a complete, understandable booking journey over a large number of secondary features.

### 1.3 Intended users

- **Customers — Confirmed:** Browse events, select ticket options, complete a booking, receive an electronic ticket, and manage their profile information.
- **Administrators — Confirmed:** Use a dedicated admin dashboard to manage events, tickets, and bookings.

### 1.4 Product direction

**Confirmed:** The home page should feature events and include a call-to-action (CTA). An event catalog should let customers browse events. The system should include a VIP package viewing area.

**Open:** The project brief does not establish the final visual brand, exact event categories, or whether the system will support real-world events or use demonstration data only.

## 2. Scope and priorities

### 2.1 Required for the MVP

| ID     | Area              | Requirement                                                                                  | Basis                                                            |
| ------ | ----------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| MVP-01 | Home              | Display featured events.                                                                     | Client-confirmed                                                 |
| MVP-02 | Home              | Include a clear CTA in the hero section.                                                     | Client-confirmed                                                 |
| MVP-03 | Event discovery   | Provide an event catalog customers can browse.                                               | Client-confirmed                                                 |
| MVP-04 | Event information | Let customers review an event before booking.                                                | Needed for the described booking journey; details to design      |
| MVP-05 | Booking           | Allow customers to choose an event date and time.                                            | Client-confirmed                                                 |
| MVP-06 | Booking           | Allow customers to choose an access/ticket type, such as General Admission, Premium, or VIP. | Client-confirmed                                                 |
| MVP-07 | Booking           | Allow customers to select an available seat number where applicable.                         | Client-described flow; how it applies to all event types is open |
| MVP-08 | Payment           | Include a payment step; simulated payment is acceptable.                                     | Client-confirmed                                                 |
| MVP-09 | Ticket            | Generate an electronic ticket after a successful booking.                                    | Client-confirmed                                                 |
| MVP-10 | Customer profile  | Allow customers to manage profile information.                                               | Client-confirmed                                                 |
| MVP-11 | Admin             | Provide a dedicated admin dashboard.                                                         | Client-confirmed                                                 |
| MVP-12 | Admin             | Provide basic CRUD operations for event management.                                          | Client-confirmed                                                 |
| MVP-13 | Admin             | Provide basic CRUD operations for ticket management.                                         | Client-confirmed                                                 |
| MVP-14 | Admin             | Provide basic CRUD operations for booking management.                                        | Client-confirmed                                                 |
| MVP-15 | VIP               | Allow customers to view VIP packages.                                                        | Client-confirmed                                                 |

### 2.2 Optional or stretch features

These are not necessary to prove the core MVP works. Add them only if the team has enough time and they do not put the booking flow at risk.

- View booking or transaction history in the customer profile.
- Book or request a VIP package directly in the system.
- Build dedicated venue management.
- Build advanced seat-map and seat-management tools.
- Build dedicated VIP package management.
- Integrate a real payment provider. The client allows a simulated payment; an external demo payment service is another possible option but may require configuration.

### 2.3 Suggested simplifications

These are **proposals**, not additional client requirements:

- Use a small set of sample events and predefined event dates, ticket types, venues, and seat data.
- Keep the seat-selection interface simple. Avoid an interactive venue map unless the team has time and the client expects it.
- Simulate payment success and, if practical, failure without charging real money.
- Generate a basic electronic ticket containing enough information to identify the booking and event.
- Keep the admin dashboard focused on the required event, ticket, and booking CRUD tasks.

### 2.4 Out-of-scope unless later agreed

- Real payment processing and financial settlement.
- Complex venue layouts or interactive seat maps.
- Advanced VIP application, approval, or scheduling workflows.
- Advanced analytics, marketing automation, or elaborate reporting.
- Email/SMS delivery or other integrations not established in the current requirements.

## 3. Main customer journey

The client's suggested flow provides the starting point for the primary use case:

1. Customer visits the home page or event catalog.
2. Customer browses events and opens an event's details.
3. Customer selects a date and time.
4. Customer selects a ticket/access type (for example, General Admission, Premium, or VIP).
5. Customer selects an available seat number if the event/ticket type uses assigned seating.
6. Customer reviews the booking details and proceeds to the payment step.
7. Customer completes a simulated payment.
8. The system records the successful booking and generates an electronic ticket.
9. Customer sees a confirmation and can access the resulting ticket.

**Confirmed:** The sequence includes event/date/time selection, access or seat type, seat selection, payment, and electronic ticket generation.

**Proposed:** Include a review/confirmation step before simulated payment, and provide a ticket confirmation screen after successful booking.

**Open:** Whether users must register/log in before booking, how the ticket is downloaded or revisited, and whether every event requires a numbered seat.

## 4. Functional requirements by area

This section is a working inventory for the TSD. The wording can be refined when the full TSD is written.

### 4.1 Home page and event discovery

- **FR-01 (Confirmed):** The system shall display featured events on the home page.
- **FR-02 (Confirmed):** The home page shall include a hero-section CTA.
- **FR-03 (Confirmed):** The system shall provide an event catalog for browsing events.
- **FR-04 (Proposed):** Each event listing should show concise information such as event title, image, date, venue, and starting ticket price where available.
- **FR-05 (Proposed):** Selecting an event should open its detail view.
- **Open:** Whether search, filtering, sorting, or event categories are required. Do not treat them as mandatory without team/client agreement.

### 4.2 Event details and ticket selection

- **FR-06 (Proposed):** The event detail view should show the information needed to decide whether to book, such as description, date/time options, venue, and available ticket types.
- **FR-07 (Confirmed):** The customer shall be able to choose an event date and time.
- **FR-08 (Confirmed):** The customer shall be able to choose an access/ticket type.
- **FR-09 (Client-described; applicability open):** The customer shall be able to choose an available seat number when assigned seating is used.
- **Open:** Whether General Admission tickets have no assigned seat and how ticket quantities are represented.

### 4.3 Booking and payment

- **FR-10 (Confirmed):** The system shall support a booking process that leads to an event ticket order.
- **FR-11 (Confirmed):** The booking flow shall include a payment step.
- **FR-12 (Confirmed):** The MVP may use simulated payment instead of a live payment API.
- **FR-13 (Proposed):** Before payment, the system should display the selected event, date/time, ticket type, seat if applicable, quantity if supported, and total amount for review.
- **FR-14 (Proposed):** A booking shall not be treated as successfully paid if the simulated payment fails.
- **FR-15 (Proposed):** The system should avoid confirming the same assigned seat for two successful bookings.
- **Open:** Whether customers can book more than one ticket per order, whether booking cancellation/refunds are in scope, and the exact payment simulation behavior.

### 4.4 Electronic ticket

- **FR-16 (Confirmed):** The system shall generate an electronic ticket after a successful booking/payment flow.
- **FR-17 (Proposed):** The ticket should display relevant booking and event details, such as a ticket/booking reference, event name, date/time, ticket type, and seat if applicable.
- **FR-18 (Proposed):** The customer should receive a confirmation view from which the ticket can be viewed or downloaded.
- **Open:** Whether the ticket needs a QR code/barcode, a PDF download, or only an on-screen ticket. Do not assume QR validation is required.

### 4.5 Customer profile

- **FR-19 (Confirmed):** Customers shall be able to manage their profile information.
- **Optional:** Customers may be able to view booking/transaction history if time permits.
- **Open:** Required profile fields, whether registration/login is mandatory, password recovery, and whether profile editing includes email or password changes.

### 4.6 VIP packages

- **FR-20 (Confirmed):** Customers shall be able to view available VIP package information.
- **Optional:** Customers may be able to book or request a VIP package directly in the app.
- **Open:** The package details to display and whether packages are linked to particular events or ticket types.

### 4.7 Admin dashboard

- **FR-21 (Confirmed):** The system shall provide a dedicated admin dashboard.
- **FR-22 (Confirmed):** Administrators shall be able to perform basic CRUD operations for events.
- **FR-23 (Confirmed):** Administrators shall be able to perform basic CRUD operations for tickets.
- **FR-24 (Confirmed):** Administrators shall be able to perform basic CRUD operations for bookings.
- **Optional:** Dedicated CRUD for venues, seats, and VIP packages.
- **Open:** The exact fields for each record, whether administrators can cancel bookings or mark tickets as used, and whether multiple admin roles are needed.

## 5. User interface and wireframe planning

The brief requires wireframes in Figma for both mobile and desktop, with at least five pages. The list below is a practical proposed starting point, not a confirmed final sitemap.

### 5.1 Proposed customer pages

1. **Home page:** Hero section with CTA, featured events, and navigation to the catalog.
2. **Event catalog:** Browse event cards/listings.
3. **Event details and selection:** Event information, date/time, ticket type, and seat selection where applicable. This can be one page or a short sequence if clearer.
4. **Booking review/payment:** Selected booking details, total, and simulated payment action.
5. **Booking confirmation/ticket:** Successful booking confirmation and electronic ticket.
6. **Customer profile:** View/edit personal information.
7. **VIP packages:** Browse VIP package details; can be a dedicated page or a section if the design remains clear.

### 5.2 Proposed admin pages

8. **Admin dashboard:** A simple overview and navigation to management areas.
9. **Event management:** Event list plus create/edit form.
10. **Ticket management:** Ticket list plus create/edit form.
11. **Booking management:** Booking list and basic detail/status view.

The minimum five-page requirement refers to pages in the design deliverable; confirm with the project brief/instructor whether each page must have separate mobile and desktop frames and whether admin pages count toward the five.

### 5.3 Wireframe behavior to show

- Clear path from event discovery to booking.
- Visible primary CTA and consistent navigation.
- Clear selected date/time and ticket type.
- Seat availability and selected-seat state if assigned seating is included.
- Booking review and simulated payment state.
- Confirmation and electronic ticket state.
- Basic admin navigation and CRUD entry points.
- Useful empty, unavailable, validation, and payment-failure states where they affect the core flow.

## 6. Typography guide planning

**Confirmed from the project brief:** A typography guide is required, using Figma and Stitch as specified by the brief.

The final typography choices are not established yet. The guide should document:

- Font family/families and why they suit an event-booking interface.
- Type hierarchy: display/hero, page heading, section heading, card title, body, label, caption, and button text.
- Font sizes, weights, line heights, and letter spacing where useful.
- Text styles for desktop and mobile, including any responsive differences.
- Examples of typography applied to the home page, event cards, event details, booking form, ticket confirmation, and admin tables/forms.
- Rules for consistent use, readability, and text contrast.

**Proposed simplification:** Use one primary type family with a small, consistent set of styles unless the design clearly benefits from a second family.

**Open:** Final font choice, visual direction, and exact type scale should be decided during design, not treated as existing client requirements.

## 7. ERD planning: data concepts to investigate

The ERD should represent the information needed to support the confirmed features and booking flow. The following are candidate concepts, not a finalized schema.

| Candidate entity           | Why it may be needed                                                                        | Status/notes                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| User/Customer              | Store profile information and associate a booking with a customer if accounts are required. | Profile management confirmed; account/login requirement open.                                      |
| Admin/User role            | Identify users permitted to access admin functions.                                         | Admin dashboard confirmed; role model open.                                                        |
| Event                      | Store event information displayed in the catalog and event detail view.                     | Required by event discovery and admin event CRUD.                                                  |
| Event session/schedule     | Represent the date/time options for an event.                                               | Date/time selection confirmed; separate entity versus fields is an ERD design decision.            |
| Ticket type/access type    | Represent General Admission, Premium, VIP, price, and availability as applicable.           | Ticket selection and admin ticket CRUD confirmed.                                                  |
| Seat                       | Represent numbered seats if assigned seating is used.                                       | Seat selection described by client; exact scope is open. Could be simplified with predefined data. |
| Booking                    | Record a customer's selected event/session and order.                                       | Core MVP goal; admin booking CRUD confirmed.                                                       |
| Booking item/ticket record | Represent one or more tickets associated with a booking, if needed.                         | Electronic ticket issuance confirmed; whether one booking can contain multiple tickets is open.    |
| Payment record/status      | Record the outcome of simulated payment.                                                    | Payment step confirmed; implementation can be minimal.                                             |
| VIP package                | Store or display VIP package information.                                                   | Viewing packages confirmed; hard-coded/static data is acceptable as a simplification.              |
| Venue                      | Store event location information.                                                           | Venue management optional; venue information may be predefined.                                    |

The ERD should not automatically include every candidate as a separate table/collection. Decide based on the simplest design that supports the requirements. In particular, clarify how event dates, ticket types, assigned seats, bookings, and generated tickets relate to one another before finalizing the ERD.

## 8. TSD outline and supporting requirements

The provided `SAMPLE.md` is a TSD template for an e-commerce application. Its document organization can be reused, but its e-commerce features and technical choices must not be copied as requirements for this project.

A suitable TSD structure for this project could include:

1. Title page and revision history.
2. Introduction: purpose, scope, definitions, and references.
3. Overall description: product perspective, user classes, key functions, assumptions, and dependencies.
4. Visual mockup references: link to Figma frames.
5. Features: customer discovery, booking/payment/ticket, profile, VIP viewing, and admin management.
6. Functional requirements: numbered requirements based on Section 4.
7. Non-functional requirements: usability, responsive layout, access control, data integrity, and maintainability.
8. Data requirements: summarize the concepts from the approved ERD.
9. External interface requirements: customer/admin pages and any agreed integrations.
10. Glossary and appendices.

Non-functional requirements should be written as realistic, testable expectations once the team agrees on them. Do not copy arbitrary figures such as a two-second load time or 99.9% uptime from the sample template without justification.

## 9. Cross-deliverable consistency checklist

Use this checklist to ensure the four deliverables describe the same MVP.

- [ ] TSD requirements cover every confirmed MVP feature.
- [ ] ERD supports event discovery, date/time and ticket selection, booking, simulated payment outcome, and ticket generation.
- [ ] ERD includes customer profile data and the records needed for admin CRUD.
- [ ] Wireframes show the core customer flow from browsing through ticket confirmation.
- [ ] Wireframes include the required admin management areas.
- [ ] At least five pages are designed in Figma, with mobile and desktop versions as required by the brief.
- [ ] Typography guide defines reusable styles and demonstrates them on actual project screens.
- [ ] Optional features are clearly labeled and do not block the core booking flow.
- [ ] Unresolved decisions are marked as open rather than silently assumed.

## 10. Open questions and decisions

These questions do not prevent the team from drafting the deliverables. Record a reasonable proposed answer and revisit only if it changes scope or affects the design/data model.

1. Must customers register and log in before booking, or is guest booking allowed?
2. Do all events use assigned numbered seats, or can some use General Admission without a seat number?
3. Can a booking contain multiple tickets, or is one ticket per booking enough for the MVP?
4. How should customers access their ticket: on-screen, downloadable file, or both?
5. Should the payment simulation demonstrate only success, or both success and failure?
6. What minimum profile fields should customers manage?
7. What ticket fields and status changes must administrators manage?
8. What booking status changes should administrators be allowed to make?
9. What event fields are essential for the catalog and booking flow?
10. Does the five-page minimum mean five unique page types total, or five pages each with mobile and desktop frames? Do admin pages count?
11. What visual style and brand direction should the typography guide support?

## 11. Phase 1 deliverables and task overview

### TSD

- Define purpose, scope, users, and assumptions.
- Document the confirmed features and prioritized requirements.
- Record the main booking use case and relevant alternative/error states.
- Define realistic non-functional requirements.
- Reference the ERD and Figma designs.
- Review that proposed/open items are labeled correctly.

### ERD

- Identify entities and required attributes from the agreed requirements.
- Define primary keys, foreign keys/references, and relationships/cardinalities.
- Decide how events, schedules, ticket types, seats, bookings, payment outcomes, and tickets connect.
- Check that the model supports admin CRUD and customer profile requirements.
- Keep optional features out of the core model unless they are needed.
- Validate the ERD against the customer booking flow.

### Wireframes

- Confirm the page list and mobile/desktop coverage.
- Wireframe home, catalog, event details/selection, booking/payment, ticket confirmation, profile, VIP, and admin management as scope permits.
- Show navigation, CTA placement, forms, validation feedback, and booking states.
- Use consistent components and realistic sample event content.
- Check that the full booking flow is understandable without a walkthrough.

### Typography

- Select and document the font family/families.
- Define the text hierarchy and reusable text styles.
- Specify sizes, weights, line heights, and responsive behavior.
- Apply the styles to sample customer and admin screens.
- Check readability and consistency across desktop and mobile.

---

## 12. Source and status notes

- **Project brief (`Side Project.pdf`):** Describes an event-booking concept, event discovery and featured content, customer profile, VIP/special-access ideas, and Phase 1 deliverables including TSD, Trello, ERD, Figma wireframes for mobile and desktop, at least five pages, and a typography guide using Figma and Stitch. The PDF text was not machine-readable in the current file read, so exact wording should be checked against the original brief if needed.
- **Client answers provided in chat:** Establish the primary goal and the MVP priorities summarized above.
- **`SAMPLE.md`:** TSD structure example for an unrelated e-commerce project. Reuse only the useful document structure, not its product/cart/shipping requirements or arbitrary technical targets.
- **Current status:** Working reference, not a finalized TSD, ERD, or design specification.
