import { defineComponent } from 'vue';
import ModalActionClass from './ModalAction';

export default class DeleteActionClass extends ModalActionClass {

    constructor() {
        super();
    }


    data = function () {
        return {
            label: '删除',
            type: 'dashed ',
            open: false,
            loading: false
        }
    }


    // methods = {
    //     submit() {
    //         console.log(this.label);
    //         this.$emit('submit');
    //     }
    // }
}

const DeleteActionComponent = defineComponent({
    props: {
        row: {
            type: Object,
            default: {}
        },
        modalProps: {
            type: Object,
            default: {}
        }
    },
    setup(props, { emit }) {
        const submit = () => {
            emit('submit');
        }
        const Comp = new DeleteActionClass();
        return () => <Comp {...props} submit={submit} />
    }
})

export { DeleteActionComponent };