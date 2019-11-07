<template>
   <div class="shareMyShoese">
     <img
          v-if="showmask"
          src="../../static/img/inwechat.png"
          style="position:fixed;left:0;top:0;width: 100%;height: 100%;z-index: 1;opacity: 0.6"
          alt="">
     <Row class="myshoesList" >
       <Col span="5">
         <div>
           <img style="width: 55px;border-radius: 50%" :src="user.avatar" alt="">
         </div>
       </Col>
       <Col span="19">
         <Row >
           <Col style="font-size: 16px">
             {{user.user_name}}
           </Col>
         </Row>
         <Row >
           <Col style="font-size: 14px;margin-top: 11px">
             销售中：<span style="color: #FF9600">{{user.count}}</span>双
           </Col>
         </Row>
       </Col>
     </Row>
        <Row class="myshoesList" v-for="(key,index) in shoelist" :key="index">
          <Col span="10">
            <div>
              <img style="width: 113px" :src="key.image" alt="">
            </div>
          </Col>
          <Col span="14">
            <Row >
              <Col span="6">
                <img v-if="key.is_stock==2" style="width: 41px" src="../../static/img/qihuo.png" alt="">
                <img v-if="key.is_stock==1" style="width: 41px" src="../../static/img/xianhuo.png" alt="">
              </Col>
              <Col span="18" style="font-size: 12px">
                {{key.goods_name}}
              </Col>
            </Row>
            <Row style="margin-top: 30px">
              <Col span="6">
                size:{{key.size}}
              </Col>
              <Col span="18"  style="text-align: right">
                <Button @click="openApp(key.free_id)" size="small"  color="#FFA700">去APP购买</Button>
              </Col>
            </Row>
          </Col>
        </Row>
   </div>
</template>
<script>
    import { Row, Col,Button } from 'vant';
    import http from '../http/http'
    export default {
        name: "shareMyShoese",
        data(){
            return {
                shoelist: [],
                user: {
                    avatar: "",
                    user_name: '',
                    count:0,
                    user_id:''
                },
                showmask:false
            }
        },
        components:{
            Row,
            Col,
            Button
        },
        mounted(){
            this.getUerShoesList();
            this.isWeapp()
        },
        methods:{
           getUerShoesList(){
               let self = this;
               http.post('/free/h5_goods_list', { user_id:this.$route.params.id,pn:1,limit:1000 },(res) => {
                   debugger
                   this.shoelist=res.data.list
                   this.user.user_name=res.data.user.user_name
                   this.user.user_id=res.data.user.user_id
                   this.user.avatar=res.data.user.avatar
                   this.user.count=res.data.count
               },(error) => {

               })
           },
            openApp(free_id){
               // alert(`chaofun://app/freetradebuy/${this.user.user_id}/${free_id}`)
              window.open(`chaofun://app/freetradebuy/${this.user.user_id}/${free_id}`)
            },
            isWeapp(browser){
                var u = navigator.userAgent, app = navigator.appVersion;
               let browerinfo = {         //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部,
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
                };
                if (browerinfo.mobile) {//判断是否是移动设备打开。browser代码在下面
                    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        //在微信中打开
                        this.showmask = true
                    }
                    if (ua.match(/WeiBo/i) == "weibo") {
                        //在新浪微博客户端打开
                    }
                    if (ua.match(/QQ/i) == "qq") {
                        //在QQ空间打开
                    }
                    if (browerinfo.ios) {
                        //是否在IOS浏览器打开
                    }
                    if(browerinfo.android){
                        //是否在安卓浏览器打开
                    }
                } else {
                    //否则就是PC浏览器打开
                }
            }
        }
    }
</script>

<style scoped>
.shareMyShoese{
  height: 100%;
  background: #F2F2F2;
  padding: 9px;
  box-sizing: border-box;
}
.myshoesList{
  padding: 12px;
  box-sizing: border-box;
   background: #ffffff;
  margin-top: 7px;
}
</style>
