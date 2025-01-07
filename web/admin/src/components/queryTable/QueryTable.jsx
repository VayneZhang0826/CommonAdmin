import { defineComponent } from 'vue'
import { QueryComponent } from './Query'
import { users } from './data'
import { set } from 'nprogress'
import { ModalActionComponent } from './ModalAction'
import { CreateActionComponent } from './CreateAction'

export default class QueryTableClass {
    constructor() {
    }
    data = function () {
        return {
            loading: false,
            cardProps: {
                title: '查询表格',
            }
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
        },
        actions: {
            type: Array,
            default: []
        },
        extra: {
            type: Array,
            default: []
        },
        slots: {
            type: Object,
            default: {}
        }
    }

    created = function () {
        const request = this.request;
        const { columns } = this.tableProps;

        this.loading = true;
        if (typeof request === 'string') {
            fetch(request).then(res => {
                this.loading = false;
            })
        }
        if (typeof request === 'function') {
            request.call(this).then(res => {
                this.loading = false;
            })
        }
        if (this.actions.length) {
            columns.push({
                title: "操作",
                key: 'actions',
                width: 100,
                align: 'center',
                customRender: ({ record }) => {
                    return <AFlex gap='middle' >
                        {this.actions.map((Item, index) => {
                            if (Item.__hmrId) {
                                return <Item row={record} key={index} onCallback={() => {
                                    this.loaddata();
                                }} />
                            } else if (Item && Item.Component && Item.Component.__hmrId) {
                                const { Component, props } = Item;
                                return <Component
                                    {...props}
                                    row={record}
                                    key={index}
                                    onCallback={() => {
                                        this.loaddata();
                                    }}
                                />

                            }
                        })}
                    </AFlex>
                }
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
        },
        renderCardExtra(ctx) {
            return <CreateActionComponent
                modalProps={{
                    onOk: () => {
                        let p = new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve()
                            }, 2000)
                        })
                        return p;
                    }
                }}
                onCallback={() => {
                    this.loaddata();
                }}
            />


        }
    }

    render() {
        const { loading, tableProps, extra, slots, renderCardExtra } = this;
        const { columns } = tableProps;

        return <>
            <QueryComponent fileds={columns} onSubmit={this.loaddata} serching={loading} />
            <ACard style={{ marginTop: '20px' }} title='查询表格' extra={renderCardExtra(this)}  >
                <ATable dataSource={users} columns={columns} loading={this.loading} />
            </ACard>
        </ >
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
        },
        actions: {
            type: Array,
            default: []
        },
        extra: {
            type: Array,
            default: []
        },
        slots: {
            type: Object,
            default: {}
        }


    },
    setup(props, { slots }) {
        const Component = new QueryTableClass()
        return () => <Component {...props} slots={slots} />
    }
})

export { QueryTable }