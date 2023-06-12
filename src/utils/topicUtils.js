import moment from "moment/moment";


export const topicUtils={
    getNowDate(){
        //调用moment  参考官方文档  momentjs.cn
        // return moment().format("YYYY-MMMM-Do hh:mm:ss a");
        moment.locale("zh-cn");
        return moment().format("YYYY-MM-DDTHH:mm:ss");

    },

}