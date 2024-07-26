let iconCart = document.querySelector('.cartfont');
let innerCart = document.querySelector('.innerCart');
let body = document.querySelector('body');
let closeButton = document.querySelector('.close');
let list = document.querySelector('.list');
let iconCartSpan = document.querySelector('.cartfont span');

let lists = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeButton.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addData = () => {
    list.innerHTML = "";

    if (lists.length > 0) {
        lists.forEach(item => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
        
            newProduct.innerHTML = `
                <img src="${item.image}" alt="${item.Name}"/>
                <h2>${item.Name}</h2>
                <div class="price">${item.Price}</div>
                <button class="cart" onclick="addToCart(${item.id})">Add to cart</button>
            `;
            list.appendChild(newProduct);
        });
    }
};

const addToCart = (item_id) => {
    let productInCart = carts.findIndex(value => value.item_id === item_id);

    if (productInCart < 0) {
        carts.push({
            item_id: item_id,
            quantity: 1
        });
    } else {
        carts[productInCart].quantity += 1;
    }

    addCartToHTML();
};

const addCartToHTML = () => {
    innerCart.innerHTML = '';

    if (carts.length > 0) {
        carts.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            let positionProduct = lists.findIndex(value => value.id == item.item_id);
            let info = lists[positionProduct];
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.Name}" />
                </div>
                <div class="name">${info.Name}</div>
                <div class="totalPrice">RS ${info.Price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-id="${item.item_id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${item.item_id}">+</span>
                </div>
            `;
            innerCart.appendChild(newItem);
        });

        let minusButtons = document.querySelectorAll('.minus');
        let plusButtons = document.querySelectorAll('.plus');

        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                let itemId = parseInt(button.getAttribute('data-id'));
                updateQuantity(itemId, -1);
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                let itemId = parseInt(button.getAttribute('data-id'));
                updateQuantity(itemId, 1);
            });
        });
    }
    updateCartCount();
};

const updateQuantity = (item_id, change) => {
    let productInCart = carts.findIndex(value => value.item_id === item_id);

    if (productInCart > -1) {
        carts[productInCart].quantity += change;

        if (carts[productInCart].quantity <= 0) {
            carts.splice(productInCart, 1);
        }

        addCartToHTML();
    }
};

const updateCartCount = () => {
    let totalCount = carts.reduce((sum, item) => sum + item.quantity, 0);
    iconCartSpan.textContent = totalCount;
};

const inApp = () => {
    fetch('item.json')
        .then(response => response.json())
        .then(data => {
            lists = data;
            addData();
        })
        .catch(error => console.error('Error fetching data:', error));
};

inApp();
