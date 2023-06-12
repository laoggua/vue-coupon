<template>
    <div style="margin:0 20px">
        <h2>促销商品关联</h2>
        <div style="margin:30px 0">
            <el-button type="primary" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="products" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="70px"></el-table-column>
            <el-table-column prop="couponId" label="优惠券编号" width="170px"></el-table-column>
            <el-table-column prop="productId" label="商品编号" width="170px"></el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="productSn" label="商品编码">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="toEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin:10px 0">
            <el-pagination v-model:current-page="page.current" v-model:page-size="page.size" :page-sizes="[5, 10, 15, 20]"
                layout="total, sizes, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange"
                @current-change="currentchange" />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="促销产品关联编辑">
        <el-form :model="product">
            <el-form-item label="优惠券编号" :label-width="formLabelWidth">
                <el-input v-model="product.couponId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品编号" :label-width="formLabelWidth">
                <el-input v-model="product.productId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="product.productName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商品编码" :label-width="formLabelWidth">
                <el-input v-model="product.productSn" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="toSave">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { getList, getOne, save, del, edit, } from "../../http/smsCouponProductRelation";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            products: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            product: {},
            formLabelWidth: 80

        }
    },
    mounted() {
        this.getCouponProductRelation(1)
    },
    methods: {
        toEdit(product) {
            this.dialogFormVisible = true;
            this.product = cloneDeep(product);
        },
        getCouponProductRelation(current) {
            const data = {
                current: this.page.current,
                size: this.page.size
            }
            getList(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.products = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getCouponProductRelation(current)
            this.page.current = current;//数据更新目前显示的页面
        },
        //改变数据量
        handleSizeChange(size) {
            this.getCouponProductRelation()
            this.products.size = size

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
                    this.getCouponProductRelation(this.page.current)
                    //当前分页数据只剩一条时删除返回上一页
                    if (this.page.total % this.page.size == 1)
                        this.getCouponProductRelation(this.page.current - 1)
                    else {
                        this.getCouponProductRelation(this.page.current)
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
            this.product = {
                "couponId": 0,
                "id": 0,
                "productId": 0,
                "productName": "",
                "productSn": ""
            };
        },
        toSave() {
            const product = this.product;
            if (product.id == 0) {
                save(product).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCouponProductRelation(this.page.current)
                        ElMessage({
                            message:'新增成功',
                            type: 'success'
                        })
                    }
                    else {
                            ElMessage({
                                message:'新增失败',
                                type: 'error'
                        })
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                edit(product).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getCouponProductRelation(this.page.current)
                        ElMessage({
                            message:'修改成功',
                            type: 'success'
                        })
                    }
                    else {
                        ElMessage({
                            message:'修改失败',
                            type: 'false'
                        })
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
