import { defineComponent } from "vue";
import CompsMap from "../CompsMap";
import { options } from "less";

const FormLayout = {
    layout: 'horizontal',
    labelCol: { span: 2},
    labelWrap: false,
    labelAlign: 'right',
    wrapperCol: { span: 12 },
}

export default class FormClass {

    constructor() { }


    props = {
        getFormRef: {
            type: Function,
            default: () => { 
            }
        },
    }
    created=function() {
        this.items.forEach(element => {
            this.form[element.name] = undefined;
        });
    }

    data = function () {
        return {
            items: [{
                type: 'input',
                label: 'Name',
                name: 'name',
                rules: [{ required: true, message: 'Please input your name' }]
            },
                {
                    type: 'input',
                    label: 'Age',
                    name: 'age',
                    rules: [{ required: true, message: 'Please input your name' }]
                },
                {
                    type: 'select', label: 'Role',
                    name: 'role', itemProps: {
                        options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }]
                    }
                }
            ],
            form: {},
            formProps: {
                ...FormLayout
            },
            formRef: undefined
        }
    }
    mounted = function () { 
        this.getFormRef(this.$refs.formRef);
    }

    watch = {
        // form : {
        //     handler: function (val) {
        //         this.getFormRef(val);
        //     },
        //     deep: true
        // }
    }

    methods = {
        reset() { 
            this.$refs.formRef.resetFields();
        }
    }

    render() {
        const { items, form, formProps } = this;
       
        return <AForm {...formProps} model={form} ref='formRef'
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
                    <Comp v-model:value={form[name]} {...itemProps} />
                </AFormItem>
            })}
        </AForm>
    }

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
    },
    setup(props, { slots, expose }) {
        const Comp = new FormClass();
        return () => <Comp {...props} />

    }
})

export { FormComponent }