import axios from "axios";

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',     //接口相关地址
        method: 'post',                 //接口类型
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}