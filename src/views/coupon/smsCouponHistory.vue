<template>
    <div style="margin:0 20px">
        <h2>促销历史</h2>
        <el-table :data="couponHistories" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="70px"></el-table-column>
            <el-table-column prop="couponCode" label="优惠码" width="170px" ></el-table-column>
            <el-table-column prop="memberNickname" label="领取会员" width="170px" ></el-table-column>

            <el-table-column prop="getType" label="领取方式" width="100px">
                <template #default="scope">
                        {{ formatType(scope.row.createTime) }}
                    </template>

            </el-table-column>

            <el-table-column prop="createTime" label="领取时间" >
                <template #default="scope">
                        {{ formatDate(scope.row.createTime) }}
                    </template>
            </el-table-column>
            <el-table-column prop="useStatus" label="使用状态" >
                <template #default="scope">
                        {{ formatStatus(scope.row.createTime) }}
                    </template>

            </el-table-column>
            <el-table-column prop="useTime" label="使用时间" >
            <template #default="scope">
                        {{ formatDate(scope.row.useTime) }}
                    </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单编号" ></el-table-column>
            <el-table-column fixed="right" label="操作" >
                <template #default="scope">
                    <el-button size="small" disabled @click="toEdit(scope.row)">编辑</el-button>
                    <el-button size="small" disabled type="danger"  @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin:10px 0">
            <el-pagination v-model:current-page="page.current" v-model:page-size="page.size"
                :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
                @size-change="handleSizeChange" @current-change="currentchange" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { getList,getOne,save,del,edit,getHistoriesByCouponId } from "../../http/smsCouponHistory";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
import { formatDate } from "../../utils/date";
export default defineComponent({
    data() {
        return {
            couponHistories: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            couponHistory: {  },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getCouponHistories(1)
    },
    methods: {
        formatDate(time) {
            if (time == null || time === '') {
                return 'N/A';
            }
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd')
        },
        formatType(type) {
            if(type===0){
                return '后台赠送'
            }else{
                return '主动获取'
            }
        },
        formatStatus(stauts){
            if(status ===0){
                return '未使用';
            }
            else if(status ===1){
                return '已使用';
            }else{
                return '已过期';
            }
        },
        toEdit(couponHistory) {
            console.log(this.couponHistory);
            this.dialogFormVisible=true;
            this.couponHistory=cloneDeep(this.couponHistory);    
        },
        formatPlatform(platform) {
            if (platform === 1) {
                return '移动平台';
            } else if (platform === 2) {
                return 'PC平台';
            } else {
                return '全平台';
            }
        },
        getCouponHistories(current) {
            const data = {
                current: this.page.current,
                size: this.page.size
            }
            getList(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.couponHistories = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getCouponHistories(current)
            this.page.current = current;//数据更新目前显示的页面
        },
        //改变数据量
        handleSizeChange(size) {
            this.getCouponHistories()
            this.couponHistories.size = size
            
        },
        toDel(id) {
            //删除数据
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            del(params).then(res => {
                if (res.success) {
                    this.getCouponHistories(this.page.current)
                    //当前分页数据只剩一条时删除返回上一页
                    if (this.page.total % this.page.size == 1)
                    this.getCouponHistories(this.page.current - 1)
                    else {
                        this.getCouponHistories(this.page.current)
                    }
                }
                else {
                    console.log(res.msg)
                    return false
                }
            }).catch(err => {

            })
        },
        toAdd() {
            //到添加的页面
            this.dialogFormVisible = true;
            //清空表单
            this.couponHistory = {  
                "couponCode": "",
                "couponId": 0,
                "createTime": "",
                "getType": 0,
                "id": 0,
                "memberId": 0,
                "memberNickname": "",
                "orderId": 0,
                "orderSn": "",
                "useStatus": 0,
                "useTime": ""
            };
        },
        toSave() {
            const couponHistory = this.couponHistory;
            if (couponHistory.id == 0) {
                add(couponHistory).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCouponHistories(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else{
                edit(couponHistory).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCouponHistories(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }

        }

    }

});
</script>

<style lang="scss" scoped></style>
