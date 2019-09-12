<template>
<div class="autarkyRule">
  <img @click="timestart" src="../../static/img/WechatIMG7.jpg" alt="">
  <img @click="clear" src="../../static/img/WechatIMG8.jpg" alt="">
</div>
</template>

<script>
    export default {
        name: "drop",
        data(){
          return{
              timer:null,
              a:1
          }
        },
        mounted(){
            this.timestart()
        },
        methods:{
           timestart(){
               this.a=1
               this.clear();
               this.timer =  JSON.parse(JSON.stringify(this.timer))
               this.timer = window.setInterval(()=>{
                   console.log(this.a++)
               },1000)
           },
          clear() {
              this.timer && window.clearInterval(this.timer)
              this.timer = null
            }
        }
    }
</script>

<style scoped>
img{
  width: 100%;
}
</style>
