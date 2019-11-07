<template>
  <div class="buySuccess">
    <div class="shoes">
      <img :src="activity.activity_img" alt="">
      <div class="shoesName">
          {{activity.activity_name}}
      </div>
    </div>
    <div class="headerlogo">
      <h5>抢购成功!</h5>
    </div>
    <h5 class="title">我在炒饭以<span>￥{{activity.a_price*1/100}}</span>的价格成功抢购到这双鞋!</h5>
    <div class="myTeamer">
      <div class="myTeamer_left">参与助攻</div>
    </div>
    <div class="heaser_icon">
      <div
        v-for="(key,index) in headerImgs"
        style="width:60px;margin-right: 5px;display: inline-block;text-align: center"
      >
        <img
          style="width:43px;border-radius: 50%"
          :src="key.avatar?key.avatar:key.sex=='2'?'../../static/img/girl_icon.png':'../../static/img/boy_icon.png'"
          :key="index" alt="">
        <p style="text-align: center;font-size: 12px">{{key.user_name}}</p>
      </div>
    </div>
    <div class="bottom_button">
      <div v-tap="buyingWithFriend" class="click_button">
        加入我们
      </div>
    </div>
  </div>
</template>

<script>
    import { Overlay } from 'vant';
    import http from '../http/http'

    export default {
        name: "buySuccess",
        data(){
            return{
                showmodal:false,
                showregister:false,
                activity:{
                    a_price:0,
                    activity_name:0,
                    shoesNumber:0,
                    upNumber:0,
                    join_user:0,
                    chaNumber:0,
                    activity_img:''
                },
                headerImgs:[]
            }
        },
        components:{
            Overlay
        },
        mounted(){
            this.getActiveDetail()
        },
        methods:{
            buyingWithFriend(){
                this.$router.push('home')
            },
            closeModal(){
                this.showmodal = false
            },
            getActiveDetail(){
                let self = this;
                http.post('/order/share_info', { order_id:this.$route.query.id },(res) => {
                    self.activity.a_price=res.data.price || 0;
                    self.activity.activity_name=res.data.goods_name;
                    self.activity.activity_img=res.data.goods_image;
                    self.headerImgs=res.data.join_user || [];
                },(error) => {

                })
            }
        }
    }
</script>

<style scoped lang="less">
  .buySuccess{
    height: 100%;
    background:#f2f2f2;
  }
  .headerlogo{
    width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    box-sizing: border-box;
    h5{
      width: 100%;
      text-align: center;
      color: #FFA700;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .title{
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    color: #727272;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    span{
      color: #FFA700;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .shoesName{
    padding-bottom: 25px;
    text-align: center;
    margin: 0 auto;
    margin-top: 17px;
    width: 90%;
    word-break: break-all;
  }
  .shoes{
    img{
      display: block;
      width: 80%;
      margin: 0 auto;
    }
  }
  .myTeamer{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    padding-left: 18px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFA700;
    margin-top: 17px;
    .myTeamer_left{
      flex: 1;
    }
    .myTeamer_right{
      flex: 1;
      text-align: right;
      img{
        height: 20px;
        vertical-align: middle;
      }
    }
  }
  .groupInfo{
    background: #fff;
    span{
      color: #c20000;
    }
  }
  .teamInfo{
    height: 40px;
    line-height: 40px;
    background: #f6f6f6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    div{
      flex: 1;
      font-size: 12px;
    }
  }
  .click_button{
    background-size: contain;
    width: 350px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
  .heaser_icon{
    padding:10px 23px 10px 23px;
    img{
      flex: 1;
      width: 52px;
      margin-right: 9px;
      margin-bottom: 9px;
    }
  }
  .bottom_button{
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-163px);
    font-weight: bold;
  }
  .click_button{
    width: 307px;
    height: 46px;
    line-height: 46px;
    background: #FFA700;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 80px;
  }
  .heaser_icon p{
    text-align: center;
    font-size: 12px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
