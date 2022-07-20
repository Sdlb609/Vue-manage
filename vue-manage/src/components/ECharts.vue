<!--封装echarts公共组件-->
<template>
    <div ref="echart"></div>
</template>

<script>

import* as echart from 'echarts'


export default{
    props:{
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default(){
                return{
                    xData:[],
                    series: []
                }
            }
        }
    },
    //对echarts进行初始化
    watch: {
        chartData: {
            handler: function(){
                this.initChart()
            },
            deep: true
        }
    },
    methods: {
        initChart(){
            this.initChartData()
            //判断echarts是否已经被渲染
            if(this.echart){
                this.echart.setOption(this.options)
            } else{
                this.echart = echart.init(this.$refs.echart)
                this.echart.setOption(this.options)
            }
        },
        initChartData(){
            if(this.isAxisChart){
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            } else{
                //饼状图
                this.normalOption.series = this.chartData.series
            }
        }
    },        
    data(){
        return{
            axisOption:{
            // 图例文字颜色
            legend: {
                textStyle: {
                    color: "#333",
                }
            },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },
            //饼状图
            normalOption: {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#D2B48C",
                    "#FFE4C4",
                    "#FF8C00",
                    "#FFDAB9",
                    "#F4A460",
                    "#D2691E",
                    "#8B4513",
                ],
                series: [],
            },
            echart: null
        }
    },
    computed: {
        options(){
            //判断是否含x轴属性，如果含则为柱状图或折线图，不含则为饼状图
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }
}

</script>
