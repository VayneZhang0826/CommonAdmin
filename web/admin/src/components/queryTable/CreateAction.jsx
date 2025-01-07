import { defineComponent } from 'vue';
import ModalActionClass from './ModalAction';

export default class CreateActionClass extends ModalActionClass {

    constructor() {
        super();
    }


    data = function () {
        return {
            label: '创建',
            type: 'primary ',
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

const CreateActionComponent = defineComponent({
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
        const callback = () => {
            emit('callback');
        }
        const Comp = new CreateActionClass();
        return () => <Comp {...props} callback={callback} />
    }
})

export { CreateActionComponent };