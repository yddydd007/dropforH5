<template>
    <div class="home">
      <div class="header">
        <div class="container">
          <img class="header_icon" src="../../static/img/logo.png" alt="">
          <a @click="noButton" class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #000" >关于炒饭</a>
          <a @click="noButton('kefu')" class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #000" >联系我们</a>
          <a @click="noButton" class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #000" >商家入驻</a>
        </div>
      </div>
      <div class="download">
        <div class="container drop_logo_box clearfix">
          <div class="drop_logo_left">
            <img class="drop_logo" src="../../static/img/logo.png" alt="">
            <h5 >让球鞋变得更简单！</h5>
            <div>
            <div style="margin-top: 15px">
              <a href="https://www.pgyer.com/whnI" target="_blank">
                <img class="andriod" src="../../static/img/andriod.png" alt="">
              </a>
              <a href="https://www.pgyer.com/4i4h" >
                <img class="ios" src="../../static/img/ios.png" alt="">
              </a>
            </div>
          </div>
          </div>
          <div class="drop_logo_right ">
            <img class="phone" src="../../static/img/phone.png" alt="">
          </div>
        </div>
      </div>
      <div class="mailcenter">
        <div class="container clearfix">
            <img class="shoese" src="../../static/img/shoes.png" alt="">
          <div style="text-align: center;margin-top: 17px">
            <img @click="enterToH5Mail" style="width: 128px" src="../../static/img/mailenter.png" alt="">
          </div>
        </div>
      </div>
      <div class="be_a_drop">
        <div class="container">
          <div class="left">
            <h5>原价发售</h5>
            <h5>球鞋锦鲤</h5>
            <h5>欢迎加入 <span >炒饭</span></h5>
          <div>
          </div>
          </div>
        </div>
      </div>
      <div class="copyrator">
        <div class="container">
          <h5>酱爆潮流（北京）科技有限公司</h5>
          <h5>京ICP备14058946号<span><img class="gongan_icon" src="../../static/img/gan.png" alt=""></span>京公安网安备11010502032474</h5>
        </div>

      </div>
    </div>
</template>

<script>
  import {Row,Col,Toast} from 'vant'
    export default {
        name: "home",
        components:{
            Row,
            Col
        },
        methods:{
            downloadIOS(){
                Toast('尽情期待！')
            },
            noButton(type){
                if(type == 'kefu'){
                   window.open('https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=1288733&configID=47991&jid=4165914525&lan=zh&subject=%E5%92%A8%E8%AF%A2&prechatinfoexist=1&s=1')
                }else if('about') {
                   this.$router.push('aboutus')
                }else {
                    Toast('尽情期待！')
                }

            },
            enterToH5Mail(){
                Toast('尽情期待！')
            }
        }
    }
</script>

<style scoped lang="less">
.container{
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
}
.header_icon{
  width: 58/2px;
  vertical-align: middle;
  margin-left: 13px;
}

.header{
  padding-top: 14px;
  padding-bottom: 14px;
  .container{
    text-align: center;
  }
}
.header_icon_a{
  vertical-align: middle;
  margin-left: 25px;
}

.block{
  display: block;
}
.flex1{
  flex: 1;
}
 .left{
    float: left;
}
 .right{
   float: right;
 }
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  .clearfix{
    zoom: 1;
  }
  .download{
    background: #FF7800;
    padding-top: 50px;
    box-sizing: border-box;
    .drop_logo_box{
      padding-right: 12px;
      padding-left: 12px;
      box-sizing: border-box;
      .drop_logo_left{
        float: left;
        text-align: center;
        padding-top: 20px;
       .drop_logo{
        width: 73px;
       }
       .ios{
         margin-left: 7px;
       }
        h5{
          font-size: 20px;
          color: #ffffff;
        }
      }
      .drop_logo_right{
        float: right;
        position: relative;
        .phone{
          display: block;

        }
      }
    }

   .drop_logo{
     width: 338/2px;
   }
   .andriod,.ios{
    width: 85px;

   }
    .phone{
      width: 302/2px;
    }
  }
.mailcenter{
  background: #ffffff;
  .container{
    padding: 20px 14px 15px 14px;
    box-sizing: border-box;
  }
  .shoese{
    width: 90%;
    margin: 0 auto;
    display: block;
  }
  .erweima{
    width: 130px;
  }
  .mail_center{
    width: 256/2px;
  }
  .left{

  }
}
  .be_a_drop{
    height: 220px;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 56/2px;
    box-sizing: border-box;
    background: url("../../static/img/bg_2.png") no-repeat;
    background-size: cover;
    .be_a_droper_img{
      width: 308/2px;
    }
    h5{
      color: #ffffff;
      font-size: 31px;
      span{
        color: #FF7800;
      }
    }
  }
  .copyrator{
    background: #FF7800;
    color: #ffffff;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
    h5{
     text-align: center;
     line-height: 30px;
    }
  }
  .gongan_icon{
    width: 15px;
    vertical-align: middle;
    padding: 5px;
  }
  a{
    display: inline-block;
  }
</style>
