import { defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Button } from 'ant-design-vue'
import './testClassComp.less'

// 定义一个全局变量，用于存储组件的实例
var that = Object.create(null);


/**
 * 定义一个类，用于创建组件的实例
 * @description 这个类用于创建组件的实例, 此类只用于创建组件的实例，不用于渲染组件
 * 在 mounted 钩子中，调用 onMounted 方法, 你也可以直接使用 mounted 钩子,但是
 * 
 * - 直接在data中定义的属性，会自动绑定到组件的实例上,与选项式api中的data类似
 * 
 * - 直接在methods中定义的方法，会自动绑定到组件的实例上,与选项式api中的methods类似
 * 
 * - 直接在props中定义的属性，会自动绑定到组件的实例上,与选项式api中的props类似 
 * 
 * @version 1.0.0   
 * @author VayneZhang0826   
 * @date 2024-12-19
 */
class MyComponent {


    constructor(props) {
        this.name = this.__proto__.constructor.name;
        that = this;
    }



    created = function () {
    }

    mounted = function () {
        console.log('mounted', this);
        that?.onMounted({ props: this.$props, data: this.$data, });
    }


    render() {
        return <Card ref='card' >
            <p class="count">Count: {this.count}</p>
            <p>props.name: {this?.name || '--'}</p>
            <Button onClick={this.increment}>Increment</Button>
            <Button onClick={() => this.$router.push('/404')}>Force Update</Button>
        </Card>
    }
}

export default MyComponent;
