import instance from "./axios";
// 资源分类请求接口封装
const getList = (data) => {
    return instance.request({
        url: '/mall/sms-coupon-history/page',
        method: 'POST',
        data
    })
}
// 获取单一数据
const getOne = (params) =>{
    return instance.request({
        url:'/mall/sms-coupon-history/one/'+params.id,
        method:'GET'
    })
}
// 保存
const save = (data) =>{
    return instance.request({
        url:'/mall/sms-coupon-history/add',
        method:'POST',
        data
    })
}
// 删除
const del = (params) =>{
    return instance.request({
        url:'/mall/sms-coupon-history/del/'+params.id,
        method:'GET'
    })
}
// 修改
const edit = (data) => {
    return instance.request({
        url: '/mall/sms-coupon-history/edit',
        method: 'POST',
        data
    })
}
//根据优惠券id获取
const getHistoriesByCouponId = (params) =>{
    return instance.request({
        url:'/mall/sms-coupon-history/getHistories/'+params.id,
        method:'GET'
    })
}

export{
    getList,
    getOne,
    save,
    del,
    edit,
    getHistoriesByCouponId
}