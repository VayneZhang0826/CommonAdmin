<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import DynamicStatistic from '@/components/DynamicStatistic'
import ARow from 'ant-design-vue/es/grid/Row'
// import TestClassComp from '@/components/TestClassComp'
import TestChildComp from '@/components/TestChildComp'
const container = ref(null)
const interval = ref(null)
const tabChart = ref(null)
const range = ref(['', ''])

// 准备数据
const data = [
  { year: '1991', value: 15468 },
  { year: '1992', value: 16100 },
  { year: '1993', value: 15900 },
  { year: '1994', value: 17409 },
  { year: '1995', value: 17000 },
  { year: '1996', value: 31056 },
  { year: '1997', value: 31982 },
  { year: '1998', value: 32040 },
  { year: '1999', value: 33233 },
]

const intervalData = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
]
onMounted(() => {
  const chart = new Chart({
    container: container.value,
    autoFit: true,
    height: 60,
    style: {
      width: '100%',
    },
  })
  chart
    .data(data)
    .area()
    .encode('x', (d) => d.year)
    .encode('y', 'value')
    .encode('shape', 'area') // 'area', 'smooth', 'hvh', 'vh', 'hv'
    .style('fill', 'linear-gradient(-90deg, #c7aaf0 100%, #f2ecfb 100%)')
    .style('opacity', 0.2)
    .axis(false)
  chart
    .line()
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('shape', 'line')
    .style('stroke', '#c7aaf0') // 'line', 'smooth', 'vh', 'hv', 'hvh'

  chart.render()
  const intervalChart = new Chart({
    container: interval.value,
    autoFit: true,
    height: 60,
  })
  intervalChart
    .interval()
    .data(intervalData)
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis(false)
  intervalChart.render()
  const iChart = new Chart({
    container: tabChart.value,
    autoFit: true,
    height: 360,
  })
  iChart.interval().data(intervalData).encode('x', 'letter').encode('y', 'frequency')
  iChart.render()
  // const textChart = new Chart({
  //   container: text.value,
  //   width: 800,
  //   height: 360,
  // })
  // textChart
  //   .wordCloud()
  //   .data({
  //     type: 'fetch',
  //     value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  //   })
  //   .layout({
  //     imageMask:
  //       'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
  //     fontSize: 12,
  //   })
  //   .encode('color', 'name')
  //   .encode('text', 'name')
  //   .legend(false)
  // textChart.render()
})
</script>

<template>
  <div class="overview">
    <ARow
      :gutter="{ xs: 8, sm: 32, md: 48, lg: 64 }"
      align="middle"
      justify="space-between"
      :wrap="true"
    >
      <ACol :span="6" :order="1">
        <ACard size="small">
          <DynamicStatistic title="总销售额" :value="{ start: 1000, end: 1123, duration: 1500 }" />
          <div class="block">周同比12%日 同比11%</div>
          <ADivider />
          <div>
            <span>日销售额</span>
            <span>￥12,423</span>
          </div>
        </ACard>
      </ACol>
      <ACol :span="6" :order="2">
        <ACard size="small">
          <DynamicStatistic title="访问量" :value="{ start: 7801, end: 8846, duration: 2000 }" />
          <div class="block" ref="container" />
          <ADivider />
          <div>
            <span>日访问量</span>
            <span>1,234</span>
          </div>
        </ACard>
      </ACol>
      <ACol :span="6" :order="3">
        <ACard size="small">
          <DynamicStatistic title="支付笔数" :value="{ start: 6512, end: 6550, duration: 1500 }" />
          <div class="block" ref="interval" />
          <ADivider />
          <div>
            <span>转化率</span>
            <span>60%</span>
          </div>
        </ACard>
      </ACol>
      <ACol :span="6" :order="4">
        <ACard size="small">
          <DynamicStatistic title="运营活动效果" value="78%" />
          <div class="block">
            <AProgress
              :percent="78"
              status="normal"
              strokeColor="linear-gradient(to right, #1890ff, #1890ff 50%, #1890ff 50%, #1890ff)"
            />
          </div>
          <ADivider />
          <div>
            <span>周同比</span>
            <span>12%</span>
            <ADivider type="vertical" />
            <span>日同比</span>
            <span>11%</span>
          </div>
        </ACard>
      </ACol>
    </ARow>
    <ARow class="margin-top-20">
      <ACol :span="24">
        <ACard
          :tabList="[
            {
              key: 'tab1',
              tab: '销售额',
            },
            {
              key: 'tab2',
              tab: '访问量',
            },
          ]"
        >
          <template #customTab="item">
            {{ item.tab }}
          </template>
          <ARow :gutter="{ xs: 8, sm: 32, md: 48, lg: 64 }" align="middle" justify="space-between">
            <ACol :span="24">
              <div ref="tabChart" />
            </ACol>
          </ARow>
          <template #tabBarExtraContent>
            <AButton type="text">今日</AButton>
            <AButton type="text">本周</AButton>
            <AButton type="text">本月</AButton>
            <AButton type="text">全年</AButton>
            <ARangePicker show-time />
          </template>
        </ACard>
      </ACol>
    </ARow>
    <ARow class="margin-top-20">
      <ACol :span="24">
        <ACard>
          <div class="board">
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 100%; --endPosition: -20%; --duration: 12s"
              >
                欢迎光临 • 今天是个好日子
              </span>
              <span
                class="board-item"
                style="--startPosition: 130%; --endPosition: -45%; --duration: 16s"
              >
                欢迎来到Amagi动物园 • 祝您工作愉快
              </span>
            </ARow>
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 100%; --endPosition: -20%; --duration: 14s"
              >
                🐔你太美
              </span>
              <span
                class="board-item"
                style="--startPosition: 110%; --endPosition: -45%; --duration: 20s"
              >
                灰勒塔德👩🏻‍⚕️
              </span>
              <span
                class="board-item"
                style="--startPosition: 120%; --endPosition: -45%; --duration: 21s"
              >
                醉嚎🦁
              </span>
              <span
                class="board-item"
                style="--startPosition: 125%; --endPosition: -45%; --duration: 22s"
              >
                嚎啸🐴
              </span>
              <span
                class="board-item"
                style="--startPosition: 127%; --endPosition: -45%; --duration: 23s"
              >
                纯🦌人
              </span>
              <span
                class="board-item"
                style="--startPosition: 130%; --endPosition: -45%; --duration: 23s"
              >
                🐭耗丸
              </span>
              <span
                class="board-item"
                style="--startPosition: 150%; --endPosition: -45%; --duration: 23s"
              >
                灰勒塔德钱🐰
              </span>
            </ARow>
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 100%; --endPosition: -20%; --duration: 14s"
              >
                菜只因
              </span>
              <span
                class="board-item"
                style="--startPosition: 110%; --endPosition: -45%; --duration: 20s"
              >
                没角🐑
              </span>
              <span
                class="board-item"
                style="--startPosition: 120%; --endPosition: -45%; --duration: 21s"
              >
                梅狸🐱
              </span>
              <span
                class="board-item"
                style="--startPosition: 125%; --endPosition: -45%; --duration: 22s"
              >
                贞德食泥🦆</span
              >
              <span
                class="board-item"
                style="--startPosition: 127%; --endPosition: -45%; --duration: 23s"
              >
                早报🦅
              </span>
              <span
                class="board-item"
                style="--startPosition: 130%; --endPosition: -45%; --duration: 23s"
              >
                瘦狗🐶
              </span>
              <span
                class="board-item"
                style="--startPosition: 150%; --endPosition: -45%; --duration: 23s"
              >
                雪豹🐆
              </span>
            </ARow>
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 100%; --endPosition: -50%; --duration: 20s"
              >
                没有了你以后，我落入时代洪流，我是牢笼的猴，我是地狱的囚
              </span>
            </ARow>
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 130%; --endPosition: -50%; --duration: 28s"
              >
                满身烟味的我，走路带上浮夸
              </span>
            </ARow>
            <ARow>
              <span
                class="board-item"
                style="--startPosition: 130%; --endPosition: -50%; --duration: 28s"
              >
                竖起中指王○他算个勾⑧
              </span>
            </ARow>
          </div>
        </ACard>
      </ACol>
    </ARow>

    <TestChildComp name="1" />
    <TestChildComp name="2" />
  </div>
</template>

<style lang="less">
.overview {
  .margin-top-20 {
    margin-top: 20px;
  }
  .ant-progress-bg {
    background: linear-gradient(to right, #108ee9, #87d068) !important;
  }
  .ant-divider-horizontal {
    margin: 4px 0;
  }
  .block {
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 60px;
  }

  @property --duration {
    syntax: '<time>';
    inherits: false;
    initial-value: 10s;
  }

  .board {
    background: url('@/assets/amagi-zoo.webp') no-repeat center center;
    background-size: 100% 100%;
    height: 500px;
    overflow: hidden;
    .board-item {
      animation: toLeft var(--duration) linear infinite;
      cursor: pointer;
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      position: relative;
      left: var(--startPosition);

      &:hover {
        mix-blend-mode: difference;
        animation-play-state: paused;
      }
    }
  }

  @property --startPosition {
    syntax: '<length>';
    inherits: false;
    initial-value: 100%;
  }

  @property --endPosition {
    syntax: '<length>';
    inherits: false;
    initial-value: -10%;
  }

  @keyframes toLeft {
    from {
      left: var(--startPosition);
    }
    to {
      left: var(--endPosition);
    }
  }
}
</style>
