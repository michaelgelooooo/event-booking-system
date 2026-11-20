import { ref } from "vue";

export const events = ref([
		{ id: "EVT-2041", name: "Midnight Sessions", date: "2027-02-14", time: "20:00", venue: "Araneta Coliseum", status: "Published" },
		{ id: "EVT-2042", name: "The Summer Sound", date: "2027-03-20", time: "19:00", venue: "MOA Arena", status: "Published" },
		{ id: "EVT-2043", name: "City Lights Festival", date: "2027-04-10", time: "18:30", venue: "Circuit Makati", status: "Draft" },
]);
export const tickets = ref([
		{ id: "TKT-101", eventId: "EVT-2041", type: "General Admission", price: 2500, quantity: 500 },
		{ id: "TKT-102", eventId: "EVT-2041", type: "VIP", price: 6500, quantity: 100 },
		{ id: "TKT-103", eventId: "EVT-2042", type: "Premium", price: 4000, quantity: 200 },
		{ id: "TKT-104", eventId: "EVT-2043", type: "General Admission", price: 1800, quantity: 300 },
]);
export const bookings = ref([
		{ id: "BK-1001", customer: "Alex Santos", email: "alex@example.com", eventId: "EVT-2041", ticketId: "TKT-102", quantity: 2, total: 13000, date: "2026-11-12", status: "Confirmed" },
		{ id: "BK-1002", customer: "Jamie Cruz", email: "jamie@example.com", eventId: "EVT-2042", ticketId: "TKT-103", quantity: 2, total: 8000, date: "2026-11-10", status: "Confirmed" },
		{ id: "BK-1003", customer: "Morgan Reyes", email: "morgan@example.com", eventId: "EVT-2041", ticketId: "TKT-101", quantity: 1, total: 2500, date: "2026-11-08", status: "Pending" },
		{ id: "BK-1004", customer: "Taylor Garcia", email: "taylor@example.com", eventId: "EVT-2042", ticketId: "TKT-103", quantity: 1, total: 4000, date: "2026-11-05", status: "Cancelled" },
]);

export function nextId(records, prefix) {
	const max = records.reduce((value, record) => Math.max(value, Number(record.id.slice(prefix.length)) || 0), 0);
	return `${prefix}${max + 1}`;
}

export function eventName(id) {
	return events.value.find((event) => event.id === id)?.name ?? "Unknown event";
}

export function ticketName(id) {
	return tickets.value.find((ticket) => ticket.id === id)?.type ?? "Unknown ticket";
}

export function formatDate(date) {
	if (!date) return "—";
	return new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function formatMoney(amount) {
	return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 2 }).format(amount);
}
