Vue.component('tabs', {
    template: '<div class="tabs">' +
            '<div class="tabs-bar">' +
                '<div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">' +
                    '{{ item.label }} <button v-if="closable" @click="handleClose(index)">x</button>'+
                '</div>'+
            '</div>' +
            '<div class="tabs-content">' +
                '<slot></slot>' +
            '</div>' +
        '</div>',
    props: {
        value: {
            type: [String, Number]
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    data: function(){
        return {
            navList: [],
            currentValue: this.value,
        }
    },
    watch: {
        value: function(val){
            this.currentValue = val;
        },
        currentValue: function(){
            this.updateStatus();
        }
    },
    methods: {
        updateStatus(){
            let tabs = this.getTabs();
            let _this = this;
            tabs.forEach(function (tab){
                return tab.show = tab.name === _this.currentValue;
            })
        },
        handleClose: function (index){
            let name = this.navList[index].name;
            this.getTabs().forEach((tab) => {
                if (tab.name === name){
                    tab.$destroy()
                }
            })
        },
        handleChange: function(index){
            let nav = this.navList[index];
            let name = nav.name;
            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        },
        getTabs: function (){
            return this.$children.filter(function(item){
                return item.$options.name === 'pane';
            })
        },
        tabCls: function (item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        updateNav: function (){
            this.navList = [];
            let _this = this;
            this.getTabs().forEach(function(pane, index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                })
                if(!pane.name) pane.name = index;
                if( index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        }
    }
})