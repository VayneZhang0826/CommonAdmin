
import { defineComponent } from "vue"
export default defineComponent({
    name: 'Test',
    setup(props, { slots }) {
        console.log(slots);
        return () => <div>
            test
            <slots.dog msg='fuck brian' />
        </div>
    }
})

