<template>
  <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixins/resize'
require('echarts/theme/macarons') // echarts theme
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      mycharts: null
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts()
    })
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.myCharts, 'macarons')
      this._setOtion()
    },
    _setOtion() {
      this.mycharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        title: {
          text: '消费人群分布',
          textStyle: {
            color: '#909399',
            fontSize: 14,
            fontWeight: 400,
            opacity: 0.6
          },
          top: -5,
          left: 50
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['95', '90', '00', '80', '85', '75']
        },
        series: [
          {
            name: 'technology stack',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 120],
            center: ['50%', '42%'],
            data: [
              { value: 40, name: '95' },
              { value: 35, name: '90' },
              { value: 20, name: '00' },
              { value: 10, name: '80' },
              { value: 8, name: '85' },
              { value: 5, name: '75' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
<style></style>
