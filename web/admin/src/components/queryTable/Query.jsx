import { defineComponent } from 'vue'
import { Card, Form, FormItem, Button, Select, Input } from 'ant-design-vue'

const CompsMap = {
    card: Card,
    form: Form,
    button: Button,
    select: Select,
    input: Input,
}
export default class BaseQueryClass {
    constructor() {
    }
    data = function () {
        return {
            form: {
            },
        }
    }

    props = {
        fileds: {
            type: Array,
            default: []
        },
        onSubmit:{
            type: Function,
            default: () => {}
        },
        serching:{
            type: Boolean,
            default: false
        }
    }

    created = function () {
    const fileds = this.fileds;
    fileds.forEach(element => { 
        const {dataIndex, queryObject} = element; 
        queryObject && (this.form[dataIndex] = undefined);
    });
    }

    methods = {
        submit() {
            console.log(this.form);
            this.onSubmit(this.form);
        },
        reset() {
            this.form = {}
        }
    }

    render() {
        const{ fileds, serching } = this;
        return <ACard>
                <AFlex gap="middle" >
                    <AForm layout="inline" v-model={this.form} >
                        {fileds.map((item, index) => {
                            const { title, dataIndex, queryObject = {} } = item;
                            const { type = '', ...itemProps } = queryObject;
                            const Comp = CompsMap[type];
                            if (!type) {
                                return null;
                            }
                            return <AFormItem key={index} label={title} name={dataIndex} >
                                <Comp v-model:value={this.form[dataIndex]} {...itemProps} />
                            </AFormItem>
                        })}
                        <ACol>
                            <AButton type='primary' loading={serching} onClick={this.reset} style={{marginRight:'6px'}}>重置</AButton>
                            <AButton type='primary' loading={serching} html-type='submit' onClick={this.submit}>提交</AButton>
                        </ACol>
                    </AForm>
                </AFlex>
            </ACard >
 }
}


const QueryComponent = defineComponent({
    name: 'QueryComponent',
    props: {
        fileds: {
            type: Array,
            default: []
        },
        onSubmit:{
            type: Function,
            default: () => {}
        },
        serching:{
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const Component = new BaseQueryClass()
        return () => <Component {...props} />
    }
})

export { QueryComponent }