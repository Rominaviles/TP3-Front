export function estadosEnSelect(estados, selectElement) {
  estados.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado.id;  
    option.textContent = estado.name;
    selectElement.appendChild(option);
  });
}