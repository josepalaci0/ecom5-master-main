const fs = require('fs').promises; // Importar el módulo fs de Node.js

async function cargarProductosPorPagina(pagina, productosPorPagina) {
  try {
    // Leer el archivo JSON de productos de forma asíncrona
    const data = await fs.readFile('../json/dataproductos.json', 'utf-8');
    const productos = JSON.parse(data); // Analizar el contenido JSON
    
    // Calcular el índice inicial y final de los productos para la página actual
    const startIndex = (pagina - 1) * productosPorPagina;
    const endIndex = pagina * productosPorPagina;

    // Obtener los productos para la página actual
    const productosPagina = productos.slice(startIndex, endIndex);

    // Si la página es la primera y no hay productos suficientes, mostrar los primeros 15 productos
    if (productosPagina.length === 0 && pagina === 1) {
      return productos.slice(0, productosPorPagina);
    }

    return productosPagina;
  } catch (error) {
    console.error('Error cargando productos:', error);
    return null;
  }
}

// Ejemplo de uso
const paginaActual = 2;
const productosPorPagina = 5;
cargarProductosPorPagina(paginaActual, productosPorPagina)
  .then(result => {
    if (result) {
      console.log('Productos de la página actual:', result);
    }
  });
