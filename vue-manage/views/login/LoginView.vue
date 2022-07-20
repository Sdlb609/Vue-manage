<template>
<div class="login-bc">
    <el-form
        :model="form"
        status-icon
        :rules="rules"
        label-width="100px"
        class="login-container"
    >
        <h3 class="login-title">用&nbsp;户&nbsp;登&nbsp;录</h3>
        <el-form-item
            label="用户名"
            label-width="80px"
            prop="username"
            class="username"
        >
            <el-input
                type="input"
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入账号"
            ></el-input>
        </el-form-item>
        <el-form-item
            label="密码"
            label-width="80px"
            prop="password"
        >
            <el-input
                type="password"
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <el-form-item class="login-submit">
            <el-button type="primary" @click="login" class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>

//import Mock from 'mockjs'
import { getMenu } from '../../api/data.js'

export default {
  name: 'LoginView',
  data() {
    return{
        form:{},
        rules:{
            username:[
                {required: true,message: "请输入用户名", trigger: "blur"},
                {
                    min: 3,
                    message: "用户名长度不能小于3位！",
                    trigger: "blur"
                }
            ],
            password: [
                {required: true,message: "请输入密码", trigger: "blur"}
            ]
        }
    }
  },
  methods:{
    login(){        //使用mock模拟返回token
        getMenu(this.form).then(({ data: res }) => {
            if(res.code === 20000){
                this.$store.commit( 'clearMenu')
                this.$store.commit( 'setMenu', res.data.menu )
                this.$store.commit( 'setToken', res.data.token )
                this.$store.commit( 'addMenu', this.$router )
                this.$router.push({ name: 'home' })
            }else{
                this.$message.warning(res.data.message)
            }
        })
        // const token = Mock.random.guid()
        // this.$store.commit( 'setToken', token )
        // this.$router.push({ name: 'home' })
    }
  }  
}
</script>

<style lang="less" scoped>
.login-bc{
    position:absolute;
	width:100%;
	height:100%;
	background-repeat:no-repeat;
	background-size:100% 100%;
    background-image:url('../../src/assets/images/login-background.jpg') ;
    .login-container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: rgba(255, 255, 255, 0.59);
        border: 1px solid #3257ae;
        box-shadow: 0 0 25px #b4b4b4;
    }
    .login-title{
        font-size: 25px;
        font-weight: bold;
        margin: 0px auto 40px auto;
        text-align: center;
        color: #4f4f4f;
    }
    .login-submit{
        margin: 10px auto 0px auto;
    }
    
}

</style>