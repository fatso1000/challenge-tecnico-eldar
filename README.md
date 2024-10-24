
# CHALLENGE TÉCNICO ELDAR

## Requisitos de instalación y ejecución de la aplicación

Para instalar y ejecutar esta aplicación, puedes utilizar uno de los siguientes comandos según tu gestor de paquetes:

- **npm**:  
  ```bash
  npm install && npm run dev
  ```
- **pnpm**:  
  ```bash
  pnpm install && pnpm dev
  ```
- **yarn**:  
  ```bash
  yarn && yarn dev
  ```

## DESCRIPCIÓN DE LA APLICACIÓN

La aplicación consta de una página de inicio de sesión. Debes iniciar sesión utilizando los datos proporcionados por la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

- **Campo de Email**: Usa el correo electrónico del usuario **(email)**.
- **Contraseña**: La contraseña es el nombre de usuario **(username)**.

### Reglas de acceso:

- Si el **ID** del usuario es impar, entonces el usuario es **admin**.
- Si el **ID** es par, entonces el usuario no es **admin**.

### Pantalla del **Administrador**:
- Si inicias sesión como **admin**, verás un panel de control que muestra todos los posts de [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).
- Como **admin**, puedes **modificar**, **eliminar** y **agregar** posts a la lista. Estas acciones se realizan mediante solicitudes a la API, pero **la API no guarda los cambios**. Verás los datos modificados en tiempo real, pero se restablecerán al actualizar la página.

### Pantalla de un **Usuario no Admin**:
- Si inicias sesión como **usuario no admin**, verás la misma pantalla, pero **sin las acciones de agregar, editar o eliminar** posts.

---

## DETALLES TÉCNICOS

La aplicación almacena los datos del usuario utilizando **Zustand** y los persiste en **localStorage**.

- Existen tres **stores** en la aplicación: uno para **diálogos**, otro para **usuarios** y otro para **alertas**.
- La aplicación utiliza un **middleware** para verificar si el usuario está autenticado y para determinar a qué rol (admin o usuario) pertenece. Esta funcionalidad se maneja dentro del **store de usuarios**.