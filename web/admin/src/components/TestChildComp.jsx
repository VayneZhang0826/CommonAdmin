import { defineComponent, h } from 'vue';

function TestChildComp(props) {
    console.log(props);
    return <div>213</div>
}

export default defineComponent({
    setup(props) {
        return () => <TestChildComp {...props} />
    }
})
