# Event Booking System — Technical Data Specifications & ERD

## 1. Overview & Data Architecture

This document defines the relational data structure and database requirements for the **Event Booking System (MVP Phase 1)**. It translates the business and functional requirements outlined in the project baseline into a normalized, production-ready relational schema design.

### Key Architectural Decisions:

1. **Explicit Session & Schedule Modeling**: Events are decoupled from specific dates and times using an `EVENT_SESSIONS` entity to allow an event to run across multiple dates/times.

2. **Access & Tier Mapping**: `TICKET_TYPES` defines price tiers (e.g., General Admission, Premium, VIP) per session, maintaining clear pricing boundaries.

3. **Assigned Seating Support**: The schema accounts for both assigned seating (using `SEATS` and `seat_id`) and general admission (where `seat_id` is null).

4. **Order and Ticket Granularity**: A `BOOKINGS` record stores overall transaction totals, while individual `TICKETS` are generated per seat/access type to issue distinct electronic tickets with unique barcodes/tokens.

5. **Simulated Payment Tracking**: Payments are tracked as discrete `PAYMENTS` records attached to bookings, supporting success/failure status auditability.

---

## 2. Entity-Relationship Diagram

![Entity-Relationship Diagram](ERD%20Diagram.png)

---

## 3. Detailed Data Dictionary & Specifications

### 3.1 `ROLES`
Defines authorization levels for system users (e.g., `Customer`, `Administrator`).

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique role identifier. | 
| `role_name` | `VARCHAR(30)` | `NOT NULL`, `UNIQUE` | Role name (e.g., 'ADMIN', 'CUSTOMER'). | 

### 3.2 `USERS`
Stores account profiles for both customers and administrators.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique user identifier. | 
| `role_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (ROLES.id)` | Role association. | 
| `full_name` | `VARCHAR(100)` | `NOT NULL` | Customer or Admin full name. | 
| `email` | `VARCHAR(150)` | `NOT NULL`, `UNIQUE` | User email address for authentication. | 
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Securely hashed password string. | 
| `phone_number` | `VARCHAR(20)` | `NULLABLE` | Contact phone number. | 
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Account creation date. | 
| `updated_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP ON UPDATE` | Last modification date. | 

### 3.3 `VENUES`
Physical or virtual locations hosting events.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique venue identifier. | 
| `name` | `VARCHAR(150)` | `NOT NULL` | Name of the venue or stadium. | 
| `address` | `VARCHAR(255)` | `NOT NULL` | Street address. | 
| `city` | `VARCHAR(100)` | `NOT NULL` | City location. | 
| `capacity` | `INT` | `NOT NULL`, `CHECK (capacity > 0)` | Maximum guest capacity. | 

### 3.4 `EVENTS`
Core event listings managed by administrators.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique event identifier. | 
| `venue_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (VENUES.id)` | Venue location reference. | 
| `title` | `VARCHAR(150)` | `NOT NULL` | Title of the event/concert. | 
| `description` | `TEXT` | `NULLABLE` | Detailed description of the event. | 
| `category` | `VARCHAR(50)` | `NOT NULL` | Event category (e.g., Concert, VIP Special). | 
| `is_featured` | `BOOLEAN` | `DEFAULT FALSE` | Flag for displaying on Homepage hero section. | 
| `image_url` | `VARCHAR(255)` | `NULLABLE` | Cover banner/poster asset URL. | 
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Timestamp when event record was added. | 

### 3.5 `EVENT_SESSIONS`
Specific date and time slots scheduled for an event.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique session slot identifier. | 
| `event_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (EVENTS.id)` | Event reference. | 
| `start_time` | `TIMESTAMP` | `NOT NULL` | Date and time the session begins. | 
| `end_time` | `TIMESTAMP` | `NOT NULL` | Date and time the session ends. | 
| `status` | `VARCHAR(20)` | `DEFAULT 'SCHEDULED'` | Status: `SCHEDULED`, `COMPLETED`, `CANCELLED`. | 

### 3.6 `VIP_PACKAGES`
Special access packages and perks (e.g., Backstage Pass, Meet & Greet).

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique VIP package identifier. | 
| `package_name` | `VARCHAR(100)` | `NOT NULL` | Name (e.g., 'Gold VIP Meet & Greet'). | 
| `description` | `TEXT` | `NOT NULL` | Perks and details included in the package. | 
| `price_markup` | `DECIMAL(10,2)` | `DEFAULT 0.00` | Optional additional cost associated with package. | 

### 3.7 `TICKET_TYPES`
Pricing and capacity availability per event session.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique ticket type identifier. | 
| `session_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (EVENT_SESSIONS.id)` | Event session reference. | 
| `vip_package_id` | `BIGINT` | `NULLABLE`, `FOREIGN KEY (VIP_PACKAGES.id)` | Optional linked VIP package. | 
| `name` | `VARCHAR(50)` | `NOT NULL` | Tier name (e.g., General Admission, VIP). | 
| `price` | `DECIMAL(10,2)` | `NOT NULL`, `CHECK (price >= 0)` | Cost per ticket. | 
| `total_quantity` | `INT` | `NOT NULL` | Total inventory allocated for tier. | 
| `available_quantity` | `INT` | `NOT NULL` | Inventory remaining available to book. | 

### 3.8 `SEATS`
Numbered seat locations assigned within a venue.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique seat identifier. | 
| `venue_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (VENUES.id)` | Venue location reference. | 
| `section` | `VARCHAR(30)` | `NOT NULL` | Section label (e.g., 'Balcony A', 'Floor'). | 
| `row_label` | `VARCHAR(10)` | `NOT NULL` | Row designation (e.g., 'Row 12'). | 
| `seat_number` | `VARCHAR(10)` | `NOT NULL` | Seat number (e.g., '14B'). | 

### 3.9 `BOOKINGS`
Main booking order header placed by a customer.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique order identifier. | 
| `user_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (USERS.id)` | Customer placing the booking. | 
| `session_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (EVENT_SESSIONS.id)` | Scheduled event performance. | 
| `booking_reference` | `VARCHAR(20)` | `NOT NULL`, `UNIQUE` | Human-readable order code (e.g., `BK-893201`). | 
| `total_amount` | `DECIMAL(10,2)` | `NOT NULL` | Sum total for all tickets in order. | 
| `booking_status` | `VARCHAR(20)` | `DEFAULT 'PENDING'` | Status: `PENDING`, `CONFIRMED`, `CANCELLED`. | 
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Order timestamp. | 

### 3.10 `TICKETS`
Individual electronic tickets generated for an order.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique electronic ticket ID. | 
| `booking_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (BOOKINGS.id)` | Parent booking order. | 
| `ticket_type_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (TICKET_TYPES.id)` | Access tier classification. | 
| `seat_id` | `BIGINT` | `NULLABLE`, `FOREIGN KEY (SEATS.id)` | Assigned venue seat (null for General Admission). | 
| `ticket_code` | `VARCHAR(64)` | `NOT NULL`, `UNIQUE` | Unique hash or barcode token for verification. | 
| `status` | `VARCHAR(20)` | `DEFAULT 'VALID'` | Status: `VALID`, `USED`, `VOID`. | 
| `issued_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Generation timestamp. | 

### 3.11 `PAYMENTS`
Records real or simulated transaction outcomes.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique payment record ID. | 
| `booking_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (BOOKINGS.id)` | Target order being paid. | 
| `payment_reference` | `VARCHAR(50)` | `NOT NULL`, `UNIQUE` | Gateway reference (e.g., `PAY-SIM-1092`). | 
| `amount` | `DECIMAL(10,2)` | `NOT NULL` | Transaction amount processed. | 
| `payment_method` | `VARCHAR(30)` | `DEFAULT 'SIMULATED'` | Method: `SIMULATED_CARD`, `CREDIT_CARD`. | 
| `payment_status` | `VARCHAR(20)` | `NOT NULL` | Status: `SUCCESS`, `FAILED`, `REFUNDED`. | 
| `processed_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Transaction execution timestamp. | 

### 3.12 `REVIEWS`
Optional customer ratings and reviews for past events.

| Column Name | Data Type | Constraints | Description | 
| ----- | ----- | ----- | ----- | 
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique review ID. | 
| `user_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (USERS.id)` | Authoring user. | 
| `event_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY (EVENTS.id)` | Reviewed event. | 
| `rating` | `INT` | `NOT NULL`, `CHECK (rating BETWEEN 1 AND 5)` | Star rating (1-5). | 
| `comment` | `TEXT` | `NULLABLE` | Review commentary text. | 
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Review posting date. | 

---

## 4. Entity Relationships & Cardinality Summary

| Parent Entity | Child Entity | Cardinality | Business Rule / Description | 
| ----- | ----- | ----- | ----- | 
| `ROLES` | `USERS` | **1 to Many (1:N)** | A role can be assigned to multiple users; each user has exactly one role. | 
| `VENUES` | `EVENTS` | **1 to Many (1:N)** | A venue can host multiple events over time. | 
| `VENUES` | `SEATS` | **1 to Many (1:N)** | A venue contains multiple numbered seats. | 
| `EVENTS` | `EVENT_SESSIONS` | **1 to Many (1:N)** | An event can have one or multiple session dates/times. | 
| `EVENTS` | `REVIEWS` | **1 to Many (1:N)** | An event receives zero or multiple customer reviews. | 
| `USERS` | `BOOKINGS` | **1 to Many (1:N)** | A user can place multiple event bookings. | 
| `EVENT_SESSIONS` | `TICKET_TYPES` | **1 to Many (1:N)** | A session offers multiple ticket tiers (GA, VIP, etc.). | 
| `VIP_PACKAGES` | `TICKET_TYPES` | **1 to Many (0:N)** | A VIP package can be linked to zero or many ticket tiers. | 
| `BOOKINGS` | `TICKETS` | **1 to Many (1:N)** | An order/booking yields one or multiple individual ticket tokens. | 
| `BOOKINGS` | `PAYMENTS` | **1 to Many (1:N)** | An order has payment transaction attempts (1 successful or failed logs). | 
| `SEATS` | `TICKETS` | **1 to Many (0:N)** | A seat can be assigned across different non-overlapping event session tickets. | 
