import { defineComponent } from 'vue';

export default class ButtonActionClass {
    constructor() {
    }

    props = {
        row: {
            type: Object,
            default: {}
        },
        buttonProps: {
            type: Object,
            default: {
                type: 'primary'
            }
        }
    }

    data = function () {
        return {
            label: '删除',
            loading: false
        }
    }
    methods = {
        handleClick() {
            const { buttonProps, row } = this;
            const result = buttonProps.onClick?.(row);
            this.loading = true
            if (result instanceof Promise) {
                result.then(() => {
                    this.$emit('callback');
                }).catch(() => {
                }).finally(() => {
                    this.loading = false
                })
            } else {
                this.loading = false
                this.$emit('callback');
            }
        }
    }

    render() {
        const { buttonProps, loading, handleClick } = this;
        const _props = { ...buttonProps, loading, onClick: handleClick }
        return <AButton {..._props}>{this.label}</AButton>
    }
}

const ButtonActionComponent = defineComponent({
    props: {
        row: {
            type: Object,
            default: {}
        },
        buttonProps: {
            type: Object,
            default: {
                type: 'primary'
            }
        }
    },
    setup(props, { emit }) {
        const callback = () => {
            emit('callback');
        }
        const Comp = new ButtonActionClass();
        return () => <Comp {...props} callback={callback} />
    }
})

export { ButtonActionComponent }