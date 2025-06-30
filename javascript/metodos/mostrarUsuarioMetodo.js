document.addEventListener("DOMContentLoaded", function () {
  const nombre = localStorage.getItem("userName") || "Usuario";
  document.getElementById("bienvenidoUsuario").innerText = `¡Bienvenido, ${nombre}!`;
});
