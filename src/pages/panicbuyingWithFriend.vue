<template>
    <div class="buyingWithFriend">
      <div class="headerlogo">
        <img src="../../static/img/headerlogo.png" alt="">
      </div>
      <h5 class="title">我在Drop上要以 <span>￥1999</span>的价格抢购这双鞋</h5>
      <div class="groupInfo">
        <div class="shoes">
          <img src="../../static/img/shoese.png" alt="">
          <div class="shoesName">
            AIR JORDAN 11 2018年复刻版“CONCORD”黑白 康扣
          </div>
          <div class="teamInfo">
              <div  class="teamInfo_item">
                预期购买  <span>5</span> 双
              </div>
              <div class="teamInfo_item">
                团队上限 <span>6</span> 人
              </div>
              <div class="teamInfo_item">
                参与人数  <span>6</span> 人
              </div>
              <div class="teamInfo_item">
                还差 <span>8</span> 人满额
              </div>
          </div>
          <div class="heaser_icon">
            <img src="../../static/img/touxiang.png" v-for="(key,index) in 10" :key="index" alt="">
          </div>
        </div>
      </div>
          <div v-tap="buyingWithFriend" class="click_button">
             一键帮抢
          </div>
      <register
        v-if="showregister"
        @close="hideregister"
      >

      </register>
    </div>
</template>

<script>
  import register from './components/register'
    export default {
        name: "panicbuyingWithFriend",
        data(){
            return{
                showregister:false
            }
        },
        methods:{
            buyingWithFriend(){
                this.showregister=true
            },
            hideregister(){
                this.showregister=false
            }

        },
        components:{
            register
        }
    }
</script>

<style scoped lang="less">
.buyingWithFriend{
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
 font-size: 18px;
 text-align: center;
 padding-bottom: 12px;
  span{
    font-size: 22px;
    font-weight: bold;
    color: #c20000;
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
 background: url("../../static/img/button_bg.png") no-repeat;
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
  .click_button{
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
