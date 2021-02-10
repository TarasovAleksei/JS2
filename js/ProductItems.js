Vue.component('product-items', {
    props: ['filtredGoods', 'imgGoods'],
    template: `<div class="products">
        <product-item
            v-for="product of filtredGoods" 
            :key="product.id_product" 
            v-if = "filtredGoods.length"
            :product = "product"
            :img-goods = "imgGoods">
        </product-item>
        <p class="noCharge" v-if = "!filtredGoods.length">Товаров нет</p>
    </div>`
})

Vue.component('product-item', {
    props: ['product', 'imgGoods'],
    template: `<div class="product-item">
        <img :src="imgGoods" alt="Some foto">
        <h3 class="item-name">{{ product.product_name }}</h3>
        <p class="item-price">{{ product.price }} руб.</p>
        <button class="buy-btn" @click="$parent.$emit('addproduct', product)">Купить</button>
    </div>`
}) 