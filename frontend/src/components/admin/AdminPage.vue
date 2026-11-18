<template>
	<div class="admin-page"><div class="admin-page-inner"><slot /></div></div>
</template>

<style scoped>
.admin-page {
	--admin-ink: #1d2939;
	--admin-muted: #667085;
	min-height: 100vh;
	padding: 2.5rem;
	background: #f6f7f9;
	color: var(--admin-ink);
}
.admin-page-inner { max-width: 1440px; margin: 0 auto; }
.admin-page :deep(h1) { font-size: clamp(1.7rem, 3vw, 2.15rem); letter-spacing: -.04em; }
.admin-page :deep(.admin-eyebrow) { color: #64748b; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.admin-page :deep(.admin-muted) { color: var(--admin-muted); }
.admin-page :deep(.admin-panel) { background: #fff; border: 1px solid #e4e7ec; border-radius: 12px; box-shadow: 0 2px 8px rgba(16, 24, 40, .03); }
.admin-page :deep(.admin-panel-heading) { padding: 1.3rem 1.4rem; border-bottom: 1px solid #eaecf0; }
.admin-page :deep(.admin-stat) { height: 100%; padding: 1.4rem; }
.admin-page :deep(.admin-stat-icon) { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px; background: #eef2f8; color: #344c70; font-size: 1.15rem; }
.admin-page :deep(.admin-stat-value) { font-size: 1.8rem; font-weight: 700; letter-spacing: -.04em; line-height: 1.2; }
.admin-page :deep(.admin-table) { margin-bottom: 0; white-space: nowrap; }
.admin-page :deep(.admin-table > :not(caption) > * > *) { padding: 1rem 1.4rem; border-color: #eaecf0; vertical-align: middle; }
.admin-page :deep(.admin-table thead th) { color: #667085; background: #f9fafb; font-size: .7rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.admin-page :deep(.admin-table tbody td) { font-size: .875rem; }
.admin-page :deep(.admin-badge) { display: inline-block; padding: .3rem .6rem; border-radius: 99px; font-size: .7rem; font-weight: 700; }
.admin-page :deep(.admin-badge.published), .admin-page :deep(.admin-badge.confirmed) { background: #e7f6ed; color: #167347; }
.admin-page :deep(.admin-badge.draft), .admin-page :deep(.admin-badge.pending) { background: #fff5dc; color: #946200; }
.admin-page :deep(.admin-badge.cancelled) { background: #fcebea; color: #b42318; }
.admin-page :deep(.admin-actions) { display: flex; flex-wrap: wrap; gap: .35rem; }
.admin-page :deep(.admin-actions .btn) { font-size: .8rem; }
.admin-page :deep(.admin-empty) { padding: 2.5rem 1rem; text-align: center; color: var(--admin-muted); }
.admin-page :deep(.admin-search) { max-width: 340px; }
@media (max-width: 991.98px) { .admin-page { padding: 5.5rem 1rem 2rem; } }
@media (max-width: 575.98px) {
	.admin-page { padding-right: .75rem; padding-left: .75rem; }
	.admin-page :deep(.admin-panel-heading), .admin-page :deep(.admin-stat) { padding: 1rem; }
	.admin-page :deep(.admin-table > :not(caption) > * > *) { padding: .85rem 1rem; }
}
</style>
