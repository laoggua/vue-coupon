import{aM as m,aN as V,f as z,t as w,D as P,F as u,S as o,x as l,O as E,Q as i}from"./index-c200799f.js";import{c as _,d as F,e as N}from"./el-form-item-d004586a.js";import{l as k,v as s,q as v,w as S,x as I,y as T,E as U}from"./el-table-column-2588da31.js";const $=e=>m.request({url:"/mall/sms-coupon-product-category-relation/page",method:"POST",data:e}),L=e=>m.request({url:"/mall/sms-coupon-product-category-relation/add",method:"POST",data:e}),q=e=>m.request({url:"/mall/sms-coupon-product-category-relation/del/"+e.id,method:"GET"}),D=e=>m.request({url:"/mall/sms-coupon-product-category-relation/edit",method:"POST",data:e}),W=z({data(){return{productCates:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,productCate:{},formLabelWidth:80}},mounted(){this.getCouponProductCategory(1)},methods:{toEdit(e){this.dialogFormVisible=!0,this.productCate=k(e)},getCouponProductCategory(e){const t={current:this.page.current,size:this.page.size};$(t).then(r=>{console.log(r);const c=r.data.page;this.productCates=c.records,this.page=c}).catch(r=>{console.log(r)})},currentchange(e){this.getCouponProductCategory(e),this.page.current=e},handleSizeChange(e){this.getCouponProductCategory(),this.productCates.size=e},toDel(e){console.log(e),q({id:e}).then(r=>{if(r.success)this.getCouponProductCategory(this.page.current),this.page.total%this.page.size==1?this.getCouponProductCategory(this.page.current-1):this.getCouponProductCategory(this.page.current);else return console.log(r.msg),!1}).catch(r=>{})},toAdd(){this.dialogFormVisible=!0,this.productCate={couponId:0,id:0,parentCategoryName:"",productCategoryId:0,productCategoryName:""}},toSave(){const e=this.productCate;e.id==0?L(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCouponProductCategory(this.page.current),s(t.msg);else return s(t.msg),!1}).catch(t=>{s("网络错误联系管理员")}):D(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCouponProductCategory(this.page.current),s(t.msg);else return s(t.msg),!1}).catch(t=>{s("网络错误联系管理员")})}}}),B={style:{margin:"0 20px"}},O=u("h2",null,"促销商品分类",-1),A={style:{margin:"30px 0"}},M={style:{margin:"10px 0"}},j={class:"dialog-footer"};function G(e,t,r,c,Q,H){const d=v,n=T,C=S,h=I,p=U,g=F,f=N,b=_;return w(),P(E,null,[u("div",B,[O,u("div",A,[o(d,{type:"primary",onClick:e.toAdd},{default:l(()=>[i("添加")]),_:1},8,["onClick"])]),o(C,{data:e.productCates,border:"",style:{width:"100%"}},{default:l(()=>[o(n,{prop:"id",label:"编号",width:"70px"}),o(n,{prop:"couponId",label:"优惠券编号",width:"170px"}),o(n,{prop:"parentCategoryName",label:"父分类名称",width:"170px"}),o(n,{prop:"productCategoryId",label:"分类编号"}),o(n,{prop:"productCategoryName",label:"产品分类名称"}),o(n,{fixed:"right",label:"操作"},{default:l(a=>[o(d,{size:"small",onClick:y=>e.toEdit(a.row)},{default:l(()=>[i("编辑")]),_:2},1032,["onClick"]),o(d,{size:"small",type:"danger",onClick:y=>e.toDel(a.row.id)},{default:l(()=>[i("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),u("div",M,[o(h,{"current-page":e.page.current,"onUpdate:currentPage":t[0]||(t[0]=a=>e.page.current=a),"page-size":e.page.size,"onUpdate:pageSize":t[1]||(t[1]=a=>e.page.size=a),"page-sizes":[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper",total:e.page.total,onSizeChange:e.handleSizeChange,onCurrentChange:e.currentchange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])])]),o(b,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":t[7]||(t[7]=a=>e.dialogFormVisible=a),title:"促销产品分类编辑"},{footer:l(()=>[u("span",j,[o(d,{onClick:t[6]||(t[6]=a=>e.dialogFormVisible=!1)},{default:l(()=>[i("取消")]),_:1}),o(d,{type:"primary",onClick:e.toSave},{default:l(()=>[i(" 保存 ")]),_:1},8,["onClick"])])]),default:l(()=>[o(f,{model:e.productCate},{default:l(()=>[o(g,{label:"优惠券编号","label-width":e.formLabelWidth},{default:l(()=>[o(p,{modelValue:e.productCate.couponId,"onUpdate:modelValue":t[2]||(t[2]=a=>e.productCate.couponId=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(g,{label:"父分类名称","label-width":e.formLabelWidth},{default:l(()=>[o(p,{modelValue:e.productCate.parentCategoryName,"onUpdate:modelValue":t[3]||(t[3]=a=>e.productCate.parentCategoryName=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(g,{label:"分类编号","label-width":e.formLabelWidth},{default:l(()=>[o(p,{modelValue:e.productCate.productCategoryId,"onUpdate:modelValue":t[4]||(t[4]=a=>e.productCate.productCategoryId=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),o(g,{label:"产品分类名称","label-width":e.formLabelWidth},{default:l(()=>[o(p,{modelValue:e.productCate.productCategoryName,"onUpdate:modelValue":t[5]||(t[5]=a=>e.productCate.productCategoryName=a),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const X=V(W,[["render",G]]);export{X as default};
