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
    .style('opacity', 0.2)
    .axis(false)
  chart.line().encode('x', 'year').encode('y', 'value').encode('shape', 'line') // 'line', 'smooth', 'vh', 'hv', 'hvh'

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
    <ARow style="margin-top: 20px">
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
            <ADatePicker show-time />
          </template>
        </ACard>
      </ACol>
    </ARow>

    <!-- <TestChildComp name="1" />
    <TestChildComp name="2" /> -->
  </div>
</template>

<style lang="less">
.overview {
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
  .lyric {
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 60px;
    padding: 10px;
    text-align: justify;
    color: #1890ff;

    &:hover {
      mix-blend-mode: difference;
      transition: all 0.3s ease;
    }
  }
}
</style>

