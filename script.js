document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    let cart = [];

    const menuItems = {
        burgers: [
            {
                name: "BEEF BURGER",
                price: 9.99,
                image: "images/burger1.png",
                description: "Our signature burger with juicy beef patty, fresh vegetables, and special sauce."
            },
            {
                name: "CHEESE BURGER",
                price: 10.99,
                image: "images/burger2.png",
                description: "Classic beef burger topped with melted cheddar cheese."
            },
            {
                name: "BACON BURGER",
                price: 11.99,
                image: "images/burger3.png",
                description: "Beef patty topped with crispy bacon strips and BBQ sauce."
            },
            {
                name: "VEGGIE BURGER",
                price: 9.99,
                image: "images/burger4.png",
                description: "Plant-based patty with fresh vegetables and vegan mayo."
            }
        ],
        wings: [
            {
                name: "BUFFALO WINGS",
                price: 12.99,
                image: "images/wings1.png",
                description: "Crispy wings tossed in spicy buffalo sauce."
            },
            {
                name: "BBQ WINGS",
                price: 12.99,
                image: "images/wings2.png",
                description: "Wings glazed with our signature BBQ sauce."
            },
            {
                name: "GARLIC WINGS",
                price: 13.99,
                image: "images/wings3.png",
                description: "Wings coated in garlic butter and parmesan cheese."
            },
            {
                name: "LEMON WINGS",
                price: 13.99,
                image: "images/wings4.png",
                description: "Tangy wings seasoned with lemon and black pepper."
            }
        ],
        drinks: [
            {
                name: "COLA",
                price: 2.99,
                image: "images/drink1.png",
                description: "Classic cola served ice cold."
            },
            {
                name: "LEMONADE",
                price: 3.99,
                image: "images/drink2.png",
                description: "Freshly squeezed lemonade."
            },
            {
                name: "ICED TEA",
                price: 3.99,
                image: "images/drink3.png",
                description: "Refreshing iced tea with a hint of lemon."
            },
            {
                name: "ORANGE JUICE",
                price: 4.99,
                image: "images/orange-juice.png",
                description: "Freshly squeezed orange juice."
            },
            {
                name: "MILKSHAKE",
                price: 5.99,
                image: "images/milkshake.png",
                description: "Creamy milkshake available in vanilla, chocolate, or strawberry."
            },
            {
                name: "SMOOTHIE",
                price: 5.99,
                image: "images/smoothie.png",
                description: "Fruit smoothie made with your choice of fresh fruits."
            }
        ]
    };

    function showCategoryItems(category) {
        let menuHTML = `
            <div class="burger-menu">
                <div class="burger-grid">
        `;

        menuItems[category].forEach(item => {
            menuHTML += `
                <div class="menu-item" data-category="${category}" data-name="${item.name}">
                    <img src="${item.image}" alt="${item.name}" class="burger-image">
                    <div class="burger-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-price">${item.price.toFixed(2)}$</p>
                    </div>
                </div>
            `;
        });

        menuHTML += `
                </div>
            </div>
            <div class="bottom-nav">
                <button class="category-btn ${category === 'burgers' ? 'active' : ''}" data-category="burgers">Burgers</button>
                <button class="category-btn ${category === 'wings' ? 'active' : ''}" data-category="wings">Wings</button>
                <button class="category-btn ${category === 'drinks' ? 'active' : ''}" data-category="drinks">Drinks</button>
            </div>
        `;

        mainContent.innerHTML = menuHTML;

        // Add click event to each menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemCategory = item.getAttribute('data-category');
                const itemName = item.getAttribute('data-name');
                const itemDetails = menuItems[itemCategory].find(menuItem => menuItem.name === itemName);
                showItemDetails(itemDetails);
            });
        });

        // Add click event to category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedCategory = btn.getAttribute('data-category');
                showCategoryItems(selectedCategory);
            });
        });
    }

    function showItemDetails(item) {
        mainContent.innerHTML = `
            <div class="burger-promo">
                <div class="back-arrow">&#8592;</div>
                <div class="price">${item.price.toFixed(2)} $</div>
                <img src="${item.image}" alt="${item.name}" class="burger-image">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <div class="price-calculator">
                    <div class="quantity-control">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="99">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <div class="total-price">
                        Total: <span class="total-amount">${item.price.toFixed(2)}</span>$
                    </div>
                </div>
                <button class="order-button">Add to Cart</button>
            </div>
        `;

        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.minus');
        const plusBtn = document.querySelector('.plus');
        const totalAmount = document.querySelector('.total-amount');

        function updateTotal() {
            const quantity = parseInt(quantityInput.value);
            const total = (quantity * item.price).toFixed(2);
            totalAmount.textContent = total;
        }

        minusBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateTotal();
            }
        });

        plusBtn.addEventListener('click', () => {
            if (quantityInput.value < 99) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateTotal();
            }
        });

        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 1) quantityInput.value = 1;
            if (quantityInput.value > 99) quantityInput.value = 99;
            updateTotal();
        });

        // Add event listener to the back arrow
        document.querySelector('.back-arrow').addEventListener('click', () => showCategoryItems('burgers'));

        const addToCartButton = document.querySelector('.order-button');
        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const totalPrice = quantity * item.price;
            
            const cartItem = {
                name: item.name,
                quantity: quantity,
                price: item.price,
                totalPrice: totalPrice,
                image: item.image
            };

            const existingItemIndex = cart.findIndex(i => i.name === item.name);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
                cart[existingItemIndex].totalPrice += totalPrice;
            } else {
                cart.push(cartItem);
            }

            updateCartButton();
        });
    }

    function updateCartButton() {
        const cartButton = document.querySelector('.cart-button');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartButton.textContent = `Cart (${totalItems})`;
    }

    function showCart() {
        let cartHTML = `
            <div class="cart-view">
                <div class="back-arrow cart-back-arrow">&#8592;</div>
                <h2>Your items</h2>
                <div class="cart-items">
        `;

        if (cart.length === 0) {
            cartHTML += `<p>Your cart is empty.</p>`;
        } else {
            cart.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Rs. ${item.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button class="remove-item" data-name="${item.name}">🗑️</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="add-item" data-name="${item.name}">+</button>
                        </div>
                    </div>
                `;
            });
        }

        const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        cartHTML += `
                </div>
                <div class="cart-total">
                    <span>Total</span>
                    <span>Rs. ${total.toFixed(2)}</span>
                </div>
            </div>
        `;

        mainContent.innerHTML = cartHTML;

        // Add event listeners for remove and add buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => removeFromCart(button.dataset.name));
        });
        document.querySelectorAll('.add-item').forEach(button => {
            button.addEventListener('click', () => addToCart(button.dataset.name));
        });

        // Add event listener for the back arrow
        document.querySelector('.back-arrow').addEventListener('click', () => showCategoryItems('burgers'));
    }

    function removeFromCart(itemName) {
        const index = cart.findIndex(item => item.name === itemName);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                cart[index].totalPrice -= cart[index].price;
            } else {
                cart.splice(index, 1);
            }
            updateCartButton();
            showCart();
        }
    }

    function addToCart(itemName) {
        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity++;
            item.totalPrice += item.price;
            updateCartButton();
            showCart();
        }
    }

    // Show burgers by default
    showCategoryItems('burgers');

    // Add this at the end of your DOMContentLoaded event listener
    const cartButton = document.createElement('button');
    cartButton.classList.add('cart-button');
    cartButton.textContent = 'Cart (0)';
    cartButton.addEventListener('click', showCart);
    document.body.appendChild(cartButton);

    updateCartButton();
});
