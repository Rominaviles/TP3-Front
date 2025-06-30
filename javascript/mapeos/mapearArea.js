export function areasEnSelect(areas, selectElement) {
  areas.forEach(area => {
    const option = document.createElement('option');
    option.value = area.id;
    option.textContent = area.name;
    selectElement.appendChild(option);
  });
}