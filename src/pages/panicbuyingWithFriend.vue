<template>
    <div class="buyingWithFriend">
      <div class="headerlogo">
        <img src="../../static/img/headerlogo.png" alt="">
      </div>
      <h5 class="title">我在Drop上要以 <span>￥{{activity.price*1/100}}</span>的价格抢购这双鞋</h5>
      <div class="groupInfo">
        <div class="shoes">
          <img :src="activity.activity_img" alt="">
          <div class="shoesName">
           {{activity.activity_name}}
          </div>
          <div class="teamInfo">
              <div  class="teamInfo_item">
                预期购买  <span>{{activity.shoesNumber}}</span> 双
              </div>
              <div class="teamInfo_item">
                团队上限 <span>{{activity.upNumber}}</span> 人
              </div>
              <div class="teamInfo_item">
                参与人数  <span>{{activity.join_user}}</span> 人
              </div>
              <div class="teamInfo_item">
                还差 <span>{{activity.chaNumber}}</span> 人满额
              </div>
          </div>
          <div class="heaser_icon">
            <div
              v-for="(key,index) in headerImgs"
              style="width:43px;margin-right: 5px;display: inline-block">
              <img
                style="width:43px"
                :src="key.img?key.img:key.sex=='2'?'../../static/img/girl_icon.png':'../../static/img/boy_icon.png'"
                :key="index" alt=""
              >
              <p style="text-align: center;font-size: 12px">{{key.user_name}}</p>
            </div>
          </div>
        </div>
      </div>
          <div v-if="!is_join" @click="buyingWithFriend" class="click_button">
             一键帮抢
          </div>
          <div  v-if="is_join" @click="hasJoinThisActivity" class="click_button">
             您已参加此活动
          </div>

<!--      <register-->
<!--        :showregister="showregister"-->
<!--        @close="hideregister"-->
<!--        @done="done"-->
<!--      >-->

<!--      </register>-->
      <Downapp
        v-if="showmodal"
        @close="closeModal"
      >

      </Downapp>
      <van-dialog
        v-model="show"
        title="参与Drop活动"
        @cancel="closeDialog"
        @confirm="do_Help"
        confirm-button-text="一键帮抢"
        show-cancel-button
      >
        <cell-group>
          <Field
            v-model="phoneNumber"
            clearable
            label="手机号"
            placeholder="请输入手机号"
          />
          <Field
            v-model="code"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <Button  @click="showTimeHandle" slot="button" size="small" type="primary">
              {{showTime?time+'s':'发送验证码'}}
            </Button>
          </Field>
        </cell-group>
      </van-dialog>
    </div>
</template>

<script>
  import {Toast,Dialog,Field,Cell, CellGroup,CountDown,Button,Notify} from 'vant'
  import register from './components/register'
  import http from '../http/http'
  import Downapp from './components/downAPP'
    export default {
        name: "panicbuyingWithFriend",
        data(){
            return{
                showregister:false,
                activity:{
                    price:0,
                    activity_name:0,
                    shoesNumber:0,
                    upNumber:0,
                    join_user:0,
                    chaNumber:0,
                    activity_img:''
                },
                is_join:false,
                showmodal:false,
                headerImgs:[],
                show:true,
                phoneNumber:'',
                code:'',
                time:30,
                showTime:false,
                timer:null,
            }
        },
        methods:{
            buyingWithFriend(){
                this.show=true
            },
            hideregister(){
                this.showregister=false
            },
            closeDialog(){
              this.closeDialog=false
            },
            joinThisActivit(){
                let self = this;
                http.post('/activity/do_add_activity_user', {activity_id:this.$route.query.activity_id,inviter:this.$route.query.inviter,u_a_id:this.$route.query.u_a_id,
                  },(res) => {
                    Toast('加入成功！前往下载APP')
                    self.showregister=false
                    setTimeout(()=>{
                        self.$router.push('home')
                    },1000)
                },(error) => {
                    setTimeout(()=>{
                        self.$router.push('home')
                    },3000)
                })
            },
            done({phone,code}){
                let self = this;
                http.post('/user/login', { mobile:phone,codes:code, },(res) => {
                    localStorage.setItem('token',res.data.user_s_id);
                    self.joinThisActivit()
                },(error) => {

                })
            },
            getActiveDetail(){
                let self = this;
                http.post('/activity/h5_activity_info', { id:this.$route.query.id,u_a_id:this.$route.query.u_a_id },(res) => {
                  self.activity.price=res.data.activity.price || 0;
                  self.activity.activity_name=res.data.activity.activity_name;
                  self.activity.shoesNumber=res.data.user_activity.number || 0;
                  self.activity.upNumber=res.data.user_activity.number || 0;
                  self.activity.join_user=res.data.join_user.length || 0;
                  self.activity.chaNumber=(res.data.user_activity.number-res.data.join_user.length) || 0 ;
                  self.activity.activity_img=res.data.activity.image;
                  self.headerImgs=res.data.join_user || [];
                  self.is_join=res.data.is_join;
                },(error) => {

                })
              },
            hasJoinThisActivity(){
                this.showmodal=true
            },
            closeModal(){
                this.showmodal=false
            },
            showTimeHandle(){
                let self = this;
                if(this.showTime){
                    return false;
                }
                http.post('/user/send_message', { mobile:this.phoneNumber },(res) => {
                    Notify({type:'success',message:'发送成功'})
                    self.timeStart()
                },(error) => {
                    Notify({type:'danger',message:'发送失败请重试！'})
                })

            },
            timeStart(){
                let self =this;
                this.showTime = true;
                self.timer && clearInterval(self.timer)
                this.timer = setInterval(()=>{
                    self.time--
                    if(self.time === 0){
                        self.showTime = false;
                        clearInterval(self.timer)
                        self.time = 30
                    }
                },1000)
            },
            do_Help(){
                var phoneReg = /(^1[3|4|5|7|8|9|6]\d{9}$)|(^09\d{8}$)/;
                if (!phoneReg.test(this.phoneNumber)) {
                    Notify({ type: 'danger', message: '手机号格式错误！' });
                    return false;
                }
                this.done({phone:this.phoneNumber,code:this.code})
            },
              },

        components:{
            [Dialog.Component.name]: Dialog.Component,
            register,
            Button,
            Downapp,
            Field,
            Cell,
            CellGroup

        },

        mounted(){
            this.getActiveDetail()
        },
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
    padding:10px 23px 10px 23px;
    img{
      display: inline-block;
      width: 52px;
      margin-right: 9px;
    }
  }
  .click_button{
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
