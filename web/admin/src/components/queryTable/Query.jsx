import { reactive, onBeforeMount, defineComponent, toRefs, onMounted, ref } from 'vue'
import { Card, Form, FormItem, Button, Select, Input } from 'ant-design-vue'

const CompsMap = {
    card: Card,
    form: Form,
    button: Button,
    select: Select,
    input: Input,
}

const Query = defineComponent({
    name: 'Query',
    props: {
        fileds: {
            type: Array,
            default: []
        },
        onSubmit:{
            type: Function,
            default: () => {}
        },
        searching:{
            type: Boolean,
            default: false
        },
        getFormRef: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const state = reactive({
            form: {},
        })
        const { fileds, searching } = toRefs(props)
        const formRef = ref(null);
        onMounted(() => {
            props.getFormRef(formRef.value)
        })

        const reset = () => {
            state.form = {}
            props.onSubmit({})
        }

        const submit = () => {
            props.onSubmit(state.form)
        }
        return () => { 
            return <ACard>
                <AFlex gap="middle" >
                    <AForm layout="inline" model={state.form} ref={formRef}>
                        {props.fileds.map((item, index) => {
                            const { title, dataIndex, queryObject = {} } = item;
                            const { type = '', ...itemProps } = queryObject;
                            const Comp = CompsMap[type];
                            if (!type) {
                                return null;
                            }
                            return <AFormItem key={index} label={title} name={dataIndex} >
                                <Comp v-model:value={state.form[dataIndex]} {...itemProps} />
                            </AFormItem>
                        })}
                        <ACol>
                            <AButton type='primary' loading={props.searching} onClick={reset} style={{marginRight:'6px'}}>重置</AButton>
                            <AButton type='primary' loading={searching.value} onClick={submit}>提交</AButton>
                        </ACol>
                    </AForm>
                </AFlex>
            </ACard >
            }
    }
})

export { Query }