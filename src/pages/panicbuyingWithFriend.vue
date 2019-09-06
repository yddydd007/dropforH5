<template>
    <div class="buyingWithFriend">
      <div class="headerlogo">
        <img src="../../static/img/headerlogo.png" alt="">
      </div>
      <h5 class="title">我在Drop上要以 <span>￥{{activity.a_price}}</span>的价格抢购这双鞋</h5>
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
            <img
              style="width:53px;height: 53px"
              v-for="(key,index) in headerImgs"
              :src="key.img"
              :key="index" alt="">
          </div>
        </div>
      </div>
          <div v-if="!is_join" v-tap="buyingWithFriend" class="click_button">
             一键帮抢
          </div>
          <div  v-if="is_join" v-tap="hasJoinThisActivity" class="click_button">
             您已参加此活动
          </div>

      <register
        v-if="showregister"
        @close="hideregister"
        @done="done"
      >

      </register>
      <Downapp
        v-if="showmodal"
        @close="closeModal"
      >

      </Downapp>
    </div>
</template>

<script>
  import {Toast} from 'vant'
  import register from './components/register'
  import http from '../http/http'
  import Downapp from './components/downAPP'
    export default {
        name: "panicbuyingWithFriend",
        data(){
            return{
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
                is_join:false,
                showmodal:false,
                headerImgs:[]
            }
        },
        methods:{
            buyingWithFriend(){
                this.showregister=true
            },
            hideregister(){
                this.showregister=false
            },
            joinThisActivit(){
                let self = this;
                http.post('/activity/do_add_activity_user', {activity_id:this.$route.query.activity_id,inviter:this.$route.query.inviter,u_a_id:this.$route.query.u_a_id,
                  },(res) => {

                    Toast('加入成功！')
                },(error) => {

                })
            },
            done({phone,code}){
                let self = this;
                http.post('/user/login', { mobile:phone,codes:code, },(res) => {
                    debugger
                    localStorage.setItem('token',res.data.user_s_id);
                    self.joinThisActivit()
                },(error) => {

                })
            },
            getActiveDetail(){
                let self = this;
                http.post('/activity/h5_activity_info', { id:this.$route.query.id,u_a_id:this.$route.query.u_a_id },(res) => {
                  self.activity.a_price=res.data.activity.a_price || 0;
                  self.activity.activity_name=res.data.activity.activity_name;
                  self.activity.shoesNumber=res.data.user_activity.number || 0;
                  self.activity.upNumber=res.data.user_activity.number+1 || 0;
                  self.activity.join_user=res.data.join_user.length || 0;
                  self.activity.chaNumber=(res.data.user_activity.number-1-res.data.join_user.length) || 0 ;
                  self.activity.activity_img=res.data.activity.image;
                  self.headerImgs=res.data.join_user || [];
                },(error) => {

                })
              },
            hasJoinThisActivity(){
                this.showmodal=true
            },
            closeModal(){
                this.showmodal=false
            }
              },

        components:{
            register,
            Downapp
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
