const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue ({
    el: '#app',
    data: {
        goodsUrl: '/catalogData.json',
        products: [],
        inputText: '',
        filtredGoods: [],
        cartGoods: [],
        showCart: false,
        totalPrice: 0,
        imgGoods: 'https://placehold.it/200x150'
    },
    methods: {
        getProducts(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        toggle(){
            this.showCart = !this.showCart
        },
        addProduct(product){
            const item = this.cartGoods.find((nextItem) => (nextItem.id_product == product.id_product));
            if (item) {
                item.count += 1;
            } else {
                this.cartGoods.push({
                    count: 1,
                    ...product
                });
            }
            this.total();
        },
        minusProduct(product){
            const item = this.cartGoods.find((nextItem) => (nextItem.id_product == product.id_product));
            item.count -= 1;
            if (item.count <= 0) {
                this.remove(product)
            } else {
                this.total();
            }
        },
        remove(product) {
            this.cartGoods= this.cartGoods.filter((nextItem) => (nextItem.id_product !== product.id_product));
            this.total();
        },
        total(){
            this.totalPrice = 0
            for (let product of this.cartGoods) {
                this.totalPrice += (product.price * product.count);
            }
        },
        filter(event){
            if (event){
                event.preventDefault()
            }
            this.filtredGoods = this.products.filter(product => {
                if (!this.inputText) {
                    return true
                }
                const regexp = new RegExp (this.inputText, 'i')
                return regexp.test (product.product_name)
            })
        }
    },
    mounted() {
        this.getProducts(`${API + this.goodsUrl}`)
        .then(data => {
            this.products = data;
            this.filter()
        })
    }
}) 