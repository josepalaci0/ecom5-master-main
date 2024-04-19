// loadProductDetails.js

async function loadProductDetails(productId) {
    try {
        // Fetch product details JSON
        const response = await fetch('../json/dataproductos.json');
        const data = await response.json();
  
        // Find the product with the specified ID
        const product = data.find(product => product.id === productId);
  
        // If the product is found, display its details
        if (product) {
            const productDetails = product.details[0];
  
            // Display main product image
            const mainImage = document.getElementById('main-image');
            mainImage.src = product.image;
  
            // Display thumbnails
            const thumbnailsContainer = document.getElementById('thumbnails');
            thumbnailsContainer.innerHTML = '';
            productDetails.images.slice(0, 4).forEach(image => {
                const thumbnail = document.createElement('div');
                thumbnail.classList.add('thumbnail');
                const thumbnailImage = document.createElement('img');
                thumbnailImage.src = image;
                thumbnail.appendChild(thumbnailImage);
                thumbnailsContainer.appendChild(thumbnail);
  
                // Add click event listener to thumbnail images
                thumbnailImage.addEventListener('click', () => {
                    mainImage.src = image;
                });
            });
  
            // Display product name, price, and description
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-description').textContent = productDetails.description;
  
            // Display other product details
            const productDetailsContainer = document.getElementById('product-details');
            const keysToIgnore = ['images', 'description'];
            for (const [key, value] of Object.entries(productDetails)) {
                if (!keysToIgnore.includes(key)) {
                    const detailItem = document.createElement('div');
                    detailItem.classList.add('detail-item');
                    if (Array.isArray(value)) {
                        // For arrays, display each item on a new line
                        const detailList = value.map(item => `<li>${item}</li>`).join('');
                        detailItem.innerHTML = `<strong>${key}:</strong><ul>${detailList}</ul>`;
                    } else {
                        // For single values, display them normally
                        detailItem.innerHTML = `<strong>${key}:</strong> ${value}`;
                    }
                    productDetailsContainer.appendChild(detailItem);
                }
            }
  
            // Display available sizes
            const selectSize = document.getElementById('select-size');
            selectSize.innerHTML = '';
            productDetails.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                selectSize.appendChild(option);
            });
        } else {
            console.error('Product not found:', productId);
        }
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

module.exports = loadProductDetails;
