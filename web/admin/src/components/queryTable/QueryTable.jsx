import { defineComponent } from 'vue'
import { QueryComponent } from './Query'
import { users } from './data'
import { set } from 'nprogress'

export default class QueryTableClass {
    constructor() {
        // console.log(this.render.bind(this));
    }
    data = function () {
        return {
            loading: false,
        }
    }

    props = {
        tableProps: {
            type: Object,
            default: {}
        },
        request: {
            type: Function || String,
            default: () => Promise.resolve([])
        }
    }

    created = function () {
        const request = this.request;
        console.log(request);

        this.loading = true;
        if (typeof request === 'string') {
            fetch(request).then(res => {
                console.log(res);
                this.loading = false;
            })
        }
        if (typeof request === 'function') {
            request().then(res => {
                console.log(res);
                this.loading = false;
            })
        }
    }

    methods = {
        loaddata(e) {
            this.loading = true;
            this.request().then(res => {
                setTimeout(() => {
                    this.loading = false;
                }, 2000)
            })
        }
    }

    render() {
        const { columns } = this.tableProps;
        console.log(this.loading);

        return <ACard>
            <QueryComponent fileds={columns} onSubmit={this.loaddata} />
            <ATable dataSource={users} columns={columns} loading={this.loading} />
        </ACard >
    }
}


const QueryTable = defineComponent({
    name: 'QueryTable',
    props: {
        tableProps: {
            type: Object,
            default: {}
        },
        request: {
            type: Function || String,
            default: () => Promise.resolve([])
        }
    },
    setup(props) {
        console.log(props);
        const Component = new QueryTableClass()
        return () => <Component {...props} />
    }
})

export { QueryTable }