export function usuariosEnSelect(usuarios, selectElement) {
  usuarios.forEach(usuario => {
    const option = document.createElement('option');
    option.value = usuario.id;          
    option.textContent = usuario.name;    
    selectElement.appendChild(option);
  });
}