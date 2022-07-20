<template>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top:5px">
        <el-card shadow="hover">
          <div class="user">
            <img class="useImg" :src="userImg"/>
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间：<span>2022-07-17</span></p>
            <p>上次登陆地点：<span>内蒙古</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 15px; height:460px;">
          <el-table :data="tableData">
            <el-table-column 
            v-for="(val, key) in tableLaber" 
            :key="key" 
            :prop="key"
            :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col style="margin-top: 10px;" :span = "16">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
            <i class="icon" :class="'el-icon-'+item.icon" :style="{ background: item.color }"></i>
            <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- <div style="height: 280px;" ref="echarts"></div> -->
          <echart :chartData="echartData.order" style="height: 280px" />
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <!-- <div style="height: 240px;" ref="userEcharts"></div> -->
            <echart :chartData="echartData.user" style="height: 240px" />
          </el-card>
          <el-card style="height: 260px">
            <!-- <div style="height: 240px;" ref="videoEcharts"></div> -->
            <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
          </el-card>
        </div>        
      </el-col>
    </el-row>
</template>

<script>

import { getData } from '../../api/data.js';
//import * as echarts from 'echarts';
import Echart from '../../src/components/ECharts.vue'

export default {
  name: 'HomeView',
  components: {
    Echart
  },
  data(){
    return{
      userImg: require('../../src/assets/images/head.png'),
      tableData:[],
      tableLaber:{
        name: '商品名称',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买量'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {    //折线图
          xData: [],
          series: []
        },
        user:{      //柱状图
          xData: [],
          series: []
        },
        video: {    //饼状图
          series: []
        }
      }
    }    
  },
  mounted(){
    getData().then( res => {
      const { code, data } = res.data
      if(code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        this.echartData.order.xData = xData
        this.echartData.order.series = series

        //用户柱状图
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            }
          ]
        
        //饼图
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]

      }
      console.log(res);
    })
  }
}
</script>

