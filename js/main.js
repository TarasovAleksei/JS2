const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
/*         this._fetchProducts(); */
/*         this.totalPrice = 0;
        this.total(); */
        this._getProducts()
            .then(data => {
                this.goods = [...data].map(good => new ProductItem(good));
                this.render();
            });
    }
/*     total(){
        this.totalPrice = 0;
        for (let item of this.goods) {
            this.totalPrice += item.price;
        }
    } */
/*     _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Лаптоп', price: 2000},
            {id: 2, title: 'Мышь', price: 20},
            {id: 3, title: 'Клавиатура', price: 200},
            {id: 4, title: 'Джойстик', price: 50},
        ];
    } */
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    getById(id){
        return this.goods.find((good) => good.id == id)
    }
    render(){
        const block = document.querySelector(this.container);
/*         const totalEl = document.querySelector(".total"); */
        for(let productObj of this.goods) {
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
/*         totalEl.innerHTML = `<div class="total-price">
                <span>Итоговая цена: ${this.totalPrice}</span>
                </div>` */
    }
}

class ProductItem {
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src ="${this.img}" alt="some img">
                <h3 class="item-name">${this.title}</h3>
                <p class="item-price">Цена: ${this.price}</p>
                <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>`
    }
}

class Cart {
    constructor (items = [], container = ".cart") {
        this.container = container;
        this.items = items.map(item => new CartItem(item));
    }
    add(item) {
        const existedItem = this.items.find((nextItem) => (nextItem.id == item.id))
        if(existedItem) {
            existedItem.count += 1;
        } else {
            this.items.push(new CartItem(item));
        }

        this.render();
    };
    minus(id){
        const existedItem = this.items.find((nextItem) => (nextItem.id == id));
        existedItem.count -= 1;
        if(existedItem.count <= 0) {
            this.remove(id); 
        } else {
            this.render();
        }
    }
    remove(id) {
        this.items = this.items.filter((nextItem) => (nextItem.id != id));
        this.render();        
    };
    total(){
        let totalPrice = 0;
        for (let product of this.items) {
            totalPrice += (product.price * product.count);
        }
        return totalPrice;
    };
    render(){
        const block = document.querySelector(this.container + " .items");
        block.innerHTML = "";
        for(let product of this.items) {
            block.insertAdjacentHTML('beforeend', product.render());
        }
        const totalEl = document.querySelector(this.container + " .total");
        totalEl.innerHTML = `<p class = "total-price">Итоговая стоимость: ${this.total()} руб.</p>`
    };
}

class CartItem {
    constructor (item){
        this.title = item.title;
        this.id = item.id;
        this.price = item.price;
        this.count = item.count || 1;
/*         this.img = item.img; */
    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
        <h3 class="item-name">${this.title}</h3>
        <p class="item-price">Цена: ${this.price}</p>
        <p>Количество: ${this.count}</p>
        <button class = "plus-btn" data-id="${this.id}">+</button>
        <button class = "min-btn" data-id="${this.id}">-</button>
        <button class = "del-btn" data-id="${this.id}">Удалить</button>
        </div>`
    };
}

let cart = new Cart();
let list = new ProductList();
const toggleCart = (event) => {
    event.preventDefault();
    document.querySelector(".cart").classList.toggle("active");    
};
document.querySelector(".btn-cart").addEventListener("click", toggleCart)
document.querySelector(".cart .overlay").addEventListener("click", toggleCart)
document.querySelector(".products").addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-btn")) {
        const id = event.target.getAttribute("data-id");
        const productItem = list.getById(id);
        cart.add(productItem);
    }
})
document.querySelector(".cart").addEventListener("click", (event) => {
    if (event.target.classList.contains("plus-btn")) {
        const id = event.target.getAttribute("data-id");
        const productItem = list.getById(id);
        cart.add(productItem);
    } else if (event.target.classList.contains("min-btn")){
        const id = event.target.getAttribute("data-id");
        cart.minus(id);
    } else if (event.target.classList.contains("del-btn")){
        const id = event.target.getAttribute("data-id");
        cart.remove(id);
    }
})