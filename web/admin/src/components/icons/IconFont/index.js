import { createFromIconfontCN } from '@ant-design/icons-vue';
import { defineComponent, h } from 'vue';
const MyIcon = createFromIconfontCN({
    scriptUrl: import.meta.resolve('./iconfont.js'), // 在 iconfont.cn 上生成
});

export default defineComponent({
    name: 'IconFont',
    props: {
        type: {
            type: String,
            required: true,
        },
        fill: {
            type: String,
            default: 'blue',
        },
        width: {
            type: String,
            default: '1em',
        },
        height: {
            type: String,
            default: '1em',
        },
        style: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        return () => h(MyIcon, {
            type: props.type,
            width: props.width,
            height: props.height,
            fill: props.fill,
            style: props.style,
        });
    },

})