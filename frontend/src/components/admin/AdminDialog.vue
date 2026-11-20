<script setup>
import { onMounted, ref } from "vue";

defineProps({ title: { type: String, required: true } });
const emit = defineEmits(["close"]);
const dialog = ref(null);

onMounted(() => dialog.value.showModal());
</script>

<template>
	<Teleport to="body">
		<dialog ref="dialog" class="admin-dialog" aria-labelledby="admin-dialog-title" @close="emit('close')">
			<div class="admin-dialog-header d-flex align-items-center justify-content-between gap-3">
				<h2 id="admin-dialog-title" class="h5 fw-bold mb-0">{{ title }}</h2>
				<button type="button" class="btn-close" aria-label="Close" @click="emit('close')"></button>
			</div>
			<slot />
		</dialog>
	</Teleport>
</template>

<style scoped>
.admin-dialog { width: min(560px, calc(100% - 2rem)); max-height: calc(100% - 2rem); padding: 0; border: 0; border-radius: 12px; box-shadow: 0 20px 60px rgba(16, 24, 40, .25); }
.admin-dialog::backdrop { background: rgba(16, 24, 40, .55); }
.admin-dialog-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #eaecf0; }
.admin-dialog :deep(.admin-dialog-body) { padding: 1.5rem; }
.admin-dialog :deep(.admin-dialog-footer) { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: .5rem; padding: 1rem 1.5rem; border-top: 1px solid #eaecf0; }
.admin-dialog :deep(.admin-detail-list) { display: grid; grid-template-columns: minmax(100px, 1fr) 2fr; gap: .8rem 1rem; margin: 0; }
.admin-dialog :deep(.admin-detail-list dt) { color: #667085; font-weight: 500; }
.admin-dialog :deep(.admin-detail-list dd) { margin: 0; overflow-wrap: anywhere; }
.admin-dialog :deep(.admin-badge) { display: inline-block; padding: .3rem .6rem; border-radius: 99px; font-size: .7rem; font-weight: 700; }
.admin-dialog :deep(.admin-badge.confirmed) { background: #e7f6ed; color: #167347; }
.admin-dialog :deep(.admin-badge.pending) { background: #fff5dc; color: #946200; }
.admin-dialog :deep(.admin-badge.cancelled) { background: #fcebea; color: #b42318; }
</style>
