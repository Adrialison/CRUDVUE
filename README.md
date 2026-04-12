# Gestión de Usuarios — CRUD con Vue 3

Aplicación web para gestionar usuarios consumiendo la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

---

## Tecnologías utilizadas

- **Vue 3** — Composition API con `<script setup>`
- **Pinia** — manejo del estado global
- **VeeValidate + Yup** — validación de formularios
- **Axios** — consumo de la API
- **Tailwind CSS** — estilos
- **Lucide Vue** — íconos

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Modal.vue        # Modal reutilizable
│   ├── UserForm.vue     # Formulario de crear/editar
│   └── UserTable.vue    # Tabla de usuarios
├── composable/
│   └── useModal.js      # Lógica de modales
├── services/
│   └── userService.js   # Llamadas a la API
├── store/
│   └── useUserStore.js  # Estado global con Pinia
└── App.vue
```

---

## Funcionalidades

- **Listar** usuarios obtenidos desde la API con indicador de carga
- **Crear** usuario con validación de formulario
- **Editar** usuario con los datos precargados
- **Eliminar** usuario con modal de confirmación
- **Persistencia** en `localStorage` para no perder cambios al recargar
- **Validación de email duplicado** al crear y editar
- **Paginación** de la tabla

---

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## Notas

- Las operaciones de crear, editar y eliminar se realizan solo en el estado local, no se envían a la API.
- Los datos se persisten en `localStorage`, por lo que sobreviven a recargas del navegador.
- La API solo se consulta una vez al inicio; si ya hay datos guardados, no vuelve a llamarla.
