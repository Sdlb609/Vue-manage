<template>
    <el-menu default-active="1-4-1" background-color="rgb(164, 193, 223)" text-color="#fff" active-text-color="rgb(78, 153, 234)" 
    class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
        <el-menu-item v-for="item in noChlidren" @click="clickMenu(item)" :index="item.path" :key="item.path">       <!--以path属性作为唯一标识-->
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">                
                <el-menu-item @click="clickMenu(subItem)" :index="subIndex">{{subItem.label}}</el-menu-item>                
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            menu:[]
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item){
            this.$router.push({
                name:item.name
            })
            this.$store.commit('selectMenu', item)
        }
    },
    computed:{      //判断菜单是否有子项目
        noChlidren(){
            return this.asyncMenu.filter(item => !item.children);     //进行过滤，没有子项目则返回
        },
        hasChildren(){
            return this.asyncMenu.filter(item => item.children);
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse; 
        },
        asyncMenu(){
            return this.$store.state.tab.menu
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    height: 100%;
    border: none;
    h3{
        color:#fff;
        text-align:center;
        line-height: 48px;
    }
}
</style>