<template>
    <div class="common-layout">
        <el-container>
            <Main></Main>
            
        </el-container>
    </div>
</template>
<script>
import Main from '@/layout/coupon/main.vue'
import { defineComponent } from "vue"
export default defineComponent({
    components: {
    Main,
}

});
</script>

<style lang="scss" scoped>
*{
    padding: 0 !important;
    margin: 0 !important;
}

</style>
