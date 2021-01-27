class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.totalPrice = 0;
        this.total();
    }
    total() {
        for (let item of this.goods) {
            this.totalPrice += item.price;
        }
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Нотебук', price: 2000},
            {id: 2, title: 'Мыша', price: 20},
            {id: 3, title: 'Клава', price: 200},
            {id: 4, title: 'гампаД', price: 50},
        ];
    }
    render(){
        const block = document.querySelector(this.container);
        const totalEl = document.querySelector(".total");
        for(let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
        totalEl.innerHTML = `<div class="total-price">
                <span>Итоговая цена: ${this.totalPrice}</span>
                </div>`
    }
}

class ProductItem {
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src ="${this.img}" alt="some img">
                <h3 class="item-name">${this.title}</h3>
                <p class="item-price">Цена: ${this.price}</p>
                <button class="buy-btn">Купить</button>
                </div>`
    }
}
let list = new ProductList();
list.render(); 