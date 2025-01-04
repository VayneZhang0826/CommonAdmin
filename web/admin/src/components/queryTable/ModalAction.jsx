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
        submit() {
            this.open = true;
            console.log(this.label, this.row);
            this.$emit('submit');
        },
        handleOk() {
            const { modalProps } = this;
            this.loading = true;
            const result = modalProps?.onOk?.();
            console.log('result', result);
            if (result instanceof Promise) {
                result.then(() => {
                    console.log('ok');
                    this.loading = false;
                    this.open = false;
                })
            } else {
                this.loading = false;
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
            onClick={this.submit}
        >
            {this.label}
            <AModal {..._modalProps} />
        </AButton>
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
        const submit = () => {
            emit('submit');
        }
        const Comp = new ModalActionClass();
        return () => <Comp {...props} submit={submit} />
    }
})

export { ModalActionComponent } 