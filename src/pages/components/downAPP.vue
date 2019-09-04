<template>
  <div class="downAPP_mask"  v-tap.self="closeModal"  >
    <div class="downAPP">
      <img class="bg" src="../../../static/img/modal_bg.png" alt="">
      <img class="drop_logo" src="../../../static/img/drop_logo.png" alt="">
      <img class="app_icon" src="../../../static/img/app_icon.png" alt="">
      <img class="close_button" src="../../../static/img/close_button.png" alt="">
      <img class="downloadNow" src="../../../static/img/downloadNow.png" alt="">
    </div>
  </div>

</template>

<script>
    export default {
        name: "downAPP",
        data(){
            return{

            }
        },
        methods:{
            closeModal(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
.downAPP{
    width: 80%;
    position: absolute;
    top: 50%;
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
  width: 55%;
  transform: translateX(-50%) translateY(-65%);
}
.downloadNow{
  position: absolute;
  left: 50%;
  bottom:10%;
  width: 50%;
  transform: translateX(-50%);
}

</style>
