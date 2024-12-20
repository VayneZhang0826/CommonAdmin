import MyComponent from './TestClassComp';
import { defineComponent, h } from 'vue';

var a = 1;

class TestChildComp extends MyComponent {

    data = function () {
        return {
            count: 0
        }
    }

    props = {
        name: {
            type: String,
            default: 'TestChildComp1'
        }
    }

    methods = {
        increment() {
            this.count++
        }
    }

    onMounted = function ({ props, data, router }) {
        console.log('init child', this.name);
        console.log(Object.getOwnPropertyDescriptors(props || {}));
        console.log(Object.getOwnPropertyDescriptors(data || {}));
    }

}

export { TestChildComp };

export default defineComponent({
    setup() {
        return () => h(new TestChildComp())
    }
})
