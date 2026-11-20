# Typography Guide — Event Booking System

This document outlines the design standards, font choices, text hierarchy, and responsive typography rules for the Event Booking System.

---

## 1. Font Families

* **Heading & Accent Font:** `Poppins` (Fallback: `Montserrat`, `sans-serif`)
  * **Usage:** Used for major titles, concert headers, featured artists, hero banners, and VIP package titles.
* **Body & UI Font:** `Inter` (Fallback: `Roboto`, `system-ui`, `sans-serif`)
  * **Usage:** Used for event descriptions, form inputs, booking buttons, calendar dates, navigation, and admin data tables.

---

## 2. Text Hierarchy & Reusable Styles

| Style / Level | Usage / Location | Desktop Size | Mobile Size | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero / Page Title)** | Homepage hero, event landing title | `32px` (`2rem`) | `24px` (`1.5rem`) | Bold (`700`) | `1.2` |
| **H2 (Section Header)** | Concert detail title, *"VIP Packages"* section | `24px` (`1.5rem`) | `20px` (`1.25rem`) | Semi-Bold (`600`) | `1.3` |
| **H3 (Sub-heading / Card)** | Event card titles, modal popups, profile headers | `18px` (`1.125rem`) | `16px` (`1rem`) | Medium (`500`) | `1.4` |
| **Body Regular** | Main descriptions, venue notes, profile info | `16px` (`1rem`) | `14px` (`0.875rem`) | Regular (`400`) | `1.5` |
| **Body Small / Meta** | Event date & time, venue location, form labels | `14px` (`0.875rem`) | `12px` (`0.75rem`) | Regular (`400`) | `1.4` |
| **Button Text** | *"Book Ticket"*, *"Select Package"*, *"Save Profile"* | `16px` (`1rem`) | `14px` (`0.875rem`) | Semi-Bold (`600`) | `1.0` |
| **Badge / Status Tag** | *"VIP Exclusive"*, *"Sold Out"*, *"Selling Fast"* | `12px` (`0.75rem`) | `11px` (`0.6875rem`) | Medium (`500`) | `1.2` |

---

## 3. Responsive Behavior & Scaling Rules

* **Fluid Breakpoints:** Headings dynamically scale down on screens narrower than `768px` to prevent awkward word wraps on mobile devices.
* **Line Length Limit:** Main paragraph containers are capped at `65ch` (65 characters per line) to maintain high readability on large desktop displays.
* **Touch Targets:** Clickable text links and button labels maintain adequate padding (`12px` minimum) on mobile viewports for easy touch interactions.

---

## 4. UI Implementation Context

### Customer Screens
* **Homepage & Event Discovery:** Uses prominent **H1** and **H2** titles with higher contrast to highlight featured artists and upcoming concerts.
* **VIP Guide & Packages:** Uses distinct **Badge/Tag** styling (bold accent colors) alongside **H2** section headers to separate standard booking from premium packages.
* **Customer Profile:** Employs **Body Regular** and **Body Small** for personal information, booking history details, and digital ticket references.

### Admin Screens
* **Event & Ticket Management:** Primarily relies on **Body Small (`14px`)** and **Medium (`500`)** font weights within data tables to display maximum event details clearly without UI clutter.
* **Forms & Controls:** Labels utilize **Body Small (Medium weight)** to easily distinguish field titles from user input text.

---

## 5. Readability & Accessibility (WCAG AA Compliance)

* **Color Contrast:**
  * **Primary Text:** Dark Charcoal (`#1F2937`) on White background (Contrast ratio > 7:1).
  * **Secondary / Muted Text:** Slate Gray (`#64748B`) on Light background (Contrast ratio > 4.5:1).
* **Legibility:** Font weights under `400` (Light/Thin) are avoided to ensure visual clarity across all screen resolutions.