import { watch, watchEffect, reactive, onMounted, nextTick } from 'vue';

/**
 * 
 * @param {function} service ()=>{Promise}
 * @param {object} options 
 * @returns tableProps, search
 */
const useAntdTable = (service, options = { form: undefined, defaultType: 'simple', defaultParams: undefined, defaultPageSize: 10, refreshDeps: undefined }) => {
    const tableProps = reactive({
        dataSource: [],
        loading: false,
        pagination: {
            pageSize: options.defaultPageSize || 10,
            total: 0,
            current: 1,
        },
        onChange: (pagination, filters, sorter, extra) => {
            console.log('pagination change');
            tableProps.pagination.current = pagination.current;
            tableProps.pagination.pageSize = pagination.pageSize;
            tableProps.pagination.total = pagination.total;
            submit();
        }
    });
    const submit = () => {
        tableProps.loading = true;
        const data = options.form.value.getFieldsValue?.() || {};

        service(tableProps.pagination, data).then(res => {
            tableProps.loading = false;
            tableProps.dataSource = res.list;
            tableProps.pagination.total = res.total;
        }).catch(err => {
            tableProps.loading = false;
        });
    }
    const search = {
        type: 'simple', // simple, advanced
        changeType: () => {
            search.type = search.type === 'simple' ? 'advanced' : 'simple';
        },
        submit,
        reset: () => {
            options.form?.resetFields?.();
        },
    }
    onMounted(submit)
    watch(options.refreshDeps, submit);
    return {
        tableProps, search
    }
};

export default useAntdTable;