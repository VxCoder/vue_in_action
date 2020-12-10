Vue.component('pane', {
    name: 'pane',
    template: '<div class="pane" v-show="show" v-if="!close"><slot></slot></div>',
    data: function () {
        return {
            show: true,
            close: false
        }
    },
    methods: {
        updateNav: function (){
            this.$parent.updateNav();
        }
    },
    watch: {
        label() {
            this.updateNav();
        }
    },
    mounted(){
        this.updateNav();
    },
    beforeDestroy(){
        let _this = this;
        this.$nextTick(() => {
            _this.updateNav();
        })
    },
    props:{
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    }
})