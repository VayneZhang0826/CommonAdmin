import { defineComponent, reactive, watch, ref, onBeforeMount, onMounted, nextTick } from 'vue'
import { Query } from './Query'
import { users } from './data'
import { useAntdTable } from '@/hooks'

const QueryTable = defineComponent({
    name: 'QueryTable',
    props: {
        columns: {
            type: Array,
            default: []
        },
        request: {
            type: Function || String,
            default: () => Promise.resolve([])
        },
        renderActions: {
            type: Function,
            default: () => <></>
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
        const { columns, request } = props;

        onBeforeMount(() => {
            if (!columns.find(it => it.key == 'action')) {
                columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    customRender: ({ text, record }) => <>{props.renderActions?.(record)}</>
                })
            }
        })

        const loadlist = ({ current, pageSize }, formdata) => {
            console.log(current, pageSize, formdata);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        list: users,
                        total: 100,
                    })
                }, 3000)
            })
        }
        const formRef = ref(null);
        const getFormRef = (form) => {
            return formRef.value = form;
        }

        const { tableProps, search } = useAntdTable(loadlist, {
            form: formRef
        })

        const state = reactive({
            loading: false
        })

        const loaddata = (form) => {
            state.loading = true;
            setTimeout(() => {
                state.loading = false;
            }, 2000)
        }


        return () => {
            return <>
                <Query fileds={columns} onSubmit={() => {
                    search.submit();
                }} getFormRef={getFormRef} />
                <ACard style={{ marginTop: '20px' }} title='查询表格'  >
                    <ATable columns={columns} {...tableProps} />
                </ACard>
            </>
        }
    }
})

export { QueryTable }

