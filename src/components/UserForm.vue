<script setup>
import { watch } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  user: { type: Object, default: null },
});

const emit = defineEmits(["submit", "cancel"]);

//ESQUEMA DE VALIDACION
const schema = yup.object({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "Mínimo 3 caracteres"),
  username: yup
    .string()
    .required("El usuario es requerido")
    .min(3, "Mínimo 3 caracteres")
    .matches(/^\S+$/, "No puede contener espacios"),
  email: yup
    .string()
    .required("El correo es requerido")
    .email("Correo inválido"),
  phone: yup
    .string()
    .required("El teléfono es requerido")
    .min(6, "Teléfono muy corto"),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
});

// desestructuramos value y errorMessage de cada campo
const { value: name, errorMessage: nameError } = useField("name");
const { value: username, errorMessage: usernameError } = useField("username");
const { value: email, errorMessage: emailError } = useField("email");
const { value: phone, errorMessage: phoneError } = useField("phone");

watch(
  () => props.user,
  (val) => {
    val ? setValues({ ...val }) : resetForm();
  },
  { immediate: true },
);

const onSubmit = handleSubmit((values) => {
  emit("submit", { ...values });
});
</script>

<template>
  <div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
      <input
        v-model="name"
        type="text"
        placeholder="Ingresa tu nombre completo"
        :class="[
          'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors',
          nameError
            ? 'border-red-400 focus:ring-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500',
        ]"
      />
      <p v-if="nameError" class="text-red-500 text-xs mt-1">
        {{ nameError }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Usuario</label
      >
      <input
        v-model="username"
        type="text"
        placeholder="Ingresa tu usuario"
        :class="[
          'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors',
          usernameError
            ? 'border-red-400 focus:ring-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500',
        ]"
      />
      <p v-if="usernameError" class="text-red-500 text-xs mt-1">
        {{ usernameError }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Correo electrónico</label
      >
      <input
        v-model="email"
        type="email"
        placeholder="Ingresa tu correo electrónico"
        :class="[
          'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors',
          emailError
            ? 'border-red-400 focus:ring-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500',
        ]"
      />
      <p v-if="emailError" class="text-red-500 text-xs mt-1">
        {{ emailError }}
      </p>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Teléfono</label
      >
      <input
        v-model="phone"
        type="text"
        placeholder="Ingresa tu número de teléfono"
        :class="[
          'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors',
          phoneError
            ? 'border-red-400 focus:ring-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500',
        ]"
      />
      <p v-if="phoneError" class="text-red-500 text-xs mt-1">
        {{ phoneError }}
      </p>
    </div>

    <div class="flex gap-3">
      <button
        @click="emit('cancel')"
        class="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Cancelar
      </button>
      <button
        @click="onSubmit"
        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
      >
        {{ user ? "Guardar cambios" : "Crear usuario" }}
      </button>
    </div>
  </div>
</template>
