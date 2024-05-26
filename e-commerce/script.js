document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const sections = {
        home: document.getElementById('home-section'),
        shop: document.getElementById('shop-section'),
        contact: document.getElementById('contact-section')
    };
    const products = document.querySelectorAll('.product');
    const searchBar = document.getElementById('search-bar');

    document.getElementById('home-link').addEventListener('click', () => showSection('home'));
    document.getElementById('shop-link').addEventListener('click', () => showSection('shop'));
    document.getElementById('contact-link').addEventListener('click', () => showSection('contact'));

    searchBar.addEventListener('input', filterProducts);

    function showSection(section) {
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        sections[section].style.display = 'block';
    }

    function filterProducts() {
        const searchTerm = searchBar.value.toLowerCase();
        products.forEach(product => {
            const name = product.getAttribute('data-name').toLowerCase();
            if (name.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const product = {
                id: productElement.getAttribute('data-id'),
                name: productElement.getAttribute('data-name'),
                price: parseFloat(productElement.getAttribute('data-price'))
            };

            addToCart(product);
        });
    });

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Total: ₹${total.toFixed(2)}`;
    }

    document.getElementById('checkout').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    showSection('home'); // Show home section by default
});


