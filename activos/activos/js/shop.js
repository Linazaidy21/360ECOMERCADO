document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Granola artesanal sin azúcar', image: 'assets/img/portfolio/app-1.jpg' },
    { id: 2, name: 'Jabón artesanal', image: 'assets/img/portfolio/product-1.jpg' },
    { id: 3, name: 'Tote bags', image: 'assets/img/portfolio/branding-1.jpg' },
    { id: 4, name: 'Kit de regalo sostenible', image: 'assets/img/portfolio/books-1.jpg' },
    { id: 5, name: 'Miel orgánica', image: 'assets/img/portfolio/app-2.jpg' },
    { id: 6, name: 'Shampoo', image: 'assets/img/portfolio/product-2.jpg' },
    { id: 7, name: 'Accesorios de tela reciclada', image: 'assets/img/portfolio/branding-2.jpg' },
    { id: 8, name: 'Velas veganas', image: 'assets/img/portfolio/books-2.jpg' },
    { id: 9, name: 'Harina de yuca o avena orgánica', image: 'assets/img/portfolio/app-3.jpg' },
    { id: 10, name: 'Bálsamo labial', image: 'assets/img/portfolio/product-3.jpg' },
    { id: 11, name: 'Buzos de Cañamo', image: 'assets/img/portfolio/branding-3.jpg' },
    { id: 12, name: 'Envoltorios ecológicos', image: 'assets/img/portfolio/books-3.jpg' },
  ];

  const productsContainer = document.querySelector('#products .row');
  const summaryList = document.getElementById('summary-list');
  const whatsappButton = document.getElementById('whatsapp-button');
  const cartModal = document.getElementById('cart-modal');
  const cartButton = document.getElementById('cart-button');
  const closeButton = document.querySelector('.close-button');
  const cartCount = document.getElementById('cart-count');
  const customerNameInput = document.getElementById('customer-name');
  const cart = {};

  function renderProducts() {
    products.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'col-lg-4 col-md-6';
      productEl.innerHTML = `
        <div class="product-item">
          <img src="${product.image}" class="img-fluid" alt="${product.name}">
          <h4>${product.name}</h4>
          <div class="d-flex align-items-center">
            <input type="number" min="1" value="1" id="quantity-${product.id}" class="form-control" style="width: 60px; margin-right: 10px;">
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar</button>
          </div>
        </div>
      `;
      productsContainer.appendChild(productEl);
    });
  }

  function updateSummary() {
    summaryList.innerHTML = '';
    let totalItems = 0;
    for (const id in cart) {
      const product = products.find(p => p.id == id);
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${product.name} x${cart[id]}
        <button class="btn btn-danger btn-sm delete-item" data-id="${id}">&times;</button>
      `;
      summaryList.appendChild(listItem);
      totalItems += cart[id];
    }
    cartCount.textContent = totalItems;
  }

  function showNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${productName} se ha añadido al carrito.`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  productsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
      const id = e.target.dataset.id;
      const quantity = document.getElementById(`quantity-${id}`).value;
      const product = products.find(p => p.id == id);
      cart[id] = (cart[id] || 0) + parseInt(quantity);
      updateSummary();
      showNotification(product.name);
    }
  });

  summaryList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-item')) {
      const id = e.target.dataset.id;
      delete cart[id];
      updateSummary();
    }
  });

  whatsappButton.addEventListener('click', e => {
    const customerName = customerNameInput.value.trim();
    if (!customerName) {
      e.preventDefault();
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    let message = `¡Hola! Soy ${customerName} y estoy interesado en los siguientes productos:\n\n`;
    for (const id in cart) {
      const product = products.find(p => p.id == id);
      message += `- ${product.name} (Cantidad: ${cart[id]})\n`;
    }
    message += `\n¡Muchas gracias! `;

    const encodedMessage = encodeURIComponent(message);
    whatsappButton.href = `https://wa.me/573005561152?text=${encodedMessage}`;
  });

  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target == cartModal) {
      cartModal.style.display = 'none';
    }
  });

  renderProducts();
});
