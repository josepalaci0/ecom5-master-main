// Función para cargar las promociones desde el archivo JSON
document.addEventListener("DOMContentLoaded", function () {
  async function fetchPromotions() {
    try {
      const response = await fetch('../json/datacolecciones.json');
      const data = await response.json();

      // Seleccionar el contenedor de las promociones
      const promotionsContainer = document.getElementById('promotions-container');

      // Limpiar el contenedor
      promotionsContainer.innerHTML = '';

      // Recorrer los datos recibidos y construir la interfaz
      data.forEach(promotion => {
        const promotionItem = document.createElement('div');
        promotionItem.classList.add('promotion-item');

        const image = document.createElement('img');
        image.src = promotion.image_url;
        image.alt = promotion.title;

        const promotionContent = document.createElement('div');
        promotionContent.classList.add('promotion-content');

        const title = document.createElement('h3');
        title.textContent = promotion.title;

        const link = document.createElement('a');
        link.href = promotion.link;
        link.textContent = 'SHOP NOW';

        // Agregar elementos al contenedor de promoción
        promotionContent.appendChild(title);
        promotionContent.appendChild(link);

        promotionItem.appendChild(image);
        promotionItem.appendChild(promotionContent);

        promotionsContainer.appendChild(promotionItem);
      });
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  }
  fetchPromotions()
})


// Llamar a la función para cargar las promociones cuando se cargue la página
window.onload = fetchPromotions;
