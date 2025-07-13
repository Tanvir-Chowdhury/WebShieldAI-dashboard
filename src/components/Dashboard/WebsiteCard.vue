<template>
  <div class="card card-hover p-6 animate-fade-in">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="status-indicator" :class="statusClass"></div>
        <div>
          <h3 class="text-lg font-semibold text-white">{{ website.name }}</h3>
          <p class="text-sm text-gray-400">{{ website.url }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('refresh', website.id)"
          class="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          title="Refresh data"
        >
          <ArrowPathIcon class="w-4 h-4" />
        </button>
        <button
          @click="$emit('details', website)"
          class="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          title="View details"
        >
          <EyeIcon class="w-4 h-4" />
        </button>
        <button
          @click="$emit('remove', website.id)"
          class="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Remove website"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-slate-700 rounded-lg p-3">
        <p class="text-xs text-gray-400">Total Requests</p>
        <p class="text-lg font-semibold text-white">{{ formatNumber(website.metrics.totalRequests) }}</p>
      </div>
      <div class="bg-slate-700 rounded-lg p-3">
        <p class="text-xs text-gray-400">Blocked Attacks</p>
        <p class="text-lg font-semibold text-red-400">{{ website.metrics.blockedAttacks }}</p>
      </div>
      <div class="bg-slate-700 rounded-lg p-3">
        <p class="text-xs text-gray-400">Uptime</p>
        <p class="text-lg font-semibold text-green-400">{{ website.metrics.uptime }}%</p>
      </div>
      <div class="bg-slate-700 rounded-lg p-3">
        <p class="text-xs text-gray-400">Response Time</p>
        <p class="text-lg font-semibold text-blue-400">{{ website.metrics.responseTime }}ms</p>
      </div>
    </div>

    <div class="space-y-3">
      <h4 class="text-sm font-medium text-gray-300">Security Protections</h4>
      
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-300">SQL Injection Protection</span>
        <ToggleSwitch
          :enabled="website.protections.sqlInjection"
          @toggle="$emit('toggle-protection', website.id, 'sqlInjection')"
        />
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-300">XSS Protection</span>
        <ToggleSwitch
          :enabled="website.protections.xssProtection"
          @toggle="$emit('toggle-protection', website.id, 'xssProtection')"
        />
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-300">Defacement Protection</span>
        <ToggleSwitch
          :enabled="website.protections.defacementProtection"
          @toggle="$emit('toggle-protection', website.id, 'defacementProtection')"
        />
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-slate-700">
      <p class="text-xs text-gray-400">
        Last checked: {{ formatDate(website.lastChecked) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowPathIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/outline';
import type { Website } from '../../types/dashboard';
import ToggleSwitch from '../UI/ToggleSwitch.vue';

interface Props {
  website: Website;
}

interface Emits {
  (e: 'toggle-protection', websiteId: string, protection: keyof Website['protections']): void;
  (e: 'remove', websiteId: string): void;
  (e: 'details', website: Website): void;
  (e: 'refresh', websiteId: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const statusClass = computed(() => {
  switch (props.website.status) {
    case 'safe':
      return 'status-safe';
    case 'warning':
      return 'status-warning';
    case 'danger':
      return 'status-danger';
    default:
      return 'status-safe';
  }
});

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
</script>