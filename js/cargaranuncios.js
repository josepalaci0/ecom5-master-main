// Función para cargar los anuncios desde el archivo JSON
document.addEventListener("DOMContentLoaded", function () {
  async function cargarAnuncios() {
    try {
      // Cargar el archivo JSON de anuncios
      const response = await fetch('../json/dataadvertencias.json');
      const data = await response.json();

      // Seleccionar el contenedor de anuncios
      const advertLayout = document.querySelector('.advert-layout');

      // Recorrer los datos recibidos y construir la interfaz
      data.forEach(anuncio => {
        const advertDiv = document.createElement('div');
        advertDiv.classList.add('item');

        const imagen = document.createElement('img');
        imagen.src = anuncio.image_url;
        imagen.alt = anuncio.title;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        if (advertLayout.children.length % 2 === 0) {
          contentDiv.classList.add('left');
        } else {
          contentDiv.classList.add('right');
        }

        const span = document.createElement('span');
        span.textContent = anuncio.title;

        const h3 = document.createElement('h3');
        h3.textContent = anuncio.subtitle;

        const link = document.createElement('a');
        link.href = anuncio.link;
        link.textContent = 'View Collection';

        contentDiv.appendChild(span);
        contentDiv.appendChild(h3);
        contentDiv.appendChild(link);

        advertDiv.appendChild(imagen);
        advertDiv.appendChild(contentDiv);

        advertLayout.appendChild(advertDiv);
      });
    } catch (error) {
      console.error('Error cargando anuncios:', error);
    }
  }
  cargarAnuncios()
})


// Llamar a la función para cargar los anuncios cuando se cargue la página
window.onload = cargarAnuncios;
