# 💻 TP3 - Frontend | Sistema de Aprobación de Proyectos

Este repositorio contiene el **frontend del sistema de gestión y aprobación de proyectos**, desarrollado como parte del Trabajo Práctico 3. Este frontend se conecta con el backend del [TP2 - REST API](https://github.com/Rominaviles/TP2-RestApi), donde se define toda la lógica de negocio, flujos de aprobación y persistencia.

---

## 🔗 Proyecto relacionado

👉 **Backend del sistema**: [TP2-RestApi](https://github.com/Rominaviles/TP2-RestApi)

---

## 🧠 ¿Qué hace este frontend?

- Permite **iniciar sesión** como usuario (simulado desde localStorage).
- Visualiza una **tabla de proyectos** con filtros por estado, solicitante y aprobador.
- Muestra el **detalle completo del proyecto** en un modal.
- Visualiza el **workflow** de pasos de aprobación y sus responsables.
- Permite a usuarios **aprobar, rechazar u observar** un paso (si tienen el rol correspondiente).
- Soporta la **edición de proyectos existentes** a través de un modal interactivo.

---

## 🧩 Tecnologías utilizadas

- **HTML + CSS personalizado**
- **JavaScript ES6 Modular** (`import/export`)
- **Fetch API** para consumir endpoints del backend
- **LocalStorage** para simular sesiones
- **Diseño responsive y adaptado al dark mode**

---

## 📸 Capturas de pantalla

### 🔐 Login
![Login](https://github.com/Rominaviles/TP3-Front/blob/main/Screenshots/Login.png)

### 📋 Dashboard principal
![Dashboard](https://github.com/Rominaviles/TP3-Front/blob/main/Screenshots/Dashboard.png)

### ➕ Crear proyecto
![Crear Proyecto](https://github.com/Rominaviles/TP3-Front/blob/main/Screenshots/CrearProyecto.png)

### 🖊️ Editar proyecto
![Edición](https://github.com/Rominaviles/TP3-Front/blob/main/Screenshots/Edision.png)

### ✅ Tomar decisión de aprobación
![Decisión](https://github.com/Rominaviles/TP3-Front/blob/main/Screenshots/Decision.png)



