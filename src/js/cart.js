import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartItems() {
  const cartList = document.querySelector('.product-list');
  const cartItems = getLocalStorage('so-cart') || [];

  // Clear the list before rendering
  cartList.innerHTML = '';

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    document.querySelector("#cart-total").textContent = "Total: $0.00";
    return;
  }

  // Render each product
  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('cart-card', 'divider');

    li.innerHTML = `
      <span class="remove-item" data-id="${item.Id}">✕</span>
      <a href="product_pages/${item.Slug}" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="product_pages/${item.Slug}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Color}</p>
      <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    `;

    cartList.appendChild(li);
  });

  attachRemoveListeners(); // Attach the listeners to ✕
  updateCartTotal(cartItems); //  update the total
}

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.dataset.id;
      removeItemFromCart(id);
    });
  });
}

function removeItemFromCart(idToRemove) {
  let cartItems = getLocalStorage('so-cart') || [];

  const index = cartItems.findIndex(item => item.Id === idToRemove);

  if (index !== -1) {
    if (cartItems[index].Quantity > 1) {
      cartItems[index].Quantity -= 1;
    } else {
      cartItems.splice(index, 1); // remove the whole item
    }
  }

  setLocalStorage('so-cart', cartItems);
  renderCartItems(); // re-render after change
}

function updateCartTotal(cartItems) {
  let total = 0;

  cartItems.forEach(item => {
    const quantity = item.Quantity || 1;
    total += item.FinalPrice * quantity;
  });

  document.querySelector("#cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

// Initial render
renderCartItems();
