<template>
  <div class="downAPP_mask"  v-tap.self="closeModal"  >
    <div class="downAPP">
      <img class="bg" src="../../../static/img/modal_bg.png" alt="">
      <img class="drop_logo" src="../../../static/img/drop_logo.png" alt="">
      <div class="app_icon" >
        <div class="form_item">
          <input type="text" v-model="phoneNumber" placeholder="手机号">
        </div>
        <div class="form_item_code form_item">
          <input v-model="code" style="width: 50%" class="item" type="text" placeholder="验证码">
          <Button @click="showTimeHandle" class="item" size="small" type="default" v-if="!showTime">
           <span  >获取验证码</span>
          </Button>
          <Button class="item" size="small" type="default" v-if="showTime">
            <span >{{time}}s</span>
          </Button>
        </div>
      </div>
        <img v-tap="closeModal" class="close_button" src="../../../static/img/close_button.png" alt="">
        <img v-tap="do_Help" class="downloadNow" src="../../../static/img/helpNow.png" alt="">
        </div>
   </div>
</template>

<script>
    import { CountDown,Button,Notify } from 'vant';
    import http from '../../http/http'
    export default {
        name: "register",
        data(){
            return{
                phoneNumber:'19952005387',
                code:'',
                time:2,
                showTime:false,
                timer:null
            }
        },
        methods:{
            closeModal(){
                this.$emit('close')
            },
            showTimeHandle(){
                http('/user/send_message', {type:'', params: { mobile:this.phoneNumber } }).then((res) => {
                debugger
                }).catch((error) => {
                    debugger
                });
                this.timeStart()
            },
            timeStart(){
                let self =this;
                this.showTime = true;
                self.timer?clearInterval(self.timer):null
                this.timer = setInterval(()=>{
                    self.time--
                    if(self.time === 0){
                        self.showTime = false;
                        clearInterval(self.timer)
                        self.time = 1
                    }
                },1000)
            },
            do_Help(){
                var phoneReg = /(^1[3|4|5|7|8|9|6]\d{9}$)|(^09\d{8}$)/;
                if (!phoneReg.test(this.phoneNumber)) {
                    Notify({ type: 'danger', message: '手机号格式错误！' });
                    return false;
                }
                this.$emit('done',{phone:this.phoneNumber,code:this.code})
            },

        },
        components:{
            CountDown,
            Button
        }
    }
</script>

<style scoped lang="less">
  .downAPP{
    width: 80%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .downAPP_mask{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.5);
  }
  .bg{
    width: 100%;
  }
  .drop_logo{
    width: 45%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
  }
  .downAPP_now{
    width: 127px;
    height: 47px;
  }
  .close_button{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 34px;
    transform: translateX(40%) translateY(-30%);
  }
  .app_icon{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translateX(-50%) translateY(-65%);
  }
  .downloadNow{
    position: absolute;
    left: 50%;
    bottom:10%;
    width: 50%;
    transform: translateX(-50%);
  }
  .form_item{
    display: flex;
    font-size: 13px;
    input{
      border: none;
      border-bottom: 1px solid #eeeeee;
    }

  }
  .form_item_code{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
   .item{

   }

  }

</style>
