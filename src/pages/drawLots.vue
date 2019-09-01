<template>
    <div class="drawlots">
     <p>中签率原则：单日最高提升幅度为基准倍数的1倍</p>
     <p>1.如何提升中签率（以单个账号为单位，基准为1倍，涨幅均为倍数提升）</p>
     <p>分享原价购活动（+0.03/次，一天最多5次）</p>
     <p>分享锦鲤（+0.03/次，一天最多5次）</p>
     <p>发起助攻（+0.01/次，一天最多10次）</p>
     <p>分享预定（+0.03/次，一天最多5次）</p>
     <p>交易结束分享（+0.01/次）</p>
     <p>未中签累计（+0.01/次）</p>
     <p>参与活动助攻（+0.02/次）</p>
     <p>邀请新用户注册（+0.05/次，一天最多5次）</p>
     <p>2.中签率降低行为（以单个账号为单位，基准为1倍，跌幅均为倍数下降，不足1倍的自动回到1倍）</p>
     <p>中签=回归基准倍数</p>
     <p>放弃预定购买（-0.5/次）</p>
     <p>退货+退款（-0.5/次）</p>
    </div>
</template>

<script>
    export default {
        name: "drawLots"
    }
</script>

<style scoped>
.drawlots{
  padding: 20px 10px 50px 10px;
}
h5{
  line-height: 26px;
  font-size: 16px;
}
p{
  line-height: 28px;
  text-align: left;
}
.important{
  font-size: 16px;
  font-weight: bold;
}
</style>
