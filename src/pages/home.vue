<template>
    <div class="home">
      <div class="header">
        <div class="container">
          <img class="header_icon" src="../../static/img/logo_icon.png" alt="">
          <a class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #ffffff" >关于Drop</a>
          <a class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #ffffff" >联系我们</a>
          <a class="header_icon_a" href="#" style="font-weight: bold;font-size: 18px;color: #ffffff" >商家入驻</a>
        </div>
      </div>
      <div class="download">
        <div class="container drop_logo_box clearfix">
          <div class="drop_logo_left">
            <img class="drop_logo" src="../../static/img/Slogen.png" alt="">
            <div>
            <div>
              <a href="https://www.pgyer.com/pbFd" target="_blank">
                <img class="andriod" src="../../static/img/andriod.png" alt="">
              </a>
              <a href="https://www.pgyer.com/oq1O" >
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
          <div class="left" >
            <img class="shoese" src="../../static/img/shoes.png" alt="">
          </div>
          <div class="right">
            <img class="erweima" src="../../static/img/erweima.png" alt="">
            <div>
              <a href="https://shop41750000.youzan.com/v2/showcase/homepage?kdt_id=41557832">
                <img class="mail_center" src="../../static/img/mail_center.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="be_a_drop">
        <div class="container">
          <div class="left">
            <img class="be_a_droper_img" src="../../static/img/be_a_droper_img.png" alt="">
          </div>
          <div>

          </div>
        </div>
      </div>
      <div class="copyrator">
        <div class="container">
          <h5>拙朴潮流（北京）科技有限公司</h5>
          <h5>京ICP备14058946号 <span><img class="gongan_icon" src="../../static/img/gan.png" alt=""></span>京公安网安备11010502032474</h5>
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
  background: #000000;
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
    background: #c20000;
    padding-top: 50px;
    box-sizing: border-box;
    .drop_logo_box{
      padding-right: 12px;
      padding-left: 12px;
      box-sizing: border-box;
      .drop_logo_left{
        float: left;
        text-align: center;
       .drop_logo{
         width: 160px;
        margin-bottom: 15px;
       }
       .ios{
         margin-left: 7px;
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

  .container{
    padding: 50px 14px 50px 14px;
    box-sizing: border-box;
  }
  .shoese{
    width: 382/2px;
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
  }
  .copyrator{
    background: #c20000;
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
