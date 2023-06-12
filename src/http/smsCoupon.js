
import instance from "./axios";
// 资源分类请求接口封装
const getList = (data) => {
    return instance.request({
        url: '/mall/sms-coupon/page',
        method: 'POST',
        data
    })
}
// 获取单一数据
const getOne = (params) =>{
    return instance.request({
        url:'/mall/sms-coupon/one/'+params.id,
        method:'GET'
    })
}
// 保存
const save = (data) =>{
    return instance.request({
        url:'/mall/sms-coupon/add',
        method:'POST',
        data
    })
}
// 删除
const del = (params) =>{
    return instance.request({
        url:'/mall/sms-coupon/del/'+params.id,
        method:'GET'
    })
}
// 修改
const edit = (data) => {
    return instance.request({
        url: '/mall/sms-coupon/edit',
        method: 'POST',
        data
    })
}

export{
    getList,
    getOne,
    save,
    del,
    edit
}