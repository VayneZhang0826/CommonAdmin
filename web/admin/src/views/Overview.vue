<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import DynamicStatistic from '@/components/DynamicStatistic'

const container = ref(null)
const gauge = ref(null)
const text = ref(null)

// 准备数据
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
]
onMounted(() => {
  // const chart = new Chart({
  //   container: container.value,
  //   autoFit: true,
  //   width: 700,
  //   height: 360,
  // })
  // chart
  //   .data(data)
  //   .encode('x', 'year')
  //   .encode('y', 'value')
  //   .scale('x', { range: [0, 1] })
  //   .scale('y', { domainMin: 0, nice: true })
  //   .scale('y', {
  //     domainMin: 0,
  //     nice: true,
  //   })
  // chart.line().label({
  //   text: 'value',
  //   style: {
  //     dx: -10,
  //     dy: -12,
  //   },
  // })
  // chart.point().style('fill', 'white').tooltip(false)
  // chart.render()
  // const gaugeChart = new Chart({
  //   container: gauge.value,
  //   autoFit: true,
  //   width: 400,
  //   height: 300,
  // })
  // gaugeChart
  //   .gauge()
  //   .data({
  //     value: {
  //       target: 120,
  //       total: 400,
  //       name: 'score',
  //     },
  //   })
  //   .legend(false)
  // gaugeChart.render()
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
    <a-row
      :gutter="{ xs: 8, sm: 32, md: 48, lg: 64 }"
      align="middle"
      justify="space-between"
      wrap="true"
    >
      <a-col :span="6" :order="1">
        <a-card size="small" title="总销售额">
          <DynamicStatistic :value="{ start: 1000, end: 1123, duration: 1500 }" />
          <a-divider />
          <div>
            <span>日销售额</span>
            <span>￥12,423</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6" :order="2">
        <a-card size="small" title="访问量">
          <DynamicStatistic :value="{ start: 7801, end: 8846, duration: 2000 }" />
          <a-divider />
          <div>
            <span>日访问量</span>
            <span>1,234</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6" :order="3">
        <a-card size="small" title="支付笔数">
          <DynamicStatistic :value="{ start: 6512, end: 6550, duration: 1500 }" />
          <a-divider />
          <div>
            <span>转化率</span>
            <span>60%</span>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6" :order="4">
        <a-card size="small" title="运营活动效果">
          <DynamicStatistic value="78%" />
          <a-divider />
          <div>
            <span>周同比</span>
            <span>12%</span>
            <a-divider type="vertical" />
            <span>日同比</span>
            <span>11%</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- <a-card size="default" :title="`${$t('dashboard')}`" style="width: min-content">
      <template #title>
        <div>
          <span>用户总数</span>
          <span>1000</span>
        </div>
      </template>
      <div ref="container" />
    </a-card>
    <a-card :title="`${$t('dashboard')}`" style="width: min-content">
      <div ref="text" />
    </a-card>
    <a-card size="small" :title="`${$t('dashboard')}`">
      <div ref="gauge" />
    </a-card> -->
  </div>
</template>

<style lang="less">
.overview {
  // display: flex;
  // flex-direction: row;
  // gap: 20px;
  // flex-wrap: wrap;
  // :nth-child(2) {
  //   flex: 1;
  // }
}
</style>
