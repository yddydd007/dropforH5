<template>
    <div class="buyingWithFriend">
      <div class="groupInfo">
        <div class="shoes">
          <img :src="activity.activity_img" alt="">
          <div class="shoesName">
           {{activity.activity_name}}
          </div>
          <div class="helpmeTitle">
            <div class="flex1">
              <img  style="width: 47px;" src="../../static/img/chaofan_icon.png" alt="">
            </div>
            <div class="flex5">
              <h5 class="title ">快来<span @click="linkHome" class="our_logo">炒饭</span>帮我抢鞋吧!</h5>
              <h5 class="title ">帮抢成功后你将获得<span class="our_logo">{{activity.commission*1/100}}</span>元佣金</h5>
            </div>
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
              style="width:60px;margin-right: 5px;display: inline-block;text-align: center">
              <img
                style="width:43px;border-radius: 50%"
                :src="key.avatar?key.avatar:key.sex=='2'?'../../static/img/girl_icon.png':'../../static/img/boy_icon.png'"
                :key="index" alt=""
              >
              <p style="text-align: center;font-size: 12px">{{key.user_name}}</p>
            </div>
          </div>
        </div>
      </div>
          <div v-if="!is_join && this.$route.query.pay == 1" @click="buyingWithFriend" class="click_button">
             {{is_join?'您已参加此活动':'一键帮抢'}}
          </div>
          <div v-if="this.$route.query.pay == 0" @click="hasJoinThisActivity"  class="click_button" style="margin-top: 20px">
            下载APP参与活动
          </div>

<!--      <Downapp-->
<!--        v-if="showmodal"-->
<!--        @close="closeModal"-->
<!--      >-->

<!--      </Downapp>-->
      <van-dialog
        v-model="show"
        title="参与炒饭APP活动"
        @cancel="closeDialog"
        :beforeClose="do_Help"
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
            :maxlength="6"
          >
            <Button  @click="showTimeHandle" slot="button" size="small" type="primary">
              {{showTime?time+'s':'发送验证码'}}
            </Button>
          </Field>
        </cell-group>
      </van-dialog>
<!--      是否前往下载APP-->

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
                    activity_img:'',
                    commission:0
                },
                is_join:false,
                showmodal:false,
                headerImgs:[],
                show:false,
                phoneNumber:'',
                code:'',
                time:30,
                showTime:false,
                timer:null,
            }
        },
        methods:{
            buyingWithFriend(){
                let self = this;
                if(localStorage.getItem('phone') && localStorage.getItem('token')){
                    http.post('/user/index', {
                    },(res) => {
                        Dialog.confirm({
                            cancelButtonText:'切换账号',
                            message: `是否使用${localStorage.getItem('phone')}参与活动？`,
                            beforeClose:(action, done)=>{
                                if(action == 'cancel'){
                                    self.show=true;
                                    done();
                                }else {
                                    done();
                                }
                            }
                        }).then(() => {
                            self.joinThisActivit()
                        }).catch(() => {
                            self.show=true
                        });

                    },(error) => {
                        self.show=true
                    })
                }else {
                    this.show=true
                }
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
                    self.getActiveDetail();
                    self.showregister=false;
                    Dialog.confirm({
                        message: '加入成功，是否跳转到APP下载页面！'
                    }).then(() => {
                        self.$router.push('home');
                    }).catch(() => {

                    });
                },(error) => {
                    self.showregister=false;
                    Dialog.confirm({
                        message: error.message+'是否跳转到APP下载页面！'
                    }).then(() => {
                        self.$router.push('home');
                    }).catch(() => {

                    });
                })
            },
            done({phone,code,done}){
                let self = this;
                http.post('/user/login', { mobile:phone,codes:code, },(res) => {
                    done()
                    localStorage.setItem('token',res.data.user_s_id);
                    localStorage.setItem('phone',res.data.mobile);
                    self.joinThisActivit()
                },(error) => {
                    done(false)
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
                  self.activity.commission=res.data.user_activity.commission?res.data.user_activity.commission:0;
                  self.headerImgs=res.data.join_user || [];
                  self.is_join=res.data.is_join;
                },(error) => {

                })
              },
            hasJoinThisActivity(){
                this.$router.push('home')
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
            do_Help(action, done){
                if (action === 'confirm') {
                    var phoneReg = /(^1[3|4|5|7|8|9|6]\d{9}$)|(^09\d{8}$)/;
                    if (!phoneReg.test(this.phoneNumber)) {
                        Notify({ type: 'danger', message: '手机号格式错误！' });
                        done(false)
                        return false;
                    }
                    this.done({
                        phone:this.phoneNumber,
                        code:this.code,
                        done:done
                    })
                } else {
                    done();
                }

            },
            linkHome(){
                this.$router.push('home')
            }
              },

        components:{
            [Dialog.Component.name]: Dialog.Component,
            register,
            Button,
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
}
.groupInfo{
  background: #fff;
  span{
    color: #FFA700;
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
.heaser_icon{
    padding:10px 23px 10px 23px;
    img{
      display: inline-block;
      width: 52px;
      margin-right: 9px;
    }
  }
.heaser_icon p{
  text-align: center;
  font-size: 12px;
  word-break: keep-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
    color: #FFA700;
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
  text-align: center;
  border-radius: 4px;
}
.heaser_icon p{
  text-align: center;
  font-size: 12px;
  word-break: keep-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.our_logo{

 }
.helpmeTitle{
   display: flex;
   padding-left: 15px;
   margin-bottom: 15px;
   box-sizing: border-box;
   .flex1{
     flex: 1;
     padding-top: 8px;
   }
  .flex5{
    flex: 5;
    .title{
      text-align: left;
    }
  }
  }
</style>
