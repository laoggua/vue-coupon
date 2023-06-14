<template>
    <el-aside width="auto">
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose"
            router="true"  >
            <el-menu-item>
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span style="font-weight: bolder;font-size: 20px;">微商城</span>
            </el-menu-item>
            <el-menu-item index="/coupon" >
                    <el-icon>
                        <coin />
                    </el-icon>
                    <span>促销模块</span>
            </el-menu-item>
            <el-menu-item index="/history">
                <el-icon><document /></el-icon>
                <span>促销历史</span>
            </el-menu-item>
            <el-menu-item index="/productrelation">
                <el-icon>
                    <goods />
                </el-icon>
                <span>促销商品</span>
            </el-menu-item>
            <el-menu-item index="/productcategory">
                <el-icon>
                    <grid />
                </el-icon>
                <span>促销商品分类</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <!--main-->
    <el-main>
        <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" >
            <el-menu-item index="0">
                <el-icon :size="60" @click="collapse()">
                    <component :is="icon" />
                </el-icon>

            </el-menu-item>
            <div class="flex-grow" />
            <el-sub-menu index="1">
                <template #title>管理员</template>
                <el-menu-item index="2-1">返回首页</el-menu-item>
                <el-menu-item index="2-2">安全退出</el-menu-item>
                <el-menu-item index="2-3">用户信息</el-menu-item>
            </el-sub-menu>
        </el-menu>
        <RouterView :key="key"></RouterView>

    </el-main>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            isCollapse:false,
            icon: "Expand",
            src: '../../../src/assets/logo.png',
        }
    },
    computed: {
        key() {
            return this.$route.path

        },

    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        collapse() {
            this.isCollapse = !this.isCollapse
        }
    }
});
</script>

<style lang="scss" scoped>
.el-main {
    padding: 0 !important;
}
.flex-grow {
    flex-grow: 1;
}
</style>
