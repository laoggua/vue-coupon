import{aM as d,aN as C,f as y,t as b,D as H,S as s,x as i,F as g,Q as n,H as u}from"./index-c200799f.js";import{l as z,v as l,w as T,x as _,y as S,q as w}from"./el-table-column-2588da31.js";import{f as D}from"./date-bcd44b75.js";const E=e=>d.request({url:"/mall/sms-coupon-history/page",method:"POST",data:e}),k=e=>d.request({url:"/mall/sms-coupon-history/del/"+e.id,method:"GET"}),V=e=>d.request({url:"/mall/sms-coupon-history/edit",method:"POST",data:e}),v=y({data(){return{couponHistories:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,couponHistory:{},formLabelWidth:80}},mounted(){this.getCouponHistories(1)},methods:{formatDate(e){if(e==null||e==="")return"N/A";let t=new Date(e);return D(t,"yyyy-MM-dd")},formatType(e){return e===0?"后台赠送":"主动获取"},formatStatus(e){return status===0?"未使用":status===1?"已使用":"已过期"},toEdit(e){console.log(this.couponHistory),this.dialogFormVisible=!0,this.couponHistory=z(this.couponHistory)},formatPlatform(e){return e===1?"移动平台":e===2?"PC平台":"全平台"},getCouponHistories(e){const t={current:this.page.current,size:this.page.size};E(t).then(r=>{console.log(r);const p=r.data.page;this.couponHistories=p.records,this.page=p}).catch(r=>{console.log(r)})},currentchange(e){this.getCouponHistories(e),this.page.current=e},handleSizeChange(e){this.getCouponHistories(),this.couponHistories.size=e},toDel(e){console.log(e),k({id:e}).then(r=>{if(r.success)this.getCouponHistories(this.page.current),this.page.total%this.page.size==1?this.getCouponHistories(this.page.current-1):this.getCouponHistories(this.page.current);else return console.log(r.msg),!1}).catch(r=>{})},toAdd(){this.dialogFormVisible=!0,this.couponHistory={couponCode:"",couponId:0,createTime:"",getType:0,id:0,memberId:0,memberNickname:"",orderId:0,orderSn:"",useStatus:0,useTime:""}},toSave(){const e=this.couponHistory;e.id==0?add(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCouponHistories(this.page.current),l(t.msg);else return l(t.msg),!1}).catch(t=>{l("网络错误联系管理员")}):V(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCouponHistories(this.page.current),l(t.msg);else return l(t.msg),!1}).catch(t=>{l("网络错误联系管理员")})}}}),N={style:{margin:"0 20px"}},F=g("h2",null,"促销历史",-1),P={style:{margin:"10px 0"}};function $(e,t,r,p,q,B){const a=S,c=w,m=T,h=_;return b(),H("div",N,[F,s(m,{data:e.couponHistories,border:"",style:{width:"100%"}},{default:i(()=>[s(a,{prop:"id",label:"编号",width:"70px"}),s(a,{prop:"couponCode",label:"优惠码",width:"170px"}),s(a,{prop:"memberNickname",label:"领取会员",width:"170px"}),s(a,{prop:"getType",label:"领取方式",width:"100px"},{default:i(o=>[n(u(e.formatType(o.row.createTime)),1)]),_:1}),s(a,{prop:"createTime",label:"领取时间"},{default:i(o=>[n(u(e.formatDate(o.row.createTime)),1)]),_:1}),s(a,{prop:"useStatus",label:"使用状态"},{default:i(o=>[n(u(e.formatStatus(o.row.createTime)),1)]),_:1}),s(a,{prop:"useTime",label:"使用时间"},{default:i(o=>[n(u(e.formatDate(o.row.useTime)),1)]),_:1}),s(a,{prop:"orderId",label:"订单编号"}),s(a,{fixed:"right",label:"操作"},{default:i(o=>[s(c,{size:"small",disabled:"",onClick:f=>e.toEdit(o.row)},{default:i(()=>[n("编辑")]),_:2},1032,["onClick"]),s(c,{size:"small",disabled:"",type:"danger",onClick:f=>e.toDel(o.row.id)},{default:i(()=>[n("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),g("div",P,[s(h,{"current-page":e.page.current,"onUpdate:currentPage":t[0]||(t[0]=o=>e.page.current=o),"page-size":e.page.size,"onUpdate:pageSize":t[1]||(t[1]=o=>e.page.size=o),"page-sizes":[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper",total:e.page.total,onSizeChange:e.handleSizeChange,onCurrentChange:e.currentchange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])])])}const L=C(v,[["render",$]]);export{L as default};