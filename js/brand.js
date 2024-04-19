// Función para cargar las marcas desde el archivo JSON
document.addEventListener("DOMContentLoaded", function () {
  async function cargarMarcas() {
    try {
      // Cargar el archivo JSON de marcas
      const response = await fetch('./json/brand.json');
      const data = await response.json();

      // Seleccionar el contenedor de las diapositivas Glide
      const glideSlidesContainer = document.querySelector('.glide__slides');

      // Recorrer los datos recibidos y construir los elementos <li>
      data.forEach(marca => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');

        const imagen = document.createElement('img');
        imagen.src = marca.image_url;
        imagen.alt = 'Brand Logo';

        li.appendChild(imagen);

        glideSlidesContainer.appendChild(li);
      });

      // Inicializar Glide después de cargar las marcas
      new Glide('#glide1', {
        type: 'carousel',
        perView: 5,
        gap: 30,
        autoplay: 3000,
        breakpoints: {
          1200: {
            perView: 4
          },
          768: {
            perView: 3
          },
          576: {
            perView: 2
          }
        }
      }).mount();
    } catch (error) {
      console.error('Error cargando marcas:', error);
    }
  }
  cargarMarcas()
})


// Llamar a la función para cargar las marcas cuando se cargue la página
window.onload = cargarMarcas;
