<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import DynamicStatistic from '@/components/DynamicStatistic'
import ARow from 'ant-design-vue/es/grid/Row'

const container = ref(null)
const gauge = ref(null)
const text = ref(null)

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
onMounted(() => {
  const chart = new Chart({
    container: container.value,
    autoFit: true,
    width: 320,
    height: 100,
  })
  chart
    .data(data)
    .area()
    .encode('x', (d) => d.year)
    .encode('y', 'value')
    .encode('shape', 'area') // 'area', 'smooth', 'hvh', 'vh', 'hv'
    .style('opacity', 0.2)
    .axis('y', { labelFormatter: '~s', title: false })
  chart.line().encode('x', 'year').encode('y', 'value').encode('shape', 'line') // 'line', 'smooth', 'vh', 'hv', 'hvh'

  chart.render()
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
    <ARow
      :gutter="{ xs: 8, sm: 32, md: 48, lg: 64 }"
      align="middle"
      justify="space-between"
      :wrap="true"
    >
      <ACol :span="6" :order="1">
        <ACard size="small">
          <DynamicStatistic title="总销售额" :value="{ start: 1000, end: 1123, duration: 1500 }" />
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
          <div ref="container" />
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
  .ant-divider-horizontal {
    margin: 4px 0;
  }
}
</style>
