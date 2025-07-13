<template>
  <button
    @click="$emit('toggle')"
    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
    :class="enabled ? 'bg-blue-600' : 'bg-gray-600'"
  >
    <span
      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  enabled: boolean;
}

interface Emits {
  (e: 'toggle'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>