function isValueNumber(value) {
    return  (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value) + '';
}

Vue.component('input-number', {
    template: '<div class="input-number">' +
        '<input type="text" :value="currentValue" @change="handleChange" @keyup.38="handleUp" @keyup.40="handleDown"/>' +
        '<button @click="handleDown" :disable="currentValue <= min">-</button>' +
        '<button @click="handleUp" :disable="currentValue >= min">+</button>' +
        '</div>',
    data: function (){
        return {
            currentValue: this.value
        }
    },
    methods: {
         updateValue: function(val) {
            val = Math.min(val, this.max);
            val = Math.max(val, this.min);
            this.currentValue = val;

        },
        handleDown: function (){
            this.currentValue = Math.max(this.min, this.currentValue-this.step);
        },
        handleUp: function () {
            this.currentValue = Math.min(this.max, this.currentValue+this.step);
        },
        handleChange: function(event){
            let val = event.target.value.trim();
            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;
                this.currentValue = Math.min(this.currentValue, this.max);
                this.currentValue = Math.max(this.currentValue, this.min);
            }else{
                event.target.value = this.currentValue;
            }
        }
    },
    props:{
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function(val) {
            this.updateValue(val);
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
})