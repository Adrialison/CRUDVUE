import { ref } from "vue";
import { useUserStore } from "../store/useUserStore";

export function useModal() {
  const store = useUserStore();

  const showCreate = ref(false);
  const showEdit = ref(false);
  const showDelete = ref(false);
  const selectedUser = ref(null);
  const errorMsg = ref("");

  function openEdit(user) {
    selectedUser.value = user;
    showEdit.value = true;
  }

  function openDelete(id) {
    selectedUser.value = id;
    showDelete.value = true;
  }

  function handleCreate(formData) {
    try {
      store.addUser(formData);
      showCreate.value = false;
      errorMsg.value = "";
    } catch (e) {
      errorMsg.value = e.message;
    }
  }

  function handleEdit(formData) {
    try {
      store.editUser(formData);
      showEdit.value = false;
      selectedUser.value = null;
      errorMsg.value = "";
    } catch (e) {
      errorMsg.value = e.message;
    }
  }

  function handleDelete() {
    store.deleteUser(selectedUser.value);
    showDelete.value = false;
    selectedUser.value = null;
  }

  return {
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
  };
}
