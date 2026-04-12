<script setup>
import { Pencil, Trash2 } from "lucide-vue-next";

defineProps({
  users: { type: Array, default: () => [] },
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div
    class="w-full rounded-xl border border-gray-200 bg-white overflow-hidden"
  >
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-gray-50 border-b border-gray-200">
          <th
            class="text-left text-xs font-medium text-gray-500 tracking-wide uppercase px-6 py-3 w-[22%]"
          >
            Nombre
          </th>
          <th
            class="text-left text-xs font-medium text-gray-500 tracking-wide uppercase px-6 py-3 w-[18%]"
          >
            Username
          </th>
          <th
            class="text-left text-xs font-medium text-gray-500 tracking-wide uppercase px-6 py-3 w-[30%]"
          >
            Email
          </th>
          <th
            class="text-left text-xs font-medium text-gray-500 tracking-wide uppercase px-6 py-3 w-[20%]"
          >
            Telefono
          </th>
          <th
            class="text-right text-xs font-medium text-gray-500 tracking-wide uppercase px-6 py-3 w-[10%]"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="user in users"
          :key="user.id"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <td class="px-6 py-4 font-semibold text-gray-900">{{ user.name }}</td>
          <td class="px-6 py-4 text-gray-500">{{ user.username }}</td>
          <td class="px-6 py-4 text-gray-700">{{ user.email }}</td>
          <td class="px-6 py-4 text-gray-700">{{ user.phone }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center justify-end gap-3">
              <button
                @click="emit('edit', user)"
                class="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded"
              >
                <Pencil :size="16" />
              </button>
              <button
                @click="emit('delete', user.id)"
                class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="text-center py-8 text-gray-400">
            No hay usuarios registrados.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
