<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from '@antv/g2'

const container = ref(null)
const gauge = ref(null)
const text = ref(null)

// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]
onMounted(() => {
  const chart = new Chart({
    container: container.value,
  })
  chart.interval().data(data).encode('x', 'genre').encode('y', 'sold')
  // chart.render()
  const gaugeChart = new Chart({
    container: gauge.value,
    autoFit: true,
  })
  gaugeChart
    .gauge()
    .data({
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    })
    .legend(false)
  gaugeChart.render()
  const textChart = new Chart({
    container: text.value,
    width: 800,
    height: 400,
  })
  textChart
    .wordCloud()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
    })
    .layout({
      imageMask:
        'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
      fontSize: 12,
    })
    .encode('color', 'name')
    .encode('text', 'name')
    .legend(false)
  textChart.render()
})
</script>

<template>
  <div class="overview">
    <!-- <a-card size="default" style="width: min-content">
      <template #title>
        <div>
          <span>用户总数</span>
          <span>1000</span>
        </div>
      </template>
      <div id="container" ref="container" />
    </a-card> -->
    <a-card size="small" title="Small size card">
      <div ref="gauge" />
    </a-card>
    <a-card title="Small size card" style="width: min-content">
      <div ref="text" />
    </a-card>
  </div>
</template>

<style lang="less">
.overview {
  display: grid;
  grid-template-columns: 800px 400px;
}
</style>
