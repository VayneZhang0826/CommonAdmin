import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import CompsMap from "../CompsMap";
import { options } from "less";

const FormLayout = {
    layout: 'horizontal',
    labelCol: { span: 2},
    labelWrap: false,
    labelAlign: 'right',
    wrapperCol: { span: 12 },
}


/**
 * 使用getFormRef方法获取form实例
 */

const FormComponent = defineComponent({
    name: 'Form',
    props: {
        getFormRef: {
            type: Function,
            default: () => { 
            }
        },
        initValues: {
            type: Object,
            default:{ }
        },
        items: {
            type: Array,
            default: []
        }
    },
    setup(props, { slots }) {
        const state = reactive({
            form: {},
        })
        const formRef = ref(null);
        const formProps = {
            ...FormLayout
        }
        const items = props.items;
        onMounted(() => {
            props.getFormRef(formRef.value);
            state.form = { ...props.initValues };
        })  
        return () => <AForm {...formProps} model={state.form} ref={formRef}
            initValues
            onFinish={ 
                () => { 
                    console.log('onFinish');
                }
            }
            onSubmit={() => { 
            console.log('submit');
        }} >
            {items && items.map((item, index) => {
                const {  type, name,itemProps, ...props } = item;
                const Comp = CompsMap[type];
                return <AFormItem {...props} name={name}>
                    <Comp v-model:value={state.form[name]} {...itemProps} />
                </AFormItem>
            })}
        </AForm>

    }
})

export { FormComponent }