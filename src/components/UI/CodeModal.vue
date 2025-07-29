<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-[#1f2937] rounded-xl shadow-2xl p-8 w-[600px] relative">
      <!-- Cross button in upper-right -->
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
        @click="emitClose"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4 text-center text-white">
        Enable SQL Injection Protection
      </h2>
      <p class="text-sm text-gray-400 mb-3 text-center">
        Copy the code below and add it to the header of your website:
      </p>

      <!-- Code Box with Copy button -->
      <div class="relative bg-gray-800 border border-gray-600 rounded mb-6">
        <div class="absolute top-2 right-2 flex gap-2">
          <button
            @click="copyCode"
            class="text-xs px-2 py-1 border border-gray-500 rounded text-gray-300 hover:bg-gray-700"
          >
            {{ copied ? "Copied!" : "Copy" }}
          </button>
        </div>
        <textarea
          readonly
          class="w-full p-4 rounded bg-transparent text-gray-200 text-sm resize-none"
          rows="6"
        >{{ code }}</textarea>
      </div>

      <!-- Check and OK Buttons -->
      <div class="flex justify-center gap-4">
        <button
          v-if="!checkComplete"
          @click="checkCDNCode"
          class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Check
        </button>
        <button
          v-if="checkComplete"
          @click="emitConfirm"
          class="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
        >
          OK
        </button>
        <button
          v-if="!checkComplete"
          @click="emitCancel"
          class="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Props for random code
const props = defineProps<{ code: string }>();
const emit = defineEmits(["confirm", "cancel", "close", "edit"]);

// State for check button functionality
const copied = ref(false);
const checkComplete = ref(false);  // Track whether the CDN code is added

function copyCode() {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
}

function emitConfirm() {
  emit("confirm");
}

function emitCancel() {
  emit("cancel");
}

function emitClose() {
  emit("close");
}

// Check if the CDN code has been added to the website
function checkCDNCode() {
  // Simulate checking process (Replace this with actual check)
  const isCDNAdded = confirm("Has the CDN code been added to the website?");
  
  if (isCDNAdded) {
    checkComplete.value = true;  // Allow user to click "OK"
  }
}
</script>