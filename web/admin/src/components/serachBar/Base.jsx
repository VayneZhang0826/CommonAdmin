import { defineComponent } from 'vue'
import { Card, Form, FormItem, Button, Select, message } from 'ant-design-vue'

const CompsMap = {
    card: Card,
    form: Form,
    button: Button,
    select: Select
}
export default class BaseSearchClass {
    constructor() {
        // console.log(this.render.bind(this));
    }
    data = function () {
        return {
            form: { username: 'a' },
            testprop: {
                colon: true,
                label: '用户名',
                name: 'username',
                rules: [{
                    required: true, message: '请输入用户名', validator:  (rule, value, callback)=> {
                        return Promise.resolve()
                    }
                }],
            }
        }
    }

    props = {
        options: {
            type: Object,
            default: {}
        },
        formOptions: {
            type: Object,
            default: {

            }
        }
    }

    created = function () {
        this.form['x'] = 'x'
        console.log(this.form);
    }

    methods = {
        submit() {
            console.log(this.form);
        }
    }

    render() {
        return <ACard>
            <AFlex gap="middle" >
                <AForm layout="inline" v-model={this.form} >
                    <AFormItem
                        {...this.testprop}
                    >
                        <AInput placeholder="请输入" v-model:value={this.form.username} />
                    </AFormItem>
                    <AButton type='primary' html-type='submit' onClick={this.submit}>提交</AButton>
                </AForm>
            </AFlex>
        </ACard >
    }
}

const SerachComponent = defineComponent({
    name: 'SerachComponent',
    props: {
        options: {
            type: Object,
            default: {}
        },
    },
    setup(props) {
        console.log(props);
        const Component = new BaseSearchClass()
        return () => <Component {...props} />
    }
})

export { SerachComponent }