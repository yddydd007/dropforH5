<template>
  <div class="buyer">
   <p>炒饭——买家须知</p>
   <p>一、交易流程</p>
   <p>1.买家通过平台购买商品</p>
   <p>2.第三方供货商发货至平台</p>
   <p>3.平台查验商品</p>
   <p>4.平台发货至买家</p>
   <p>5.买家签收（签收根据物流信息为准）</p>
   <p>（二）买家知悉并同意委托平台对商品进行查验，平台在商品查验通过后即可将买家支付的商品款支付给第三方供货商。</p>
   <p>二、发货时效</p>
   <p>（三）预售商品：卖家须在买家下单后规定时间内（最长35日），使用平台要求的快递将商品邮寄至平台指定的地点进行查验。</p>
   <p>四、买家违约应承担的赔付责任</p>
   <p>（一）交易达成后，在发货期内，买家若自主关闭交易，根据如下具体情形，需要支付对应的违约金给卖家及平台。</p>

  </div>
</template>

<script>
    export default {
        name: "buyer"
    }
</script>

<style scoped>
  .buyer{
    padding: 20px 10px 50px 10px;
  }
  h5{
    line-height: 28px;
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
