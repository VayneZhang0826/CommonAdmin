
import { defineComponent } from "vue"
export default defineComponent({
    name: 'Test',
    setup(props, { slots }) {
        // 可以使用slots.default获取组件中的内容
        const { default: Default } = slots;
        return () => <div>
            <Default />
        </div>
    }
})

