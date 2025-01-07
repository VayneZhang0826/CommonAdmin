import { Modal } from "ant-design-vue";

/**
 * 
 * @param {*} param0 
 */
export default async function ({ ...modalConfirmPros }) {
    let _resovle = null;
    let _reject = null;
    const promise = new Promise((resolve, reject) => {
        _resovle = resolve;
        _reject = reject;
    })
    Modal.confirm({
        ...modalConfirmPros,
        onOk: async () => {
            await modalConfirmPros.onOk()
            _resovle()
            return Promise.resolve()
        },
        onCancel: async () => {
            modalConfirmPros.onCancel?.()
            _reject()
        }
    })
    return promise
}