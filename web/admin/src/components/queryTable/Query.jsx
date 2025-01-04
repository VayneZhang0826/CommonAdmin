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
        // console.log(this.render.bind(this));
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
        const fileds = this.fileds;
        console.log(fileds);
        

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
                    <AButton type='primary' onClick={this.reset}>重置</AButton>
                    <AButton type='primary' html-type='submit' onClick={this.submit}>提交</AButton>
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
        }
    },
    setup(props) {
        console.log(props);
        const Component = new BaseQueryClass()
        return () => <Component {...props} />
    }
})

export { QueryComponent }