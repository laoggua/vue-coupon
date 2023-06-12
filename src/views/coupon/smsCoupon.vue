<template>
    <div style="margin:0 20px">
        <h2>优惠券列表</h2>
        <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
            style="margin-bottom: 30px"></el-input>
        <div>
            <el-button type="primary" @click="showDialog()">添加</el-button>
        </div>
        <!-- 表格视图 -->
        <div style="margin:30px auto">
            <el-table :data="resuleData.records" border style="width: 100%">
                <el-table-column prop="id" label="编号" width="70px"></el-table-column>
                <el-table-column width="100rpx" prop="type" label="优惠券类型">
                    <template #default="scope">
                        {{ formatType(scope.row.type) }}
                    </template>
                </el-table-column>
                <el-table-column width="120rpx" prop="name" label="优惠券名称"></el-table-column>
                <el-table-column width="85rpx" prop="platform" label="适用平台">
                    <template #default="scope">
                        {{ formatPlatform(scope.row.platform) }}
                    </template>
                </el-table-column>
                <el-table-column width="55rpx" prop="count" label="数量"></el-table-column>
                <el-table-column width="55rpx" prop="amount" label="金额"></el-table-column>
                <el-table-column width="115rpx" prop="perLimit" label="每人限领张数"></el-table-column>
                <el-table-column width="120rpx" prop="minPoint" label="使用门槛">
                    <template #default="scope">满{{ scope.row.minPoint }}元可用</template>
                </el-table-column>
                <el-table-column width="105rpx" prop="startTime" label="开始日期">
                    <template #default="scope">
                        {{ formatDate(scope.row.startTime) }}
                    </template>
                </el-table-column>
                <el-table-column width="105rpx" prop="endTime" label="结束日期">
                    <template #default="scope">
                        {{ formatDate(scope.row.endTime) }}
                    </template>
                </el-table-column>
                <el-table-column width="85rpx" prop="useType" label="使用类型">
                    <template #default="scope">
                        {{ formatUseType(scope.row.useType) }}
                    </template>
                </el-table-column>
                <el-table-column width="100rpx" prop="note" label="备注"></el-table-column>
                <el-table-column width="85rpx" prop="publishCount" label="发行数量"></el-table-column>
                <el-table-column width="100rpx" prop="useCount" label="已使用数量"></el-table-column>
                <el-table-column width="85rpx" prop="receiveCount" label="领取数量"></el-table-column>
                <el-table-column width="105rpx" prop="enableTime" label="领取日期">
                    <template #default="scope">
                        {{ formatDate(scope.row.enableTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="showEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div>
            <el-pagination v-model:current-page="resuleData.current" v-model:page-size="resuleData.size"
                :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="resuleData.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>


        <!-- 新增修改对话框 -->
        <el-dialog v-model="dialogVisible" :title="isEdit ? '修改数据' : '新增数据'" width="600px" v-if="dialogVisible">
            <el-form ref="dialogForm" :model="itemData" :rules="rules">
                <el-form-item label="优惠券类型" label-width="100"><el-radio-group v-model="itemData.type">
                        <el-radio-button :label="0">全场赠券</el-radio-button>
                        <el-radio-button :label="1">会员赠券</el-radio-button>
                        <el-radio-button :label="2">购物赠券</el-radio-button>
                        <el-radio-button :label="3">注册赠券</el-radio-button>
                    </el-radio-group></el-form-item>
                <el-form-item label="优惠券名称" label-width="100"> <el-input v-model="itemData.name"></el-input></el-form-item>
                <el-form-item label="适用平台" label-width="100"><el-radio-group v-model="itemData.platform">
                        <el-radio-button :label="0">全部</el-radio-button>
                        <el-radio-button :label="1">移动</el-radio-button>
                        <el-radio-button :label="2">PC端</el-radio-button>
                    </el-radio-group></el-form-item>
                <el-form-item label="数量" label-width="100"><el-input-number
                        v-model="itemData.count"></el-input-number></el-form-item>
                <el-form-item label="金额" label-width="100"><el-input v-model="itemData.amount"><template
                            #append>元</template></el-input></el-form-item>
                <el-form-item label="每人限领张数" label-width="100"><el-input-number v-model="itemData.perLimit"><template
                            #append>张</template></el-input-number></el-form-item>
                <el-form-item label="使用门槛" label-width="100">
                    <el-input v-model="itemData.minPoint" placeholder="只能输入正整数">
                        <template #prepend>满</template> <template #append>可用</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="发行数量" label-width="100"><el-input-number
                        v-model="itemData.publishCount"></el-input-number></el-form-item>
                <el-form-item label="已使用数量" label-width="100"> <el-input-number
                        v-model="itemData.useCount"></el-input-number> </el-form-item>
                <el-form-item label="领取数量" label-width="100"> <el-input-number
                        v-model="itemData.receiveCount"></el-input-number> </el-form-item>
                <el-form-item label="领取日期" label-width="100">
                    <el-date-picker v-model="itemData.enableTime" type="date-time" placeholder="选择日期"
                        style="width: 150px;" />
                </el-form-item>
                <el-form-item label="有效期" label-width="100">
                    <el-date-picker v-model="itemData.startTime" type="date-time" placeholder="选择日期"
                        style="width: 150px;" />
                    <span style="margin: 0 30px;">至</span>
                    <el-date-picker v-model="itemData.endTime" type="date-time" placeholder="选择日期" style="width: 150px;" />
                </el-form-item>

                <el-form-item label="使用类型" label-width="100"> <el-radio-group v-model="itemData.useType">
                        <el-radio-button :label="0">全场通用</el-radio-button>
                        <el-radio-button :label="1">指定分类</el-radio-button>
                        <el-radio-button :label="2">指定商品</el-radio-button>
                    </el-radio-group></el-form-item>


                <el-form-item v-show="itemData.useType === 1">
                    <!--级联选择器-->
                    <el-cascader ref="cascader" v-model="this.productCategory" :options="options" :props="props" clearable
                        style="margin-left: 100px;" />
                    <el-button @click="handleAddProductCategoryRelation()">添加</el-button>
                    <!--级联选择器-->
                </el-form-item>


                <el-form-item label="备注" label-width="100"> <el-input v-model="itemData.note"
                        type="textarea"></el-input></el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="confire()">取消</el-button>
                    <el-button type="primary" @click="isEdit ? editConfirm() : confirm()">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { getList, getOne, save, edit, del } from '../../http/smsCoupon'
import { formatDate } from '../../utils/date.js'
import { value } from "lodash-es";
export default defineComponent({
    data() {
        return {
            requestData: {
                current: 1,
                size: 5
            },
            resuleData: {},
            dialogVisible: false,//对话框显示，默认为不显示
            itemData: {}, //单条数据内容
            isEdit: false, //false时为新增，true时为修改
            searchText: "",
            productCategory: {
                "couponId": 0,
                "id": 0,
                "parentCategoryName": "",
                "productCategoryId": 0,
                "productCategoryName": ""
            },
            productCategoryRelationList: {},
            selectProductCate: {},
            options: [
                {
                    all: {
                        parentId: '1',
                        value: '服装',
                        children: [
                            {
                                id: '7',
                                name: '外套',
                            },
                            {
                                id: '8',
                                name: 'T恤',
                            },
                            {
                                id: '9',
                                name: '休闲裤',
                            },
                            {
                                id: '10',
                                name: '牛仔裤',
                            },
                            {
                                id: '11',
                                name: '衬衫',
                            },
                            {
                                id: '29',
                                name: '男鞋',
                            },
                        ],
                    },
                    name: '服装',
                    children: [
                        {
                            id: '7',
                            name: '外套',
                        },
                        {
                            id: '8',
                            name: 'T恤',
                        },
                        {
                            id: '9',
                            name: '休闲裤',
                        },
                        {
                            id: '10',
                            name: '牛仔裤',
                        },
                        {
                            id: '11',
                            name: '衬衫',
                        },
                        {
                            id: '29',
                            name: '男鞋',
                        },
                    ],
                },
                {
                    id: '2',
                    name: '手机数码',
                    children: [
                        {
                            id: '19',
                            name: '手机通讯',
                        },
                        {
                            id: '30',
                            name: '手机配件',
                        },
                        {
                            id: '31',
                            name: '摄影摄像',
                        },
                        {
                            id: '32',
                            name: '影音娱乐',
                        },
                        {
                            id: '33',
                            name: '数码配件',
                        },
                        {
                            id: '34',
                            name: '智能设备',
                        },
                    ],
                },
                {
                    id: '3',
                    name: '家用电器',
                    children: [
                        {
                            id: '35',
                            name: '电视',
                        },
                        {
                            id: '36',
                            name: '空调',
                        },
                        {
                            id: '37',
                            name: '洗衣机',
                        },
                        {
                            id: '38',
                            name: '冰箱',
                        },
                        {
                            id: '39',
                            name: '厨卫大电',
                        },
                        {
                            id: '40',
                            name: '厨房小电',
                        },
                        {
                            id: '41',
                            name: '生活电器',
                        },
                        {
                            id: '42',
                            name: '个护健康',
                        },
                    ],
                },
                {
                    id: '4',
                    name: '家具家装',
                    children: [
                        {
                            id: '43',
                            name: '厨房卫浴',
                        },
                        {
                            id: '44',
                            name: '灯饰照明',
                        },
                        {
                            id: '45',
                            name: '五金工具',
                        },
                        {
                            id: '46',
                            name: '卧室家具',
                        },
                        {
                            id: '47',
                            name: '客厅家具',
                        },
                    ],
                },
                {
                    id: '5',
                    name: '汽车用品',
                    children: [
                        {
                            id: '48',
                            name: '全新整车',
                        },
                        {
                            id: '49',
                            name: '坐载电器',
                        },
                        {
                            id: '50',
                            name: '维修保养',
                        },
                        {
                            id: '51',
                            name: '汽车装饰',
                        },
                    ],
                },
                {
                    id: '52',
                    name: '电脑办公',
                    children: [
                        {
                            id: '53',
                            name: '平板电脑',
                        },
                        {
                            id: '54',
                            name: '笔记本',
                        },
                        {
                            id: '55',
                            name: '硬盘',
                        },
                    ],
                },
            ],
            props: {
                label: 'name',
                value: 'id',
                emitPath: false,
                //checkStrictly: true,
                children: "children"

            },
        }

    },

    resuleData() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredtableData.slice(startIndex, endIndex);
    },
    filteredtableData() {
        if (this.searchText) {
            return this.tableData.filter((item) => {
                return String(item.id).includes(String(this.searchText));
            });
        } else {
            return this.tableData;
        }
    },
    methods: {
        formatType(type) {
            if (type === 0) {
                return '全场赠券';
            } else if (type === 1) {
                return '会员赠券';
            } else if (type === 2) {
                return '购物赠券';
            } else {
                return "注册赠券";
            }
        },
        formatUseType(useType) {
            if (useType === 0) {
                return '全场通用';
            } else if (useType === 1) {
                return '指定分类';
            } else {
                return '指定商品';
            }
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
        formatDate(time) {
            if (time == null || time === '') {
                return 'N/A';
            }
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd')
        },
        formatStatus(endTime) {
            let now = new Date().getTime();
            let endDate = new Date(endTime);
            if (endDate > now) {
                return '未过期'
            } else {
                return '已过期';
            }
        },
        findPage() {
            getList(this.requestData).then(res => {
                this.resuleData = res.data.page
            })

        },
        //改变数据量
        handleSizeChange(val) {
            this.requestData.size = val
            this.findPage()
        },
        //改变页码
        handleCurrentChange(val) {
            this.requestData.current = val
            this.findPage()
        },
        //打开弹窗
        showDialog() {
            this.isEdit = false
            this.itemData = {}
            this.dialogVisible = true
        },

        //确认按钮
        confirm() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    //获取当前的时间为创建事件
                    this.itemData.createTime = new Date()
                    //调用新增接口
                    save(this.itemData).then(res => {
                        //新增成功时
                        if (res.code === 1) {

                            this.dialogVisible = false
                            ElMessage({
                                message: '新增成功',
                                type: 'success',
                            })
                            this.findPage()
                        } else {
                            ElMessage({
                                message: '新增失败',
                                type: 'error',
                            })
                        }
                    })
                } else {
                    return false
                }
            })

        },
        //取消按钮
        confire() {
            this.dialogVisible = false
            this.itemData = {}
        },
        //修改 
        showEdit(val) {
            this.isEdit = true
            this.itemData = {
                id: val.id,
                type: val.type,
                name: val.name,
                platform: val.platform,
                count: val.count,
                amount: val.amount,
                perLimit: val.perLimit,
                minPoint: val.minPoint,
                startTime: val.startTime,
                endTime: val.endTime,
                useType: val.useType,
                note: val.note,
                publishCount: val.publishCount,
                useCount: val.useCount,
                receiveCount: val.receiveCount,
                enableTime: val.enableTime,
                code: val.code,
                memberLevel: val.memberLevel,

            }
            this.dialogVisible = true
        },
        //修改确认按钮
        editConfirm() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    edit(this.itemData).then(res => {
                        if (res.code === 1) {
                            this.dialogVisible = false
                            ElMessage({
                                message: '修改成功',
                                type: 'success',
                            })
                            this.findPage()
                        } else {
                            ElMessage({
                                message: '修改失败',
                                type: 'error',
                            })
                        }
                    })

                } else {
                    return false
                }
            })
        },
        //删除
        del(val) {
            console.log(val)
            ElMessageBox.confirm(
                '是否删除该记录?',
                '删除数据',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                //调用删除接口
                del({
                    id: val.id
                }).then(res => {
                    if (res.code === 1) {
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                        this.findPage()
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '删除失败',
                        })
                    }
                })

            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                })
            })
        },
        //
        // handleChange(){
        //     let nodesInfo = this.$refs['cascader'].getCheckNodes();
        //     console.log(nodesInfo[0].data);
        // },
        //添加优惠商品分类
        //  handleAddProductCategoryRelation(val) {
        //     console.log(this.selectProductCate);

        //     console.log("获取数据");
        //     this.productCategory = {
        //         couponId: val.id,
        //         parentCategoryName: val.parentCategoryName,
        //         productCategoryId: val.productCategoryId,
        //         productCategoryName: val.productCategoryName
        //     }
        //     addCate(productCategory).then(res => {
        //         if (res.success) {
        //             ElMessage(res.msg)
        //         }
        //         else {
        //             ElMessage(res.msg)
        //             return false
        //         }
        //     }).catch(err => {
        //         ElMessage('网络错误联系管理员')
        //     })
        // }
    },
    mounted() {
        this.findPage()
    },
});

</script>

<style></style>