<template>
  <div class="buySuccess">
    <div class="headerlogo">
      <img src="../../static/img/buysuccess.png" alt="">
    </div>
    <h5 class="title">我在Drop以<span>￥1999</span>的价格成功抢购到这双鞋!</h5>
    <div class="shoes">
        <div class="shoesName">
          AIR JORDAN 11 2018年复刻版“CONCORD”黑白 康扣
        </div>
        <img src="../../static/img/shoese.png" alt="">
    </div>
    <div class="myTeamer">
      <div class="myTeamer_left">参与助攻的 Dropper</div>
      <div class="myTeamer_right">
        <img src="../../static/img/boyAndGirl.png" alt="">
      </div>
    </div>
    <div class="heaser_icon">
      <img src="../../static/img/touxiang.png" v-for="(key,index) in 10" :key="index" alt="">
    </div>
    <div class="bottom_button">
      <div v-tap="buyingWithFriend" class="click_button">
      </div>


    </div>
    <Downapp
    v-if="showmodal"
    @close="closeModal"
    >

    </Downapp>
  </div>
</template>

<script>
    import { Overlay } from 'vant';
    import Downapp from './components/downAPP'

    export default {
        name: "buySuccess",
        data(){
            return{
                showmodal:false,
            }
        },
        components:{
            Downapp,
            Overlay
        },
        methods:{
            buyingWithFriend(){
                this.showmodal = true
            },
            closeModal(){
                this.showmodal = false
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
    padding-top: 40px;
    padding-left: 25px;
    padding-right: 25px;
    box-sizing: border-box;
    img{
      width: 100%;
    }
  }
  .title{
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background: #c20000;
    color: #ffffff;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    span{
      font-size: 20px;
      font-weight: bold;
    }
  }
  .shoesName{
    padding: 25px;
    text-align: center;

  }
  .shoes{

    img{
      display: block;
      width: 80%;
      margin: 0 auto;
    }
  }
  .myTeamer{
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    background: #c20000;
    color: #ffffff;
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    background: url("../../static/img/be_a_droper.png") no-repeat;
    background-size: contain;
    width: 350px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
  .heaser_icon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding:10px 23px 10px 23px;
    img{
      flex: 1;
      width: 52px;
      margin-right: 9px;
      margin-bottom: 9px;
    }
  }
  .bottom_button{
    font-weight: bold;
    padding-bottom: 30px;
  }
  .click_button{
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
