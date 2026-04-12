import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { getUsers } from "../services/userService";

export const useUserStore = defineStore("users", () => {
  const savedData = localStorage.getItem("misUsuarios");
  const users = ref(savedData ? JSON.parse(savedData) : []);
  const loading = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = 7;

  const saveToLocalStorage = () => {
    localStorage.setItem("misUsuarios", JSON.stringify(users.value));
  };

  const fetchUsers = async () => {
    if (users.value.length > 0) return;
    loading.value = true;
    try {
      const data = await getUsers();
      users.value = data;
      saveToLocalStorage();
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      loading.value = false;
    }
  };

  const addUser = (formData) => {
    // Validar email
    const emailExists = users.value.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase(),
    );
    if (emailExists) {
      throw new Error("El correo electrónico ya está registrado");
    }
    // Genera id automático
    const lastId =
      users.value.length > 0 ? Math.max(...users.value.map((u) => u.id)) : 0;

    const newUser = {
      id: lastId + 1,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
    };

    users.value.push(newUser);
    saveToLocalStorage();
  };

  const editUser = (formData) => {
    // Verificar que el email no lo use OTRO usuario
    const emailExists = users.value.some(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.id !== formData.id, // ← este "y" es clave
    );
    if (emailExists) {
      throw new Error("Ese correo electrónico ya está registrado");
    }
    const index = users.value.findIndex((u) => u.id === formData.id);
    if (index !== -1) {
      users.value[index] = { ...formData }; // actualiza en el array
      saveToLocalStorage();
    }
  };

  const deleteUser = (id) => {
    users.value = users.value.filter((u) => u.id !== id);
    saveToLocalStorage();
  };

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users.value.slice(start, end);
  });
  const totalPages = computed(() =>
    Math.ceil(users.value.length / itemsPerPage),
  );
  return {
    users,
    loading,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
    paginatedUsers,
    currentPage,
    totalPages,
  };
});
