<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "./store/useUserStore";
import { storeToRefs } from "pinia";
import UserTable from "./components/UserTable.vue";
import Modal from "./components/Modal.vue";
import UserForm from "./components/UserForm.vue";
import { useModal } from "./composable/useModal";
const store = useUserStore();
const { loading, paginatedUsers, currentPage, totalPages } = storeToRefs(store);

const {
  showCreate,
  showEdit,
  showDelete,
  selectedUser,
  errorMsg,
  openEdit,
  openDelete,
  handleCreate,
  handleEdit,
  handleDelete,
} = useModal();

onMounted(() => {
  store.fetchUsers();
});
</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p class="text-sm text-gray-500 mt-1">
            Administra los miembros de tu equipo y su información de cuenta
          </p>
        </div>
        <button
          @click="showCreate = true"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
        >
          <span class="text-lg leading-none">+</span>
          Agregar Usuario
        </button>
      </div>
      <!-- Loading -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16 gap-3"
      >
        <div
          class="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"
        ></div>
        <p class="text-sm text-gray-400">Cargando usuarios...</p>
      </div>
      <!-- Tabla -->
      <UserTable
        v-else
        :users="paginatedUsers"
        @edit="openEdit"
        @delete="openDelete"
      />
      <!-- Paginacion -->
      <div
        class="flex justify-between items-center mt-4 bg-white px-6 py-3 rounded-xl border border-gray-200"
      >
        <p class="text-sm text-gray-500">
          Página
          <span class="font-semibold text-gray-900">{{ currentPage }}</span> de
          <span class="font-semibold text-gray-900">{{ totalPages }}</span>
        </p>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Crear -->
  <Modal
    v-if="showCreate"
    title="Crear nuevo usuario"
    @close="
      showCreate = false;
      errorMsg = '';
    "
  >
    <p v-if="errorMsg" class="text-red-500 text-sm mb-3">{{ errorMsg }}</p>
    <UserForm
      @submit="handleCreate"
      @cancel="
        showCreate = false;
        errorMsg = '';
      "
    />
  </Modal>

  <!-- Modal Editar -->
  <Modal v-if="showEdit" title="Editar Usuario" @close="showEdit = false">
    <p v-if="errorMsg" class="text-red-500 text-sm mb-3">{{ errorMsg }}</p>
    <UserForm
      :user="selectedUser"
      @submit="handleEdit"
      @cancel="showEdit = false"
    />
  </Modal>

  <!-- Modal Eliminar -->
  <Modal v-if="showDelete" title="Eliminar usuario" @close="showDelete = false">
    <p class="text-sm text-gray-600 mb-6">
      ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede
      deshacer.
    </p>
    <div class="flex gap-3">
      <button
        @click="showDelete = false"
        class="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        @click="handleDelete"
        class="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
      >
        Delete
      </button>
    </div>
  </Modal>
</template>
