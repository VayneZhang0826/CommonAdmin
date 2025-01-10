import { defineComponent } from "vue";
import ModalActionClass from "./ModalAction";

export default defineComponent({
    name: "EditModalAction",
    setup(props, { emit }) {
        const callback = () => {
            emit('callback');
        }
        const Comp = new ModalActionClass();
        return () => <Comp {...props} callback={callback} />
    }
});