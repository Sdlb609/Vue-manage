//对axios进行简单的二次封装
//将axios与配置文件进行结合:对当前项目的环境的判断来改变接口地址
import axios from "axios";
import config from "../config/index.js";

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro 
    //得到请求的接口地址
class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getInsideConfig(){
        const config = {
            baseUrl: this.baseUrl,
            header:{}
        }
        return config;
    }
    interceptors(instance){
        //添加请求拦截器
        instance.interceptors.request.use(function(config){
            //在发送请求之前做些什么
            return config;
        },function(error){
            //对请求错误做些什么
            return Promise.reject(error);
        });

        //添加响应拦截器
        instance.interceptors.response.use(function(response){
            //对响应数据做点什么
            return response;
        },function(error){
            //对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(options){
        const instance = axios.create();
        options = { ...this.getInsideConfig(), ...options };    //将调用函数拿到的对象以及传入进来的参数进行解构
        this.interceptors(instance);
        return instance(options);                               //调用拦截器，返回接口请求的结果
    }
}

export default new HttpRequest(baseUrl);


