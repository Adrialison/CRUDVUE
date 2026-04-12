<script setup>
import { X } from "lucide-vue-next";

defineProps({
  title: { type: String, required: true },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    @click.self="emit('close')"
  >
    <div class="bg-white rounded-xl w-full max-w-md mx-4 p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        >
          <X :size="20" />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
