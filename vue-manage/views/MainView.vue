<template>
    <el-container style="height:100%">
     <el-header >
        <common-header></common-header>
     </el-header>
     
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            
            <el-main><common-tag></common-tag>
                <router-view>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'

export default {
  name: 'MainView',
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  },
  return(){

  }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: rgb(64, 90, 118);
    height: 70px;
}
.el-aside {
    height: calc(100vh - 70px);// 设置左侧 aside 高度
}
.el-main{
    padding-top: 0;     //对默认属性进行覆盖
     height: calc(100vh - 70px);
}
</style>