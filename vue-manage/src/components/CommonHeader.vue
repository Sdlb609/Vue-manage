<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color:#fff">首页</h3> -->
            <div class="my-color">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size = "medium">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>

import { mapState } from 'vuex'

    export default{
        name:'CommonHeader',
        data(){
            return{
                userImg: require('@/assets/images/head.png')
            }
        },
        methods:{
            handleMenu(){
                this.$store.commit('collapseMenu')
            },
            logOut(){
                this.$store.commit('clearToken')
                this.$store.commit('clearMenu')
                this.$router.push("/login")

            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
        }
    }
</script>

<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
}
.my-color /deep/ .el-breadcrumb__inner {
    color:rgb(127, 198, 255);
}
</style>