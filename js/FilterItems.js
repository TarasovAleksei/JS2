Vue.component('filter-items', {
    data () {
        return {inputText: ''}
    },
    template: `
            <form action="" class="search-form">
            <input type="text" class="search" name="search" v-model = "inputText">
            <button class="search-btn" @click = "$emit('filter', $event, inputText)"><i class="fas fa-search"></i></button>
            </form>`
}) 