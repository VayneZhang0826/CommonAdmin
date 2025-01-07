import { defineComponent } from 'vue';
export default class ModalActionClass {

    data = function () {
        return {
            label: '编辑',
            type: 'primary',
            open: false,
            loading: false
        }

    }

    props = {
        row: {
            type: Object,
            default: {}
        },
        modalProps: {
            type: Object,
            default: {}
        }
    }
    methods = {
        handleOk() {
            const { modalProps } = this;
            this.loading = true;
            const result = modalProps?.onOk?.();
            if (result instanceof Promise) {
                result.then(() => {
                    this.$emit('callback');
                    this.open = false;
                }).catch(() => {
                }).finally(() => {
                    this.loading = false;
                })
            } else {
                this.$emit('callback');
                this.loading = false;
                this.open = false;
            }
        },
        handleCancel() {
            this.open = false;
            this.modalProps?.onCancel?.();
        }
    }
    render() {
        const { modalProps } = this;
        const _modalProps = {
            ...modalProps,
            onOk: this.handleOk,
            onCancel: this.handleCancel,
            open: this.open,
            okButtonProps: {
                ...modalProps?.okButtonProps,
                loading: this.loading
            }
        };
        return <AButton
            type={this.type}
            onClick={() => {
                this.open = true;
            }}
        >
            {this.label}
            < AModal {..._modalProps} />
        </AButton >
    }
}

const ModalActionComponent = defineComponent({

    props: {
        row: {
            type: Object,
            default: {}
        },
        modalProps: {
            type: Object,
            default: {}
        }
    },

    setup(props, { emit }) {
        const callback = () => {
            emit('callback');
        }
        const Comp = new ModalActionClass();
        return () => <Comp {...props} callback={callback} />
    }
})

export { ModalActionComponent } 