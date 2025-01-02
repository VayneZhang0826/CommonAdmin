import { createFromIconfontCN } from '@ant-design/icons-vue';
import { defineComponent, h } from 'vue';
import './style.less'

const isDev = import.meta.env.DEV;

const MyIcon = createFromIconfontCN({
  scriptUrl: isDev ? import.meta.resolve('./iconfont.js') : import.meta.resolve('/assets/js/iconfont.js'), // 在 iconfont.cn 上生成
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
      default: '2em',
    },
    height: {
      type: String,
      default: '2em',
    },
    style: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    return () =>
      <MyIcon class='icon-comp' type={props.type} style={props.style} fill={props.fill} width={props.width} height={props.height} />
    // return  h(MyIcon, { type: props.type, style: props.style, fill: props.fill, width: props.width, height: props.height });
  },

})